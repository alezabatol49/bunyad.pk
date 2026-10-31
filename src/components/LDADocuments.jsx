import React, { useState, useMemo } from 'react';
import { LDA_FORMS, LDA_CATEGORIES } from '../data/ldaFormsData.js';
import { CEO_PHONE, waLink } from '../data/societies.js';

export default function LDADocuments() {
  const [selectedCategory, setSelectedCategory] = useState('All Documents');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredForms = useMemo(() => {
    return LDA_FORMS.filter(form => {
      const matchCat = selectedCategory === 'All Documents' || form.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' ||
        form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.urduTitle.includes(searchQuery) ||
        form.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleConsultation = (formTitle) => {
    const text = `Assalam-o-Alaikum CEO Taha Mubeen Bhutta,\nI need legal consultancy & paperwork facilitation for LDA Official Form: "${formTitle}". Please guide me with the procedure.`;
    window.open(waLink(CEO_PHONE, text), '_blank');
  };

  return (
    <section id="lda-documents" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-cyber/20 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-cyber font-mono font-bold">
              Official Legal & Transfer Portal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-platinum font-display">
            LDA Official Forms Hub <span className="text-cyber text-lg block sm:inline font-arabic sm:mr-2">ایل ڈی اے سرکاری دستاویزات و فارمز</span>
          </h2>
          <p className="text-xs sm:text-sm text-platinum/70 mt-1 max-w-2xl">
            Download verified official LDA Lahore forms, checklists, transfer sets, and exemption drafts. Direct paperwork facilitation supervised by CEO Taha Mubeen Bhutta.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search forms by name or Urdu..."
            className="w-full bg-obsidian2 border border-cyber/30 rounded-xl px-4 py-2.5 text-xs text-platinum placeholder-platinum/40 focus:outline-none focus:border-cyber shadow-inner"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        {LDA_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-cyber text-obsidian font-bold shadow-lg shadow-cyber/20'
                : 'glass text-platinum/70 hover:text-cyber hover:border-cyber/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredForms.map(doc => (
          <div
            key={doc.id}
            className="glass-strong rounded-2xl cyber-border p-5 flex flex-col justify-between hover:border-cyber/60 transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyber/10 text-cyber border border-cyber/20">
                  {doc.category}
                </span>
                <span className="text-[10px] font-mono text-platinum/40">PDF OFFICIAL</span>
              </div>

              <h3 className="font-bold text-platinum text-sm group-hover:text-cyber transition-colors leading-snug">
                {doc.title}
              </h3>
              <p className="text-xs text-platinum/60 font-arabic mt-1 mb-2">
                {doc.urduTitle}
              </p>
              <p className="text-[11px] text-platinum/70 leading-relaxed mb-4">
                {doc.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {doc.tags.map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-obsidian2 text-platinum/50 border border-white/5">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-cyber/15">
              <a
                href={doc.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-cyber text-center py-2 text-xs flex items-center justify-center gap-1.5 font-bold"
              >
                <span>View / Download</span>
              </a>
              <button
                onClick={() => handleConsultation(doc.title)}
                className="btn-ghost text-center py-2 text-xs flex items-center justify-center gap-1.5 text-platinum/80 hover:text-cyber"
              >
                <span>Legal Guidance</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center text-platinum/60 text-xs">
          No LDA document matches your search. Contact CEO Desk for custom file processing.
        </div>
      )}
    </section>
  );
}
