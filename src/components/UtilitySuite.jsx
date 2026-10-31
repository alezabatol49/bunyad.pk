import React, { useState, memo } from 'react'
import { Sparkles, Ruler, Calculator, ShieldCheck, FileText, MessageCircle, Send } from '../icons.jsx'
import { askGemini } from '../lib/gemini.js'
import { SOCIETIES, CEO_PHONE, waLink } from '../data/societies.js'

function UtilitySuite() {
  const [tab, setTab] = useState('studio')
  const tabs = [
    { id: 'studio', label: 'AI Architectural Studio', icon: Sparkles },
    { id: 'dc', label: 'DC Rate & FBR Tax Engine', icon: Calculator },
    { id: 'cost', label: 'Construction Cost Estimator', icon: Ruler },
    { id: 'escrow', label: 'Escrow Milestone Tracker', icon: ShieldCheck },
    { id: 'forms', label: 'Official Forms Desk', icon: FileText },
    { id: 'inquiry', label: 'WhatsApp Inquiries', icon: MessageCircle }
  ]

  return (
    <section id="suite" className="px-4 md:px-8 py-10">
      <p className="hud-label">Module 07 · PropTech Utility Suite</p>
      <h2 className="font-display text-2xl md:text-4xl font-black text-platinum mb-6">
        Complete <span className="text-cyber">PropTech</span> Toolkit
      </h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(t => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                active ? 'btn-cyber border-transparent' : 'btn-ghost'
              }`}
            >
              <Icon size={14} /> {t.label}
            </button>
          )
        })}
      </div>

      <div className="glass-strong rounded-2xl cyber-border p-5 md:p-7 anim-fade-in">
        {tab === 'studio' && <AIStudio />}
        {tab === 'dc' && <DCEngine />}
        {tab === 'cost' && <CostEstimator />}
        {tab === 'escrow' && <EscrowTracker />}
        {tab === 'forms' && <FormsDesk />}
        {tab === 'inquiry' && <InquiryDesk />}
      </div>
    </section>
  )
}

function AIStudio() {
  const [dims, setDims] = useState('30x70')
  const [society, setSociety] = useState(SOCIETIES[0].name)
  const [floor, setFloor] = useState('Ground + 1')
  const [out, setOut] = useState('')
  const [busy, setBusy] = useState(false)

  const run = async () => {
    setBusy(true)
    const prompt = `Plot dimensions: ${dims} (in feet). Society: ${society}. Floors: ${floor}.
Provide: (1) a concise floor layout suggestion with room placement, (2) LDA setback & covered-area compliance notes,
(3) structural guidance (foundation, columns, beams) and rough gray-structure cost indication. Keep it practical.`
    const res = await askGemini(prompt)
    setOut(res.text)
    setBusy(false)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="hud-label">Plot Dimensions (ft)</label>
          <input value={dims} onChange={e => setDims(e.target.value)} placeholder="e.g. 30x70, 50x90"
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum focus:outline-none focus:border-cyber" />
        </div>
        <div>
          <label className="hud-label">Society</label>
          <select value={society} onChange={e => setSociety(e.target.value)}
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum focus:outline-none focus:border-cyber">
            {SOCIETIES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="hud-label">Floors</label>
          <select value={floor} onChange={e => setFloor(e.target.value)}
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum focus:outline-none focus:border-cyber">
            {['Ground Only', 'Ground + 1', 'Ground + 2', 'Basement + Ground + 1'].map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
        <button onClick={run} disabled={busy} className="btn-cyber flex items-center gap-2 disabled:opacity-50">
          <Sparkles size={16} /> {busy ? 'Generating Layout…' : 'Generate AI Floor Plan'}
        </button>
      </div>
      <div className="glass rounded-xl border border-cyber/15 p-4 min-h-[260px]">
        <p className="hud-label mb-2">AI Architectural Output</p>
        {out ? <pre className="text-[13px] text-platinum/90 whitespace-pre-wrap leading-relaxed font-sans">{out}</pre>
          : <p className="text-platinum/40 text-sm">Enter dimensions and generate an AI-powered layout, bylaw check, and structural guidance.</p>}
      </div>
    </div>
  )
}

function DCEngine() {
  const [value, setValue] = useState(5000000)
  const [filer, setFiler] = useState(true)
  const [society, setSociety] = useState(SOCIETIES[0].name)

  const stampDuty = filer ? value * 0.01 : value * 0.02
  const cvt = filer ? value * 0.0 : value * 0.03
  const registry = value * 0.005
  const transfer = value * 0.01
  const total = stampDuty + cvt + registry + transfer
  const fmt = (n) => `PKR ${Math.round(n).toLocaleString()}`

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="hud-label">Society</label>
          <select value={society} onChange={e => setSociety(e.target.value)}
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum">
            {SOCIETIES.map(s => <option key={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="hud-label">Declared Property Value (PKR)</label>
          <input type="number" value={value} onChange={e => setValue(+e.target.value)}
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        </div>
        <div className="flex gap-3">
          <button onClick={() => setFiler(true)} className={`flex-1 py-2 rounded-lg text-sm font-semibold border ${filer ? 'btn-cyber border-transparent' : 'btn-ghost'}`}>Filer</button>
          <button onClick={() => setFiler(false)} className={`flex-1 py-2 rounded-lg text-sm font-semibold border ${!filer ? 'btn-cyber border-transparent' : 'btn-ghost'}`}>Non-Filer</button>
        </div>
      </div>
      <div className="glass rounded-xl border border-cyber/15 p-4 space-y-2">
        <Row label="Stamp Duty" value={fmt(stampDuty)} />
        <Row label="CVT (Non-Filer only)" value={fmt(cvt)} />
        <Row label="Registry Fee" value={fmt(registry)} />
        <Row label="Transfer Dues" value={fmt(transfer)} />
        <div className="border-t border-cyber/20 pt-2 flex justify-between">
          <span className="text-cyber font-bold">Total Tax & Duties</span>
          <span className="text-platinum font-black text-lg">{fmt(total)}</span>
        </div>
        <p className="text-[11px] text-platinum/50 pt-1">Estimates based on standard Lahore DC rates. Confirm with CEO {CEO_PHONE} for exact society-specific dues.</p>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-platinum/70">{label}</span>
      <span className="text-platinum font-semibold">{value}</span>
    </div>
  )
}

function CostEstimator() {
  const [area, setArea] = useState(1750)
  const [cement, setCement] = useState(1540)
  const [steel, setSteel] = useState(282)
  const [finish, setFinish] = useState('gray')

  const grayRate = 2200
  const luxuryRate = 4200
  const perSqft = finish === 'gray' ? grayRate : luxuryRate
  const base = area * perSqft
  const materialAdj = (cement - 1540) * 9 + (steel - 282) * 4
  const total = base + materialAdj * area / 100

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="hud-label">Covered Area (sqft)</label>
          <input type="number" value={area} onChange={e => setArea(+e.target.value)}
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="hud-label">Cement /Bag</label>
            <input type="number" value={cement} onChange={e => setCement(+e.target.value)}
              className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
          </div>
          <div>
            <label className="hud-label">Steel /Kg</label>
            <input type="number" value={steel} onChange={e => setSteel(+e.target.value)}
              className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setFinish('gray')} className={`flex-1 py-2 rounded-lg text-sm font-semibold border ${finish === 'gray' ? 'btn-cyber border-transparent' : 'btn-ghost'}`}>Gray Structure</button>
          <button onClick={() => setFinish('luxury')} className={`flex-1 py-2 rounded-lg text-sm font-semibold border ${finish === 'luxury' ? 'btn-cyber border-transparent' : 'btn-ghost'}`}>Turnkey Luxury</button>
        </div>
      </div>
      <div className="glass rounded-xl border border-cyber/15 p-5 flex flex-col justify-center">
        <p className="hud-label">Estimated Total Cost</p>
        <p className="text-3xl font-black text-cyber mt-1">PKR {Math.round(total).toLocaleString()}</p>
        <p className="text-platinum/60 text-sm mt-1">≈ PKR {Math.round(perSqft).toLocaleString()} / sqft ({finish === 'gray' ? 'Gray Structure' : 'Turnkey Luxury'})</p>
        <p className="text-[11px] text-platinum/50 mt-3">Live material rates flow from the top ticker and the Admin material editor. Confirm with CEO {CEO_PHONE} for locked-quote escrow.</p>
      </div>
    </div>
  )
}

const ESCROW = [
  { name: 'Foundation', pct: 25, desc: 'Excavation, footing, DPC & plinth completion.' },
  { name: 'Structure', pct: 25, desc: 'Columns, beams, slab & roof casting up to grey shell.' },
  { name: 'Finishing', pct: 30, desc: 'Plaster, flooring, electrical, plumbing & fixtures.' },
  { name: 'Handover', pct: 20, desc: 'Final inspection, paint, cleanup & key handover.' }
]

function EscrowTracker() {
  const [done, setDone] = useState([true, false, false, false])
  const released = ESCROW.reduce((a, s, i) => a + (done[i] ? s.pct : 0), 0)

  return (
    <div>
      <div className="glass rounded-xl border border-cyber/15 p-4 mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-cyber font-bold">Escrow Released</span>
          <span className="text-platinum font-black text-lg">{released}%</span>
        </div>
        <div className="h-3 bg-obsidian2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyber to-cobalt transition-all duration-500" style={{ width: `${released}%` }} />
        </div>
        <p className="text-[11px] text-platinum/50 mt-2">100% milestone protection supervised by Bin Taha Associates & Builders. Each stage verified before disbursement.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ESCROW.map((s, i) => (
          <button key={s.name} onClick={() => setDone(d => d.map((v, idx) => idx === i ? !v : v))}
            className={`text-left rounded-xl p-4 border transition-all ${done[i] ? 'cyber-border cyber-glow' : 'border-cyber/15 glass'}`}>
            <div className="flex items-center justify-between">
              <ShieldCheck size={18} className={done[i] ? 'text-cyber' : 'text-platinum/40'} />
              <span className="text-[10px] uppercase tracking-wider text-cyber/70">{s.pct}%</span>
            </div>
            <p className="font-bold text-platinum text-sm mt-2">{s.name}</p>
            <p className="text-[11px] text-platinum/60 mt-1">{s.desc}</p>
            <p className={`text-[10px] mt-2 font-semibold ${done[i] ? 'text-cyber' : 'text-platinum/40'}`}>{done[i] ? 'Released' : 'Pending'}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function FormsDesk() {
  const forms = [
    { name: 'Property Transfer Application', size: 'PDF · 180 KB' },
    { name: 'NDC Checklist (No Demand Certificate)', size: 'PDF · 120 KB' },
    { name: 'Affidavit Template (Ownership)', size: 'PDF · 95 KB' },
    { name: 'Authority Letter (Representative)', size: 'PDF · 110 KB' },
    { name: 'Escrow Milestone Agreement', size: 'PDF · 240 KB' },
    { name: 'Agent Onboarding Form', size: 'PDF · 150 KB' }
  ]
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {forms.map(f => (
        <div key={f.name} className="glass rounded-xl border border-cyber/15 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-cyber" size={20} />
            <div>
              <p className="text-sm text-platinum font-semibold">{f.name}</p>
              <p className="text-[10px] text-platinum/50">{f.size}</p>
            </div>
          </div>
          <button onClick={() => alert('Demo: in production this downloads the official template from Supabase Storage. Contact CEO 0321-9404812 for the live document.')}
            className="btn-ghost px-3 py-1.5 text-xs">Download</button>
        </div>
      ))}
    </div>
  )
}

function InquiryDesk() {
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const text = `Assalam-u-alaikum CEO Taha Mubeen Bhutta, my name is ${name || '[name]'}. ${msg || '[my inquiry]'} — via Bunyad.pk`
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="hud-label">Your Name</label>
          <input value={name} onChange={e => setName(e.target.value)}
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        </div>
        <div>
          <label className="hud-label">Your Inquiry</label>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4}
            className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
        </div>
      </div>
      <div className="glass rounded-xl border border-cyber/15 p-4 flex flex-col justify-between">
        <div>
          <p className="hud-label mb-2">Preview Message</p>
          <p className="text-[13px] text-platinum/80 leading-relaxed">{text}</p>
        </div>
        <a href={waLink(text)} target="_blank" rel="noreferrer" className="btn-cyber mt-4 flex items-center justify-center gap-2">
          <MessageCircle size={16} /> Send to CEO {CEO_PHONE}
        </a>
      </div>
    </div>
  )
}

export default memo(UtilitySuite)
