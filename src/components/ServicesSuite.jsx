import React from 'react';
import { CEO_PHONE, waLink } from '../data/societies.js';

const SERVICES = [
  {
    id: 'dc-valuation',
    title: 'Plot Valuation & DC Rates Audit',
    urduTitle: 'پلاٹ کی درست ویلیویشن و ڈی سی ریٹس آڈٹ',
    desc: 'Government DC rates vs actual market trend assessment, FBR tax computation (236-C / 236-K) for buyers and sellers.',
    badge: 'FBR & Revenue Verified',
    icon: '📊'
  },
  {
    id: 'lda-legal',
    title: 'LDA Legal & Registry Verification',
    urduTitle: 'ایل ڈی اے لیگل ریکارڈ و رجسٹری تصدیق',
    desc: 'One-window document verification, title deed search, stay order investigation, and litigation-free clearance.',
    badge: '100% Legal Safeguard',
    icon: '⚖️'
  },
  {
    id: 'construction',
    title: 'Civil Construction & Turnkey Builds',
    urduTitle: 'تعمیرات و ٹرن کی لگژری ویلاز',
    desc: 'PEC Category-C registered engineering supervision, A-Grade material estimation (Grade-60 steel, cement, crush) and grey structure to finish build.',
    badge: 'PEC Category-C Standard',
    icon: '🏗️'
  },
  {
    id: 'escrow',
    title: 'Token Escrow & Secure Deal Desk',
    urduTitle: 'ٹوکن بیعانہ و محفوظ ڈیل ایسکرو ڈیسک',
    desc: 'Third-party secure escrow holding for token money, registry payment milestones, and transparent buyer-seller settlements.',
    badge: 'Zero-Risk Milestone Escrow',
    icon: '🛡️'
  },
  {
    id: 'possession-handover',
    title: 'Physical Possession & Demarcation',
    urduTitle: 'فزیکل پوزیشن و موقع کی نشاندہی',
    desc: 'On-ground plot demarcation, pillar installation, possession order approval through LDA Directorate Housing-VIII.',
    badge: 'On-Ground Execution',
    icon: '📍'
  },
  {
    id: 'material-express',
    title: 'Doorstep Material Supply Express',
    urduTitle: 'کنسٹرکشن مٹیریل دہلیز پر ڈیلیوری',
    desc: 'Direct mill-rate delivery of Grade-60 saria, Bestway/Maple Leaf cement, Awwal bricks, and Margalla crush across Lahore.',
    badge: 'Direct Mill Wholesale',
    icon: '🚚'
  }
];

export default function ServicesSuite() {
  const handleServiceInquiry = (service) => {
    const text = `Assalam-o-Alaikum CEO Taha Mubeen Bhutta,\nI want to book / inquire about your service: "${service.title}". Please provide procedural details and meeting schedule.`;
    window.open(waLink(CEO_PHONE, text), '_blank');
  };

  return (
    <section id="services-suite" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-cyber/20 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-cyber font-mono font-bold">
              Comprehensive Real Estate & Engineering Suite
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-platinum font-display">
            PropTech & Turnkey Services <span className="text-cyber text-lg block sm:inline font-arabic sm:mr-2">بن طاہا پیشہ ورانہ خدمات</span>
          </h2>
          <p className="text-xs sm:text-sm text-platinum/70 mt-1 max-w-2xl">
            Supervised by CEO Taha Mubeen Bhutta. Transparent advisory, PEC-registered civil contracting, official LDA legal documentation, and secure escrow desks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${CEO_PHONE}`}
            className="btn-ghost text-xs px-4 py-2.5 flex items-center gap-2 whitespace-nowrap"
          >
            <span>CEO Direct: 0321-9404812</span>
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            className="glass-strong rounded-2xl cyber-border p-6 flex flex-col justify-between hover:border-cyber/60 transition-all group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-xl bg-obsidian2 border border-cyber/20">{s.icon}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyber/10 text-cyber border border-cyber/20">
                  {s.badge}
                </span>
              </div>

              <h3 className="font-bold text-platinum text-base group-hover:text-cyber transition-colors">
                {s.title}
              </h3>
              <p className="text-xs text-platinum/60 font-arabic mt-1 mb-3">
                {s.urduTitle}
              </p>
              <p className="text-xs text-platinum/75 leading-relaxed mb-6">
                {s.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-cyber/15">
              <button
                onClick={() => handleServiceInquiry(s)}
                className="btn-cyber w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Book Service via CEO WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
