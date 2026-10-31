import React, { useState, useRef, useEffect, memo } from 'react'
import { Bot, X, Send, Sparkles } from '../icons.jsx'
import { askGemini, isGeminiConfigured } from '../lib/gemini.js'
import { CEO_PHONE } from '../data/societies.js'

function AIConsultant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [msgs, setMsgs] = useState([
    {
      role: 'model',
      text: "As-salam-u-alaikum! I am Bunyad's AI Civil Construction Consultant, supervised by CEO Taha Mubeen Bhutta. Ask me about LDA Avenue 1 bylaws, plot valuation, construction costs, or escrow milestones."
    }
  ])
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, open])

  const send = async () => {
    if (!input.trim() || busy) return
    const userText = input.trim()
    setMsgs(m => [...m, { role: 'user', text: userText }])
    setInput('')
    setBusy(true)
    const history = msgs.map(m => ({ role: m.role, text: m.text }))
    const res = await askGemini(userText, history)
    setMsgs(m => [...m, { role: 'model', text: res.text }])
    setBusy(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full cyber-border cyber-glow bg-obsidian2 flex items-center justify-center anim-glow-pulse hover-scale"
        aria-label="Bunyad AI Consultant"
      >
        {open ? <X className="text-cyber" /> : <Bot className="text-cyber" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-5 z-[90] w-[min(92vw,400px)] glass-strong rounded-2xl cyber-border overflow-hidden anim-slide-up"
        >
          <div className="px-4 py-3 border-b border-cyber/20 flex items-center gap-2 bg-obsidian2">
            <Sparkles size={16} className="text-cyber" />
            <div className="flex-1">
              <p className="text-sm font-bold text-platinum">Bunyad AI Consultant</p>
              <p className="text-[10px] text-cyber/70 uppercase tracking-wider">
                {isGeminiConfigured ? 'Gemini 2.5 Flash · Live' : 'Demo Mode'}
              </p>
            </div>
          </div>

          <div className="h-[300px] overflow-y-auto px-3 py-3 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] text-[13px] leading-relaxed rounded-xl px-3 py-2 ${
                    m.role === 'user'
                      ? 'bg-cobalt/40 text-platinum border border-cobalt/60'
                      : 'glass text-platinum/90 border border-cyber/20'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="glass rounded-xl px-3 py-2 text-cyber text-[13px] anim-pulse">Consulting…</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-2 border-t border-cyber/20 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about LDA bylaws, costs, valuation…"
              className="flex-1 bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum placeholder:text-platinum/40 focus:outline-none focus:border-cyber"
            />
            <button onClick={send} disabled={busy} className="btn-cyber px-3 py-2 disabled:opacity-50">
              <Send size={16} />
            </button>
          </div>
          <div className="px-3 pb-2 text-[10px] text-platinum/40">
            Direct line: {CEO_PHONE} (WhatsApp)
          </div>
        </div>
      )}
    </>
  )
}

export default memo(AIConsultant)
