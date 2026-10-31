import React, { memo, useEffect, useState, useMemo } from 'react'
import { Cement, Steel, Bricks, Crush } from '../data/tickerIcons.jsx'

const PKR = 'PKR'
const RATES = [
  { label: 'Cement', value: 1540, unit: '/Bag', icon: 'cement' },
  { label: 'Grade-60 Steel Saria', value: 282, unit: '/Kg', icon: 'steel' },
  { label: 'Awwal Bricks', value: 21, unit: '/Pc', icon: 'bricks' },
  { label: 'Margalla Crush', value: 330, unit: '/CFT', icon: 'crush' }
]

const CITIES = [
  { code: 'PK', tz: 'Asia/Karachi' },
  { code: 'DXB', tz: 'Asia/Dubai' },
  { code: 'LDN', tz: 'Europe/London' },
  { code: 'NY', tz: 'America/New_York' }
]

const FX = [
  { from: 'PKR', to: 'USD', rate: 1 / 278 },
  { from: 'PKR', to: 'AED', rate: 1 / 75.7 },
  { from: 'PKR', to: 'GBP', rate: 1 / 354 }
]

const PKR_BASE = 100000

function renderIcon(k) {
  switch (k) {
    case 'cement': return <Cement />
    case 'steel': return <Steel />
    case 'bricks': return <Bricks />
    case 'crush': return <Crush />
    default: return null
  }
}

// Single clock that updates every 30s — displays only HH:MM so no visible tick loss
function CityClocks() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 30000)
    return () => clearInterval(t)
  }, [])
  return CITIES.map(c => {
    const time = new Date().toLocaleTimeString('en-GB', { timeZone: c.tz, hour: '2-digit', minute: '2-digit', hour12: true })
    return (
      <span key={c.code} className="inline-flex items-center gap-2">
        <span className="text-cyber font-bold">{c.code}</span>
        <span className="text-platinum font-semibold">{time}</span>
      </span>
    )
  })
}

const Ticker = memo(function Ticker() {
  const staticItems = useMemo(() => {
    const rateItems = RATES.map(r => (
      <span key={r.label} className="inline-flex items-center gap-2">
        <span className="text-cyber">{renderIcon(r.icon)}</span>
        <span className="text-platinum/70">{r.label}</span>
        <span className="text-platinum font-semibold">PKR {r.value.toLocaleString()} {r.unit}</span>
      </span>
    ))
    const fxItems = FX.map(f => (
      <span key={f.to} className="inline-flex items-center gap-2">
        <span className="text-platinum/70">{PKR} {PKR_BASE.toLocaleString()} =</span>
        <span className="text-cyber font-semibold">
          {f.to === 'USD' && `$${(PKR_BASE * f.rate).toFixed(2)}`}
          {f.to === 'AED' && `${(PKR_BASE * f.rate).toFixed(2)} د.إ`}
          {f.to === 'GBP' && `£${(PKR_BASE * f.rate).toFixed(2)}`}
        </span>
      </span>
    ))
    const misc = [
      <span key="ceo" className="inline-flex items-center gap-2 text-cyber font-semibold">
        CEO Helpline: 0321-9404812
      </span>,
      <span key="apk" className="text-platinum/70">APK</span>,
      <span key="ios" className="text-platinum/70">iOS</span>,
      <span key="pc" className="text-platinum/70">PC</span>
    ]
    return [...rateItems, ...fxItems, ...misc]
  }, [])

  const allItems = [...staticItems, <CityClocks key="clocks" />]
  const loop = [...allItems, ...allItems]

  return (
    <div className="relative overflow-hidden border-b border-cyber/15 bg-obsidian/80 backdrop-blur-md" style={{ willChange: 'auto' }}>
      <div className="flex whitespace-nowrap anim-ticker py-1.5 text-[11px] tracking-wide" style={{ willChange: 'transform' }}>
        {loop.map((it, i) => (
          <span key={i} className="mx-5 inline-flex items-center gap-2">
            {it}
            <span className="text-cyber/40 mx-1">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
})

export default Ticker
