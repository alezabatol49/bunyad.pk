import React, { useState, memo } from 'react'
import {
  LayoutGrid, User, Handshake, Crown, X, Lock, ShieldCheck,
  FileText, Download, TrendingUp, Wallet, BadgeCheck, IdCard,
  Send, Phone
} from '../icons.jsx'
import { supabase, safeQuery, isSupabaseConfigured } from '../lib/supabase.js'
import { CEO_PHONE, SOCIETIES, waLink } from '../data/societies.js'
import { Presence } from '../lib/motion.jsx'

const CEO_PIN = '0321'

const ROLES = [
  { id: 'client', label: 'Client / Investor', icon: User, accent: 'Client Portal' },
  { id: 'dealer', label: 'Authorized Dealer', icon: Handshake, accent: 'Agent Portal' },
  { id: 'ceo', label: 'CEO Executive Desk', icon: Crown, accent: 'Executive Desk' }
]

function AuthHub() {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('client')

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-ghost text-xs flex items-center gap-1.5" title="Login / Portal">
        <LayoutGrid size={13} /> <span className="hidden sm:inline">Login</span>
      </button>

      <Presence show={open} exitClass="anim-fade-out" exitMs={400}>
        {(exitCls) => (
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur anim-fade-in ${exitCls}`}
            onClick={() => setOpen(false)}
          >
            <div
              className={`glass-strong rounded-2xl cyber-border w-full max-w-3xl max-h-[92vh] overflow-y-auto anim-scale-in ${exitCls}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-cyber/20 bg-obsidian2/90 backdrop-blur">
                <div className="flex items-center gap-2">
                  <LayoutGrid size={18} className="text-cyber" />
                  <h3 className="font-display font-bold text-platinum">Login / Portal Hub</h3>
                </div>
                <button onClick={() => setOpen(false)} className="text-platinum/60 hover:text-cyber p-2"><X size={20} /></button>
              </div>

              {/* Role tabs */}
              <div className="flex gap-2 p-4 border-b border-cyber/15">
                {ROLES.map(r => {
                  const Icon = r.icon
                  return (
                    <button key={r.id} onClick={() => setRole(r.id)}
                      className={`flex-1 flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border transition-all ${role === r.id ? 'border-cyber bg-cyber/10 cyber-glow' : 'border-cyber/20 hover:bg-cyber/5'}`}>
                      <Icon size={20} className={role === r.id ? 'text-cyber' : 'text-platinum/60'} />
                      <span className={`text-[11px] font-semibold text-center leading-tight ${role === r.id ? 'text-cyber' : 'text-platinum/60'}`}>{r.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="p-5">
                {role === 'client' && <ClientPortal />}
                {role === 'dealer' && <DealerPortal />}
                {role === 'ceo' && <CEODesk />}
              </div>
            </div>
          </div>
        )}
      </Presence>
    </>
  )
}

/* ---------- Client / Investor Portal ---------- */
const SAMPLE_BOOKINGS = [
  { id: 'b1', unit: '5 Marla · Block J', society: 'LDA Avenue 1', status: 'Escrow: Structure', milestone: 'Structure' },
  { id: 'b2', unit: '10 Marla · Block C', society: 'Bahria Town', status: 'Escrow: Foundation', milestone: 'Foundation' }
]
const NOC_DOCS = [
  { id: 'n1', name: 'LDA Avenue 1 — NOC.pdf', society: 'LDA Avenue 1' },
  { id: 'n2', name: 'Bahria Town — Approved Map.pdf', society: 'Bahria Town' }
]

function ClientPortal() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return (
      <form onSubmit={e => { e.preventDefault(); setEntered(true) }} className="max-w-sm mx-auto space-y-3 py-4">
        <p className="hud-label text-center">Client / Investor Login</p>
        <p className="text-sm text-platinum/70 text-center">Track your booked units, escrow milestones & download NOC documents.</p>
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        <input required placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}
          className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        <button className="btn-cyber w-full flex items-center justify-center gap-2"><ShieldCheck size={16} /> Enter Portal</button>
        <p className="text-[10px] text-platinum/40 text-center">Demo access — connect Supabase Auth for secure accounts.</p>
      </form>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="hud-label mb-2 flex items-center gap-1.5"><TrendingUp size={12} /> Booked Units & Escrow Milestones</p>
        <div className="space-y-2">
          {SAMPLE_BOOKINGS.map(b => (
            <div key={b.id} className="glass rounded-lg border border-cyber/15 p-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm text-platinum font-semibold">{b.unit}</p>
                <p className="text-[11px] text-platinum/60">{b.society}</p>
              </div>
              <EscrowProgress milestone={b.milestone} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="hud-label mb-2 flex items-center gap-1.5"><Download size={12} /> NOC & Document Downloads</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {NOC_DOCS.map(d => (
            <button key={d.id} onClick={() => alert(`Downloading ${d.name} — connect storage for live files.`)}
              className="glass rounded-lg border border-cyber/15 p-3 flex items-center gap-2 hover:bg-cyber/10 transition-all text-left">
              <FileText size={16} className="text-cyber shrink-0" />
              <div>
                <p className="text-[12px] text-platinum font-medium leading-tight">{d.name}</p>
                <p className="text-[10px] text-platinum/50">{d.society}</p>
              </div>
              <Download size={13} className="text-cyber/60 ml-auto shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function EscrowProgress({ milestone }) {
  const stages = ['Foundation', 'Structure', 'Finishing', 'Handover']
  const idx = stages.indexOf(milestone)
  return (
    <div className="flex items-center gap-1">
      {stages.map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <div className={`w-2.5 h-2.5 rounded-full ${i <= idx ? 'bg-cyber' : 'bg-platinum/15'} ${i === idx ? 'cyber-glow' : ''}`} />
          {i < stages.length - 1 && <div className={`w-5 h-0.5 ${i < idx ? 'bg-cyber' : 'bg-platinum/15'}`} />}
        </div>
      ))}
      <span className="text-[10px] text-cyber ml-1.5 w-20">{milestone}</span>
    </div>
  )
}

/* ---------- Authorized Dealer / Agent Portal ---------- */
function DealerPortal() {
  const [cnic, setCnic] = useState('')
  const [verified, setVerified] = useState(null)
  const [deal, setDeal] = useState({ society: '', client: '', phone: '', amount: '' })
  const [deals, setDeals] = useState([
    { id: 'd1', society: 'Lake City', client: 'Ahmed Ali', phone: '0300-1234567', amount: 'PKR 1.2 Crore', commission: 'PKR 3 Lakh' }
  ])

  const verifyCnic = async (e) => {
    e.preventDefault()
    const data = await safeQuery(s => s.from('agents').select('*').eq('cnic', cnic).maybeSingle(), null)
    if (data && data.verified) setVerified({ name: data.agent_name, agency: data.agency_name })
    else setVerified({ notFound: true })
  }

  const submitDeal = (e) => {
    e.preventDefault()
    if (!deal.society || !deal.client) return
    setDeals(prev => [{ id: 'd' + Date.now(), society: deal.society, client: deal.client, phone: deal.phone, amount: deal.amount, commission: 'PKR ' + (parseInt((deal.amount || '').replace(/[^0-9]/g, '')) / 400 || 0) + ' Lakh' }, ...prev])
    setDeal({ society: '', client: '', phone: '', amount: '' })
  }

  return (
    <div className="space-y-6">
      {/* CNIC Verify */}
      <div>
        <p className="hud-label mb-2 flex items-center gap-1.5"><IdCard size={12} /> CNIC Dealer Verification</p>
        <form onSubmit={verifyCnic} className="flex gap-2">
          <input required placeholder="Enter CNIC (e.g. 35202-1234567-1)" value={cnic} onChange={e => setCnic(e.target.value)}
            className="flex-1 bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
          <button className="btn-cyber text-xs px-3 py-2 flex items-center gap-1.5"><BadgeCheck size={14} /> Verify</button>
        </form>
        {verified && (
          <div className={`mt-2 glass rounded-lg border p-3 ${verified.notFound ? 'border-red-400/40' : 'border-cyber/30'}`}>
            {verified.notFound ? (
              <p className="text-sm text-red-400">CNIC not found in authorized dealer registry.</p>
            ) : (
              <p className="text-sm text-platinum flex items-center gap-1.5"><BadgeCheck size={14} className="text-cyber" /> {verified.name} · {verified.agency || 'Verified Dealer'}</p>
            )}
          </div>
        )}
      </div>

      {/* Deal Submission */}
      <div>
        <p className="hud-label mb-2 flex items-center gap-1.5"><Send size={12} /> Submit New Deal</p>
        <form onSubmit={submitDeal} className="grid grid-cols-2 gap-2">
          <select value={deal.society} onChange={e => setDeal(d => ({ ...d, society: e.target.value }))}
            className="col-span-2 bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum">
            <option value="">Select society…</option>
            {SOCIETIES.map(s => <option key={s.id}>{s.name}</option>)}
          </select>
          <input required placeholder="Client Name" value={deal.client} onChange={e => setDeal(d => ({ ...d, client: e.target.value }))}
            className="bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
          <input placeholder="Client Phone" value={deal.phone} onChange={e => setDeal(d => ({ ...d, phone: e.target.value }))}
            className="bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
          <input placeholder="Deal Amount (PKR)" value={deal.amount} onChange={e => setDeal(d => ({ ...d, amount: e.target.value }))}
            className="col-span-2 bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
          <button className="btn-cyber col-span-2 text-xs flex items-center justify-center gap-1.5"><Send size={14} /> Submit Deal</button>
        </form>
      </div>

      {/* Commission Ledger */}
      <div>
        <p className="hud-label mb-2 flex items-center gap-1.5"><Wallet size={12} /> Commission Ledger</p>
        <div className="space-y-2">
          {deals.map(d => (
            <div key={d.id} className="glass rounded-lg border border-cyber/15 p-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm text-platinum font-semibold">{d.client} · {d.society}</p>
                <p className="text-[11px] text-platinum/60">{d.phone} · {d.amount}</p>
              </div>
              <span className="text-[12px] text-cyber font-semibold">{d.commission}</span>
            </div>
          ))}
          {deals.length === 0 && <p className="text-platinum/40 text-sm text-center py-4">No deals submitted yet.</p>}
        </div>
      </div>
    </div>
  )
}

/* ---------- CEO Executive Desk ---------- */
function CEODesk() {
  const [pin, setPin] = useState('')
  const [err, setErr] = useState('')
  const [authed, setAuthed] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pin === CEO_PIN) { setAuthed(true); setErr('') }
    else setErr('Incorrect PIN. CEO access only.')
  }

  if (!authed) {
    return (
      <form onSubmit={submit} className="max-w-sm mx-auto space-y-4 py-4">
        <p className="text-center hud-label">CEO Secure Login</p>
        <p className="text-center text-sm text-platinum/70">Taha Mubeen Bhutta — enter PIN</p>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)}
          placeholder="4-digit PIN" maxLength={4}
          className="w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-3 text-center text-2xl tracking-[0.5em] text-platinum focus:outline-none focus:border-cyber" />
        {err && <p className="text-red-400 text-xs text-center">{err}</p>}
        <button className="btn-cyber w-full flex items-center justify-center gap-2"><Lock size={16} /> Unlock Executive Desk</button>
        <p className="text-[10px] text-platinum/40 text-center">Demo PIN: 0321 · connect Supabase Auth for production</p>
      </form>
    )
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl border border-cyber/30 p-4 text-center">
        <Crown className="mx-auto text-cyber" size={28} />
        <p className="text-sm text-platinum font-semibold mt-2">Welcome, CEO Taha Mubeen Bhutta</p>
        <p className="text-[11px] text-cyber/70 mt-1">Full CRM pipeline, rate controller & agent management</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { label: 'Active Leads', value: '24', icon: TrendingUp },
          { label: 'Deals in Escrow', value: '7', icon: Wallet },
          { label: 'Verified Agents', value: '12', icon: BadgeCheck }
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="glass rounded-lg border border-cyber/15 p-3 text-center">
              <Icon size={18} className="text-cyber mx-auto" />
              <p className="text-2xl font-display font-black text-platinum mt-1">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-cyber/70">{s.label}</p>
            </div>
          )
        })}
      </div>
      <a href={waLink('Assalam-u-alaikum CEO Taha Mubeen Bhutta, accessing executive desk from Bunyad.pk portal.')} target="_blank" rel="noreferrer"
        className="btn-ghost w-full flex items-center justify-center gap-2 text-sm">
        <Phone size={15} /> Open CEO Direct Line · {CEO_PHONE}
      </a>
      <p className="text-[11px] text-platinum/50 text-center">Use the "Admin" tab in the top navigation for the full CRM console.</p>
    </div>
  )
}

export default memo(AuthHub)
