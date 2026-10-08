import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, ChevronRight, CheckCircle2, 
  ExternalLink, Layers, Terminal, BookOpen, ArrowRight, CornerDownLeft
} from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
  </svg>
);

export default function ProjectCodebaseExplorer({ project, initialTab = 'readme' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedArchNode, setSelectedArchNode] = useState(project.architectureNodes[0]?.id || null);
  const [currentTraceStep, setCurrentTraceStep] = useState(0);
  const [isTracing, setIsTracing] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // System trace auto-stepper
  useEffect(() => {
    let timer;
    if (isTracing) {
      if (currentTraceStep < project.systemTrace.steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentTraceStep(prev => prev + 1);
        }, 1800);
      } else {
        setIsTracing(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isTracing, currentTraceStep, project.systemTrace.steps.length]);

  const startTrace = () => {
    setCurrentTraceStep(0);
    setIsTracing(true);
  };

  const selectedNodeData = project.architectureNodes.find(n => n.id === selectedArchNode) || project.architectureNodes[0];

  return (
    <div className="codebase-explorer">
      {/* Codebase Top Bar / Tab Navigation */}
      <div className="codebase-nav-bar">
        <div className="codebase-tabs">
          <button
            onClick={() => setActiveTab('readme')}
            className={`codebase-tab-btn ${activeTab === 'readme' ? 'active' : ''}`}
          >
            README.md
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`codebase-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          >
            ARCHITECTURE
          </button>
          <button
            onClick={() => setActiveTab('trace')}
            className={`codebase-tab-btn ${activeTab === 'trace' ? 'active' : ''}`}
          >
            <span className="trace-pulse-dot"></span>
            TRACE SYSTEM
          </button>
          <button
            onClick={() => setActiveTab('decisions')}
            className={`codebase-tab-btn ${activeTab === 'decisions' ? 'active' : ''}`}
          >
            DECISIONS
          </button>
        </div>

        <div className="codebase-actions">
          <a href={project.github} target="_blank" rel="noreferrer" className="codebase-link-btn" title="View Source on GitHub">
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* ── TAB 1: README ── */}
      {activeTab === 'readme' && (
        <div className="codebase-tab-content readme-pane">
          <div className="readme-header">
            <h4 className="readme-title mono-font"># {project.title}</h4>
            <p className="readme-tagline">{project.tagline}</p>
          </div>

          <div className="readme-section">
            <h5 className="readme-heading mono-font">## The Problem</h5>
            <p className="readme-text">{project.readme.problem}</p>
          </div>

          <div className="readme-section">
            <h5 className="readme-heading mono-font">## The Solution</h5>
            <p className="readme-text">{project.readme.solution}</p>
          </div>

          <div className="readme-section">
            <h5 className="readme-heading mono-font">## Key Engineering Highlights</h5>
            <ul className="readme-highlights-list">
              {project.readme.highlights.map((h, i) => (
                <li key={i}>
                  <ChevronRight size={14} className="readme-icon" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="readme-footer-tech">
            <span className="mono-font" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tech Stack:</span>
            <div className="tech-chips-wrap">
              {project.stack.map(s => <span key={s} className="tech-chip">{s}</span>)}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: INTERACTIVE ARCHITECTURE ── */}
      {activeTab === 'architecture' && (
        <div className="codebase-tab-content architecture-pane">
          <div className="arch-instruction-banner">
            <span className="pixel-font arch-banner-text">CLICK ANY COMPONENT TO INSPECT ITS REAL IMPLEMENTATION</span>
          </div>

          {/* Pipeline Flow Diagram */}
          <div className="arch-pipeline-flow">
            {project.architectureNodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedArchNode(node.id)}
                  className={`arch-flow-node ${selectedArchNode === node.id ? 'active' : ''}`}
                >
                  <span className="node-step-tag mono-font">0{idx + 1}</span>
                  <strong className="node-name">{node.name}</strong>
                  <span className="node-tech-sub mono-font">{node.tech}</span>
                </button>
                {idx < project.architectureNodes.length - 1 && (
                  <div className="arch-flow-arrow">
                    <span>↓</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Interactive Inspection Card */}
          {selectedNodeData && (
            <div className="arch-inspection-card">
              <div className="inspection-header">
                <span className="inspection-badge mono-font">{selectedNodeData.role}</span>
                <h5 className="inspection-title">{selectedNodeData.name}</h5>
                <span className="inspection-tech mono-font">[{selectedNodeData.tech}]</span>
              </div>
              <p className="inspection-explanation">{selectedNodeData.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: TRACE SYSTEM ── */}
      {activeTab === 'trace' && (
        <div className="codebase-tab-content trace-pane">
          <div className="trace-action-header">
            <div>
              <span className="trace-label mono-font">LIVE USER ACTION TRACE:</span>
              <h5 className="trace-action-name">{project.systemTrace.actionName}</h5>
            </div>
            <div className="trace-ctrl-buttons">
              <button
                onClick={startTrace}
                disabled={isTracing}
                className="btn btn-accent trace-run-btn"
              >
                <Play size={13} />
                <span>{isTracing ? 'Tracing...' : 'Run Live Trace'}</span>
              </button>
              <button
                onClick={() => { setIsTracing(false); setCurrentTraceStep(0); }}
                className="btn btn-secondary trace-reset-btn"
                title="Reset Trace"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Step Timeline */}
          <div className="trace-timeline">
            {project.systemTrace.steps.map((step, idx) => {
              const isActive = idx === currentTraceStep;
              const isPast = idx < currentTraceStep;
              return (
                <div
                  key={step.num}
                  onClick={() => { setIsTracing(false); setCurrentTraceStep(idx); }}
                  className={`trace-step-item ${isActive ? 'current' : ''} ${isPast ? 'completed' : ''}`}
                >
                  <div className="trace-step-indicator">
                    <span className="step-num mono-font">{step.num}</span>
                    {idx < project.systemTrace.steps.length - 1 && <div className="step-connector" />}
                  </div>

                  <div className="trace-step-content">
                    <div className="trace-step-top">
                      <span className="trace-component-badge mono-font">{step.component}</span>
                      <strong className="trace-step-title">{step.title}</strong>
                    </div>
                    <p className="trace-step-detail">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 4: ENGINEERING DECISIONS ── */}
      {activeTab === 'decisions' && (
        <div className="codebase-tab-content decisions-pane">
          <div className="decisions-intro handwriting">
            Architectural trade-offs & practical choices made during implementation:
          </div>

          <div className="decisions-grid">
            {project.engineeringDecisions.map((dec, idx) => (
              <div key={idx} className="decision-note-card">
                <div className="decision-pin"></div>
                <h5 className="decision-topic">{dec.topic}</h5>

                <div className="decision-row">
                  <span className="decision-label mono-font">Alternative:</span>
                  <span className="decision-alt">{dec.alternative}</span>
                </div>

                <div className="decision-row">
                  <span className="decision-label mono-font">Decision:</span>
                  <span className="decision-chosen">{dec.decision}</span>
                </div>

                <div className="decision-reason-box">
                  <span className="decision-reason-label mono-font">Engineering Rationale:</span>
                  <p className="decision-reason-text">{dec.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
