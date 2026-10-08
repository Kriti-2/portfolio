import React from 'react';
import { 
  Check, Copy, ExternalLink, Mail, Phone, 
  MapPin, Award, Trophy, GraduationCap, X, ArrowRight
} from 'lucide-react';
import { projectsData } from '../data/projects';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function RecruiterMode({ onClose, onSelectProject }) {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('kritigup251@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="recruiter-mode-overlay">
      <div className="recruiter-card">
        {/* Recruiter Header Bar */}
        <div className="recruiter-header-bar">
          <div className="recruiter-status">
            <span className="pulse-green">●</span>
            <span className="mono-font" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
              RECRUITER_MODE // 30_SECOND_BRIEF
            </span>
          </div>
          <button onClick={onClose} className="recruiter-close-btn" title="Return to Interactive Portfolio">
            <X size={16} />
            <span className="mono-font" style={{ fontSize: '0.75rem', fontWeight: 700 }}>EXIT MODE</span>
          </button>
        </div>

        {/* Candidate Profile Summary */}
        <div className="recruiter-profile-section">
          <div className="recruiter-intro">
            <h2 className="recruiter-name pixel-font">KRITI GUPTA</h2>
            <p className="recruiter-title mono-font">Software Developer · CSE Undergrad @ SRM IST</p>
            <div className="recruiter-badges-row">
              <span className="rec-badge bg-green">CGPA: 9.0 / 10.0</span>
              <span className="rec-badge bg-yellow">2023 – 2027</span>
              <span className="rec-badge bg-pink">Ghaziabad / UP, India</span>
              <span className="rec-badge bg-blue" style={{ color: 'white' }}>Flipkart Hackathon Top 1.6K</span>
            </div>
          </div>

          <div className="recruiter-cta-row">
            <a href="https://github.com/Kriti-2" target="_blank" rel="noreferrer" className="btn btn-primary">
              <GithubIcon size={15} /> GitHub
            </a>
            <a href="https://linkedin.com/in/Kritigupta251" target="_blank" rel="noreferrer" className="btn btn-primary">
              <LinkedinIcon size={15} /> LinkedIn
            </a>
            <button onClick={copyEmail} className="btn btn-accent">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
            <a href="mailto:kritigup251@gmail.com" className="btn btn-secondary">
              <Mail size={15} /> Send Email
            </a>
          </div>
        </div>

        {/* 3 Pillars: What I Build */}
        <div className="recruiter-pillars-grid">
          <div className="rec-pillar-card">
            <h4 className="pillar-title mono-font">01. FULL-STACK APPLICATIONS</h4>
            <p className="pillar-desc">
              Designing modular RESTful architectures, stateless JWT auth pipelines, and responsive React clients integrated with Express & MongoDB.
            </p>
          </div>
          <div className="rec-pillar-card">
            <h4 className="pillar-title mono-font">02. REAL-TIME DISTRIBUTED SYSTEMS</h4>
            <p className="pillar-desc">
              Building sub-second bidirectional telemetry streams with WebSockets and Socket.IO, active client reconciliation, and event broadcasts.
            </p>
          </div>
          <div className="rec-pillar-card">
            <h4 className="pillar-title mono-font">03. AI / ML & GEOSPATIAL INTELLIGENCE</h4>
            <p className="pillar-desc">
              Deploying FastAPI inference pipelines with Random Forest, Prophet time-series models, GPU-rendered MapLibre vector maps, and NPTEL NLP distinction.
            </p>
          </div>
        </div>

        {/* Best Projects Overview */}
        <div className="recruiter-projects-section">
          <div className="rec-section-title-bar">
            <h3 className="pixel-font rec-section-title">FLAGSHIP SOFTWARE PROJECTS</h3>
            <span className="handwriting rec-subtitle">evidence of production-grade engineering</span>
          </div>

          <div className="rec-projects-list">
            {projectsData.map((p) => (
              <div key={p.id} className="rec-project-item">
                <div className="rec-project-meta">
                  <div className="rec-proj-num pixel-font">{p.num}</div>
                  <div>
                    <h4 className="rec-proj-title">{p.title}</h4>
                    <p className="rec-proj-brief">{p.oneSentence || p.brief}</p>
                    <div className="rec-proj-tech">
                      {(p.tags || p.stack || []).slice(0, 5).map(s => <span key={s} className="tech-chip">{s}</span>)}
                    </div>
                  </div>
                </div>

                <div className="rec-project-actions">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProject(p.num);
                    }}
                    className="btn btn-primary"
                    style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem' }}
                  >
                    Explore Project <ArrowRight size={13} />
                  </button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem' }}
                  >
                    <GithubIcon size={13} /> Repo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact Coordinates Footer */}
        <div className="recruiter-footer">
          <span className="mono-font rec-contact-item">
            <Mail size={14} style={{ color: 'var(--yellow)', flexShrink: 0 }} />
            <span>Email: <strong>kritigup251@gmail.com</strong></span>
          </span>
          <span className="mono-font rec-contact-item">
            <Phone size={14} style={{ color: 'var(--green)', flexShrink: 0 }} />
            <span>Phone: <strong>+91 8858586275</strong></span>
          </span>
          <a href="https://kriti2.tech" target="_blank" rel="noreferrer" className="mono-font rec-contact-item rec-contact-link">
            <ExternalLink size={14} style={{ color: 'var(--pink)', flexShrink: 0 }} />
            <span>Domain: <strong>kriti2.tech</strong></span>
          </a>
        </div>
      </div>
    </div>
  );
}
