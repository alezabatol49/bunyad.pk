import React, { useState } from 'react';
import { CEO_PHONE, waLink, SOCIETIES } from '../data/societies.js';

export default function AddPropertyModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    purpose: 'Sale',
    type: 'Residential Plot',
    society: 'LDA Avenue 1',
    block: 'Sector J',
    size: '10 Marla',
    demand: '',
    phone: '03219404812',
    name: '',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.demand) {
      alert('Please fill in your name and demand price.');
      return;
    }

    const leadMsg = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      subject: `Property Listing: ${formData.size} ${formData.type} in ${formData.society} (${formData.block})`,
      demand: formData.demand,
      details: formData.details || 'Direct owner listing',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Save locally
    const existing = JSON.parse(localStorage.getItem('bunyad_listings') || '[]');
    existing.unshift(leadMsg);
    localStorage.setItem('bunyad_listings', JSON.stringify(existing));

    // Webhook sync to Google Sheet
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbz7G5kOgtVNnWTeDXeiki30lXlMrSLlf6nvVaQjXYxwr56KLf54b9IMPOw3LQho8DvO/exec';
    fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadMsg)
    }).catch(err => console.log('Sheet sync notice:', err));

    // Send direct WhatsApp to CEO
    const waText = `Assalam-o-Alaikum CEO Taha Mubeen Bhutta,\nNew Property Listed on BUNYAD Portal:\n- Type: ${formData.type} (${formData.purpose})\n- Location: ${formData.society}, Block/Sector: ${formData.block}\n- Size: ${formData.size}\n- Demand: ${formData.demand}\n- Listed By: ${formData.name} (${formData.phone})\n- Remarks: ${formData.details || 'None'}`;
    
    window.open(waLink(CEO_PHONE, waText), '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
      <div className="glass-strong rounded-2xl cyber-border w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-platinum/60 hover:text-cyber p-2 text-sm font-mono"
        >
          [ESC / CLOSE]
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyber animate-pulse"></span>
          <span className="text-xs uppercase tracking-widest text-cyber font-mono font-bold">
            Client & Realtor Listing Desk
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-platinum font-display mb-1">
          Post Your Property Listing <span className="text-cyber text-base font-arabic">پراپرٹی کا اندراج</span>
        </h3>
        <p className="text-xs text-platinum/70 mb-6">
          Submit your residential or commercial plot, turnkey home, or file. Direct verification by Bin Taha Associates.
        </p>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 font-bold text-2xl">
              ✓
            </div>
            <h4 className="text-lg font-bold text-platinum">Listing Submitted Successfully!</h4>
            <p className="text-xs text-platinum/70 max-w-md mx-auto">
              Your property details have been recorded and sent directly to CEO Taha Mubeen Bhutta via WhatsApp. Our field evaluation team will verify the documents shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="btn-cyber text-xs px-6 py-2.5 font-bold"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-platinum mb-1">Purpose:</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
                >
                  <option value="Sale">Direct Sale (برائے فروخت)</option>
                  <option value="Rent">Rent Out (کرایہ)</option>
                  <option value="Evaluation">Valuation & DC Rate Check</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-platinum mb-1">Property Type:</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
                >
                  <option value="Residential Plot">Residential Plot (رہائشی پلاٹ)</option>
                  <option value="Commercial Plot">Commercial Plot (کمرشل پلاٹ)</option>
                  <option value="Luxury House / Villa">Luxury House / Villa (تعمیر شدہ گھر)</option>
                  <option value="Investment File">Society File / Affidavit</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-platinum mb-1">Select Society:</label>
                <select
                  name="society"
                  value={formData.society}
                  onChange={handleChange}
                  className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
                >
                  {SOCIETIES.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.urdu})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-platinum mb-1">Block / Sector:</label>
                <input
                  type="text"
                  name="block"
                  placeholder="e.g. Sector J, Block B"
                  value={formData.block}
                  onChange={handleChange}
                  className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-platinum mb-1">Plot / Land Size:</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
                >
                  <option value="3 Marla">3 Marla</option>
                  <option value="5 Marla">5 Marla</option>
                  <option value="7 Marla">7 Marla</option>
                  <option value="10 Marla">10 Marla</option>
                  <option value="1 Kanal">1 Kanal</option>
                  <option value="2 Kanal">2 Kanal</option>
                  <option value="Commercial 4 Marla">Commercial 4 Marla</option>
                  <option value="Commercial 8 Marla">Commercial 8 Marla</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-platinum mb-1">Demand Price (PKR):</label>
                <input
                  type="text"
                  name="demand"
                  placeholder="e.g. 85 Lakh / 1.75 Crore"
                  value={formData.demand}
                  onChange={handleChange}
                  className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-platinum mb-1">Your Full Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-platinum mb-1">Contact Phone / WhatsApp:</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="0300-1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-platinum mb-1">Features / Specific Remarks:</label>
              <textarea
                name="details"
                rows="3"
                placeholder="Corner, park facing, 60ft road, possession paid, urgent cash deal..."
                value={formData.details}
                onChange={handleChange}
                className="w-full bg-obsidian2 border border-cyber/30 rounded-xl p-3 text-platinum font-semibold outline-none focus:border-cyber"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-cyber w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Submit & Notify CEO Desk via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
