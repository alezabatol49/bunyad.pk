import React, { useEffect, useRef, useState, useCallback, memo } from 'react'
import { Zap, X } from '../icons.jsx'
import { Presence } from '../lib/motion.jsx'

const INTRO_VIDEO = `${import.meta.env.BASE_URL}assets/fainal_bunyaad_intro.mp4`

function CinematicIntro({ onDone, replayKey }) {
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(true)

  const finish = useCallback(() => {
    setVisible(false)
    setProgress(100)
    setTimeout(onDone, 500)
  }, [onDone])

  useEffect(() => {
    setProgress(0)
    setLoaded(false)
    setVisible(true)
    const v = videoRef.current
    if (!v) return

    let raf = null
    const tick = () => {
      if (v.duration) setProgress(Math.min((v.currentTime / v.duration) * 100, 100))
      raf = requestAnimationFrame(tick)
    }
    const onEnded = () => finish()
    const onCanPlay = () => setLoaded(true)

    v.addEventListener('ended', onEnded)
    v.addEventListener('canplay', onCanPlay)
    v.play().catch(() => { /* autoplay blocked; skip shows */ })
    raf = requestAnimationFrame(tick)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      v.removeEventListener('ended', onEnded)
      v.removeEventListener('canplay', onCanPlay)
    }
  }, [replayKey, finish])

  const skip = useCallback(() => {
    const v = videoRef.current
    if (v) v.pause()
    finish()
  }, [finish])

  if (!visible) return null

  return (
    <Presence show={visible} exitClass="anim-fade-out" exitMs={500}>
      {(exitCls) => (
        <div
          key={replayKey}
          className={`fixed inset-0 z-[120] flex items-center justify-center bg-obsidian grid-bg overflow-hidden ${exitCls}`}
        >
          <video
            ref={videoRef}
            src={INTRO_VIDEO}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-obsidian/30" />

          <button
            onClick={skip}
            className="absolute top-5 right-5 z-10 btn-ghost text-xs flex items-center gap-2 px-4 py-2 rounded-lg anim-fade-in"
          >
            <X size={14} /> Skip Intro
          </button>

          <div className="absolute bottom-0 inset-x-0 h-1 bg-cyber/10 z-10">
            <div
              className="h-full bg-gradient-to-r from-cyber to-cobalt"
              style={{ width: `${progress}%`, boxShadow: '0 0 8px #00F2FE' }}
            />
          </div>

          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <p className="text-cyber font-display font-black text-2xl tracking-[0.3em] anim-pulse">BUNYAD</p>
            </div>
          )}

          {progress > 85 && (
            <button
              onClick={skip}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 btn-cyber flex items-center gap-2 text-sm anim-fade-in"
            >
              <Zap size={16} /> Enter Command Center
            </button>
          )}

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-platinum/40 z-10">
            Bunyad.pk · PropTech HUD · 2026
          </div>
        </div>
      )}
    </Presence>
  )
}

export default memo(CinematicIntro)
