import React, { useState } from 'react'
import { Play, Pause, Maximize2, X, Sparkles } from '../icons.jsx'

const LOGO_LOOP_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-traffic-at-night-41548-large.mp4"

export default function AnimatedLogo({ size = "md", showControls = false, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-20 h-20 rounded-2xl",
    hero: "w-32 h-32 md:w-44 md:h-44 rounded-3xl"
  }

  const togglePlay = (e) => {
    e.stopPropagation()
    const video = document.getElementById('bunyad-nav-video')
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <div 
        onClick={() => setLightboxOpen(true)}
        className={`relative group cursor-pointer select-none shrink-0 ${sizeClasses[size] || sizeClasses.md} ${className}`}
        title="BUNYAD 3D Holographic Animated Emblem (Click to Expand)"
      >
        <div className="absolute -inset-1 rounded-[inherit] bg-gradient-to-r from-cyber via-cobalt to-cyber opacity-70 group-hover:opacity-100 blur-[6px] transition-all duration-700 animate-pulse" />
        
        <div className="relative w-full h-full rounded-[inherit] bg-obsidian2 border border-cyber/50 overflow-hidden shadow-2xl flex items-center justify-center p-0.5">
          <video
            id="bunyad-nav-video"
            src={LOGO_LOOP_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700 pointer-events-none"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/40 via-transparent to-cyber/20 pointer-events-none" />
          <div className="absolute inset-0 rounded-[inherit] border border-cyber/30 pointer-events-none" />
          
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-cyber shadow-[0_0_8px_#00f0ff] animate-ping pointer-events-none" />
        </div>
      </div>

      {lightboxOpen && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-xl animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-obsidian2/90 border border-cyber/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-center"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-obsidian border border-cyber/40 text-platinum hover:text-cyber flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-square w-64 md:w-80 mx-auto rounded-2xl overflow-hidden border-2 border-cyber/60 shadow-[0_0_30px_rgba(0,240,255,0.3)] mb-4">
              <video
                src={LOGO_LOOP_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-display font-black text-xl text-platinum flex items-center justify-center gap-2">
              BUNYAD <span className="font-urdu text-cyber text-2xl">بنیاد</span>
            </h3>
            <p className="text-xs text-cyber/80 font-mono mt-1">3D Holographic Animated Emblem</p>
          </div>
        </div>
      )}
    </>
  )
}
