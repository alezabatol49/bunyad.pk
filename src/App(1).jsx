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
import { CEO_PHONE, waLink } from './data/societies.js';

export default function App() {
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const portalLiveUrl = "https://bintahaassociates.github.io/bunyad/";
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(portalLiveUrl)}&bgcolor=060b13&color=00f0ff&margin=2`;

  return (
    <div className="min-h-screen bg-obsidian text-platinum font-sans relative selection:bg-cyber selection:text-obsidian">
      {/* Background Ambience */}
      <KineticBackground />

      {/* Top Live Rates Marquee */}
      <Ticker />

      {/* Main HUD Top Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-cyber/20 px-4 sm:px-8 py-3 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
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
            {/* Live Client Auth Portal (Sign In / Sign Up to Supabase) */}
            <AuthHub />
            {/* CEO Secure Management Desk */}
            <AdminPanel />
          </nav>
        </div>
      </header>

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

            {/* QR Visual Canvas */}
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
