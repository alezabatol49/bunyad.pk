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
import { CEO_NAME, CEO_URDU, CEO_PHONE, HQ, waLink } from './data/societies.js'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)

  const handleDone = useCallback(() => setIntroDone(true), [])
  const replay = useCallback(() => { setIntroDone(false); setReplayKey(k => k + 1) }, [])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setSidebarOpen(false)
  }, [])

  const portalLiveUrl = "https://alezabatol49.github.io/bunyad.pk/"
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(portalLiveUrl)}&bgcolor=060b13&color=00f0ff&margin=2`

  return (
    <div className="relative min-h-screen bg-obsidian text-platinum selection:bg-cyber selection:text-obsidian font-sans">
      {/* Background Ambience */}
      <KineticBackground />

      {/* 3D Cinematic Construction Intro */}
      {!introDone && <CinematicIntro onDone={handleDone} replayKey={replayKey} />}

      {/* Live Market Rates Marquee */}
      <Ticker />

      {/* Main Glass HUD Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-cyber/20 backdrop-blur-md">
        <div className="px-4 md:px-8 py-2.5 flex items-center justify-between gap-3">
          
          {/* Single Clean Branding (No Double Logo) */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-xl bg-obsidian2 border border-cyber/50 hover:border-cyber text-cyber flex flex-col items-center justify-center gap-1 shadow-md shadow-cyber/20 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
              title="Open Master Slide Menu"
            >
              <span className="w-4 h-0.5 bg-cyber" />
              <span className="w-3 h-0.5 bg-cyber" />
              <span className="w-4 h-0.5 bg-cyber" />
            </button>

            <div className="min-w-0">
              <p className="font-display font-black text-platinum text-base leading-tight tracking-wide flex items-center gap-2">
                BUNYAD <span className="font-urdu text-cyber text-lg">بنیاد</span>
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-cyber/70 truncate font-mono">
                Bin Taha Associates & Builders • CEO Taha Mubeen Bhutta
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
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

          {/* Action Hub */}
          <div className="flex items-center gap-2">
            <AudioController />

            <button
              onClick={() => setAddPropOpen(true)}
              className="btn-cyber text-xs px-3 py-1.5 flex items-center gap-1.5 font-bold shadow-md shadow-cyber/20 cursor-pointer"
              title="Submit Property Listing"
            >
              <Plus size={13} /> <span className="hidden sm:inline">Add Property</span>
            </button>

            <button
              onClick={() => setQrOpen(true)}
              className="btn-ghost text-xs px-2.5 py-1.5 hidden sm:flex items-center gap-1 text-cyber cursor-pointer"
              title="Share QR Pass"
            >
              <span>📲 QR</span>
            </button>

            <button
              onClick={replay}
              className="btn-ghost text-xs px-2.5 py-1.5 hidden md:flex items-center gap-1 cursor-pointer"
              title="Replay 3D Intro"
            >
              <Zap size={13} /> <span className="hidden sm:inline">Replay</span>
            </button>

            <AuthHub />
            <AdminPanel />
          </div>
        </div>

        {/* Mobile Horizontal Bar */}
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

      {/* Slide-out Master Side Menu Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[150] flex">
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity"
          />
          <div className="relative w-80 sm:w-96 max-w-[85vw] h-full bg-obsidian2 border-r border-cyber/30 shadow-2xl p-6 z-10 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cyber/20 mb-5">
                <div>
                  <h3 className="font-display font-black text-platinum text-base">BUNYAD Portal</h3>
                  <p className="text-[10px] text-cyber font-mono font-bold">Master Navigation Desk</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-obsidian border border-cyber/30 text-platinum hover:text-cyber flex items-center justify-center text-sm font-mono cursor-pointer"
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
                    className="w-full p-3 rounded-xl glass border border-cyber/15 hover:border-cyber/60 hover:bg-cyber/10 text-left transition-all flex items-center gap-3 cursor-pointer group"
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
                href={waLink(CEO_PHONE, 'Assalam-o-Alaikum CEO Taha Mubeen Bhutta, connecting from BUNYAD Side Menu.')}
                target="_blank"
                rel="noreferrer"
                className="w-full block py-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500 text-emerald-300 font-bold text-xs hover:bg-emerald-600/50 transition-all text-center"
              >
                Direct WhatsApp CEO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Suite with Matched Component IDs */}
      <main className="relative z-10 space-y-12 pb-16">
        <div id="home">
          <HeroLead onOpenAddProperty={() => setAddPropOpen(true)} />
        </div>

        <div id="directory">
          <SocietyDirectory />
        </div>

        <div id="services">
          <ServicesSuite onInquire={() => scrollTo('home')} />
        </div>

        <div id="suite">
          <UtilitySuite />
        </div>

        <div id="lda-docs">
          <LDADocuments />
        </div>

        <div id="master-maps">
          <MasterMaps />
        </div>

        {/* CEO Admin Anchor */}
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

      {/* Property Modal */}
      <AddPropertyModal open={addPropOpen} onClose={() => setAddPropOpen(false)} />

      {/* Gemini AI LDA 2026 Consultant */}
      <AIConsultant />

      {/* Digital QR Pass Modal */}
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
                  alert('✅ پورٹل کا لنک کاپی ہو گیا!')
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
