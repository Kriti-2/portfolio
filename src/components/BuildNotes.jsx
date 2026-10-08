import React from 'react';
import { BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { buildNotesData } from '../data/buildNotes';

export default function BuildNotes() {
  return (
    <section id="build-notes" className="section-inner build-notes-section">
      <div className="section-label-wrapper">
        <div className="section-label pixel-font">
          <span className="section-num">04.</span> BUILD NOTES
        </div>
        <span className="section-subtext handwriting">
          authentic engineering takeaways &amp; lessons from building my projects
        </span>
      </div>

      <div className="build-notes-grid">
        {buildNotesData.map((note) => (
          <div key={note.id} className="build-note-card">
            <div className="note-tape" />
            <div className="note-meta-row">
              <span className="note-tag-pill mono-font" style={{ background: note.tagColor }}>
                {note.tag}
              </span>
              <span className="note-project-ref mono-font">[{note.project}]</span>
            </div>
            <h4 className="note-card-title">{note.title}</h4>
            <p className="note-card-body">{note.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
