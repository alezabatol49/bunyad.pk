import React, { useState } from 'react'
import { CreditCard, X, Upload, CheckCircle2, FileText, Building2, Wallet } from '../icons.jsx'
import { SOCIETIES, waLink, CEO_PHONE } from '../data/societies.js'
import { Presence } from '../lib/motion.jsx'

const GATEWAYS = [
  { id: 'sadapay', label: 'SadaPay', detail: 'Account: Bin Taha Associates · 0321-9404812' },
  { id: 'nayapay', label: 'NayaPay', detail: 'Tag: @bintaha · 0321-9404812' },
  { id: 'raast', label: 'Raast (IBAN)', detail: 'IBAN: PK36MEZN00000003219404812' },
  { id: 'jazzcash', label: 'JazzCash', detail: 'Mobile Account: 0321-9404812' },
  { id: 'easypaisa', label: 'EasyPaisa', detail: 'Mobile Account: 0321-9404812' },
  { id: 'bank', label: 'Bank Transfer', detail: 'Meezan Bank · A/C 0123456789012' }
]

export default function BookingModal({ open, onClose, society, unitLabel }) {
  const [gateway, setGateway] = useState('sadapay')
  const [amount, setAmount] = useState('100000')
  const [slip, setSlip] = useState(null)
  const [step, setStep] = useState('form')
  const [receiptId, setReceiptId] = useState('')

  if (!society) return null

  const reset = () => {
    setStep('form')
    setSlip(null)
    setAmount('100000')
    setGateway('sadapay')
  }

  const close = () => {
    onClose()
    setTimeout(reset, 300)
  }

  const submit = (e) => {
    e.preventDefault()
    const id = 'TKN-' + Date.now().toString(36).toUpperCase().slice(-8)
    setReceiptId(id)
    setStep('receipt')
  }

  const fmtPKR = (n) => {
    const num = parseInt(n) || 0
    return num >= 10000000 ? `PKR ${(num / 10000000).toFixed(2)} Crore` : num >= 100000 ? `PKR ${(num / 100000).toFixed(2)} Lakh` : `PKR ${num.toLocaleString()}`
  }

  return (
    <Presence show={open && !!society} exitClass="anim-fade-out" exitMs={400}>
      {(exitCls) => (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur anim-fade-in ${exitCls}`}
          onClick={close}
        >
          <div
            className={`glass-strong rounded-2xl cyber-border w-full max-w-lg max-h-[92vh] overflow-y-auto anim-scale-in ${exitCls}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-cyber/20 bg-obsidian2/90 backdrop-blur">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-cyber" />
                <h3 className="font-display font-bold text-platinum">
                  {step === 'receipt' ? 'Token Receipt' : 'Book / Token Deposit'}
                </h3>
              </div>
              <button onClick={close} className="text-platinum/60 hover:text-cyber p-2"><X size={20} /></button>
            </div>

            {step === 'form' ? (
              <form onSubmit={submit} className="p-5 space-y-5">
                <div className="glass rounded-xl border border-cyber/15 p-3 flex items-center gap-3">
                  <Building2 size={20} className="text-cyber shrink-0" />
                  <div>
                    <p className="text-sm text-platinum font-semibold">{society.name}</p>
                    <p className="text-[11px] text-platinum/60">{unitLabel || '5 Marla Plot'} · {society.corridor}</p>
                  </div>
                </div>

                <div>
                  <label className="hud-label">Token Deposit Amount (PKR)</label>
                  <div className="flex gap-2 mt-1">
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min="1000"
                      className="flex-1 bg-obsidian2 border border-cyber/20 rounded-lg px-3 py-2 text-sm text-platinum" />
                    <div className="flex gap-1">
                      {['100000', '500000', '1000000'].map(a => (
                        <button type="button" key={a} onClick={() => setAmount(a)}
                          className={`text-[11px] px-2 py-1 rounded-lg border ${amount === a ? 'border-cyber text-cyber bg-cyber/10' : 'border-cyber/20 text-platinum/60'}`}>
                          {a === '100000' ? '1L' : a === '500000' ? '5L' : '10L'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[12px] text-cyber mt-1 font-semibold">{fmtPKR(amount)}</p>
                </div>

                <div>
                  <label className="hud-label flex items-center gap-1.5"><Wallet size={12} /> Select Payment Gateway</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {GATEWAYS.map(g => (
                      <button type="button" key={g.id} onClick={() => setGateway(g.id)}
                        className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border transition-all ${gateway === g.id ? 'border-cyber bg-cyber/10 cyber-glow' : 'border-cyber/20 hover:bg-cyber/5'}`}>
                        <span className={`text-[12px] font-semibold ${gateway === g.id ? 'text-cyber' : 'text-platinum/70'}`}>{g.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-platinum/60 mt-2 glass rounded-lg border border-cyber/15 px-3 py-2">
                    {GATEWAYS.find(g => g.id === gateway)?.detail}
                  </p>
                </div>

                <div>
                  <label className="hud-label flex items-center gap-1.5"><Upload size={12} /> Upload Transaction Slip</label>
                  <div className="mt-1">
                    <label className="flex flex-col items-center justify-center gap-2 cursor-pointer glass rounded-lg border border-dashed border-cyber/30 px-4 py-6 hover:bg-cyber/5 transition-all">
                      {slip ? (
                        <p className="text-sm text-cyber flex items-center gap-1.5"><CheckCircle2 size={14} /> {slip.name}</p>
                      ) : (
                        <>
                          <Upload size={20} className="text-cyber/60" />
                          <p className="text-[12px] text-platinum/60">Tap to upload payment screenshot / slip</p>
                        </>
                      )}
                      <input type="file" accept="image/*,application/pdf" className="hidden"
                        onChange={e => setSlip(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-cyber w-full flex items-center justify-center gap-2" disabled={!amount}>
                  <FileText size={16} /> Generate Token Receipt
                </button>
                <p className="text-[10px] text-platinum/40 text-center">By booking, you agree to Bunyad escrow terms. Token is refundable per policy.</p>
              </form>
            ) : (
              <Receipt society={society} unitLabel={unitLabel} amount={fmtPKR(amount)} gateway={GATEWAYS.find(g => g.id === gateway)?.label} slip={slip} receiptId={receiptId} onNew={reset} onClose={close} />
            )}
          </div>
        </div>
      )}
    </Presence>
  )
}

function Receipt({ society, unitLabel, amount, gateway, slip, receiptId, onNew, onClose }) {
  const download = () => {
    const text = [
      'BUNYAD — TOKEN DEPOSIT RECEIPT',
      '==============================',
      `Receipt ID: ${receiptId}`,
      `Date: ${new Date().toLocaleString()}`,
      `Society: ${society.name}`,
      `Unit: ${unitLabel || '5 Marla Plot'}`,
      `Corridor: ${society.corridor}`,
      `Token Amount: ${amount}`,
      `Payment Gateway: ${gateway}`,
      `Slip Uploaded: ${slip ? 'Yes — ' + slip.name : 'No'}`,
      '',
      'CEO: Taha Mubeen Bhutta',
      `Direct: ${CEO_PHONE}`,
      'Bin Taha Associates & Builders',
      '',
      'This is a system-generated token receipt. Final allotment subject to verification.'
    ].join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${receiptId}-token.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-5 space-y-4 anim-fade-in">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-cyber/15 border border-cyber flex items-center justify-center mx-auto cyber-glow anim-scale-in">
          <CheckCircle2 size={32} className="text-cyber" />
        </div>
        <p className="text-sm text-platinum font-semibold mt-3">Token Deposit Confirmed</p>
        <p className="text-[11px] text-cyber/70 mt-1">Receipt #{receiptId}</p>
      </div>

      <div className="glass rounded-xl border border-cyber/20 p-4 space-y-2">
        {[
          ['Society', society.name],
          ['Unit', unitLabel || '5 Marla Plot'],
          ['Token Amount', amount],
          ['Payment Method', gateway],
          ['Slip', slip ? slip.name : 'Not uploaded'],
          ['Date', new Date().toLocaleString()]
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between items-center text-sm">
            <span className="text-platinum/60 text-[12px]">{k}</span>
            <span className="text-platinum font-medium text-[12px] text-right">{v}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={download} className="btn-cyber flex-1 flex items-center justify-center gap-2 text-xs">
          <FileText size={14} /> Download Receipt
        </button>
        <a href={waLink(`Assalam-u-alaikum CEO Taha Mubeen Bhutta, I have booked a token for ${society.name} (${unitLabel || '5 Marla'}). Receipt #${receiptId}. Amount: ${amount} via ${gateway}.`)}
          target="_blank" rel="noreferrer"
          className="btn-ghost flex-1 flex items-center justify-center gap-2 text-xs">
          Notify CEO · WhatsApp
        </a>
      </div>
      <button onClick={onNew} className="w-full text-[11px] text-cyber/70 hover:text-cyber">Book another unit</button>
    </div>
  )
}
