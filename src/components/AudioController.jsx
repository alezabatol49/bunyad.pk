import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Volume2, VolumeX } from '../icons.jsx'

const BARS_DEFAULT = [0.2, 0.35, 0.5, 0.3, 0.4]
const NUM_BARS = 5

export default function AudioController() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef(null)
  const nodesRef = useRef(null)
  const rafRef = useRef(null)
  const lastFrameRef = useRef(0)
  const barRefs = useRef([])

  const stopAudio = useCallback(() => {
    const ctx = ctxRef.current
    const nodes = nodesRef.current
    if (ctx && nodes) {
      nodes.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4)
      const ref = ctx
      setTimeout(() => { try { ref.close() } catch { /* noop */ } }, 600)
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    ctxRef.current = null
    nodesRef.current = null
    rafRef.current = null
    for (let i = 0; i < NUM_BARS; i++) {
      const el = barRefs.current[i]
      if (el) el.style.height = `${BARS_DEFAULT[i] * 100}%`
    }
  }, [])

  const animateBars = useCallback((ts) => {
    const nodes = nodesRef.current
    if (!nodes) return
    // throttle to ~20fps to avoid React re-render churn
    if (ts - lastFrameRef.current > 50) {
      lastFrameRef.current = ts
      const data = new Uint8Array(nodes.analyser.frequencyBinCount)
      nodes.analyser.getByteFrequencyData(data)
      const step = Math.floor(data.length / NUM_BARS)
      for (let i = 0; i < NUM_BARS; i++) {
        const el = barRefs.current[i]
        if (el) {
          const v = Math.max(0.15, (data[i * step] || 0) / 255)
          el.style.height = `${Math.max(10, v * 100)}%`
        }
      }
    }
    rafRef.current = requestAnimationFrame(animateBars)
  }, [])

  const startAudio = useCallback(() => {
    if (ctxRef.current) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()

    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    const droneFilter = ctx.createBiquadFilter()
    droneFilter.type = 'lowpass'
    droneFilter.frequency.value = 420
    droneFilter.Q.value = 0.8
    droneFilter.connect(master)

    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 55
    osc1.connect(droneFilter)

    const osc2 = ctx.createOscillator()
    osc2.type = 'triangle'
    osc2.frequency.value = 82.5
    osc2.detune.value = 6
    osc2.connect(droneFilter)

    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const ch = noiseBuf.getChannelData(0)
    for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * 0.5
    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuf
    noise.loop = true
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.value = 1200
    noiseFilter.Q.value = 0.6
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.04
    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(master)

    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.08
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 180
    lfo.connect(lfoGain)
    lfoGain.connect(droneFilter.frequency)

    osc1.start()
    osc2.start()
    noise.start()
    lfo.start()

    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5)

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 64
    master.connect(analyser)

    ctxRef.current = ctx
    nodesRef.current = { master, analyser }
    rafRef.current = requestAnimationFrame(animateBars)
  }, [animateBars])

  const toggle = useCallback(() => {
    if (on) { stopAudio(); setOn(false) }
    else { startAudio(); setOn(true) }
  }, [on, startAudio, stopAudio])

  useEffect(() => () => stopAudio(), [stopAudio])

  return (
    <button
      onClick={toggle}
      className="btn-ghost text-xs flex items-center gap-1.5 relative"
      title={on ? 'Mute ambient sound' : 'Tap to enable ambient sound'}
      aria-label={on ? 'Mute ambient sound' : 'Tap to enable ambient sound'}
    >
      {on ? <Volume2 size={13} className="text-cyber" /> : (
        <span className="relative flex items-center justify-center">
          <VolumeX size={13} className="text-cyber" />
          <span className="absolute inset-0 rounded-full bg-cyber/30 anim-pulse" style={{ animationDuration: '1.5s' }} />
        </span>
      )}
      <span className="hidden sm:inline">{on ? 'Sound On' : 'Tap to Play'}</span>
      {on && (
        <span className="flex items-end gap-0.5 ml-1 h-3">
          {Array.from({ length: NUM_BARS }).map((_, i) => (
            <span
              key={i}
              ref={el => { barRefs.current[i] = el }}
              className="w-0.5 bg-cyber rounded-sm"
              style={{ height: `${BARS_DEFAULT[i] * 100}%`, transition: 'height 0.08s ease-out' }}
            />
          ))}
        </span>
      )}
    </button>
  )
}
