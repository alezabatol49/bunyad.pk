// Lightweight Supabase client using native fetch — no @supabase/supabase-js dependency

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

const headers = () => ({
  'Content-Type': 'application/json',
  apikey: anonKey || '',
  Authorization: `Bearer ${anonKey || ''}`,
})

function buildUrl(table, filters = [], order, limit, single) {
  const params = new URLSearchParams()
  if (filters.length) filters.forEach(f => params.append(f.col, `${f.op}.${f.val}`))
  if (order) {
    const [col, dir] = order.split('.')
    params.append('order', `${col}.${dir}`)
  }
  if (limit) params.append('limit', String(limit))
  const select = single ? 'select=*' : 'select=*'
  const qs = params.toString()
  return `${url}/rest/v1/${table}?${select}${qs ? '&' + qs : ''}`
}

class QueryBuilder {
  constructor(table) {
    this._table = table
    this._filters = []
    this._order = null
    this._limit = null
    this._single = false
    this._maybeSingle = false
  }

  select() { return this }

  order(col, opts = {}) {
    this._order = `${col}.${opts.ascending === false ? 'desc' : 'asc'}`
    return this
  }

  eq(col, val) {
    this._filters.push({ col, op: 'eq', val: encodeURIComponent(String(val)) })
    return this
  }

  limit(n) { this._limit = n; return this }

  single() { this._single = true; return this }

  maybeSingle() { this._maybeSingle = true; return this }

  async _select() {
    const u = buildUrl(this._table, this._filters, this._order, this._limit, this._single || this._maybeSingle)
    const res = await fetch(u, { headers: headers() })
    const data = await res.json()
    if (!res.ok) return { data: null, error: { message: data.message || res.statusText } }
    if (this._single || this._maybeSingle) return { data: data[0] || null, error: null }
    return { data, error: null }
  }

  async _insert(row) {
    const res = await fetch(`${url}/rest/v1/${this._table}`, {
      method: 'POST',
      headers: { ...headers(), Prefer: 'return=representation' },
      body: JSON.stringify(row),
    })
    const data = await res.json()
    if (!res.ok) return { data: null, error: { message: data.message || res.statusText } }
    if (this._single) return { data: data[0] || null, error: null }
    if (this._maybeSingle) return { data: data[0] || null, error: null }
    return { data, error: null }
  }

  async _update(patch) {
    const u = buildUrl(this._table, this._filters)
    const res = await fetch(u, {
      method: 'PATCH',
      headers: { ...headers(), Prefer: 'return=representation' },
      body: JSON.stringify(patch),
    })
    const data = await res.json()
    if (!res.ok) return { data: null, error: { message: data.message || res.statusText } }
    if (this._single) return { data: data[0] || null, error: null }
    return { data, error: null }
  }

  async _delete() {
    const u = buildUrl(this._table, this._filters)
    const res = await fetch(u, { method: 'DELETE', headers: headers() })
    if (!res.ok) return { data: null, error: { message: res.statusText } }
    return { data: null, error: null }
  }

  then(resolve, reject) {
    if (this._mode === 'insert') return this._insert(this._row).then(resolve, reject)
    if (this._mode === 'update') return this._update(this._patch).then(resolve, reject)
    if (this._mode === 'delete') return this._delete().then(resolve, reject)
    return this._select().then(resolve, reject)
  }
}

class InsertBuilder extends QueryBuilder {
  constructor(table, row) {
    super(table)
    this._mode = 'insert'
    this._row = row
  }
}

class UpdateBuilder extends QueryBuilder {
  constructor(table, patch) {
    super(table)
    this._mode = 'update'
    this._patch = patch
  }
}

class DeleteBuilder extends QueryBuilder {
  constructor(table) {
    super(table)
    this._mode = 'delete'
  }
}

class TableBuilder {
  constructor(table) {
    this._table = table
  }
  select() { return new QueryBuilder(this._table) }
  insert(row) { return new InsertBuilder(this._table, row) }
  update(patch) { return new UpdateBuilder(this._table, patch) }
  delete() { return new DeleteBuilder(this._table) }
}

export const supabase = isSupabaseConfigured
  ? { from(table) { return new TableBuilder(table) } }
  : null

export async function safeQuery(fn, fallback) {
  if (!supabase) return fallback
  try {
    const result = await fn(supabase)
    if (result && result.error) {
      console.warn('[Supabase] query error:', result.error.message)
      return fallback
    }
    return result?.data ?? fallback
  } catch (e) {
    console.warn('[Supabase] runtime error:', e?.message || e)
    return fallback
  }
}
