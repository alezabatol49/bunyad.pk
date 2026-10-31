import React, { useState } from 'react';
import { CEO_PHONE, waLink } from '../data/societies.js';

const SECTORS = [
  { block: 'Sector A', size: '1 Kanal, 10 Marla', possession: 'Full Possession', status: 'Developed', highlight: 'Main Boulevard Entry from Raiwind Road' },
  { block: 'Sector B', size: '1 Kanal, 10 Marla', possession: 'Full Possession', status: 'Developed', highlight: 'Direct Access from Shahkam Chowk Flyover' },
  { block: 'Sector C', size: '10 Marla, 1 Kanal', possession: 'Full Possession', status: 'High Construction', highlight: 'Prime Central Commercial & Park Facing' },
  { block: 'Sector D', size: '10 Marla, 5 Marla', possession: 'Full Possession', status: 'High Density', highlight: 'Ideal Residential & Rapid House Construction' },
  { block: 'Sector E', size: '10 Marla, 1 Kanal', possession: 'Partial Possession', status: 'Development in Progress', highlight: 'Near Defence Road Link & Green Belts' },
  { block: 'Sector F', size: '1 Kanal, 10 Marla', possession: 'Full Possession', status: 'Developed', highlight: 'Adjacent to Jubilee Town & Canal Link' },
  { block: 'Sector G', size: '10 Marla, 1 Kanal', possession: 'Partial Possession', status: 'Active Development', highlight: 'Surrounded by Wide Boulevards' },
  { block: 'Sector H', size: '10 Marla, 1 Kanal', possession: 'In Litigation / Non-Possession', status: 'Clearance Underway', highlight: 'LDA Balloting & Litigation Resolution Desk' },
  { block: 'Sector J', size: '5 Marla, 10 Marla, 1 Kanal', possession: 'Full Possession', status: 'Bin Taha Flagship Office', highlight: 'Prime Commercial Hub & Executive Dealings' },
  { block: 'Sector K', size: '1 Kanal, 10 Marla', possession: 'Full Possession', status: 'Prime Residential', highlight: 'Wide 80ft Boulevards & Underground Electrification' },
  { block: 'Sector L', size: '1 Kanal, 2 Kanal', possession: 'Developing', status: 'Investment Hotspot', highlight: 'Executive Villas & Turnkey Construction' },
  { block: 'Sector M', size: '1 Kanal, 10 Marla', possession: 'Full Possession', status: 'Rapid Construction', highlight: 'Direct Connection to Canal Bank Road' }
];

export default function MasterMaps() {
  const [activeSector, setActiveSector] = useState(SECTORS[8]); // Sector J default
  const [zoomLevel, setZoomLevel] = useState(1);

  const officialMapUrl = 'https://drive.google.com/file/d/1Iqfo07dIIxBm-DiGKJ6sbodc-o2ieDu7/view?usp=drivesdk';

  const handleConsultSector = (sec) => {
    const text = `Assalam-o-Alaikum CEO Taha Mubeen Bhutta,\nI am interested in LDA Avenue 1 ${sec.block} (${sec.size}). Please share available inventory, verified DC rates, and possession status.`;
    window.open(waLink(CEO_PHONE, text), '_blank');
  };

  return (
    <section id="master-maps" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-cyber/20 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-cyber font-mono font-bold">
              Official Master Layout & Plot Navigator
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-platinum font-display">
            LDA Avenue 1 Master Plan <span className="text-cyber text-lg block sm:inline font-arabic sm:mr-2">ماسٹر پلان و سیکٹر نقشہ جات</span>
          </h2>
          <p className="text-xs sm:text-sm text-platinum/70 mt-1 max-w-2xl">
            Official high-definition layout plan for LDA Avenue 1 (Sectors A to M). Verified plot locations, possession demarcation, and direct CEO consultation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={officialMapUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-cyber text-xs px-4 py-2.5 flex items-center gap-2 font-bold whitespace-nowrap"
          >
            <span>Download High-Res Vector Map (15 MB)</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Sector Navigator + Map Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sectors List */}
        <div className="lg:col-span-4 space-y-2 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin">
          <p className="text-xs font-mono text-cyber font-bold mb-2 uppercase">Select Sector (A - M):</p>
          {SECTORS.map((sec) => (
            <div
              key={sec.block}
              onClick={() => setActiveSector(sec)}
              className={`p-3.5 rounded-xl cursor-pointer transition-all border text-xs ${
                activeSector.block === sec.block
                  ? 'bg-cyber/15 border-cyber shadow-lg shadow-cyber/10'
                  : 'glass border-cyber/15 hover:border-cyber/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-platinum text-sm">{sec.block}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  sec.possession.includes('Full') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {sec.possession}
                </span>
              </div>
              <p className="text-[11px] text-platinum/60 mt-1">Sizes: {sec.size}</p>
              <p className="text-[10px] text-cyber/80 font-mono mt-0.5">Key: {sec.highlight}</p>
            </div>
          ))}
        </div>

        {/* Right: Map Interactive HUD */}
        <div className="lg:col-span-8 flex flex-col justify-between glass-strong rounded-2xl cyber-border p-5 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-cyber/15 mb-4">
            <div>
              <span className="text-xs font-mono text-cyber uppercase">Active Selection:</span>
              <h3 className="font-bold text-platinum text-lg">{activeSector.block} Details</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(z => Math.max(0.8, z - 0.2))}
                className="btn-ghost px-2.5 py-1 text-xs"
              >
                - Zoom
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="btn-ghost px-2.5 py-1 text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setZoomLevel(z => Math.min(2.2, z + 0.2))}
                className="btn-ghost px-2.5 py-1 text-xs"
              >
                + Zoom
              </button>
            </div>
          </div>

          {/* Interactive Map Visual Stage */}
          <div className="relative w-full h-[360px] rounded-xl overflow-hidden bg-obsidian2 border border-cyber/20 flex items-center justify-center">
            <div
              style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.25s ease' }}
              className="w-full h-full flex items-center justify-center p-4 relative"
            >
              <img
                src="https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1400&q=80"
                alt="LDA Avenue 1 Master Map"
                className="w-full h-full object-cover opacity-35 rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-obsidian/40 backdrop-blur-[2px]">
                <div className="w-14 h-14 rounded-full border-2 border-cyber flex items-center justify-center text-cyber font-mono font-black text-xl mb-3 shadow-lg shadow-cyber/30 animate-pulse">
                  {activeSector.block.replace('Sector ', '')}
                </div>
                <h4 className="text-lg font-black text-platinum mb-1">{activeSector.block} — LDA Avenue 1</h4>
                <p className="text-xs text-platinum/80 max-w-md mb-2">{activeSector.highlight}</p>
                <div className="flex flex-wrap gap-2 justify-center text-[10px] font-mono">
                  <span className="px-2.5 py-1 rounded bg-obsidian2 border border-cyber/30 text-cyber font-bold">
                    Possession: {activeSector.possession}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-obsidian2 border border-cyber/30 text-platinum/90">
                    Sizes: {activeSector.size}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-cyber/15 mt-4">
            <p className="text-[11px] text-platinum/60 text-center sm:text-left">
              Official verification & litigation-free allotment records verified by Bin Taha Associates.
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={officialMapUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs px-3 py-2 text-center w-full sm:w-auto"
              >
                Open Full Screen
              </a>
              <button
                onClick={() => handleConsultSector(activeSector)}
                className="btn-cyber text-xs px-4 py-2 text-center font-bold whitespace-nowrap w-full sm:w-auto"
              >
                Inquire Plots in {activeSector.block}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
