import React, { memo } from 'react'
import { Calculator, Gavel, Layers, Wrench, ShieldCheck, MessageCircle, Send } from '../icons.jsx'
import { waLink, CEO_PHONE } from '../data/societies.js'

const SERVICES = [
  {
    id: 'valuation',
    title: 'Plot Valuation & DC Rates Audit',
    icon: Calculator,
    desc: 'Get a certified valuation of your plot with 2026 DC rate comparison, FBR valuation table lookup, and market-rate analysis — backed by Bin Taha Associates.',
    points: ['2026 DC Rate comparison', 'FBR valuation table', 'Market trend analysis', 'Certified valuation report']
  },
  {
    id: 'legal',
    title: 'LDA Legal & Registry Verification',
    icon: Gavel,
    desc: 'Full legal title verification, registry check, mutation status, and encumbrance-free certificate for any LDA-approved society.',
    points: ['Title & ownership verification', 'Mutation / Intiqal status', 'Encumbrance certificate', 'Registry legal opinion']
  },
  {
    id: 'planning',
    title: 'Layout & Master Planning',
    icon: Layers,
    desc: 'Architectural layout planning, LDA bylaw compliance, setback calculations, and master plan consultation for residential & commercial plots.',
    points: ['Floor plan & layout design', 'LDA setback compliance', 'Covered area calculation', 'Master plan consultation']
  },
  {
    id: 'construction',
    title: 'Construction & Engineering Consultation',
    icon: Wrench,
    desc: 'End-to-end civil construction supervision — foundation to handover — with structural engineering, material procurement, and escrow milestone protection.',
    points: ['Structural engineering', 'Gray structure to turnkey', 'Material procurement', 'Escrow milestone protection']
  },
  {
    id: 'escrow',
    title: 'Token Escrow Desk',
    icon: ShieldCheck,
    desc: 'Secure token deposit with milestone-based escrow release. Your funds are protected at every construction stage until final handover.',
    points: ['Milestone-based release', '100% fund protection', 'Stage verification by CEO', 'Refundable token policy']
  }
]

function ServicesSuite({ onInquire }) {
  return (
    <section id="services" className="px-4 md:px-8 py-10">
      <p className="hud-label">Module 03 · PropTech Services Suite</p>
      <h2 className="font-display text-2xl md:text-4xl font-black text-platinum mb-6">
        PropTech <span className="text-cyber">Services</span> & Real Estate Solutions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map(s => {
          const Icon = s.icon
          return (
            <div key={s.id} className="glass rounded-xl p-5 cyber-border hover-lift transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-lg bg-cyber/10 border border-cyber/30 flex items-center justify-center cyber-glow">
                  <Icon size={22} className="text-cyber" />
                </div>
              </div>
              <h3 className="font-bold text-platinum text-sm group-hover:text-cyber transition-colors">{s.title}</h3>
              <p className="text-[12px] text-platinum/60 mt-2 leading-relaxed">{s.desc}</p>
              <ul className="mt-3 space-y-1">
                {s.points.map(p => (
                  <li key={p} className="text-[11px] text-platinum/70 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cyber" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <button onClick={() => onInquire(s.title)} className="btn-cyber flex-1 text-xs flex items-center justify-center gap-1.5">
                  <Send size={13} /> Inquire
                </button>
                <a
                  href={waLink(`Assalam-u-alaikum CEO Taha Mubeen Bhutta, I want to book the "${s.title}" service via Bunyad.pk. Please share details.`)}
                  target="_blank" rel="noreferrer"
                  className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={13} /> Book
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default memo(ServicesSuite)
