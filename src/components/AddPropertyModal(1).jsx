import React, { useState, memo, useCallback } from 'react'
import { Building2, X, Upload, CheckCircle2, MapPin, Calculator, Database, Plus } from '../icons.jsx'
import { SOCIETIES, waLink, CEO_PHONE } from '../data/societies.js'
import { safeQuery, isSupabaseConfigured } from '../lib/supabase.js'
import { Presence } from '../lib/motion.jsx'

const PROPERTY_TYPES = [
  { id: 'plot', label: 'Residential Plot' },
  { id: 'house', label: 'House / Villa' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'farmhouse', label: 'Farm House' },
  { id: 'apartment', label: 'Apartment / Flat' }
]

const SIZES = ['3 Marla', '5 Marla', '8 Marla', '10 Marla', '1 Kanal', '2 Kanal', '4 Kanal', 'Commercial']

function fmtPKR(n) {
  if (!n) return ''
  const num = parseInt(n)
  if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Crore`
  if (num >= 100000) return `${(num / 100000).toFixed(2)} Lakh`
  return num.toLocaleString()
}

function AddPropertyModal({ open, onClose }) {
  const [form, setForm] = useState({
    property_type: 'plot',
    society_id: '',
    block: '',
    size: '5 Marla',
    demand_price: '',
    contact_phone: '',
    description: ''
  })
  const [upload, setUpload] = useState(null)
  const [syncSupabase, setSyncSupabase] = useState(isSupabaseConfigured)
  const [status, setStatus] = useState('form')
  const [savedId, setSavedId] = useState('')

  const reset = useCallback(() => {
    setForm({ property_type: 'plot', society_id: '', block: '', size: '5 Marla', demand_price: '', contact_phone: '', description: '' })
    setUpload(null)
    setStatus('form')
    setSavedId('')
  }, [])

  const close = useCallback(() => {
    onClose()
    setTimeout(reset, 300)
  }, [onClose, reset])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    const society = SOCIETIES.find(s => s.id === parseInt(form.society_id))
    const record = {
      property_type: form.property_type,
      society_name: society?.name || '',
      block_sector: form.block,
      size: form.size,
      demand_price: form.demand_price,
      contact_phone: form.contact_phone,
      description: form.description,
      listing_source: 'portal'
    }

    if (syncSupabase && isSupabaseConfigured) {
      await safeQuery(s => s.from('property_listings').insert(record), null)
    }

    const id = 'LST-' + Date.now().toString(36).toUpperCase().slice(-8)
    setSavedId(id)
    setStatus('done')
  }

  return (
    <Presence show={open} exitClass="anim-fade-out" exitMs={400}>
      {(exitCls) => (
        <div
          className={`fixed inset-0 z-[108] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur anim-fade-in ${exitCls}`}
          onClick={close}
        >
          <div
            className={`glass-strong rounded-2xl cyber-border w-full max-w-lg max-h-[92vh] overflow-y-auto anim-scale-in ${exitCls}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-cyber/20 bg-obsidian2/90 backdrop-blur">
              <div className="flex items-center gap-2">
                <Plus size={18} className="text-cyber" />
                <h3 className="font-display font-bold text-platinum">
                  {status === 'done' ? 'Listing Submitted' : 'Submit Property Listing'}
                </h3>
              </div>
              <button onClick={close} className="text-platinum/60 hover:text-cyber p-2"><X size={20} /></button>
            </div>

            {status === 'form' ? (
              <form onSubmit={submit} className="p-5 space-y-4">
                <div>
                  <label className="hud-label">Property Type</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1">
                    {PROPERTY_TYPES.map(t => (
                      <button type="button" key={t.id} onClick={() => set('property_type', t.id)}
                        className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg border transition-all text-center ${form.property_type === t.id ? 'border-cyber bg-cyber/10 text-cyber' : 'border-cyber/20 text-platinum/60 hover:bg-cyber/5'}`}>
                        <Building2 size={14} />
                        <span className="text-[10px] font-semibold leading-tight">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="hud-label">Society</label>
                  <select required value={form.society_id} onChange={e => set('society_id', e.target.value)}
                    className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum">
                    <option value="">Select society…</option>
                    {SOCIETIES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="hud-label">Block / Sector</label>
                    <input value={form.block} onChange={e => set('block', e.target.value)} placeholder="e.g. Block J"
                      className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
                  </div>
                  <div>
                    <label className="hud-label">Size</label>
                    <select value={form.size} onChange={e => set('size', e.target.value)}
                      className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum">
                      {SIZES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="hud-label flex items-center gap-1.5"><Calculator size={12} /> Demand Price (PKR)</label>
                  <input type="number" required value={form.demand_price} onChange={e => set('demand_price', e.target.value)} placeholder="e.g. 4800000"
                    className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
                  {form.demand_price && (
                    <p className="text-[12px] text-cyber mt-1 font-semibold">
                      ≈ PKR {fmtPKR(form.demand_price)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="hud-label flex items-center gap-1.5"><MapPin size={12} /> Contact Phone</label>
                  <input type="tel" required value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} placeholder="03xx-xxxxxxx"
                    className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
                </div>

                <div>
                  <label className="hud-label">Description (optional)</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2} placeholder="Corner plot, park-facing, possession available…"
                    className="mt-1 w-full bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
                </div>

                <div>
                  <label className="hud-label flex items-center gap-1.5"><Upload size={12} /> Upload Image / Document (optional)</label>
                  <label className="mt-1 flex flex-col items-center justify-center gap-2 cursor-pointer glass rounded-lg border border-dashed border-cyber/30 px-4 py-5 hover:bg-cyber/5 transition-all">
                    {upload ? (
                      <p className="text-sm text-cyber flex items-center gap-1.5"><CheckCircle2 size={14} /> {upload.name}</p>
                    ) : (
                      <>
                        <Upload size={18} className="text-cyber/60" />
                        <p className="text-[12px] text-platinum/60">Upload photo, scan or document</p>
                      </>
                    )}
                    <input type="file" accept="image/*,application/pdf" className="hidden"
                      onChange={e => setUpload(e.target.files?.[0] || null)} />
                  </label>
                </div>

                <div className="flex items-center gap-3 glass rounded-lg border border-cyber/15 px-3 py-2.5">
                  <Database size={16} className={syncSupabase ? 'text-cyber' : 'text-platinum/40'} />
                  <div className="flex-1">
                    <p className="text-[12px] text-platinum font-semibold">Sync with Supabase</p>
                    <p className="text-[10px] text-platinum/50">{syncSupabase ? 'Listing will be saved to the cloud database' : 'Listing will be saved locally only'}</p>
                  </div>
                  <button type="button" onClick={() => setSyncSupabase(v => !v)}
                    className={`w-10 h-5 rounded-full transition-all relative ${syncSupabase ? 'bg-cyber/40' : 'bg-platinum/15'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${syncSupabase ? 'left-5 bg-cyber' : 'left-0.5 bg-platinum/60'}`} />
                  </button>
                </div>

                <button type="submit" className="btn-cyber w-full flex items-center justify-center gap-2">
                  <Plus size={16} /> Submit Listing
                </button>
                <p className="text-[10px] text-platinum/40 text-center">All listings are reviewed by CEO {CEO_PHONE} before going live.</p>
              </form>
            ) : (
              <div className="p-5 space-y-4 anim-fade-in">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-cyber/15 border border-cyber flex items-center justify-center mx-auto cyber-glow anim-scale-in">
                    <CheckCircle2 size={32} className="text-cyber" />
                  </div>
                  <p className="text-sm text-platinum font-semibold mt-3">Property Listing Submitted</p>
                  <p className="text-[11px] text-cyber/70 mt-1">Listing ID: {savedId}</p>
                </div>

                <div className="glass rounded-xl border border-cyber/20 p-4 space-y-2">
                  {[
                    ['Type', PROPERTY_TYPES.find(t => t.id === form.property_type)?.label],
                    ['Society', SOCIETIES.find(s => s.id === parseInt(form.society_id))?.name],
                    ['Block', form.block || '—'],
                    ['Size', form.size],
                    ['Demand', `PKR ${fmtPKR(form.demand_price) || form.demand_price}`],
                    ['Phone', form.contact_phone],
                    ['Synced', syncSupabase && isSupabaseConfigured ? 'Supabase' : 'Local only']
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center text-sm">
                      <span className="text-platinum/60 text-[12px]">{k}</span>
                      <span className="text-platinum font-medium text-[12px] text-right">{v}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={waLink(`Assalam-u-alaikum CEO Taha Mubeen Bhutta, I submitted a property listing (ID: ${savedId}) on Bunyad.pk — ${PROPERTY_TYPES.find(t => t.id === form.property_type)?.label} in ${SOCIETIES.find(s => s.id === parseInt(form.society_id))?.name}, ${form.size}, Demand: PKR ${fmtPKR(form.demand_price)}. Please review.`)}
                  target="_blank" rel="noreferrer"
                  className="btn-cyber w-full flex items-center justify-center gap-2 text-xs"
                >
                  Notify CEO via WhatsApp
                </a>
                <button onClick={reset} className="w-full text-[11px] text-cyber/70 hover:text-cyber">Submit another listing</button>
              </div>
            )}
          </div>
        </div>
      )}
    </Presence>
  )
}

export default memo(AddPropertyModal)
