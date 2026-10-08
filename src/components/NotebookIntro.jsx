import React, { useState, useEffect } from 'react';

/*
  NotebookIntro — Entry screen shown before the main portfolio.
  Props:
    onEnter()   — called when visitor clicks "OPEN NOTEBOOK" or "skip"
*/
export default function NotebookIntro({ onEnter }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'opening' | 'done'

  const ruledLines = Array.from({ length: 20 }, (_, i) => i);

  const handleOpen = () => {
    setPhase('opening');
    setTimeout(() => {
      setPhase('done');
      onEnter();
    }, 650);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && phase === 'idle') handleOpen();
      if (e.key === 'Escape') onEnter();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  return (
    <div className={`nb-intro-overlay${phase === 'opening' ? ' nb-intro--closing' : ''}`}>

      {/* Ruled lines background */}
      <div className="nb-ruled-bg" aria-hidden="true">
        {ruledLines.map(i => <div key={i} className="nb-ruled-line" />)}
      </div>

      {/* Left red margin line */}
      <div className="nb-margin-line" aria-hidden="true" />

      {/* Skip — top right */}
      <button className="nb-skip-btn" onClick={onEnter} aria-label="Skip intro">
        skip →
      </button>

      {/* Main content — centred, compact, above-fold */}
      <div className="nb-intro-content">

        {/* Top strip: spiral rings + subject label */}
        <div className="nb-top-strip">
          <div className="nb-spiral-row" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="nb-spiral-ring" />
            ))}
          </div>
          <div className="nb-subject-line">
            <span className="nb-subject-label mono-font">SUBJECT:</span>
            <span className="nb-subject-value mono-font">Portfolio — v2025.10</span>
          </div>
        </div>

        {/* Title — single line, size-responsive */}
        <h1 className="nb-intro-title pixel-font">
          Kriti's Engineering Notebook
        </h1>

        {/* Discipline pills */}
        <div className="nb-discipline-row">
          {['CSE', 'Full Stack', 'Systems', 'AI / Data'].map(d => (
            <span key={d} className="nb-discipline-pill mono-font">{d}</span>
          ))}
        </div>

        {/* Handwritten tagline */}
        <p className="nb-tagline handwriting">
          "things I've built, broken, debugged &amp; understood"
        </p>

        {/* Open button */}
        <button
          className={`nb-open-btn${phase === 'opening' ? ' nb-open-btn--loading' : ''}`}
          onClick={handleOpen}
          disabled={phase === 'opening'}
          aria-label="Open notebook"
        >
          {phase === 'opening' ? (
            <>
              <span className="nb-btn-dot" />
              <span>Opening...</span>
            </>
          ) : (
            <>
              <span>OPEN NOTEBOOK</span>
              <span className="nb-btn-arrow">→</span>
            </>
          )}
        </button>

        {/* Metadata cards */}
        <div className="nb-meta-row">
          {[
            { label: 'ROLE', value: 'CSE Undergrad' },
            { label: 'STACK', value: 'Full-Stack' },
            { label: 'FOCUS', value: 'Systems · AI' },
            { label: 'BATCH', value: "CS '27" },
          ].map(m => (
            <div key={m.label} className="nb-meta-card mono-font">
              <span className="nb-meta-label">{m.label}</span>
              <span className="nb-meta-value">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Keyboard hint */}
        <div className="nb-corner-note handwriting" aria-hidden="true">
          ✦ press Enter to open
        </div>
      </div>
    </div>
  );
}
