import React from 'react'

const make = (paths, size = 24) => ({ size: s = size, className = '', strokeWidth = 2, ...rest }) => (
  <svg
    width={s} height={s} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round"
    className={className} {...rest}
  >
    {typeof paths === 'string' ? <path d={paths} /> : paths.map((p, i) => <path key={i} d={p} />)}
  </svg>
)

// App / Nav
export const Zap = make("M13 2L3 14h9l-1 8 10-12h-9l1-8z")
export const Building2 = make(["M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18Z", "M6 12h12", "M6 16h12", "M6 8h12", "M2 22h20"])
export const Wrench = make("M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-2.5z")
export const Shield = make("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z")
export const Phone = make("M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z")

// HeroLead
export const Send = make(["m22 2-7 20-4-9-9-4Z", "M22 2 11 13"])
export const CheckCircle2 = make(["M22 11.08V12a10 10 0 11-7.07-2.94", "m9 11 3 3L22 4"])
export const Mail = make(["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "m22 6-10 7L2 6"])
export const MapPin = make(["M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0116 0z", "c1 0 1-1 1-1 1 0 1 1 1 1", "c-1 0-1 1-1 1 0 0-1-1-1-1", "M12 10a2 2 0 100 .001"])

// SocietyDirectory / Media
export const Search = make(["M11 17a6 6 0 100-12 6 6 0 000 12z", "m21 21-4.35-4.35"], 24)
export const X = make(["M18 6 6 18", "M6 6l12 12"])
export const BadgeCheck = make(["M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-6.74 0 4 4 0 01-4.78-4.77 4 4 0 010-6.74Z", "m9 12 2 2 4-4"])
export const ShieldCheck = make("M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z")
export const MessageCircle = make("M7.9 20A9 9 0 104 16.1L2 22z")
export const ChevronLeft = make("m15 18-6-6 6-6")
export const ChevronRight = make("m9 18 6-6-6-6")
export const ZoomIn = make(["M11 17a6 6 0 100-12 6 6 0 000 12z", "m21 21-4.35-4.35", "M11 8v6", "M8 11h6"])
export const Image = make(["M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z", "M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z", "m21 15-5-5L5 21"])
export const Video = make(["m22 8-6 4 6 4V8z", "M2 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"])
export const CreditCard = make(["M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z", "M2 10h20"])

// AdminPanel
export const Lock = make(["M7 11V7a5 5 0 0110 0v4", "M5 11h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"])
export const LayoutDashboard = make(["M3 3h7v9H3z", "M14 3h7v5h-7z", "M14 12h7v9h-7z", "M3 16h7v5H3z"])
export const Users = make(["M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2", "M9 7a4 4 0 100 8 4 4 0 000-8z", "M22 21v-2a4 4 0 00-3-3.87", "M16 3.13a4 4 0 010 7.75"])
export const Boxes = make(["M2.97 12.92A2 2 0 014.5 11.27l7-2.27a2 2 0 011 0l7 2.27a2 2 0 011.53 1.65", "M2.97 12.92L4.5 20.73A2 2 0 006.5 22h11a2 2 0 002-1.27l1.53-7.81", "M12 7v15", "M7.5 7.5 12 9l4.5-1.5", "M7.5 7.5 12 2l4.5 5.5", "M12 9l5 14", "M12 9l-5 14"])
export const Plus = make(["M12 5v14", "M5 12h14"])
export const Trash2 = make(["M3 6h18", "M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2", "M10 11v6", "M14 11v6"])
export const UserPlus = make(["M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2", "M9 7a4 4 0 100 8 4 4 0 000-8z", "M19 8v6", "M22 11h-6"])

// AIConsultant
export const Bot = make(["M12 8V4H8", "M2 14a2 2 0 012-2h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z", "M15 13v2", "M9 13v2", "M4 20l2 2", "M20 20l-2 2", "M8 18h8"])
export const Sparkles = make(["M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"])

// AuthHub
export const LayoutGrid = make(["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"])
export const User = make(["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 11a4 4 0 100-8 4 4 0 000 8z"])
export const Handshake = make(["m11 17 2 2a1 1 0 102-2", "m10 14 2.5 2.5a1 1 0 102-2", "M21 12a1 1 0 00-1-1l-5-5a2 2 0 00-2.83 0L5 12", "M2 12l5 5a2 2 0 002.83 0L12 15"])
export const Crown = make(["M2 4l4 5 6-5 6 5 4-5-2 14H4L2 4z"])
export const FileText = make(["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M8 9h2"])
export const Download = make(["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"])
export const TrendingUp = make(["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"])
export const Wallet = make(["M19 7V4a1 1 0 00-1-1H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2v-3", "M3 5v14", "M18 12a2 2 0 00-2 2c0 1.1.9 2 2 2h3v-4h-3z"])
export const IdCard = make(["M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z", "M6 10h4", "M6 14h4", "M15 10h3", "M15 14h3"])

// BookingModal
export const Upload = make(["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"])

// AudioController
export const Volume2 = make(["M11 5L6 9H2v6h4l5 4V5z", "M19.07 4.93a10 10 0 010 14.14", "M15.54 8.46a5 5 0 010 7.07"])
export const VolumeX = make(["M11 5L6 9H2v6h4l5 4V5z", "M23 9l-6 6", "M17 9l6 6"])

// UtilitySuite
export const Ruler = make(["M21.3 8.7L8.7 21.3a1 1 0 01-1.4 0L2.7 16.7a1 1 0 010-1.4L15.3 2.7a1 1 0 011.4 0l4.6 4.6a1 1 0 010 1.4z", "M7.5 10.5l2 2", "M10.5 7.5l2 2", "M13.5 4.5l2 2", "M4.5 13.5l2 2"])
export const Calculator = make(["M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4z", "M8 6h8", "M8 10h2", "M14 10h2", "M8 14h2", "M14 14h2", "M8 18h8"])

// New modules
export const Home = make(["M3 12l9-9 9 9", "M5 10v10h14V10", "M9 20v-6h6v6"])
export const Gavel = make(["M14 14l-7 7-3-3 7-7", "m11 7 3 3", "M16 3l5 5-3 3-5-5z", "M2 22h6"])
export const MapIcon = make(["M9 3l-6 3v15l6-3 6 3 6-3V3l-6 3-6-3z", "M9 3v15", "M15 6v15"])
export const Database = make(["M12 8a8 3 0 100 6 8 3 0 000-6z", "M4 5v14a8 3 0 0016 0V5a8 3 0 00-16 0z", "M4 12a8 3 0 0016 0"])
export const ArrowLeft = make(["M19 12H5", "M12 19l-7-7 7-7"])
export const Compass = make(["M12 22a10 10 0 100-20 10 10 0 000 20z", "m16 8-4 8-4 2 2-4 4-2z"])
export const Layers = make(["M12 2L2 7l10 5 10-5-10-5z", "m2 12 10 5 10-5", "m2 17 10 5 10-5"])
export const Briefcase = make(["M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z", "M8 7V5a2 2 0 012-2h6a2 2 0 012 2v2", "M2 13h20"])
