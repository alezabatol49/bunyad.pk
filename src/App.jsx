import React, { useState, useCallback } from 'react'
import { Zap, Building2, Wrench, Shield, Plus, Gavel, MapIcon } from './icons.jsx'
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
  { id: 'directory', label: '38 Societies', icon: Building2 },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'suite', label: 'PropTech Valuation', icon: Wrench },
  { id: 'lda-docs', label: 'LDA Docs Hub', icon: Gavel },
  { id: 'master-maps', label: 'Avenue 1 Maps', icon: MapIcon },
  { id: 'admin', label: 'CEO Desk', icon: Shield }
]

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const [addPropOpen, setAddPropOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)

  const handleDone = useCallback(() => setIntroDone(true), [])
  const replay = useCallback(() => { setIntroDone(false); setReplayKey(k => k + 1) }, [])

  // Smooth scroll with sticky header offset so buttons work 100%
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      const headerOffset = 90
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const portalLiveUrl = "https://alezabatol49.github.io/bunyad.pk/"
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(portalLiveUrl)}&bgcolor=060b13&color=00f0ff&margin=2`

  return (
    <div className="relative min-h-screen bg-obsidian text-platinum selection:bg-cyber selection:text-obsidian font-sans">
      
      {/* Background with strictly disabled pointer events so clicks pass through to buttons */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <KineticBackground />
      </div>

      {!introDone && <CinematicIntro onDone={handleDone} replayKey={replayKey} />}

      <div className="relative z-40">
        <Ticker />
      </div>

      {/* Header with compact logo and clean layout */}
      <header className="sticky top-0 z-50 glass-strong border-b border-cyber/20 backdrop-blur-md">
        <div className="px-4 md:px-8 py-2.5 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 min-w-0">
            {/* Clean compact logo without black box bug */}
            <div className="w-10 h-10 rounded-xl bg-obsidian2 border border-cyber/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
              <span className="font-display font-black text-cyber text-lg tracking-wider">B</span>
            </div>

            <div className="min-w-0">
              <p className="font-display font-black text-platinum text-base leading-tight tracking-wide flex items-center gap-2">
                BUNYAD <span className="font-urdu text-cyber text-lg">بنیاد</span>
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-cyber/70 truncate font-mono">
                Bin Taha Associates & Builders • CEO Taha Mubeen Bhutta
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(n => {
              const Icon = n.icon
              return (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-platinum/70 hover:text-cyber hover:bg-cyber/10 transition-all cursor-pointer"
                >
                  <Icon size={13} /> {n.label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <AudioController />

            <button
              onClick={() => setAddPropOpen(true)}
              className="btn-cyber text-xs px-3 py-1.5 flex items-center gap-1.5 font-bold shadow-md shadow-cyber/20 cursor-pointer"
            >
              <Plus size={13} /> <span className="hidden sm:inline">Add Property</span>
            </button>

            <button
              onClick={() => setQrOpen(true)}
              className="btn-ghost text-xs px-2.5 py-1.5 hidden sm:flex items-center gap-1 text-cyber cursor-pointer"
            >
              <span>📲 QR</span>
            </button>

            <button
              onClick={replay}
              className="btn-ghost text-xs px-2.5 py-1.5 hidden md:flex items-center gap-1 cursor-pointer"
            >
              <Zap size={13} /> <span className="hidden sm:inline">Replay</span>
            </button>

            <AuthHub />
            <AdminPanel />
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-1 px-3 pb-2 overflow-x-auto border-t border-cyber/10 pt-1.5">
          {NAV.map(n => {
            const Icon = n.icon
            return (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-platinum/70 hover:text-cyber hover:bg-cyber/10 transition-all whitespace-nowrap cursor-pointer"
              >
                <Icon size={12} /> {n.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* Main Content Area with enabled clicks and correct Z-indexing */}
      <main className="relative z-10 space-y-12 pb-16">
        <div id="home" className="pt-2">
          <HeroLead onOpenAddProperty={() => setAddPropOpen(true)} />
        </div>

        <div id="directory" className="pt-2">
          <SocietyDirectory />
        </div>

        <div id="services" className="pt-2">
          <ServicesSuite onInquire={() => scrollTo('home')} />
        </div>

        <div id="suite" className="pt-2">
          <UtilitySuite />
        </div>

        <div id="lda-docs" className="pt-2">
          <LDADocuments />
        </div>

        <div id="master-maps" className="pt-2">
          <MasterMaps />
        </div>

        <div id="admin" className="px-4 md:px-8 py-12">
          <div className="glass-strong rounded-2xl cyber-border p-6 text-center max-w-3xl mx-auto">
            <Shield className="mx-auto text-cyber" size={32} />
            <h2 className="font-display text-xl md:text-2xl font-bold text-platinum mt-3">
              Executive Admin & CRM Console
            </h2>
            <p className="text-platinum/60 text-sm mt-2 max-w-xl mx-auto">
              Secure PIN-gated dashboard for CEO {CEO_NAME} ({CEO_URDU}) — lead manager, CRM pipeline, inventory & material rates.
            </p>
            <p className="text-[11px] text-cyber/70 mt-3 font-mono">
              Headquarters: {HQ} · Direct: {CEO_PHONE}
            </p>
          </div>
        </div>

        <footer className="border-t border-cyber/15 px-4 md:px-8 py-8 text-center glass-strong">
          <p className="font-display font-black text-platinum text-base">
            BUNYAD <span className="font-urdu text-cyber text-xl">بنیاد</span>
          </p>
          <p className="text-[11px] text-platinum/50 mt-1">
            Powered by Bin Taha Associates & Builders · بن طہٰ ایسوسی ایٹس
          </p>
          <p className="text-[11px] text-platinum/50 mt-1">
            CEO {CEO_NAME} ({CEO_URDU}) · {CEO_PHONE} · {HQ}
          </p>
          <p className="text-[10px] text-platinum/30 mt-3 font-mono">
            © 2026 Bunyad.pk · PropTech HUD Command Center
          </p>
        </footer>
      </main>

      <AddPropertyModal open={addPropOpen} onClose={() => setAddPropOpen(false)} />
      <AIConsultant />

      {qrOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
          <div className="glass-strong rounded-3xl cyber-border p-6 sm:p-8 max-w-sm w-full text-center relative">
            <button
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 text-platinum/60 hover:text-cyber text-sm font-mono cursor-pointer"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-cyber/10 border border-cyber mx-auto flex items-center justify-center text-cyber text-xl mb-3 shadow-lg shadow-cyber/30">
              ⚡
            </div>
            <h3 className="text-lg font-black text-platinum font-display mb-1">
              BUNYAD Digital QR Pass
            </h3>
            <p className="text-xs text-platinum/70 mb-5">
              موبائل سے اسکین کر کے پورٹل اور ایل ڈی اے ڈیٹا بیس تک رسائی حاصل کریں۔
            </p>
            <div className="bg-obsidian2 p-4 rounded-2xl border border-cyber/30 inline-block mb-4 shadow-inner">
              <img src={qrCodeImageUrl} alt="BUNYAD QR Code" className="w-56 h-56 mx-auto rounded-lg" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(portalLiveUrl)
                  alert('پورٹل کا لنک کاپی ہو گیا!')
                }}
                className="btn-cyber w-full py-2.5 text-xs font-bold cursor-pointer"
              >
                Copy Link
              </button>
              <button
                onClick={() => setQrOpen(false)}
                className="btn-ghost w-full py-2.5 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
