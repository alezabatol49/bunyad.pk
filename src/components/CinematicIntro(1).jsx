import React, { useState, useEffect } from 'react';
import { CEO_NAME, CEO_URDU } from '../data/societies.js';

export default function CinematicIntro({ onDone }) {
  const [step, setStep] = useState(0); // 0: plot foundation, 1: pillars rising, 2: floor by floor, 3: 360 rotation & complete, 4: ready
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 65 sparkling ambient particles across the screen
    const pts = Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
      opacity: Math.random() * 0.7 + 0.3
    }));
    setParticles(pts);

    // Cinematic Building Construction Sequence
    const t1 = setTimeout(() => setStep(1), 700);  // Pillars
    const t2 = setTimeout(() => setStep(2), 1600); // Floors rise
    const t3 = setTimeout(() => setStep(3), 2600); // Tower complete + 360 Full Rotation
    const t4 = setTimeout(() => setStep(4), 3800); // Enter Ready

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] bg-obsidian flex flex-col items-center justify-center overflow-hidden select-none">
      {/* 3D Perspective Grid Background */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, transparent 60%), linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      />

      {/* Floating Star / Particle Dust */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: '0 0 8px #00f0ff, 0 0 14px #ffffff',
            animation: `pulse ${p.duration}s infinite ease-in-out ${p.delay}s`
          }}
        />
      ))}

      {/* 3D Construction Stage */}
      <div className="relative flex flex-col items-center justify-center z-10 scale-90 sm:scale-105 md:scale-115">
        
        {/* Holographic 3D Rotating Tower Stage */}
        <div 
          className="relative w-56 h-72 flex items-end justify-center mb-6"
          style={{ perspective: '1200px' }}
        >
          {/* Ground Plot Grid (Step 0) */}
          <div 
            className="absolute -bottom-4 w-52 h-20 rounded-full border border-cyber/50 bg-cyber/10 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-1000"
            style={{
              transform: 'rotateX(75deg)',
              animation: 'spin 18s linear infinite'
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-dashed border-cyber/40" />
          </div>

          {/* 3D Rotating Architectural Skyscraper Container */}
          <div 
            className="relative w-36 h-60 flex flex-col items-center justify-end transition-all duration-1000"
            style={{
              transformStyle: 'preserve-3d',
              transform: step >= 3 
                ? 'rotateY(360deg)' 
                : 'rotateY(25deg) rotateX(8deg)',
              transition: step >= 3 ? 'transform 3.2s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 1s ease'
            }}
          >
            {/* Crown / Spire (Step 3) */}
            <div 
              className={`w-1 bg-gradient-to-t from-cyber to-white transition-all duration-700 ${
                step >= 3 ? 'h-10 opacity-100 shadow-[0_0_12px_#00f0ff]' : 'h-0 opacity-0'
              }`}
            />
            {step >= 3 && (
              <div className="w-3 h-3 rounded-full bg-cyber shadow-[0_0_16px_#00f0ff] animate-ping" />
            )}

            {/* Skyscraper Floor Blocks (Step 2: Floors Rise 1 to 6) */}
            {[
              { floor: 6, w: 'w-16', h: 'h-6', delay: 'delay-500' },
              { floor: 5, w: 'w-20', h: 'h-7', delay: 'delay-400' },
              { floor: 4, w: 'w-24', h: 'h-8', delay: 'delay-300' },
              { floor: 3, w: 'w-28', h: 'h-9', delay: 'delay-200' },
              { floor: 2, w: 'w-32', h: 'h-10', delay: 'delay-100' },
              { floor: 1, w: 'w-36', h: 'h-12', delay: 'delay-0' }
            ].map((f) => (
              <div
                key={f.floor}
                className={`${f.w} ${f.h} mx-auto my-0.5 rounded-lg border border-cyber/60 bg-gradient-to-r from-obsidian2 via-cyber/20 to-obsidian2 shadow-[0_0_15px_rgba(0,240,255,0.25)] flex items-center justify-between px-2 transition-all duration-700 ${
                  step >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-75'
                }`}
                style={{
                  boxShadow: 'inset 0 0 10px rgba(0,240,255,0.3), 0 0 12px rgba(0,240,255,0.2)'
                }}
              >
                {/* Micro Windows Glowing */}
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-sm bg-cyber/80 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1.5 h-1.5 rounded-sm bg-cyber/80 shadow-[0_0_4px_#00f0ff]" />
                </div>
                <span className="text-[7px] font-mono text-cyber/70 font-bold">L{f.floor}</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-sm bg-cyber/80 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1.5 h-1.5 rounded-sm bg-cyber/80 shadow-[0_0_4px_#00f0ff]" />
                </div>
              </div>
            ))}

            {/* Foundation Pillars & Concrete Beams (Step 1) */}
            <div className={`w-40 flex justify-between px-2 pt-1 transition-all duration-700 ${
              step >= 1 ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
            }`}>
              <div className="w-3 h-8 bg-gradient-to-b from-cyber to-amber-500 rounded-sm shadow-[0_0_8px_#00f0ff]" />
              <div className="w-3 h-8 bg-gradient-to-b from-cyber to-amber-500 rounded-sm shadow-[0_0_8px_#00f0ff]" />
              <div className="w-3 h-8 bg-gradient-to-b from-cyber to-amber-500 rounded-sm shadow-[0_0_8px_#00f0ff]" />
              <div className="w-3 h-8 bg-gradient-to-b from-cyber to-amber-500 rounded-sm shadow-[0_0_8px_#00f0ff]" />
            </div>
          </div>
        </div>

        {/* Brand Typography & HUD Badges */}
        <div className="text-center space-y-2 max-w-lg px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber/10 border border-cyber/30 text-cyber text-[10px] font-mono tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyber animate-ping" />
            3D Structural Genesis Complete
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-wider text-platinum drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
            BUNYAD <span className="text-cyber font-urdu text-4xl sm:text-6xl">بنیاد</span>
          </h1>

          <p className="text-xs sm:text-sm text-platinum/70 font-medium">
            Next-Gen PropTech, Civil Engineering & Real Estate Mega-Platform
          </p>
          <p className="text-[11px] font-mono text-cyber/80">
            Powered by Bin Taha Associates & Builders • CEO {CEO_NAME} ({CEO_URDU})
          </p>
        </div>

        {/* Enter Portal Interactive Command Trigger */}
        <div className="mt-8">
          <button
            onClick={onDone}
            className="group relative px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyber via-blue-500 to-cyber text-obsidian font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_45px_rgba(0,240,255,0.9)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-obsidian group-hover:animate-ping" />
            <span>Enter BUNYAD Portal (پورٹل میں داخل ہوں)</span>
            <span className="text-xs font-mono font-bold">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
