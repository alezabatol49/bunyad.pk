import React, { useState, memo } from 'react'
import { Send, CheckCircle2, Phone, Mail, MapPin } from '../icons.jsx'
import { supabase, safeQuery, isSupabaseConfigured } from '../lib/supabase.js'
import { SOCIETIES, CEO_PHONE, CEO_EMAIL, HQ, waLink } from '../data/societies.js'

function HeroLead() {
  const [form, setForm] = useState({ full_name: '', phone: '', whatsapp: '', email: '', society_interest: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    await safeQuery(s => s.from('leads').insert({
      full_name: form.full_name, phone: form.phone, whatsapp: form.whatsapp,
      email: form.email, society_interest: form.society_interest,
      budget: form.budget, message: form.message, status: 'New'
    }), null)
    setStatus('done')
    setForm({ full_name: '', phone: '', whatsapp: '', email: '', society_interest: '', budget: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="home" className="px-4 md:px-8 pt-10 pb-6">
      <div className="grid lg:grid-cols-2 gap-6 items-center">
        <div className="anim-slide-left">
          <p className="hud-label mb-3">Bunyad.pk · PropTech HUD Command Center</p>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.05] text-platinum">
            <span className="text-cyber" style={{ textShadow: '0 0 24px rgba(0,242,254,0.6)' }}>BUNYAD</span>
            <span className="block font-urdu text-cyber/80 text-2xl md:text-3xl mt-1">بنیاد</span>
          </h1>
          <p className="mt-3 text-platinum/70 text-sm md:text-base max-w-xl leading-relaxed">
            Ultra-luxurious PropTech, Real Estate & Civil Construction Mega-Platform.
            Solid foundations, structural engineering, smart cities — supervised by CEO Taha Mubeen Bhutta.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber/10 border border-cyber/30 text-[11px] uppercase tracking-wider text-cyber cyber-glow">
            Powered by Bin Taha Associates & Builders · بن طہٰ ایسوسی ایٹس
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <Contact icon={<Phone size={14} />} label="Direct & WhatsApp" value={CEO_PHONE} href={waLink('Assalam-u-alaikum CEO Taha Mubeen Bhutta, I found Bunyad.pk')} />
            <Contact icon={<Mail size={14} />} label="Email" value={CEO_EMAIL} href={`mailto:${CEO_EMAIL}`} />
            <Contact icon={<MapPin size={14} />} label="Headquarters" value={HQ} />
          </div>
        </div>

        <div className="anim-slide-right glass-strong rounded-2xl cyber-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-bold text-platinum">Lead Capture Desk</h2>
            <span className="text-[10px] uppercase tracking-wider text-cyber/70">Syncs → Supabase</span>
          </div>
          {status === 'done' ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto text-cyber" size={48} />
              <p className="mt-3 text-platinum font-semibold">Inquiry received — CEO desk notified.</p>
              <p className="text-[11px] text-platinum/60 mt-1">Expect a WhatsApp on {CEO_PHONE} shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid grid-cols-2 gap-3">
              <Field label="Full Name" required value={form.full_name} onChange={v => setForm(f => ({ ...f, full_name: v }))} />
              <Field label="Phone" required value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
              <Field label="WhatsApp" value={form.whatsapp} onChange={v => setForm(f => ({ ...f, whatsapp: v }))} />
              <Field label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
              <div className="col-span-2">
                <label className="hud-label">Society of Interest</label>
                <select value={form.society_interest} onChange={e => setForm(f => ({ ...f, society_interest: e.target.value }))}
                  className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum">
                  <option value="">Select society…</option>
                  {SOCIETIES.map(s => <option key={s.id}>{s.name}</option>)}
                </select>
              </div>
              <Field label="Budget (PKR)" value={form.budget} onChange={v => setForm(f => ({ ...f, budget: v }))} />
              <div className="col-span-2">
                <label className="hud-label">Message</label>
                <textarea rows={2} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
              </div>
              <button type="submit" disabled={status === 'saving'} className="btn-cyber col-span-2 flex items-center justify-center gap-2 disabled:opacity-50">
                <Send size={16} /> {status === 'saving' ? 'Submitting…' : 'Submit to CEO Desk'}
              </button>
              {!isSupabaseConfigured && <p className="col-span-2 text-[10px] text-platinum/40 text-center">Demo mode — submission stored locally until Supabase keys are connected.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, value, onChange, required }) {
  return (
    <div>
      <label className="hud-label">{label}{required && ' *'}</label>
      <input required={required} value={value} onChange={e => onChange(e.target.value)}
        className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum focus:outline-none focus:border-cyber" />
    </div>
  )
}

function Contact({ icon, label, value, href }) {
  const inner = (
    <div className="glass rounded-xl border border-cyber/15 p-3 hover:cyber-glow transition-all">
      <p className="text-[10px] uppercase tracking-wider text-cyber/70 flex items-center gap-1.5">{icon}{label}</p>
      <p className="text-[13px] text-platinum font-semibold mt-1 leading-tight">{value}</p>
    </div>
  )
  return href ? <a href={href} target="_blank" rel="noreferrer">{inner}</a> : inner
}

export default memo(HeroLead)
