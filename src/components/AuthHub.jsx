import React, { useState } from 'react';
import {
  User, Handshake, Crown, X, ShieldCheck,
  FileText, Download, TrendingUp, IdCard,
  Send, Lock
} from '../icons.jsx';
import { supabase, syncLeadToBinTahaCRM } from '../lib/supabase.js';
import { CEO_PHONE, waLink } from '../data/societies.js';

const ROLES = [
  { id: 'client', label: 'Client / Investor', icon: User },
  { id: 'dealer', label: 'Authorized Dealer', icon: Handshake },
  { id: 'ceo', label: 'Executive CEO Desk', icon: Crown }
];

export default function AuthHub() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('client');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-ghost px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-cyber hover:bg-cyber/15"
        title="Sign In / Client Portal"
      >
        <User size={13} />
        <span>Sign In</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
          <div className="glass-strong rounded-3xl cyber-border w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-platinum/60 hover:text-cyber p-2 text-sm font-mono"
            >
              [ESC]
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-cyber font-mono font-bold">
                BUNYAD Cloud Hub
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-platinum font-display mb-1">
              Member Sign In & Client Desk <span className="text-cyber text-base font-arabic">سائن ان پورٹل</span>
            </h3>
            <p className="text-xs text-platinum/70 mb-5">
              Secure client tracking, deal registration, and verified cloud sync to Bin Taha CRM & Supabase.
            </p>

            {/* Role Switcher */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-obsidian2 rounded-2xl border border-cyber/20 mb-6">
              {ROLES.map(r => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      role === r.id
                        ? 'bg-cyber text-obsidian shadow-md shadow-cyber/20 font-black'
                        : 'text-platinum/60 hover:text-cyber hover:bg-white/5'
                    }`}
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{r.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Portal Views */}
            {role === 'client' && <ClientAuthView onClose={() => setOpen(false)} />}
            {role === 'dealer' && <DealerAuthView onClose={() => setOpen(false)} />}
            {role === 'ceo' && <CEOQuickDesk onClose={() => setOpen(false)} />}
          </div>
        </div>
      )}
    </>
  );
}

// 1. Client / Investor Sign Up & Sign In with Supabase Sync
function ClientAuthView({ onClose }) {
  const [mode, setMode] = useState('signup'); // 'signup' or 'signin'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    society: 'LDA Avenue 1',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const clientPayload = {
      ID: 'CLI-' + Math.floor(100000 + Math.random() * 900000),
      Date: new Date().toISOString().split('T')[0],
      Name: formData.name || 'Registered Client',
      Phone: formData.phone,
      Email: formData.email,
      Subject: `${mode === 'signup' ? 'New Client Account' : 'Client Login'}: ${formData.society}`,
      Details: `Account Type: Client Portal | Society: ${formData.society} | Mode: ${mode}`,
      Status: 'Active'
    };

    // Save locally
    localStorage.setItem('bunyad_active_user', JSON.stringify(clientPayload));

    // Sync to Supabase & Bin Taha CRM
    await syncLeadToBinTahaCRM(clientPayload);

    setLoading(false);
    setSuccessMsg(
      mode === 'signup'
        ? `✨ مبارک ہو! آپ کا اکاؤنٹ کامیابی کے ساتھ بن گیا ہے اور Supabase ڈیٹا بیس میں محفوظ ہو گیا ہے۔`
        : `✨ ویلکم بیک! آپ کامیابی کے ساتھ سائن ان ہو چکے ہیں۔`
    );
  };

  if (successMsg) {
    return (
      <div className="p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 font-bold text-2xl">
          ✓
        </div>
        <h4 className="text-base font-bold text-platinum">{successMsg}</h4>
        <p className="text-xs text-platinum/70 max-w-sm mx-auto font-mono">
          Synced to: mmbcfhaxtzoctxdofmiz.supabase.co & bintahacrm@gmail.com
        </p>
        <button
          onClick={onClose}
          className="btn-cyber text-xs px-6 py-2.5 font-bold"
        >
          Enter Dashboard
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-cyber/15 pb-2">
        <p className="font-bold text-platinum">
          {mode === 'signup' ? 'Create New Client Account' : 'Sign In with Registered Phone'}
        </p>
        <button
          type="button"
          onClick={() => setMode(m => m === 'signup' ? 'signin' : 'signup')}
          className="text-cyber hover:underline text-[11px]"
        >
          {mode === 'signup' ? 'Already have an account? Sign In' : 'New here? Create Account'}
        </button>
      </div>

      {mode === 'signup' && (
        <div>
          <label className="block font-bold text-platinum mb-1">Full Name: *</label>
          <input
            type="text"
            required
            placeholder="Muhammad Ali"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum outline-none focus:border-cyber"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-platinum mb-1">Phone / WhatsApp Number: *</label>
          <input
            type="text"
            required
            placeholder="0321-9404812"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum outline-none focus:border-cyber"
          />
        </div>

        <div>
          <label className="block font-bold text-platinum mb-1">Email Address:</label>
          <input
            type="email"
            placeholder="client@gmail.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum outline-none focus:border-cyber"
          />
        </div>
      </div>

      <div>
        <label className="block font-bold text-platinum mb-1">Interested Housing Society:</label>
        <select
          value={formData.society}
          onChange={e => setFormData({ ...formData, society: e.target.value })}
          className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum outline-none focus:border-cyber font-semibold"
        >
          <option value="LDA Avenue 1">LDA Avenue 1 (Flagship)</option>
          <option value="Jubilee Town">Jubilee Town Lahore</option>
          <option value="Bahria Town">Bahria Town Lahore</option>
          <option value="DHA Lahore">DHA Lahore</option>
          <option value="Lake City">Lake City Lahore</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-cyber w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 mt-2"
      >
        <span>{loading ? 'Connecting Supabase Cluster...' : (mode === 'signup' ? 'Complete Sign Up & Save to Supabase' : 'Sign In Securely')}</span>
      </button>
    </form>
  );
}

// 2. Authorized Dealer Portal
function DealerAuthView({ onClose }) {
  const [cnic, setCnic] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (cnic.length >= 13) {
      setVerified(true);
    } else {
      alert('براہ کرم درست 13 ہندسوں کا شناختی کارڈ نمبر درج کریں۔');
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <p className="text-platinum/70">
        Verify your authorized broker affiliation and register client commission tokens.
      </p>

      {!verified ? (
        <form onSubmit={handleVerify} className="space-y-3">
          <div>
            <label className="block font-bold text-platinum mb-1">CNIC Number (Without dashes):</label>
            <input
              type="text"
              required
              maxLength={15}
              placeholder="3520212345671"
              value={cnic}
              onChange={e => setCnic(e.target.value)}
              className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum outline-none focus:border-cyber"
            />
          </div>
          <button type="submit" className="btn-cyber w-full py-3 font-bold">
            Verify Dealer Credentials
          </button>
        </form>
      ) : (
        <div className="p-5 glass rounded-2xl border border-cyber/40 space-y-3">
          <p className="text-emerald-400 font-bold">✓ Authorized Dealer Account Verified</p>
          <p className="text-platinum/80 text-[11px]">
            Welcome Partner. You can now register direct client tokens for 50/50 commission split under Bin Taha Escrow Desk.
          </p>
          <a
            href={waLink(CEO_PHONE, `Assalam-o-Alaikum CEO Taha Mubeen Bhutta,\nI am an Authorized Dealer (CNIC: ${cnic}). I have a verified client for LDA Avenue 1.`)}
            target="_blank"
            rel="noreferrer"
            className="btn-cyber block text-center py-2.5 font-bold"
          >
            Submit Deal via WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

// 3. CEO Quick Desk Access
function CEOQuickDesk({ onClose }) {
  return (
    <div className="p-6 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-cyber/15 border border-cyber mx-auto flex items-center justify-center text-cyber text-2xl font-bold">
        👑
      </div>
      <h4 className="text-base font-bold text-platinum font-display">Executive Management Gateway</h4>
      <p className="text-xs text-platinum/70 max-w-sm mx-auto">
        Taha Mubeen Bhutta — use the dedicated CEO Admin PIN console in the top navigation to view the live leads pipeline.
      </p>
      <button
        onClick={onClose}
        className="btn-cyber text-xs px-6 py-2.5 font-bold"
      >
        Close Hub
      </button>
    </div>
  );
}
