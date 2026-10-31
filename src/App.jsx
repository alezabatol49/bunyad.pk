import React, { useState } from 'react';
import Ticker from './components/Ticker.jsx';
import HeroLead from './components/HeroLead.jsx';
import SocietyDirectory from './components/SocietyDirectory.jsx';
import UtilitySuite from './components/UtilitySuite.jsx';
import LDADocuments from './components/LDADocuments.jsx';
import MasterMaps from './components/MasterMaps.jsx';
import ServicesSuite from './components/ServicesSuite.jsx';
import AddPropertyModal from './components/AddPropertyModal.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import AuthHub from './components/AuthHub.jsx';
import AudioController from './components/AudioController.jsx';
import KineticBackground from './components/KineticBackground.jsx';
import CinematicIntro from './components/CinematicIntro.jsx';
import { CEO_PHONE, waLink } from './data/societies.js';

export default function App() {
  const [introOpen, setIntroOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(false);
  };

  const portalLiveUrl = "https://bintahaassociates.github.io/bunyad/";
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(portalLiveUrl)}&bgcolor=060b13&color=00f0ff&margin=2`;

  const MENU_ITEMS = [
    { id: 'hero-lead', label: 'Command Deck (مرکزی کنٹرول روم)', icon: '⚡', desc: 'Overview, Rates & Booking Desk' },
    { id: 'master-maps', label: 'LDA Avenue 1 Maps (سیکٹر نقشہ جات)', icon: '🗺️', desc: 'Interactive Block-wise Master Plan' },
    { id: 'lda-documents', label: 'LDA Forms Hub (سرکاری دستاویزات)', icon: '📑', desc: '18 Official Verification & Transfer Forms' },
    { id: 'services-suite', label: 'PropTech Services (تعمیرات و قانونی خدمات)', icon: '🏗️', desc: 'PEC Category-C Builds & Valuation' },
    { id: 'societies-directory', label: 'Lahore Societies (سوسائٹیز ڈائریکٹری)', icon: '🏙️', desc: '38+ Verified Societies with 2026 DC Rates' },
    { id: 'utility-suite', label: 'Valuation & Escrow (محفوظ ایسکرو و ٹیکس)', icon: '📊', desc: 'FBR Tax Calculator & Construction Estimator' }
  ];

  return (
    <div className="min-h-screen bg-obsidian text-platinum font-sans relative selection:bg-cyber selection:text-obsidian">
      {/* 1. Cinematic 3D Architectural Genesis Intro Screen */}
      {introOpen && (
        <CinematicIntro onDone={() => setIntroOpen(false)} />
      )}

      {/* Background Ambience */}
      <KineticBackground />

      {/* Top Live Rates Marquee */}
      <Ticker />

      {/* Main HUD Top Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-cyber/20 px-4 sm:px-8 py-3 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Brand + Mobile/Desktop Hamburger Button */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              {/* Premium Side Menu Bar Trigger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 rounded-xl bg-obsidian2 border border-cyber/50 hover:border-cyber text-cyber flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-cyber/20 transition-all hover:scale-105 active:scale-95 group"
                title="Open Master Navigation Desk (مکمل سائیڈ مینو بار)"
              >
                <span className="w-5 h-0.5 bg-cyber group-hover:w-6 transition-all" />
                <span className="w-4 h-0.5 bg-cyber group-hover:w-6 transition-all" />
                <span className="w-5 h-0.5 bg-cyber group-hover:w-6 transition-all" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-obsidian2 border border-cyber/40 flex items-center justify-center p-1 shadow-lg shadow-cyber/20 shrink-0">
                <img src="/bunyad-favicon.svg" alt="BUNYAD" className="w-full h-full object-contain" />
              </div>

              <div>
                <h1 className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-platinum flex items-center gap-2">
                  BUNYAD <span className="text-cyber text-base font-arabic">بنیاد</span>
                </h1>
                <p className="text-[10px] text-platinum/60 font-mono">
                  Powered by Bin Taha Associates & Builders • CEO Taha Mubeen Bhutta
                </p>
              </div>
            </div>

            {/* Quick Menu Button for Small Devices */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden btn-cyber px-2.5 py-1 text-xs font-bold"
            >
              Menu
            </button>
          </div>

          {/* Navigation Links & Action Hub */}
          <nav className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center text-xs font-semibold">
            <button onClick={() => scrollTo('hero-lead')} className="btn-ghost px-2.5 py-1.5">
              Command
            </button>
            <button onClick={() => scrollTo('societies-directory')} className="btn-ghost px-2.5 py-1.5">
              Societies
            </button>
            <button onClick={() => scrollTo('master-maps')} className="btn-ghost px-2.5 py-1.5">
              Maps
            </button>
            <button onClick={() => scrollTo('lda-documents')} className="btn-ghost px-2.5 py-1.5">
              LDA Forms
            </button>
            <button onClick={() => scrollTo('services-suite')} className="btn-ghost px-2.5 py-1.5">
              Services
            </button>
            <button onClick={() => scrollTo('utility-suite')} className="btn-ghost px-2.5 py-1.5">
              Valuation
            </button>
            <button
              onClick={() => setAddPropertyOpen(true)}
              className="btn-cyber px-3 py-1.5 font-bold shadow-md shadow-cyber/20"
            >
              + Add Property
            </button>
            {/* Digital QR Pass Button */}
            <button
              onClick={() => setQrOpen(true)}
              className="btn-ghost px-2.5 py-1.5 flex items-center gap-1 text-cyber hover:bg-cyber/15"
              title="Share / Mobile Scan QR Pass"
            >
              <span>📲 QR Pass</span>
            </button>
            {/* Live Client Auth Portal */}
            <AuthHub />
            {/* CEO Secure Management Desk */}
            <AdminPanel />
          </nav>
        </div>
      </header>

      {/* 2. Slide-out Master Side Menu Drawer (بڑی ویب سائٹس کی طرح مکمل سائیڈ مینو بار) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[140] flex">
          {/* Backdrop Blur Layer */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity"
          />

          {/* Left Side Drawer Menu */}
          <div className="relative w-80 sm:w-96 max-w-[85vw] h-full bg-obsidian2 border-r border-cyber/30 shadow-2xl shadow-cyber/20 flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-cyber/20 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-obsidian border border-cyber flex items-center justify-center p-1 shadow-md shadow-cyber/30">
                    <img src="/bunyad-favicon.svg" alt="BUNYAD" className="w-full h-full object-contain" />
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

              {/* Master Click Navigation Items */}
              <div className="space-y-2 mb-6">
                <p className="text-[10px] uppercase font-mono tracking-widest text-cyber/80 font-bold px-1 mb-2">
                  Portal Modules (ایک کلک پر تمام شعبہ جات):
                </p>
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="w-full p-3 rounded-xl glass border border-cyber/15 hover:border-cyber/60 hover:bg-cyber/10 text-left transition-all flex items-center gap-3.5 group"
                  >
                    <span className="text-xl p-2 rounded-lg bg-obsidian border border-cyber/20 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-platinum group-hover:text-cyber transition-colors">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-platinum/50 truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Instant Actions Grid */}
              <div className="space-y-2 pt-2 border-t border-cyber/15">
                <p className="text-[10px] uppercase font-mono tracking-widest text-cyber/80 font-bold px-1 mb-1">
                  Instant Operations:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setSidebarOpen(false); setAddPropertyOpen(true); }}
                    className="btn-cyber py-2.5 text-xs text-center font-bold"
                  >
                    + Add Property
                  </button>
                  <button
                    onClick={() => { setSidebarOpen(false); setQrOpen(true); }}
                    className="btn-ghost py-2.5 text-xs text-center font-bold"
                  >
                    📲 QR Pass
                  </button>
                </div>
              </div>
            </div>

            {/* Side Menu Footer Info */}
            <div className="pt-6 border-t border-cyber/20 text-center space-y-2">
              <p className="text-xs font-bold text-platinum">
                CEO Taha Mubeen Bhutta
              </p>
              <p className="text-[11px] text-cyber font-mono font-bold">
                Direct: 0321-9404812
              </p>
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

      {/* Main Content Suite */}
      <main className="space-y-12 pb-16">
        <HeroLead onOpenAddProperty={() => setAddPropertyOpen(true)} />
        <ServicesSuite />
        <MasterMaps />
        <LDADocuments />
        <SocietyDirectory />
        <UtilitySuite />
      </main>

      {/* Floating Audio Ambient Controller */}
      <AudioController />

      {/* Global Add Property Modal */}
      <AddPropertyModal
        open={addPropertyOpen}
        onClose={() => setAddPropertyOpen(false)}
      />

      {/* QR Code Share Pass Modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
          <div className="glass-strong rounded-3xl cyber-border p-6 sm:p-8 max-w-sm w-full text-center relative animate-scale-in">
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
              <img
                src={qrCodeImageUrl}
                alt="BUNYAD QR Code"
                className="w-56 h-56 mx-auto rounded-lg"
              />
            </div>

            <p className="text-[11px] font-mono text-cyber mb-4">
              bintahaassociates.github.io/bunyad/
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(portalLiveUrl);
                  alert('✅ پورٹل کا لنک کامیابی سے کاپی ہو گیا!');
                }}
                className="btn-cyber w-full py-2.5 text-xs font-bold"
              >
                Copy Web Link
              </button>
              <button
                onClick={() => setQrOpen(false)}
                className="btn-ghost w-full py-2.5 text-xs font-bold text-platinum/80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="glass-strong border-t border-cyber/20 py-10 px-4 text-center text-xs text-platinum/60 space-y-4">
        <div className="flex items-center justify-center gap-2 text-cyber font-mono font-bold">
          <span>Bin Taha Associates & Builders</span> • <span>PEC Category-C & FBR Verified</span>
        </div>
        <p className="max-w-xl mx-auto">
          Executive Office: Sector J, Main Boulevard, LDA Avenue 1, Raiwind Road, Lahore. Supervised directly by CEO Taha Mubeen Bhutta.
        </p>
        <div className="flex items-center justify-center gap-4 text-platinum/80 pt-2 font-mono">
          <a href={`tel:${CEO_PHONE}`} className="hover:text-cyber">
            Phone: 0321-9404812
          </a>
          <span>•</span>
          <a href="mailto:bintahacrm@gmail.com" className="hover:text-cyber">
            bintahacrm@gmail.com
          </a>
          <span>•</span>
          <a
            href={waLink(CEO_PHONE, 'Assalam-o-Alaikum CEO Taha Mubeen Bhutta, inquiring from BUNYAD PropTech Portal.')}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:underline"
          >
            Direct WhatsApp
          </a>
        </div>
        <p className="text-[10px] text-platinum/40 pt-4">
          © 2026 BUNYAD PropTech HUD Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
