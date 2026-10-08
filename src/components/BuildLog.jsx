import React, { useState } from 'react';
import { BookOpen, ChevronRight, Terminal, Calendar, Tag } from 'lucide-react';
import { buildLogsData } from '../data/buildLogs';

export default function BuildLog() {
  const [selectedLogId, setSelectedLogId] = useState(buildLogsData[0]?.id || null);

  return (
    <section id="build-log" className="section-inner build-log-section">
      <div className="section-label-wrapper">
        <div className="section-label pixel-font">
          <span className="section-num">04.</span> BUILD LOG
        </div>
        <span className="section-subtext handwriting">personal engineering notes, bug investigations & decisions</span>
      </div>

      <div className="build-log-container">
        {/* Left Column: Index of Engineering Entries */}
        <div className="build-log-sidebar">
          <div className="sidebar-header mono-font">
            <BookOpen size={15} />
            <span>ENGINEERING_INDEX.LOG</span>
          </div>

          <div className="build-log-entries-list">
            {buildLogsData.map((log) => {
              const isSelected = selectedLogId === log.id;
              return (
                <button
                  key={log.id}
                  onClick={() => setSelectedLogId(log.id)}
                  className={`build-log-index-btn ${isSelected ? 'active' : ''}`}
                >
                  <div className="index-btn-top">
                    <span className="index-date mono-font">{log.date}</span>
                    <span className="index-tag" style={{ borderLeftColor: log.tagColor }}>
                      {log.tag}
                    </span>
                  </div>
                  <h5 className="index-title">{log.title}</h5>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Notebook Engineering Note */}
        <div className="build-log-content">
          {(() => {
            const activeLog = buildLogsData.find(l => l.id === selectedLogId) || buildLogsData[0];
            if (!activeLog) return null;

            return (
              <div className="engineering-note-paper">
                <div className="tape note-top-tape" />

                <div className="note-meta-bar">
                  <div className="note-date-badge mono-font">
                    <Calendar size={13} style={{ marginRight: 4 }} />
                    {activeLog.date}
                  </div>
                  <span className="note-type-badge mono-font" style={{ background: activeLog.tagColor }}>
                    # {activeLog.tag}
                  </span>
                </div>

                <h3 className="note-main-title mono-font">
                  {activeLog.title}
                </h3>

                <div className="note-body-grid">
                  <div className="note-block">
                    <h5 className="note-block-label mono-font">Problem:</h5>
                    <p className="note-block-text">{activeLog.problem}</p>
                  </div>

                  <div className="note-block">
                    <h5 className="note-block-label mono-font">Investigation:</h5>
                    <p className="note-block-text">{activeLog.investigation}</p>
                  </div>

                  <div className="note-block">
                    <h5 className="note-block-label mono-font">Fix / Implementation:</h5>
                    <p className="note-block-text">{activeLog.fix}</p>
                  </div>

                  <div className="note-block lesson-block">
                    <h5 className="note-block-label mono-font">Takeaway &amp; Engineering Principle:</h5>
                    <p className="note-block-text highlight-lesson">{activeLog.lesson}</p>
                  </div>
                </div>

                <div className="note-footer handwriting">
                  verified in local testing &amp; staging ✦
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
