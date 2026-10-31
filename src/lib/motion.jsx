import React, { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Drop-in replacements for framer-motion, using pure CSS animations.
 * - <Presence> replaces <AnimatePresence> for mount/unmount transitions
 * - <Motion> replaces motion.div/button/span with CSS-based initial→animate→exit
 */

const ANIM_MAP = {
  fadeIn: 'anim-fade-in',
  fadeOut: 'anim-fade-out',
  scaleIn: 'anim-scale-in',
  scaleOut: 'anim-scale-out',
  slideUp: 'anim-slide-up',
  slideLeft: 'anim-slide-left',
  slideRight: 'anim-slide-right',
  glowPulse: 'anim-glow-pulse',
  pulse: 'anim-pulse',
  spinSlow: 'anim-spin-slow',
  spinRev: 'anim-spin-rev',
  float: 'anim-float',
  scan: 'anim-scan',
  ticker: 'anim-ticker',
}

/** Wraps conditional content, delaying unmount until exit CSS animation finishes. */
export function Presence({ show, children, exitClass = 'anim-fade-out', exitMs = 400 }) {
  const [mounted, setMounted] = useState(show)
  const [exiting, setExiting] = useState(false)
  const prevShow = useRef(show)

  useEffect(() => {
    if (show && !mounted) {
      setMounted(true)
      setExiting(false)
    } else if (!show && mounted && prevShow.current) {
      setExiting(true)
      const t = setTimeout(() => {
        setMounted(false)
        setExiting(false)
      }, exitMs)
      return () => clearTimeout(t)
    }
    prevShow.current = show
  }, [show, mounted, exitMs])

  if (!mounted) return null
  return <>{typeof children === 'function' ? children(exiting ? exitClass : '') : children}</>
}

/**
 * Lightweight motion replacement.
 * Props: as (tag), anim (animation key from ANIM_MAP), className, style, children, onClick, etc.
 * Hover/tap effects are applied via CSS classes: hover-lift, hover-scale, hover-tap.
 */
export function Motion({
  as: Tag = 'div',
  anim = 'fadeIn',
  className = '',
  style,
  children,
  hover,
  ...rest
}) {
  const animClass = ANIM_MAP[anim] || ''
  const hoverClass = hover === 'lift' ? 'hover-lift' : hover === 'scale' ? 'hover-scale' : ''
  return (
    <Tag className={`${animClass} ${hoverClass} ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  )
}
