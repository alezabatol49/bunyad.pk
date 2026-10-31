import React from 'react'

const I = ({ d }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

export const Cement = () => <I d="M5 8l7-4 7 4v8l-7 4-7-4V8z M5 8l7 4 7-4 M12 12v8" />
export const Steel = () => <I d="M4 20h16 M6 16l12-12 M8 20a2 2 0 100-4 2 2 0 000 4z M16 20a2 2 0 100-4 2 2 0 000 4z" />
export const Bricks = () => <I d="M3 9h18v6H3z M3 12h18 M9 9v6 M15 9v6" />
export const Crush = () => <I d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" />
