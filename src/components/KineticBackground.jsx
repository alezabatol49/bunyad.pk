import React, { memo } from 'react'

const KineticBackground = memo(function KineticBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden grid-bg" style={{ pointerEvents: 'none', transform: 'translateZ(0)' }}>
      {/* ambient floating data nodes */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyber/30 anim-float"
          style={{
            width: `${4 + (i % 4) * 2}px`,
            height: `${4 + (i % 4) * 2}px`,
            top: `${(i * 53) % 100}%`,
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 6) * 0.8}s`,
            boxShadow: '0 0 10px rgba(0,242,254,0.6)',
            willChange: 'transform'
          }}
        />
      ))}

      {/* orbital telemetry rings — isolated on compositor layers */}
      <div className="absolute -right-40 -top-40 w-[640px] h-[640px] rounded-full border border-cyber/10 anim-spin-slow" style={{ willChange: 'transform' }}>
        <div className="absolute inset-12 rounded-full border border-cyber/10 anim-spin-rev" style={{ willChange: 'transform' }} />
        <div className="absolute inset-24 rounded-full border border-cyber/5 anim-spin-slow" style={{ willChange: 'transform' }} />
      </div>
      <div className="absolute -left-48 bottom-[-180px] w-[560px] h-[560px] rounded-full border border-cobalt/15 anim-spin-rev" style={{ willChange: 'transform' }}>
        <div className="absolute inset-10 rounded-full border border-cyber/8 anim-spin-slow" style={{ willChange: 'transform' }} />
      </div>

      {/* scan line sweep — isolated, pointer-events disabled, no React state */}
      <div className="absolute inset-0 scanline anim-scan" style={{ willChange: 'transform', pointerEvents: 'none' }} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/40 to-obsidian" />
    </div>
  )
})

export default KineticBackground
