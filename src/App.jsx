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
import { CEO_NAME, CEO_URDU, CEO_PHONE, HQ, waLink } from './data/societies.js'

const NAV = [
  { id: 'hero-lead', label: 'Command', icon: Zap },
  { id: 'societies-directory', label: '38 Societies', icon: Building2 },
  { id: 'services-suite', label: 'Services', icon: Wrench },
  { id: 'utility-suite', label: 'PropTech Valuation', icon: Wrench },
  { id: 'lda-documents', label: 'LDA Docs Hub', icon: Gavel },
  { id: 'master-maps', label: 'Avenue 1 Maps', icon: MapIcon },
  { id: 'admin', label: 'CEO Desk', icon: Shield }
]

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const [addPropOpen, setAddPropOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)

  const handleDone = useCallback(() => setIntroDone(true), [])
  const replay = useCallback(() => { setIntroDone(false); setReplayKey(k => k + 1) }, [])

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setSidebarOpen(false)
  }, [])

  const portalLiveUrl = "https://alezabatol49.github.io/bunyad.pk/"
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(portalLiveUrl)}&bgcolor=060b13&color=00f0ff&margin=2`

  return (
    <div className="relative min-h-screen bg-obsidian text-platinum selection:bg-cyber selection:text-obsidian">
      {/* Dynamic Animated Ambience */}
      <KineticBackground />

      {/* 3D Cinematic Construction Genesis Intro */}
      {!introDone && <CinematicIntro onDone={handleDone} replayKey={replayKey} />}

      {/* Live Market Marquee Rates */}
      <Ticker />

      {/* Main Glass HUD Top Navigation */}
      <header className="sticky top-0 z-50 glass-strong border-b border-cyber/20 backdrop-blur-md">
        <div className="px-4 md:px-8 py-2.5 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger Button for Master Slide Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-xl bg-obsidian2 border border-cyber/50 hover:border-cyber text-cyber flex flex-col items-center justify-center gap-1 shadow-lg shadow-cyber/20 transition-all hover:scale-105 active:scale-95 shrink-0"
              title="Open Master Navigation Desk"
            >
              <span className="w-4 h-0.5 bg-cyber" />
              <span className="w-3.5 h-0.5 bg-cyber" />
              <span className="w-4 h-0.5 bg-cyber" />
            </button>

            <div className="w-9 h-9 rounded-xl cyber-border bg-obsidian2 flex items-center justify-center cyber-glow shrink-0 p-1">
              <img src="/bunyad.pk/bunyad-favicon.svg" alt="BUNYAD" className="w-full h-full object-contain" onError={(e) => { e.target.src = '/bunyad-favicon.svg' }} />
            </div>

            <div className="min-w-0">
              <p className="font-display font-black text-platinum text-sm leading-tight tracking-wide flex items-center gap-2">
                BUNYAD <span className="font-urdu text-cyber text-base">بنیاد</span>
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-cyber/70 truncate font-mono">
                Bin Taha Associates & Builders • CEO Taha Mubeen Bhutta
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(n => {
              const Icon = n.icon
              return (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-platinum/70 hover:text-cyber hover:bg-cyber/10 transition-all"
                >
                  <Icon size={13} /> {n.label}
                </button>
              )
            })}
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-2">
            <AudioController />
            
            <button
              onClick={() => setAddPropOpen(true)}
              className="btn-cyber text-xs px-3 py-1.5 flex items-center gap-1.5 font-bold shadow-md shadow-cyber/20"
              title="Submit Property Listing"
            >
              <Plus size={13} /> <span className="hidden sm:inline">Add Property</span>
            </button>

            <button
              onClick={() => setQrOpen(true)}
              className="btn-ghost text-xs px-2.5 py-1.5 hidden sm:flex items-center gap-1 text-cyber"
              title="Share / Mobile Scan QR Pass"
            >
              <span>📲 QR</span>
            </button>

            <button
              onClick={replay}
              className="btn-ghost text-xs px-2.5 py-1.5 hidden md:flex items-center gap-1"
              title="Replay 3D Intro"
            >
              <Zap size={13} /> <span className="hidden sm:inline">Replay</span>
            </button>

            {/* Auth Portal (Sign In & Sign Up) */}
            <AuthHub />

            {/* CEO Admin PIN Console */}
            <AdminPanel />
          </div>
        </div>

        {/* Mobile Horizontal Quick Navigation */}
        <div className="lg:hidden flex items-center gap-1 px-3 pb-2 overflow-x-auto border-t border-cyber/10 pt-1.5">
          {NAV.map(n => {
            const Icon = n.icon
            return (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-platinum/70 hover:text-cyber hover:bg-cyber/10 transition-all whitespace-nowrap"
              >
                <Icon size={12} /> {n.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* Slide-out Master Side Menu Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[140] flex">
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity"
          />
          <div className="relative w-80 sm:w-96 max-w-[85vw] h-full bg-obsidian2 border-r border-cyber/30 shadow-2xl p-6 z-10 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cyber/20 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-obsidian border border-cyber flex items-center justify-center p-1 text-cyber font-bold shadow-md shadow-cyber/30">
                    B
                  </div>
                  <div>
                    <h3 className="font-display font-black text-platinum text-base">BUNYAD Portal</h3>
                    <p className="text-[10px] text-cyber font-mono font-bold">One-Click Navigation Desk</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-obsidian border border-cyber/30 text-platinum hover:text-cyber flex items-center justify-center text-sm font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-[10px] uppercase font-mono tracking-widest text-cyber/80 font-bold px-1 mb-2">
                  Portal Modules (ایک کلک پر تمام شعبہ جات):
                </p>
                {NAV.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="w-full p-3 rounded-xl glass border border-cyber/15 hover:border-cyber/60 hover:bg-cyber/10 text-left transition-all flex items-center gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-platinum group-hover:text-cyber transition-colors">
                        {item.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-cyber/20 text-center space-y-2">
              <p className="text-xs font-bold text-platinum">CEO {CEO_NAME} ({CEO_URDU})</p>
              <p className="text-[11px] text-cyber font-mono font-bold">Direct: {CEO_PHONE}</p>
              <a
                href={waLink(CEO_PHONE, 'Assalam-o-Alaikum CEO Taha Mubeen Bhutta, connecting from BUNYAD Master Side Menu.')}
                target="_blank"
                rel="noreferrer"
                className="w-full block py-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500 text-emerald-300 font-bold text-xs hover:bg-emerald-600/50 transition-all"
              >
                Direct WhatsApp CEO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Body Suite */}
      <main className="relative z-10 space-y-12 pb-16">
        <section id="hero-lead">
          <HeroLead onOpenAddProperty={() => setAddPropOpen(true)} />
        </section>

        <section id="societies-directory">
          <SocietyDirectory />
        </section>

        <section id="services-suite">
          <ServicesSuite onInquire={(title) => scrollTo('hero-lead')} />
        </section>

        <section id="utility-suite">
          <UtilitySuite />
        </section>

        <section id="lda-documents">
          <LDADocuments />
        </section>

        <section id="master-maps">
          <MasterMaps />
        </section>

        {/* CEO Executive Desk Landing Anchor */}
        <section id="admin" className="px-4 md:px-8 py-12">
          <div className="glass-strong rounded-2xl cyber-border p-6 text-center max-w-3xl mx-auto">
            <Shield className="mx-auto text-cyber" size={32} />
            <h2 className="font-display text-xl md:text-2xl font-bold text-platinum mt-3">
              Executive Admin & CRM Console
            </h2>
            <p className="text-platinum/60 text-sm mt-2 max-w-xl mx-auto">
              Secure PIN-gated dashboard for CEO {CEO_NAME} ({CEO_URDU}) — lead manager, CRM pipeline, inventory, material rates & authorized dealer portal.
            </p>
            <p className="text-[11px] text-cyber/70 mt-3 font-mono">
              Headquarters: {HQ} · Direct: {CEO_PHONE}
            </p>
          </div>
        </section>

        {/* Global Footer */}
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

      {/* Global Property Modal */}
      <AddPropertyModal open={addPropOpen} onClose={() => setAddPropOpen(false)} />

      {/* Gemini AI LDA 2026 Consultant Assistant */}
      <AIConsultant />

      {/* QR Code Pass Modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
          <div className="glass-strong rounded-3xl cyber-border p-6 sm:p-8 max-w-sm w-full text-center relative">
            <button
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 text-platinum/60 hover:text-cyber text-sm font-mono"
            >
              [ESC]
            </button>
            <div className="w-12 h-12 rounded-2xl bg-cyber/10 border border-cyber mx-auto flex items-center justify-center text-cyber text-xl mb-3 shadow-lg shadow-cyber/30">
              ⚡
            </div>
            <h3 className="text-lg font-black text-platinum font-display mb-1">
              BUNYAD Digital QR Pass
            </h3>
            <p className="text-xs text-platinum/70 mb-5">
              اسمارٹ فون سے اسکین کر کے براہِ راست پورٹل اور ایل ڈی اے ڈیٹا بیس تک رسائی حاصل کریں۔
            </p>
            <div className="bg-obsidian2 p-4 rounded-2xl border border-cyber/30 inline-block mb-4 shadow-inner">
              <img src={qrCodeImageUrl} alt="BUNYAD QR Code" className="w-56 h-56 mx-auto rounded-lg" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(portalLiveUrl);
                  alert('✅ پورٹل کا لنک کاپی ہو گیا!');
                }}
                className="btn-cyber w-full py-2.5 text-xs font-bold"
              >
                Copy Link
              </button>
              <button
                onClick={() => setQrOpen(false)}
                className="btn-ghost w-full py-2.5 text-xs font-bold"
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
