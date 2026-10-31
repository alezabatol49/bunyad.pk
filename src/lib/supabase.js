// Supabase Client with Dual Project Fallback (Direct Sync to Bin Taha CRM)
// Uses native fetch — zero external dependencies

const SUPABASE_PROJECTS = [
  {
    url: "https://ajrvlrvnxpatbculnwil.supabase.co",
    key: "sb_publishable_ndHx-NyVhYxvDwfvBnK2iA_woPQhjJi",
    name: "Bin Taha Live Production CRM"
  },
  {
    url: "https://mmbcfhaxtzoctxdofmiz.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tYmNmaGF4dHpvY3R4ZG9mbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MjQ3MjksImV4cCI6MjEwOTAwMDcyOX0.Ee9IAFcS1szzgZxewlyKWSE7SqSSBR_Ci9gFbxutiCM",
    name: "Bunyad Primary Cloud Cluster"
  }
];

export const isSupabaseConfigured = true;

const primary = SUPABASE_PROJECTS[0];

const getHeaders = (key) => ({
  'Content-Type': 'application/json',
  apikey: key,
  Authorization: `Bearer ${key}`
});

// Sync service booking or lead directly to Supabase and webhook
export async function syncLeadToBinTahaCRM(leadPayload) {
  let synced = false;

  // 1. Send to Supabase DB (Services / Leads table)
  for (const project of SUPABASE_PROJECTS) {
    try {
      const res = await fetch(`${project.url}/rest/v1/Services`, {
        method: 'POST',
        headers: { ...getHeaders(project.key), Prefer: 'return=minimal' },
        body: JSON.stringify(leadPayload)
      });
      if (res.ok) {
        console.log(`[CRM Synced] Successfully saved to ${project.name}`);
        synced = true;
        break;
      }
    } catch (err) {
      console.warn(`[CRM Sync Warning] Failed on ${project.name}:`, err);
    }
  }

  // 2. Parallel Sync to Google Sheets Webhook (bintahacrm@gmail.com)
  const webhookUrl = 'https://script.google.com/macros/s/AKfycbz7G5kOgtVNnWTeDXeiki30lXlMrSLlf6nvVaQjXYxwr56KLf54b9IMPOw3LQho8DvO/exec';
  try {
    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload)
    }).catch(e => console.log('Sheet notice:', e));
  } catch (e) {
    // silently catch
  }

  return synced;
}

// Fluent Query Builder
class QueryBuilder {
  constructor(table) {
    this._table = table;
    this._filters = [];
    this._order = null;
    this._limit = null;
    this._single = false;
  }
  select() { return this; }
  order(col, opts = {}) {
    this._order = `${col}.${opts.ascending === false ? 'desc' : 'asc'}`;
    return this;
  }
  eq(col, val) {
    this._filters.push({ col, op: 'eq', val: encodeURIComponent(String(val)) });
    return this;
  }
  limit(n) { this._limit = n; return this; }
  single() { this._single = true; return this; }

  async then(resolve, reject) {
    try {
      const params = new URLSearchParams();
      if (this._filters.length) this._filters.forEach(f => params.append(f.col, `${f.op}.${f.val}`));
      if (this._order) {
        const [col, dir] = this._order.split('.');
        params.append('order', `${col}.${dir}`);
      }
      if (this._limit) params.append('limit', String(this._limit));
      params.append('select', '*');

      const u = `${primary.url}/rest/v1/${this._table}?${params.toString()}`;
      const res = await fetch(u, { headers: getHeaders(primary.key) });
      const data = await res.json();
      if (!res.ok) return resolve({ data: null, error: data });
      return resolve({ data: this._single ? data[0] : data, error: null });
    } catch (err) {
      return resolve({ data: null, error: err });
    }
  }
}

export const supabase = {
  from(table) {
    return new QueryBuilder(table);
  }
};

export async function safeQuery(fn, fallback) {
  try {
    const res = await fn(supabase);
    return res?.data ?? fallback;
  } catch {
    return fallback;
  }
}
