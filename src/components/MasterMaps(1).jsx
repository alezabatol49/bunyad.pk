import React, { useState, memo, useMemo, useCallback } from 'react'
import { MapIcon, Search, ZoomIn, X, Compass, MapPin } from '../icons.jsx'
import { SOCIETIES } from '../data/societies.js'

const CORRIDORS = [
  { id: 'all', label: 'All Corridors' },
  { id: 'raiwind', label: 'Raiwind Road & Canal' },
  { id: 'southern', label: 'Southern, Central & Cantt' },
  { id: 'ring', label: 'Ring Road' },
  { id: 'ferozepur', label: 'Ferozepur Road' }
]

// Map corridor IDs to society corridor values
function matchCorridor(society, corridorId) {
  if (corridorId === 'all') return true
  if (corridorId === 'raiwind') return society.corridor === 'Raiwind Road & Canal'
  if (corridorId === 'southern') return society.corridor === 'Southern, Central & Cantt'
  if (corridorId === 'ring') return society.corridor.includes('Cantt') || society.corridor.includes('Central')
  if (corridorId === 'ferozepur') return society.corridor.includes('Southern') || society.name.includes('Ferozepur')
  return true
}

function MasterMaps() {
  const [query, setQuery] = useState('')
  const [corridor, setCorridor] = useState('all')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return SOCIETIES.filter(s => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || (s.urdu || '').includes(q) || (s.blocks || '').toLowerCase().includes(q)
      const matchC = matchCorridor(s, corridor)
      return matchQ && matchC
    })
  }, [query, corridor])

  const selectSociety = useCallback((s) => setActive(s), [])
  const closeMap = useCallback(() => setActive(null), [])

  return (
    <section id="master-maps" className="px-4 md:px-8 py-10">
      <p className="hud-label">Module 09 · Master Plans & Society Maps</p>
      <h2 className="font-display text-2xl md:text-4xl font-black text-platinum mb-2">
        Society <span className="text-cyber">Master Plans</span> & LDA Maps
      </h2>
      <p className="text-platinum/60 text-sm mb-6">Interactive society map viewer with corridor filters. Search by society name or sector/block to view master plans.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber/60" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by society or block (e.g. LDA Avenue 1, Block J)…"
            className="w-full bg-obsidian2 border border-cyber/20 rounded-lg pl-9 pr-3 py-2 text-sm text-platinum focus:outline-none focus:border-cyber"
          />
        </div>
        <select value={corridor} onChange={e => setCorridor(e.target.value)}
          className="bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum focus:outline-none focus:border-cyber">
          {CORRIDORS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map(s => (
          <button
            key={s.id}
            onClick={() => selectSociety(s)}
            className="glass rounded-xl p-4 text-left cyber-border hover-lift transition-all group hover:cyber-glow"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-cyber/10 border border-cyber/30 flex items-center justify-center shrink-0">
                <MapIcon size={18} className="text-cyber" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-platinum text-[13px] leading-tight group-hover:text-cyber transition-colors truncate">{s.name}</h3>
                {s.urdu && <p className="font-urdu text-cyber/70 text-sm">{s.urdu}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-platinum/60">
              <MapPin size={11} className="text-cyber" /> {s.corridor}
            </div>
            <p className="text-[11px] text-cyber font-semibold mt-1">{s.blocks}</p>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-platinum/50 py-8">No societies match your search.</p>
        )}
      </div>

      {/* Map Viewer Modal */}
      {active && (
        <div className="fixed inset-0 z-[107] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md anim-fade-in" onClick={closeMap}>
          <div className="glass-strong rounded-2xl cyber-border w-full max-w-4xl max-h-[90vh] overflow-y-auto anim-scale-in" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-cyber/20 bg-obsidian2/90 backdrop-blur">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-cyber" />
                <div>
                  <h3 className="font-display text-lg font-bold text-platinum">{active.name} — Master Plan</h3>
                  <p className="text-[11px] text-cyber/70">{active.blocks} · {active.corridor}</p>
                </div>
              </div>
              <button onClick={closeMap} className="text-platinum/60 hover:text-cyber p-2"><X size={20} /></button>
            </div>

            <div className="p-5">
              {/* Map placeholder — SVG grid layout representing blocks */}
              <div className="relative rounded-xl overflow-hidden border border-cyber/30 bg-obsidian2 h-80 mb-4 grid-bg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-cyber/10 border border-cyber/30 flex items-center justify-center mx-auto mb-3 cyber-glow anim-pulse">
                      <MapIcon size={32} className="text-cyber" />
                    </div>
                    <p className="text-sm text-platinum font-semibold">{active.name}</p>
                    <p className="text-[11px] text-platinum/60 mt-1">Interactive master plan — {active.blocks}</p>
                  </div>
                </div>
                {/* Block grid overlay */}
                <div className="absolute inset-0 grid grid-cols-4 gap-1 p-4 opacity-40">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded border border-cyber/20 bg-cyber/5 flex items-center justify-center">
                      <span className="text-[9px] text-cyber/40">{String.fromCharCode(65 + i)}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <button className="w-8 h-8 rounded-lg bg-obsidian2/80 border border-cyber/30 flex items-center justify-center hover:bg-cyber/20 transition-all">
                    <ZoomIn size={14} className="text-cyber" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  ['NOC Status', active.noc],
                  ['2026 DC Rate', active.dcRate],
                  ['FBR Valuation', active.fbr],
                  ['Corridor', active.corridor]
                ].map(([k, v]) => (
                  <div key={k} className="glass rounded-lg px-3 py-2 border border-cyber/15">
                    <p className="text-[10px] uppercase tracking-wider text-cyber/70">{k}</p>
                    <p className="text-[12px] text-platinum font-semibold mt-0.5">{v}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => alert(`Downloading high-res master plan for ${active.name}…\n\nIn production, this fetches the official PDF/vector map from Supabase Storage.`)}
                  className="btn-cyber flex-1 flex items-center justify-center gap-2 text-xs"
                >
                  <MapIcon size={14} /> Download High-Res Map (PDF)
                </button>
                <a
                  href={`https://wa.me/923219404812?text=${encodeURIComponent(`Assalam-u-alaikum CEO Taha Mubeen Bhutta, I need the master plan for ${active.name} (${active.blocks}) via Bunyad.pk.`)}`}
                  target="_blank" rel="noreferrer"
                  className="btn-ghost flex-1 flex items-center justify-center gap-2 text-xs"
                >
                  Request Map via WhatsApp
                </a>
              </div>
              <p className="text-[10px] text-platinum/40 text-center mt-3">Official LDA & society master plans are verified by Bin Taha Associates. Contact CEO for stamped hard copies.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default memo(MasterMaps)
