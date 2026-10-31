import React, { useState, useCallback } from 'react'
import { Zap, Building2, Wrench, Shield, Home, Plus, Gavel, MapIcon } from './icons.jsx'
import KineticBackground from './components/KineticBackground.jsx'
import CinematicIntro from './components/CinematicIntro.jsx'
import Ticker from './components/Ticker.jsx'
import HeroLead from './components/HeroLead.jsx'
import SocietyDirectory from './components/SocietyDirectory.jsx'
import ServicesSuite from './components/ServicesSuite.jsx'
import UtilitySuite from './components/UtilitySuite.jsx'
import LDADocuments from './components/LDADocuments.jsx'
import MasterMaps from './components/MasterMaps.jsx'
import AddPropertyModal from './components/AddPropertyModal.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import AuthHub from './components/AuthHub.jsx'
import AudioController from './components/AudioController.jsx'
import AIConsultant from './components/AIConsultant.jsx'
import { CEO_NAME, CEO_URDU, CEO_PHONE, HQ } from './data/societies.js'

const NAV = [
  { id: 'home', label: 'Command', icon: Zap },
  { id: 'directory', label: 'Societies', icon: Building2 },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'suite', label: 'PropTech', icon: Wrench },
  { id: 'lda-docs', label: 'LDA Docs', icon: Gavel },
  { id: 'master-maps', label: 'Maps', icon: MapIcon },
  { id: 'admin', label: 'Admin', icon: Shield }
]

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const [addPropOpen, setAddPropOpen] = useState(false)

  const handleDone = useCallback(() => setIntroDone(true), [])
  const replay = useCallback(() => { setIntroDone(false); setReplayKey(k => k + 1) }, [])
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="relative min-h-screen text-platinum">
      <KineticBackground />

      {!introDone && <CinematicIntro onDone={handleDone} replayKey={replayKey} />}

      <Ticker />

      {/* HUD Top Navigation */}
      <header className="sticky top-0 z-50 glass-strong border-b border-cyber/20">
        <div className="px-4 md:px-8 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg cyber-border bg-obsidian2 flex items-center justify-center cyber-glow shrink-0">
              <div className="w-3 h-5 bg-gradient-to-b from-cyber to-cobalt" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-black text-platinum text-sm leading-tight tracking-wide">BUNYAD <span className="font-urdu text-cyber">بنیاد</span></p>
              <p className="text-[9px] uppercase tracking-[0.25em] text-cyber/60 truncate">Bin Taha Associates & Builders</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => {
              const Icon = n.icon
              return (
                <button key={n.id} onClick={() => scrollTo(n.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-platinum/70 hover:text-cyber hover:bg-cyber/10 transition-all">
                  <Icon size={13} /> {n.label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <AudioController />
            <button onClick={() => setAddPropOpen(true)} className="btn-cyber text-xs flex items-center gap-1.5" title="Submit Property Listing">
              <Plus size={13} /> <span className="hidden sm:inline">Submit Property</span>
            </button>
            <button onClick={replay} className="btn-ghost text-xs flex items-center gap-1.5" title="Replay Intro">
              <Zap size={13} /> <span className="hidden sm:inline">Replay</span>
            </button>
            <AuthHub />
            <AdminPanel />
          </div>
        </div>
        {/* mobile nav */}
        <div className="md:hidden flex items-center gap-1 px-3 pb-2 overflow-x-auto">
          {NAV.map(n => {
            const Icon = n.icon
            return (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-platinum/70 hover:text-cyber hover:bg-cyber/10 transition-all whitespace-nowrap">
                <Icon size={12} /> {n.label}
              </button>
            )
          })}
        </div>
      </header>

      <main className="relative z-10">
        <HeroLead />
        <SocietyDirectory />
        <ServicesSuite onInquire={(title) => scrollTo('home')} />
        <UtilitySuite />
        <LDADocuments />
        <MasterMaps />

        {/* Admin anchor (button is in header; this is a landing zone) */}
        <section id="admin" className="px-4 md:px-8 py-12">
          <div className="glass-strong rounded-2xl cyber-border p-6 text-center">
            <Shield className="mx-auto text-cyber" size={32} />
            <h2 className="font-display text-xl md:text-2xl font-bold text-platinum mt-3">Executive Admin & CRM Console</h2>
            <p className="text-platinum/60 text-sm mt-2 max-w-xl mx-auto">
              Secure PIN-gated dashboard for CEO {CEO_NAME} ({CEO_URDU}) — lead manager, CRM pipeline, inventory, material rates & agent portal. Tap "CEO Admin" in the top navigation.
            </p>
            <p className="text-[11px] text-cyber/70 mt-3">Headquarters: {HQ} · Direct: {CEO_PHONE}</p>
          </div>
        </section>

        <footer className="border-t border-cyber/15 px-4 md:px-8 py-8 text-center">
          <p className="font-display font-black text-platinum">BUNYAD <span className="font-urdu text-cyber">بنیاد</span></p>
          <p className="text-[11px] text-platinum/50 mt-1">Powered by Bin Taha Associates & Builders · بن طہٰ ایسوسی ایٹس</p>
          <p className="text-[11px] text-platinum/50 mt-1">CEO {CEO_NAME} ({CEO_URDU}) · {CEO_PHONE} · {HQ}</p>
          <p className="text-[10px] text-platinum/30 mt-3">© 2026 Bunyad.pk · PropTech HUD Command Center</p>
        </footer>
      </main>

      <AddPropertyModal open={addPropOpen} onClose={() => setAddPropOpen(false)} />
      <AIConsultant />
    </div>
  )
}
