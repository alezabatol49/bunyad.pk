import React, { useEffect, useState, memo } from 'react'
import { Zap } from '../icons.jsx'
import { Presence } from '../lib/motion.jsx'

const LETTERS = ['B', 'U', 'N', 'Y', 'A', 'D']
const FLOOR_COUNT = 8

function CinematicIntro({ onDone, replayKey }) {
  const [stage, setStage] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setStage(0)
    setVisible(true)
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 2600),
      setTimeout(() => setStage(3), 4200),
      setTimeout(() => {
        setVisible(false)
        setTimeout(onDone, 600)
      }, 6200)
    ]
    return () => timers.forEach(clearTimeout)
  }, [replayKey, onDone])

  return (
    <Presence show={visible} exitClass="anim-fade-out" exitMs={600}>
      {(exitCls) => (
        <div key={replayKey} className={`fixed inset-0 z-[120] flex items-center justify-center bg-obsidian grid-bg overflow-hidden ${exitCls}`}>
          {/* Ambient particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-cyber"
                style={{
                  width: 4, height: 4, left: '50%', top: '50%',
                  boxShadow: '0 0 8px #00F2FE',
                  animation: `particle 3s ease-out ${i * 0.04}s infinite`,
                  '--px': `${(i % 5) * 60 - 120}px`,
                  '--py': `${(i % 4) * 80 - 160}px`,
                  '--px2': `${(i % 7) * 90 - 200}px`,
                  '--py2': `${(i % 6) * 70 - 220}px`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10" style={{ opacity: stage >= 1 ? 1 : 0, transition: 'opacity 0.4s' }}>
            {/* Construction / Skyscraper animation */}
            <div className="relative mx-auto mb-8 flex flex-col items-center" style={{ width: 160, height: 240 }}>
              {/* Plot grid + concrete foundation */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: 180, height: 24,
                  opacity: stage >= 1 ? 1 : 0,
                  transform: stage >= 1 ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                  transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                }}
              >
                <div className="w-full h-full grid-bg rounded-sm border border-cyber/30 bg-cyber/5" />
                {/* Foundation pour line */}
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyber/60 to-transparent"
                  style={{
                    transform: stage >= 1 ? 'translateX(100%)' : 'translateX(-100%)',
                    transition: 'transform 0.9s ease-out 0.1s'
                  }}
                />
              </div>

              {/* Rebar skeleton rising */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
                style={{
                  width: 120, height: 200,
                  transformOrigin: 'bottom',
                  transform: stage >= 1 ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0)',
                  opacity: stage >= 1 ? 0.5 : 0,
                  transition: 'transform 1.1s ease-out 0.5s, opacity 0.4s 0.5s'
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 120 200" preserveAspectRatio="none">
                  {[20, 40, 60, 80, 100].map(x => (
                    <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="#1E40AF" strokeWidth="1.5" />
                  ))}
                  {[20, 60, 100, 140, 180].map(y => (
                    <line key={`h${y}`} x1="15" y1={y} x2="105" y2={y} stroke="#1E40AF" strokeWidth="1.2" />
                  ))}
                </svg>
              </div>

              {/* Glass villa / building illuminating floor-by-floor */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 overflow-hidden"
                style={{
                  width: 104, height: 192,
                  opacity: stage >= 1 ? 1 : 0,
                  transition: 'opacity 0.4s 1.5s'
                }}
              >
                <div className="absolute inset-0 rounded-t-md border border-cyber/40 bg-obsidian2/80" />
                {Array.from({ length: FLOOR_COUNT }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-t border-cyber/25 flex items-center justify-around px-2"
                    style={{
                      bottom: (i * 24), height: 22,
                      opacity: stage >= 1 ? 1 : 0,
                      backgroundColor: stage >= 1 ? 'rgba(0,242,254,0.12)' : 'rgba(0,242,254,0)',
                      transition: `opacity 0.7s ease-out ${1.6 + i * 0.22}s, background-color 0.7s ease-out ${1.6 + i * 0.22}s`
                    }}
                  >
                    <div className="w-3 h-2 bg-cyber/70 rounded-sm" style={{ boxShadow: '0 0 6px #00F2FE' }} />
                    <div className="w-3 h-2 bg-cyber/50 rounded-sm" style={{ boxShadow: '0 0 4px #00F2FE' }} />
                    <div className="w-3 h-2 bg-cyber/60 rounded-sm" style={{ boxShadow: '0 0 5px #00F2FE' }} />
                  </div>
                ))}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyber to-cobalt" style={{ boxShadow: '0 0 10px #00F2FE' }} />
              </div>

              {/* Glow at base */}
              <div className="absolute -bottom-2 -inset-x-8 h-3 bg-cyber/30 blur-md" />
            </div>

            {/* Letter reveal */}
            <div className="flex justify-center gap-1 md:gap-2 font-display text-4xl md:text-7xl font-black tracking-[0.18em]">
              {LETTERS.map((l, i) => (
                <span
                  key={l}
                  className="relative text-platinum"
                  style={{
                    textShadow: '0 0 18px rgba(0,242,254,0.85)',
                    opacity: stage >= 2 ? 1 : 0,
                    transform: stage >= 2 ? 'translateY(0)' : 'translateY(30px)',
                    filter: stage >= 2 ? 'blur(0px)' : 'blur(8px)',
                    transition: `opacity 0.5s ${0.5 + i * 0.14}s, transform 0.5s ${0.5 + i * 0.14}s, filter 0.5s ${0.5 + i * 0.14}s`
                  }}
                >
                  {l}
                  <span
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-cyber"
                    style={{
                      opacity: stage >= 2 ? 0 : 1,
                      transform: stage >= 2 ? 'scaleY(0)' : 'scaleY(1)',
                      transformOrigin: 'bottom',
                      transition: `opacity 0.5s ${0.5 + i * 0.14 + 0.3}s, transform 0.5s ${0.5 + i * 0.14 + 0.3}s`
                    }}
                  />
                </span>
              ))}
            </div>

            <p
              className="mt-5 text-center font-urdu text-cyber text-lg md:text-2xl tracking-wide"
              style={{ opacity: stage >= 2 ? 1 : 0, transition: 'opacity 0.4s 1.5s' }}
            >
              بنیاد
            </p>
            <p
              className="mt-1 text-center text-[11px] uppercase tracking-[0.4em] text-platinum/60"
              style={{ opacity: stage >= 2 ? 1 : 0, transition: 'opacity 0.4s 1.8s' }}
            >
              Powered by Bin Taha Associates & Builders
            </p>

            {/* Enter button */}
            <div
              className="mt-8 flex justify-center"
              style={{ opacity: stage >= 3 ? 1 : 0, transition: 'opacity 0.4s 0.2s' }}
            >
              <button onClick={onDone} className="btn-cyber flex items-center gap-2 text-sm">
                <Zap size={16} /> Enter Command Center
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-platinum/40">
            Bunyad.pk · PropTech HUD · 2026
          </div>
        </div>
      )}
    </Presence>
  )
}

export default memo(CinematicIntro)
