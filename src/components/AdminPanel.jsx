import React, { useState, useEffect, memo } from 'react'
import { Lock, LayoutDashboard, Users, Building2, Boxes, MessageCircle, BadgeCheck, X, Plus, Trash2, UserPlus } from '../icons.jsx'
import { supabase, safeQuery, isSupabaseConfigured } from '../lib/supabase.js'
import { LEAD_STATUSES, PLOT_STATUSES, ESCROW_STAGES, CEO_PHONE, waLink } from '../data/societies.js'
import { Presence } from '../lib/motion.jsx'

const ADMIN_PIN = '0321'

const SAMPLE_LEADS = [
  { id: 's1', full_name: 'Ali Raza', phone: '0300-1234567', society_interest: 'LDA Avenue 1', budget: 'PKR 50 Lakh', status: 'New', created_at: new Date().toISOString() },
  { id: 's2', full_name: 'Sara Khan', phone: '0321-7654321', society_interest: 'Bahria Town', budget: 'PKR 1.2 Crore', status: 'Contacted', created_at: new Date().toISOString() }
]
const SAMPLE_PROPERTIES = [
  { id: 's1', title: '5 Marla Corner Plot', society_name: 'LDA Avenue 1', block: 'J', price: 'PKR 48 Lakh', status: 'Available', verified_by_bintaha: true },
  { id: 's2', title: '10 Marla Park-Facing', society_name: 'Bahria Town', block: 'C', price: 'PKR 1.4 Crore', status: 'Reserved', verified_by_bintaha: true }
]
const SAMPLE_AGENTS = [
  { id: 's1', agent_name: 'Imran Sheikh', agency_name: 'Skyline Realty', phone: '0301-1112222', verified: true, commission_split: '50/50' }
]

function AdminPanel() {
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState('')
  const [err, setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) { setAuthed(true); setErr('') }
    else setErr('Incorrect PIN. CEO access only.')
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-ghost flex items-center gap-2 text-xs">
        <Lock size={14} /> CEO Admin
      </button>

      <Presence show={open} exitClass="anim-fade-out" exitMs={400}>
        {(exitCls) => (
          <div
            className={`fixed inset-0 z-[110] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur anim-fade-in ${exitCls}`}
            onClick={() => setOpen(false)}
          >
            <div
              className={`glass-strong rounded-2xl cyber-border w-full max-w-5xl max-h-[92vh] overflow-y-auto anim-scale-in ${exitCls}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-cyber/20 bg-obsidian2/90 backdrop-blur">
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={18} className="text-cyber" />
                  <h3 className="font-display font-bold text-platinum">Bunyad Command Console</h3>
                </div>
                <button onClick={() => setOpen(false)} className="text-platinum/60 hover:text-cyber p-2"><X size={20} /></button>
              </div>

              {!authed ? (
                <form onSubmit={submit} className="p-8 max-w-sm mx-auto space-y-4">
                  <p className="text-center hud-label">CEO Secure Login</p>
                  <p className="text-center text-sm text-platinum/70">Taha Mubeen Bhutta — enter PIN</p>
                  <input
                    type="password" value={pin} onChange={e => setPin(e.target.value)}
                    placeholder="4-digit PIN" maxLength={4}
                    className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-3 text-center text-2xl tracking-[0.5em] text-platinum focus:outline-none focus:border-cyber"
                  />
                  {err && <p className="text-red-400 text-xs text-center">{err}</p>}
                  <button className="btn-cyber w-full" type="submit">Unlock Console</button>
                  <p className="text-[10px] text-platinum/40 text-center">Demo PIN: 0321 · connect Supabase auth for production</p>
                </form>
              ) : (
                <Console />
              )}
            </div>
          </div>
        )}
      </Presence>
    </>
  )
}

function Console() {
  const [tab, setTab] = useState('leads')
  const tabs = [
    { id: 'leads', label: 'Lead Manager', icon: Users },
    { id: 'crm', label: 'CRM Pipeline', icon: MessageCircle },
    { id: 'inventory', label: 'Inventory', icon: Building2 },
    { id: 'materials', label: 'Material Rates', icon: Boxes },
    { id: 'agents', label: 'Agent Portal', icon: BadgeCheck }
  ]
  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border ${tab === t.id ? 'btn-cyber border-transparent' : 'btn-ghost'}`}>
              <Icon size={14} /> {t.label}
            </button>
          )
        })}
      </div>
      {!isSupabaseConfigured && (
        <p className="text-[11px] text-cyber/70 mb-3">Demo mode — showing local sample data. Connect Supabase keys to sync live records.</p>
      )}
      {tab === 'leads' && <LeadsTab />}
      {tab === 'crm' && <CRMTab />}
      {tab === 'inventory' && <InventoryTab />}
      {tab === 'materials' && <MaterialsTab />}
      {tab === 'agents' && <AgentsTab />}
    </div>
  )
}

function useTable(table, sample) {
  const [rows, setRows] = useState(sample)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await safeQuery(s => s.from(table).select('*').order('created_at', { ascending: false }), sample)
    setRows(data || sample)
    setLoading(false)
  }

  useEffect(() => { load() }, [table])

  return { rows, setRows, loading, reload: load }
}

function LeadsTab() {
  const { rows, setRows, reload } = useTable('leads', SAMPLE_LEADS)

  const updateStatus = async (id, status) => {
    setRows(r => r.map(l => l.id === id ? { ...l, status } : l))
    if (supabase) await supabase.from('leads').update({ status }).eq('id', id)
  }

  const remove = async (id) => {
    setRows(r => r.filter(l => l.id !== id))
    if (supabase) await supabase.from('leads').delete().eq('id', id)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-platinum/70">{rows.length} leads</p>
        <button onClick={reload} className="btn-ghost text-xs px-3 py-1.5">Refresh</button>
      </div>
      <div className="space-y-2">
        {rows.map(l => (
          <div key={l.id} className="glass rounded-lg border border-cyber/15 p-3 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[160px]">
              <p className="text-sm text-platinum font-semibold">{l.full_name}</p>
              <p className="text-[11px] text-platinum/60">{l.phone} · {l.society_interest || '—'} · {l.budget || '—'}</p>
            </div>
            <select value={l.status} onChange={e => updateStatus(l.id, e.target.value)}
              className="bg-obsidian2 border border-cyber/20 rounded-lg px-2 py-1 text-xs text-platinum">
              {LEAD_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <a href={waLink(`Assalam-u-alaikum ${l.full_name}, following up on your ${l.society_interest || 'property'} inquiry via Bunyad.pk.`)} target="_blank" rel="noreferrer"
              className="btn-ghost text-xs px-3 py-1.5 flex items-center gap-1"><MessageCircle size={12} /> WhatsApp</a>
            <button onClick={() => remove(l.id)} className="text-red-400/70 hover:text-red-400 p-1"><Trash2 size={14} /></button>
          </div>
        ))}
        {rows.length === 0 && <p className="text-platinum/40 text-sm text-center py-6">No leads yet.</p>}
      </div>
    </div>
  )
}

function CRMTab() {
  const { rows, setRows, reload } = useTable('crm_clients', SAMPLE_LEADS.map(l => ({ id: l.id, client_name: l.full_name, phone: l.phone, deal_society: l.society_interest, escrow_milestone: 'Foundation', payment_status: 'Pending' })))

  const advance = async (id, milestone) => {
    setRows(r => r.map(c => c.id === id ? { ...c, escrow_milestone: milestone } : c))
    if (supabase) await supabase.from('crm_clients').update({ escrow_milestone: milestone }).eq('id', id)
  }

  return (
    <div>
      <p className="text-sm text-platinum/70 mb-3">Deal pipeline · New Lead → Verification → Escrow Milestone → Closed</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map(c => (
          <div key={c.id} className="glass rounded-xl border border-cyber/15 p-3">
            <p className="text-sm text-platinum font-semibold">{c.client_name}</p>
            <p className="text-[11px] text-platinum/60">{c.phone} · {c.deal_society || '—'}</p>
            <p className="text-[11px] text-cyber mt-2">Escrow: {c.escrow_milestone}</p>
            <select value={c.escrow_milestone} onChange={e => advance(c.id, e.target.value)}
              className="mt-2 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-2 py-1 text-xs text-platinum">
              {ESCROW_STAGES.map(s => <option key={s}>{s}</option>)}
            </select>
            <a href={waLink(`Assalam-u-alaikum ${c.client_name}, update on your ${c.deal_society || 'deal'} escrow (${c.escrow_milestone}) — Bunyad.pk`)} target="_blank" rel="noreferrer"
              className="btn-ghost mt-2 w-full text-xs py-1.5 flex items-center justify-center gap-1"><MessageCircle size={12} /> Follow-up</a>
          </div>
        ))}
      </div>
    </div>
  )
}

function InventoryTab() {
  const { rows, setRows, reload } = useTable('properties', SAMPLE_PROPERTIES)

  const toggle = async (id, status) => {
    setRows(r => r.map(p => p.id === id ? { ...p, status } : p))
    if (supabase) await supabase.from('properties').update({ status }).eq('id', id)
  }

  const add = async () => {
    const newRow = { title: 'New Plot', society_name: 'LDA Avenue 1', block: '—', price: 'PKR —', status: 'Available', verified_by_bintaha: false }
    if (supabase) {
      const { data } = await supabase.from('properties').insert(newRow).select().single()
      if (data) setRows(r => [data, ...r])
    } else {
      setRows(r => [{ id: 'local' + Date.now(), ...newRow }, ...r])
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-platinum/70">{rows.length} plots</p>
        <button onClick={add} className="btn-cyber text-xs px-3 py-1.5 flex items-center gap-1"><Plus size={12} /> Add Plot</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map(p => (
          <div key={p.id} className="glass rounded-xl border border-cyber/15 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-platinum font-semibold">{p.title}</p>
              {p.verified_by_bintaha && <BadgeCheck size={14} className="text-cyber" />}
            </div>
            <p className="text-[11px] text-platinum/60">{p.society_name} · Block {p.block}</p>
            <p className="text-[12px] text-cyber font-semibold mt-1">{p.price}</p>
            <select value={p.status} onChange={e => toggle(p.id, e.target.value)}
              className="mt-2 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-2 py-1 text-xs text-platinum">
              {PLOT_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

function MaterialsTab() {
  const [rates, setRates] = useState({ cement_bag: 1540, steel_kg: 282, bricks_pc: 21, crush_cft: 330 })
  const [saved, setSaved] = useState(false)

  const save = async () => {
    if (supabase) {
      const { data } = await supabase.from('material_rates').select('id').maybeSingle()
      if (data) await supabase.from('material_rates').update({ ...rates, updated_at: new Date().toISOString() }).eq('id', data.id)
      else await supabase.from('material_rates').insert(rates)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-lg space-y-4">
      <p className="text-sm text-platinum/70">Update site-wide live civil material rates. These flow into the top ticker and the Construction Cost Estimator.</p>
      {[
        { k: 'cement_bag', l: 'Cement (PKR / Bag)' },
        { k: 'steel_kg', l: 'Grade-60 Steel (PKR / Kg)' },
        { k: 'bricks_pc', l: 'Awwal Bricks (PKR / Pc)' },
        { k: 'crush_cft', l: 'Margalla Crush (PKR / CFT)' }
      ].map(f => (
        <div key={f.k}>
          <label className="hud-label">{f.l}</label>
          <input type="number" value={rates[f.k]} onChange={e => setRates(r => ({ ...r, [f.k]: +e.target.value }))}
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        </div>
      ))}
      <button onClick={save} className="btn-cyber">{saved ? 'Saved ✓' : 'Save Rates'}</button>
    </div>
  )
}

function AgentsTab() {
  const { rows, setRows, reload } = useTable('agents', SAMPLE_AGENTS)
  const [form, setForm] = useState({ agent_name: '', agency_name: '', cnic: '', phone: '', commission_split: '50/50' })

  const submit = async (e) => {
    e.preventDefault()
    if (supabase) {
      const { data } = await supabase.from('agents').insert({ ...form, verified: false }).select().single()
      if (data) setRows(r => [data, ...r])
    } else {
      setRows(r => [{ id: 'local' + Date.now(), ...form, verified: false }, ...r])
    }
    setForm({ agent_name: '', agency_name: '', cnic: '', phone: '', commission_split: '50/50' })
  }

  const verify = async (id, verified) => {
    setRows(r => r.map(a => a.id === id ? { ...a, verified } : a))
    if (supabase) await supabase.from('agents').update({ verified }).eq('id', id)
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <form onSubmit={submit} className="space-y-3">
        <p className="hud-label">Agent Registration</p>
        <input required placeholder="Agent Name" value={form.agent_name} onChange={e => setForm(f => ({ ...f, agent_name: e.target.value }))} className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        <input placeholder="Agency Name" value={form.agency_name} onChange={e => setForm(f => ({ ...f, agency_name: e.target.value }))} className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        <input placeholder="CNIC" value={form.cnic} onChange={e => setForm(f => ({ ...f, cnic: e.target.value }))} className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        <input required placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        <input placeholder="Commission Split (e.g. 50/50)" value={form.commission_split} onChange={e => setForm(f => ({ ...f, commission_split: e.target.value }))} className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        <button className="btn-cyber flex items-center gap-2"><UserPlus size={14} /> Register Agent</button>
      </form>
      <div>
        <p className="hud-label mb-2">Registered Agents</p>
        <div className="space-y-2">
          {rows.map(a => (
            <div key={a.id} className="glass rounded-lg border border-cyber/15 p-3 flex items-center gap-2">
              <div className="flex-1">
                <p className="text-sm text-platinum font-semibold flex items-center gap-1.5">
                  {a.agent_name}
                  {a.verified && <BadgeCheck size={14} className="text-cyber" />}
                </p>
                <p className="text-[11px] text-platinum/60">{a.agency_name || '—'} · {a.phone} · {a.commission_split || '—'}</p>
              </div>
              <button onClick={() => verify(a.id, !a.verified)} className={`text-xs px-3 py-1.5 rounded-lg border ${a.verified ? 'btn-cyber border-transparent' : 'btn-ghost'}`}>
                {a.verified ? 'Verified' : 'Verify'}
              </button>
            </div>
          ))}
          {rows.length === 0 && <p className="text-platinum/40 text-sm">No agents registered.</p>}
        </div>
      </div>
    </div>
  )
}

export default memo(AdminPanel)
