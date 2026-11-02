import React, { memo } from 'react'
import { FileText, Download, Gavel, CheckCircle2 } from '../icons.jsx'
import { CEO_PHONE } from '../data/societies.js'

const LDA_FORMS = [
  {
    id: 'transfer',
    name: 'Transfer Application Form (Intiqal)',
    desc: 'Official LDA form for property ownership transfer / mutation.',
    size: 'PDF · 220 KB',
    category: 'Transfer'
  },
  {
    id: 'possession',
    name: 'Possession Application Form',
    desc: 'Apply for physical possession of allotted plot in LDA schemes.',
    size: 'PDF · 160 KB',
    category: 'Possession'
  },
  {
    id: 'noc',
    name: 'NOC Verification Form',
    desc: 'Request No Objection Certificate verification for any LDA-approved society.',
    size: 'PDF · 140 KB',
    category: 'Verification'
  },
  {
    id: 'ndc',
    name: 'NDC Form (No Demand Certificate)',
    desc: 'Apply for No Demand Certificate — confirms all dues cleared before transfer.',
    size: 'PDF · 130 KB',
    category: 'Dues'
  },
  {
    id: 'duplicate',
    name: 'Duplicate Allotment Letter Undertaking',
    desc: 'Undertaking affidavit for issuance of duplicate allotment letter.',
    size: 'PDF · 110 KB',
    category: 'Allotment'
  },
  {
    id: 'siteplan',
    name: 'Site Plan Requisition',
    desc: 'Request official site plan / layout plan for a specific block or sector.',
    size: 'PDF · 190 KB',
    category: 'Planning'
  },
  {
    id: 'mutation',
    name: 'Mutation / Transfer Fee Deposit Slip',
    desc: 'Standard deposit slip for LDA mutation and transfer fee payment.',
    size: 'PDF · 95 KB',
    category: 'Transfer'
  },
  {
    id: 'affidavit',
    name: 'Ownership Affidavit Template',
    desc: 'Sworn affidavit template declaring ownership and title of property.',
    size: 'PDF · 100 KB',
    category: 'Legal'
  }
]

const CATEGORIES = ['All', 'Transfer', 'Possession', 'Verification', 'Dues', 'Allotment', 'Planning', 'Legal']

function LDADocuments() {
  return (
    <section id="lda-docs" className="px-4 md:px-8 py-10">
      <p className="hud-label">Module 08 · LDA Forms & Legal Documents Hub</p>
      <h2 className="font-display text-2xl md:text-4xl font-black text-platinum mb-2">
        Official <span className="text-cyber">LDA</span> Forms & Legal Documents
      </h2>
      <p className="text-platinum/60 text-sm mb-6">Download standardized LDA forms for transfer, possession, NOC, NDC and more. All forms reviewed by Bin Taha Associates legal desk.</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map(c => (
          <span key={c} className="text-[11px] px-3 py-1.5 rounded-full border border-cyber/20 text-platinum/70 bg-obsidian2/50">
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {LDA_FORMS.map(f => (
          <div key={f.id} className="glass rounded-xl p-4 border border-cyber/15 hover-lift transition-all group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyber/10 border border-cyber/30 flex items-center justify-center shrink-0">
                <FileText size={18} className="text-cyber" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-platinum text-[13px] leading-tight group-hover:text-cyber transition-colors">{f.name}</h3>
                <span className="text-[10px] text-cyber/60 uppercase tracking-wider">{f.category}</span>
              </div>
            </div>
            <p className="text-[11px] text-platinum/60 leading-relaxed mb-3">{f.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-platinum/40">{f.size}</span>
              <button
                onClick={() => alert(`Downloading ${f.name}…\n\nIn production, this fetches the official PDF template from Supabase Storage. Contact CEO ${CEO_PHONE} for the live stamped document.`)}
                className="btn-ghost text-[11px] px-3 py-1.5 flex items-center gap-1.5"
              >
                <Download size={13} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 glass-strong rounded-xl cyber-border p-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-cyber/10 border border-cyber/30 flex items-center justify-center shrink-0">
          <Gavel size={24} className="text-cyber" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-platinum font-semibold">Need help filling out LDA forms?</p>
          <p className="text-[12px] text-platinum/60 mt-1">Our legal desk assists with form filling, submission, and follow-up at the LDA office. CEO {CEO_PHONE} personally oversees every case.</p>
        </div>
        <a href={`https://wa.me/923219404812?text=${encodeURIComponent('Assalam-u-alaikum CEO Taha Mubeen Bhutta, I need help with LDA forms via Bunyad.pk.')}`} target="_blank" rel="noreferrer"
          className="btn-cyber text-xs flex items-center gap-2 shrink-0">
          <CheckCircle2 size={14} /> Request Legal Help
        </a>
      </div>
    </section>
  )
}

export default memo(LDADocuments)
