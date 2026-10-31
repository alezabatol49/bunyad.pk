import React, { useState, useMemo, useCallback, memo } from 'react'
import { Search, X, BadgeCheck, ShieldCheck, MessageCircle, MapPin, ChevronLeft, ChevronRight, ZoomIn, Image, Video, CreditCard } from '../icons.jsx'
import { SOCIETIES, waLink } from '../data/societies.js'
import { galleryFor, videoTourFor } from '../data/propertyMedia.js'
import { Presence } from '../lib/motion.jsx'
import BookingModal from './BookingModal.jsx'

function SocietyDirectory() {
  const [query, setQuery] = useState('')
  const [corridor, setCorridor] = useState('All')
  const [active, setActive] = useState(null)

  const corridors = ['All', 'Raiwind Road & Canal', 'Southern, Central & Cantt']

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return SOCIETIES.filter(s => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || (s.urdu || '').includes(q)
      const matchC = corridor === 'All' || s.corridor === corridor
      return matchQ && matchC
    })
  }, [query, corridor])

  return (
    <section id="directory" className="px-4 md:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <p className="hud-label">Module 05 · Housing Societies Directory</p>
          <h2 className="font-display text-2xl md:text-4xl font-black text-platinum">
            38+ Lahore <span className="text-cyber">Societies</span>
          </h2>
          <p className="text-platinum/60 text-sm mt-1">Master plans · 2026 DC Rates · FBR Valuation · Verified NOC · Photo Tours</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber/60" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search society…"
              className="bg-obsidian2 border border-cyber/20 rounded-lg pl-9 pr-3 py-2 text-sm text-platinum w-full sm:w-56 focus:outline-none focus:border-cyber"
            />
          </div>
          <select
            value={corridor}
            onChange={e => setCorridor(e.target.value)}
            className="bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum focus:outline-none focus:border-cyber"
          >
            {corridors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s)}
            className="glass rounded-xl p-4 text-left cyber-border group hover-lift transition-all hover:cyber-glow"
          >
            {/* Thumbnail preview */}
            <div className="relative mb-3 rounded-lg overflow-hidden h-32 bg-obsidian2">
              <img src={galleryFor(s.id)[0].url} alt={s.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian2 to-transparent" />
              <div className="absolute bottom-1.5 left-2 flex items-center gap-1 text-[10px] text-cyber">
                <Image size={11} /> {galleryFor(s.id).length} photos
              </div>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-platinum text-sm leading-tight group-hover:text-cyber transition-colors">
                  {s.name}
                </h3>
                {s.urdu && <p className="font-urdu text-cyber/70 text-sm mt-0.5">{s.urdu}</p>}
              </div>
              {s.flagship && (
                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyber/15 text-cyber border border-cyber/40">
                  Flagship
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-platinum/60">
              <MapPin size={12} className="text-cyber" /> {s.corridor}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <BadgeCheck size={12} className="text-cyber" />
              <span className="text-platinum/70">{s.noc}</span>
            </div>
            <p className="mt-2 text-[11px] text-cyber font-semibold">{s.dcRate}</p>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-platinum/50 py-8">No societies match your search.</p>
        )}
      </div>

      <SocietyModal society={active} onClose={() => setActive(null)} />
    </section>
  )
}

function SocietyModal({ society, onClose }) {
  const [modalTab, setModalTab] = useState('photos')
  const [photoIdx, setPhotoIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const photos = useMemo(() => society ? galleryFor(society.id) : [], [society])
  const videoId = useMemo(() => society ? videoTourFor(society.id) : '', [society])

  const closeModal = useCallback(() => {
    setModalTab('photos')
    setPhotoIdx(0)
    setLightbox(false)
    onClose()
  }, [onClose])

  return (
    <>
      <Presence show={!!society} exitClass="anim-fade-out" exitMs={400}>
        {(exitCls) => society && (
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm anim-fade-in ${exitCls}`}
            onClick={closeModal}
          >
            <div
              className={`glass-strong rounded-2xl cyber-border w-full max-w-2xl max-h-[88vh] overflow-y-auto anim-scale-in ${exitCls}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-cyber/20 bg-obsidian2/90 backdrop-blur">
                <div>
                  <h3 className="font-display text-xl font-bold text-platinum">{society.name}</h3>
                  {society.urdu && <p className="font-urdu text-cyber text-sm">{society.urdu}</p>}
                </div>
                <button onClick={closeModal} className="text-platinum/60 hover:text-cyber p-2"><X size={20} /></button>
              </div>

              <div className="p-5 space-y-5">
                <p className="text-sm text-platinum/80 leading-relaxed">{society.summary}</p>

                {/* Tabs: Photos | Video Tour */}
                <div className="flex gap-2">
                  <button onClick={() => setModalTab('photos')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border ${modalTab === 'photos' ? 'btn-cyber border-transparent' : 'btn-ghost'}`}>
                    <Image size={14} /> Photos ({photos.length})
                  </button>
                  <button onClick={() => setModalTab('video')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border ${modalTab === 'video' ? 'btn-cyber border-transparent' : 'btn-ghost'}`}>
                    <Video size={14} /> Video Tour
                  </button>
                </div>

                {/* Photo carousel */}
                {modalTab === 'photos' && (
                  <div>
                    <div className="relative rounded-xl overflow-hidden border border-cyber/20 h-56 bg-obsidian2">
                      <img
                        key={photoIdx}
                        src={photos[photoIdx].url}
                        alt={photos[photoIdx].label}
                        className="w-full h-full object-cover anim-fade-in"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-obsidian2 to-transparent p-3">
                        <p className="text-sm text-platinum font-semibold">{photos[photoIdx].label}</p>
                      </div>
                      <button onClick={() => setPhotoIdx(i => (i - 1 + photos.length) % photos.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-obsidian2/80 border border-cyber/30 flex items-center justify-center hover:bg-cyber/20 transition-all">
                        <ChevronLeft size={18} className="text-cyber" />
                      </button>
                      <button onClick={() => setPhotoIdx(i => (i + 1) % photos.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-obsidian2/80 border border-cyber/30 flex items-center justify-center hover:bg-cyber/20 transition-all">
                        <ChevronRight size={18} className="text-cyber" />
                      </button>
                      <button onClick={() => setLightbox(true)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-obsidian2/80 border border-cyber/30 flex items-center justify-center hover:bg-cyber/20 transition-all">
                        <ZoomIn size={16} className="text-cyber" />
                      </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                      {photos.map((p, i) => (
                        <button key={i} onClick={() => setPhotoIdx(i)}
                          className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === photoIdx ? 'border-cyber cyber-glow' : 'border-cyber/15 opacity-60 hover:opacity-100'}`}>
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Tour */}
                {modalTab === 'video' && (
                  <div>
                    <div className="relative rounded-xl overflow-hidden border border-cyber/20 aspect-video bg-obsidian2">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${society.name} Video Tour`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-[11px] text-platinum/50 mt-2 text-center">Virtual walkthrough · {society.name} · powered by YouTube</p>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Info label="Sector / Blocks" value={society.blocks} />
                  <Info label="NOC Status" value={society.noc} icon={<ShieldCheck size={14} className="text-cyber" />} />
                  <Info label="Corridor" value={society.corridor} />
                  <Info label="2026 DC Rate" value={society.dcRate} />
                  <Info label="FBR Valuation" value={society.fbr} />
                </div>

                <div>
                  <p className="hud-label mb-2">Pricing Brackets</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Price label="5 Marla" value={society.price5} />
                    <Price label="10 Marla" value={society.price10} />
                    <Price label="1 Kanal" value={society.price1K} />
                    <Price label="Commercial" value={society.priceC} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                  <button onClick={() => setBookingOpen(true)}
                    className="btn-cyber flex items-center justify-center gap-2">
                    <CreditCard size={16} /> Book / Token Deposit
                  </button>
                  <a
                    href={waLink(`Assalam-u-alaikum CEO Taha Mubeen Bhutta, I'm interested in ${society.name} (${society.blocks}). Please share verified inventory & escrow details.`)}
                    target="_blank" rel="noreferrer"
                    className="btn-ghost flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} /> WhatsApp CEO · 0321
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Presence>

      {/* Lightbox */}
      <Presence show={lightbox} exitClass="anim-fade-out" exitMs={300}>
        {(exitCls) => (
          <div
            className={`fixed inset-0 z-[115] flex items-center justify-center p-4 bg-obsidian/95 backdrop-blur-md anim-fade-in ${exitCls}`}
            onClick={() => setLightbox(false)}
          >
            <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-obsidian2/80 border border-cyber/30 flex items-center justify-center hover:bg-cyber/20">
              <X size={22} className="text-cyber" />
            </button>
            <button onClick={e => { e.stopPropagation(); setPhotoIdx(i => (i - 1 + photos.length) % photos.length) }}
              className="absolute left-4 w-10 h-10 rounded-full bg-obsidian2/80 border border-cyber/30 flex items-center justify-center hover:bg-cyber/20">
              <ChevronLeft size={22} className="text-cyber" />
            </button>
            <img
              key={photoIdx}
              src={photos[photoIdx]?.url}
              alt={photos[photoIdx]?.label}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg anim-fade-in"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={e => { e.stopPropagation(); setPhotoIdx(i => (i + 1) % photos.length) }}
              className="absolute right-4 w-10 h-10 rounded-full bg-obsidian2/80 border border-cyber/30 flex items-center justify-center hover:bg-cyber/20">
              <ChevronRight size={22} className="text-cyber" />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-cyber">{photos[photoIdx]?.label} · {photoIdx + 1} / {photos.length}</p>
          </div>
        )}
      </Presence>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} society={society} unitLabel={`${society?.blocks}`} />
    </>
  )
}

export default memo(SocietyDirectory)

function Info({ label, value, icon }) {
  return (
    <div className="glass rounded-lg px-3 py-2 border border-cyber/15">
      <p className="text-[10px] uppercase tracking-wider text-cyber/70">{label}</p>
      <p className="text-sm text-platinum font-semibold mt-0.5 flex items-center gap-1.5">{icon}{value}</p>
    </div>
  )
}

function Price({ label, value }) {
  return (
    <div className="rounded-lg px-3 py-2 border border-cobalt/40 bg-cobalt/10">
      <p className="text-[10px] uppercase tracking-wider text-cyber/70">{label}</p>
      <p className="text-[12px] text-platinum font-semibold mt-0.5 leading-tight">{value}</p>
    </div>
  )
}
