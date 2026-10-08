import React, { useState, useEffect } from 'react';
import { 
  Mail, Database, Layout, 
  ExternalLink, Award, GraduationCap, Trophy, Check, Copy, 
  ChevronDown, ChevronUp, Terminal, Cpu, BookOpen, Layers, 
  Phone, Globe, CheckCircle2, ArrowUpRight, GitBranch, MapPin, 
  ChevronRight, Moon, Sun, Play, RotateCcw, Sparkles, UserCheck, X
} from 'lucide-react';

import profileImg from './assets/kriti.jpg';
import './App.css';

// Single Source of Truth Modules
import { projectsData } from './data/projects';
import { proofOfSkills } from './data/skills';
import { credentialsData } from './data/credentials';
import { buildNotesData } from './data/buildNotes';

// Interactive Components
import InteractiveProjectCard from './components/InteractiveProjectCard';
import BuildNotes from './components/BuildNotes';
import TerminalConsole from './components/TerminalConsole';
import RecruiterMode from './components/RecruiterMode';

/* ── Inline SVG icons ── */
const Github = ({ size = 20, ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
  </svg>
);

const Linkedin = ({ size = 20, ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  const [recruiterMode, setRecruiterMode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('kritigup251@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">

      {/* ── Recruiter Mode Modal View (30-Second Skim) ── */}
      {recruiterMode && (
        <RecruiterMode
          onClose={() => setRecruiterMode(false)}
          onSelectProject={(num) => {
            setRecruiterMode(false);
            scrollToSection('projects');
          }}
        />
      )}

      {/* ── Fixed Toast Notice for Copy ── */}
      {copiedEmail && (
        <div className="toast-notification">
          <CheckCircle2 size={18} color="#15803d" />
          <span>Email copied: kritigup251@gmail.com</span>
        </div>
      )}

      {/* ── Uncluttered 3-Zone Sticky Navbar ── */}
      <nav className="navbar">
        {/* Left: Brand / Home Anchor */}
        <a href="#home" onClick={() => setActiveNav('home')} className="nav-brand" title="Home">
          <span className="nav-brand-dot"></span>
          <span className="pixel-font nav-brand-text">KRITI GUPTA</span>
          <span className="nav-brand-pill mono-font">CS '27</span>
        </a>

        {/* Center: Clean Core Navigation Links */}
        <div className="nav-links">
          <a href="#projects" onClick={() => setActiveNav('projects')} className={`nav-item ${activeNav === 'projects' ? 'active' : ''}`}>PROJECTS</a>
          <a href="#build-notes" onClick={() => setActiveNav('build-notes')} className={`nav-item ${activeNav === 'build-notes' ? 'active' : ''}`}>BUILD NOTES</a>
          <a href="#skills" onClick={() => setActiveNav('skills')} className={`nav-item ${activeNav === 'skills' ? 'active' : ''}`}>SKILLS</a>
          <a href="#about" onClick={() => setActiveNav('about')} className={`nav-item ${activeNav === 'about' ? 'active' : ''}`}>ABOUT</a>
          <a href="#terminal" onClick={() => setActiveNav('terminal')} className={`nav-item ${activeNav === 'terminal' ? 'active' : ''}`}>CONSOLE</a>
          <a href="#credentials" onClick={() => setActiveNav('credentials')} className={`nav-item ${activeNav === 'credentials' ? 'active' : ''}`}>CREDENTIALS</a>
        </div>

        {/* Right: Compact Actions Cluster */}
        <div className="nav-actions">
          {/* Recruiter Mode Button */}
          <button 
            onClick={() => setRecruiterMode(true)} 
            className="recruiter-toggle-btn" 
            title="Open 30-Second Recruiter Summary"
          >
            <UserCheck size={14} />
            <span>RECRUITER</span>
          </button>

          {/* Compact Circular Badges for Socials */}
          <a 
            href="https://linkedin.com/in/Kritigupta251" 
            target="_blank" 
            rel="noreferrer" 
            className="nav-icon-badge bg-yellow" 
            title="LinkedIn Profile: Kritigupta251"
          >
            <Linkedin size={15} />
          </a>

          <a 
            href="https://github.com/Kriti-2" 
            target="_blank" 
            rel="noreferrer" 
            className="nav-icon-badge bg-pink" 
            title="GitHub Profile: Kriti-2"
          >
            <Github size={15} />
          </a>

          {/* Light / Dark Mode Toggle */}
          <button 
            onClick={toggleTheme} 
            className="nav-icon-badge nav-theme-btn" 
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} color="#fcd34d" />}
          </button>

          {/* Quick Copy Email Button */}
          <button 
            onClick={copyToClipboard} 
            className="btn btn-primary nav-copy-btn" 
            title="Copy email: kritigup251@gmail.com"
          >
            {copiedEmail ? <Check size={13} color="#15803d" /> : <Copy size={13} />}
            <span className="copy-btn-text">{copiedEmail ? 'COPIED' : 'EMAIL'}</span>
          </button>
        </div>
      </nav>

      {/* ── HOME: Simplified, Grounded Hero ── */}
      <header id="home" className="hero">
        <div className="hero-top-badge">
          <span className="status-dot"></span>
          <span>SRM IST B.Tech CSE (2023–2027) · CGPA 9.0/10.0</span>
        </div>

        <p className="handwriting hero-eyebrow">Hi there, I am</p>

        {/* Structured Neo-Brutalist Developer Card */}
        <div className="hero-name-box">
          <div className="hero-window-bar">
            <div className="window-dots">
              <span className="window-dot dot-red"></span>
              <span className="window-dot dot-yellow"></span>
              <span className="window-dot dot-green"></span>
            </div>
            <span className="window-title">KRITI_GUPTA // NOTEBOOK</span>
          </div>

          <div className="hero-name-content">
            <h1 className="hero-name pixel-font">KRITI GUPTA</h1>
            <div className="hero-tagline-bar">
              Full-Stack Applications · Real-Time Systems · Data &amp; AI
            </div>
          </div>
        </div>

        {/* Concise Positioning Requested by User */}
        <h2 className="hero-headline">
          "I build software that solves real problems."
        </h2>
        <p className="hero-supporting-line mono-font">
          Full-stack applications • Real-time systems • Data &amp; AI
        </p>

        {/* Quick Credentials & Badges */}
        <div className="hero-pills">
          <span className="hero-pill bg-yellow">
            <MapPin size={13} style={{ marginRight: 5 }} /> Ghaziabad, UP, India
          </span>
          <span className="hero-pill bg-green">
            <Trophy size={13} style={{ marginRight: 5 }} /> Flipkart Hackathon Top 1.6K
          </span>
          <span className="hero-pill bg-pink">
            <Award size={13} style={{ marginRight: 5 }} /> NPTEL Certified · NLP
          </span>
          <a href="https://kriti2.tech" target="_blank" rel="noreferrer" className="hero-pill bg-blue" style={{ color: 'white', textDecoration: 'none' }}>
            <Globe size={13} style={{ marginRight: 5 }} /> kriti2.tech
          </a>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-accent btn-large">
            <Layers size={17} /> Explore my work
          </a>
          <a href="#terminal" className="btn btn-primary btn-large">
            <Terminal size={17} /> Try the console
          </a>
        </div>
      </header>

      {/* ── PROJECTS: Main Focus of Portfolio ── */}
      <section id="projects" className="section-inner projects-section">
        <div className="section-label-wrapper">
          <div className="section-label pixel-font">
            <span className="section-num">01.</span> FEATURED PROJECTS
          </div>
          <span className="section-subtext handwriting">
            what I've built — follow the visual story, try the interactive concept demo, or read notebook notes
          </span>
        </div>

        <div className="projects-stack-container">
          {projectsData.map((project) => (
            <InteractiveProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ── BUILD NOTES: Authentic Handwritten Notebook Annotations ── */}
      <BuildNotes />

      {/* ── PROOF OF SKILLS: Technology → Where I Used It ── */}
      <section id="skills" className="section-inner skills-section">
        <div className="section-label-wrapper">
          <div className="section-label pixel-font">
            <span className="section-num">03.</span> PROOF OF SKILLS
          </div>
          <span className="section-subtext handwriting">
            no subjective ratings — where and how I actually used each technology
          </span>
        </div>

        <div className="proof-skills-grid">
          {proofOfSkills.map((s, idx) => (
            <div key={idx} className="proof-skill-card" style={{ borderLeftColor: s.color }}>
              <div className="proof-skill-top">
                <span className="proof-tech-name">{s.tech}</span>
                <span className="proof-role-tag mono-font">{s.role}</span>
              </div>
              <div className="proof-usage-pointer">
                <span className="pointer-arrow">→</span>
                <strong className="pointer-text">{s.proof}</strong>
              </div>
              <p className="proof-details-sub">{s.details}</p>
            </div>
          ))}
        </div>

        {/* CS Foundations Box */}
        <div className="competency-box">
          <div className="competency-header">
            <Terminal size={18} />
            <span className="pixel-font competency-title">CORE COMPUTER SCIENCE DISCIPLINES</span>
          </div>
          <div className="competency-tags">
            <span className="comp-tag">Object-Oriented Programming (OOP)</span>
            <span className="comp-tag">Data Structures &amp; Algorithms</span>
            <span className="comp-tag">RESTful API Design &amp; Contracts</span>
            <span className="comp-tag">Relational Database Normalization</span>
            <span className="comp-tag">Continuous Integration &amp; Git Flow</span>
            <span className="comp-tag">Software Development Life Cycle (SDLC)</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT: Clean, Simple, Professional ── */}
      <section id="about" className="section-inner about-section">
        <div className="section-label-wrapper">
          <div className="section-label pixel-font">
            <span className="section-num">04.</span> ABOUT ME
          </div>
          <span className="section-subtext handwriting">
            who I am, where I'm from, what I'm working on
          </span>
        </div>

        <div className="about-clean-layout">
          {/* Photo Column */}
          <div className="about-photo-col">
            <div className="about-photo-card">
              <div className="tape" />
              <img src={profileImg} alt="Kriti Gupta" className="about-photo-img" />
              <p className="handwriting about-photo-name">Kriti Gupta</p>
            </div>
            <span className="about-status-badge">
              <span className="about-status-dot" />
              Open for Internships
            </span>
          </div>

          {/* Bio Column */}
          <div className="about-bio-col">
            <h3 className="about-name-heading pixel-font">HI, I'M KRITI</h3>

            <p className="about-bio-text">
              I'm a 4th-year Computer Science student at <strong>SRM IST</strong> (CGPA 9.0/10.0),
              building full-stack web apps, real-time systems, and data pipelines.
              I care about writing software that's reliable, readable, and actually solves the problem.
            </p>
            <p className="about-bio-text">
              Currently open to internship opportunities in software engineering or
              backend&nbsp;/&nbsp;full-stack roles.
            </p>

            {/* Quick Facts */}
            <div className="about-facts-row">
              <div className="about-fact">
                <span className="about-fact-label">University</span>
                <span className="about-fact-val">SRM IST, 2023–27</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-label">CGPA</span>
                <span className="about-fact-val highlight-green">9.0 / 10.0</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-label">Location</span>
                <span className="about-fact-val">Ghaziabad, India</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-label">Hackathon</span>
                <span className="about-fact-val highlight-yellow">Flipkart Top 1.6K</span>
              </div>
            </div>

            {/* Tech stack chips */}
            <div className="about-stack-row">
              <span className="about-stack-label mono-font">Currently working with →</span>
              <div className="about-stack-chips">
                {['React', 'Node.js', 'Python', 'MongoDB', 'Socket.IO', 'SQL'].map(t => (
                  <span key={t} className="about-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSOLE: Fun Secondary Interactive Feature ── */}
      <TerminalConsole
        onOpenTrace={() => scrollToSection('projects')}
        onSelectProject={() => scrollToSection('projects')}
        onToggleRecruiterMode={() => setRecruiterMode(true)}
        onNavigate={scrollToSection}
      />

      {/* ── CREDENTIALS & BACKGROUND ── */}
      <section id="credentials" className="section-inner">
        <div className="section-label-wrapper">
          <div className="section-label pixel-font">
            <span className="section-num">06.</span> CREDENTIALS &amp; BACKGROUND
          </div>
          <span className="section-subtext handwriting">verified certifications, hackathons &amp; academic record</span>
        </div>

        <div className="credentials-grid">
          {/* Column 1: Certification & Hackathon */}
          <div className="credential-col">
            {credentialsData.certifications.map((cert, cIdx) => (
              <div key={cIdx} className="cred-card cert-card">
                <div className="cred-card-top">
                  <div className="cred-badge-wrap bg-yellow">
                    <Award size={24} color="#111" />
                  </div>
                  <div>
                    <span className="cred-pill bg-green">Verified Certification</span>
                    <h3 className="cred-title">{cert.title}</h3>
                    <p className="cred-issuer">{cert.issuer} · {cert.year}</p>
                  </div>
                </div>

                <p className="cred-desc">
                  Completed an intensive <strong>{cert.duration}</strong> curriculum covering sequence modeling, word vectors, and modern transformer architectures:
                </p>

                <div className="cert-syllabus-box">
                  {cert.topics.map((topic, tIdx) => (
                    <div key={tIdx} className="syllabus-item">
                      <CheckCircle2 size={16} color="#059669" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {credentialsData.achievements.map((achv, aIdx) => (
              <div key={aIdx} className="cred-card achievement-card">
                <div className="cred-card-top">
                  <div className="cred-badge-wrap bg-pink">
                    <Trophy size={24} color="#111" />
                  </div>
                  <div>
                    <span className="cred-pill bg-yellow">National Standing</span>
                    <h3 className="cred-title">{achv.title}</h3>
                    <p className="cred-issuer">{achv.standing}</p>
                  </div>
                </div>

                <div className="achievement-highlight-box">
                  <span className="stat-big pixel-font">Top 1,600</span>
                  <span className="stat-sub">Teams advanced out of <strong>11,000+</strong> participating teams pan-India</span>
                </div>

                <p className="cred-desc">{achv.description}</p>
              </div>
            ))}
          </div>

          {/* Column 2: Education Timeline */}
          <div className="credential-col">
            <div className="cred-card edu-card">
              <div className="cred-card-top">
                <div className="cred-badge-wrap bg-blue">
                  <GraduationCap size={24} color="white" />
                </div>
                <div>
                  <span className="cred-pill bg-blue" style={{ color: 'white' }}>Academic Record</span>
                  <h3 className="cred-title">Education History</h3>
                  <p className="cred-issuer">Computer Science &amp; Schooling</p>
                </div>
              </div>

              <div className="edu-timeline">
                {credentialsData.education.map((edu, eIdx) => (
                  <div key={eIdx} className={`timeline-item ${eIdx === 0 ? 'featured-edu' : ''}`}>
                    <div className={`timeline-marker ${eIdx === 0 ? 'bg-green' : eIdx === 1 ? 'bg-yellow' : 'bg-pink'}`}></div>
                    <div className="timeline-content">
                      <div className="timeline-date-badge">{edu.period}</div>
                      <h4 className="edu-inst">{edu.institution}</h4>
                      <p className="edu-loc">{edu.location}</p>
                      <p className="edu-degree"><strong>{edu.degree}</strong></p>
                      <div className="cgpa-pill">
                        <strong>{edu.metric}</strong>
                      </div>
                      {edu.coursework && (
                        <p className="edu-courses">Relevant Coursework: {edu.coursework}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-inner contact-section">
        <div className="contact-box">
          <div className="contact-paper-header">
            <span className="tape contact-tape"></span>
            <p className="handwriting contact-handwrite">Let's connect &amp; collaborate</p>
            <h2 className="pixel-font contact-heading">GET IN TOUCH</h2>
          </div>

          <p className="contact-lead">
            Whether you have an internship opportunity, a software engineering project, or want to talk API design and real-time systems — my inbox is always open.
          </p>

          <div className="contact-channels-grid">
            <a href="mailto:kritigup251@gmail.com" className="contact-card">
              <span className="contact-icon-bg bg-yellow"><Mail size={22} /></span>
              <div className="contact-info">
                <span className="channel-label">Email</span>
                <span className="channel-val">kritigup251@gmail.com</span>
              </div>
              <ArrowUpRight size={18} className="contact-arrow" />
            </a>

            <a href="tel:+918858586275" className="contact-card">
              <span className="contact-icon-bg bg-green"><Phone size={22} /></span>
              <div className="contact-info">
                <span className="channel-label">Phone</span>
                <span className="channel-val">+91 8858586275</span>
              </div>
              <ArrowUpRight size={18} className="contact-arrow" />
            </a>

            <a href="https://linkedin.com/in/Kritigupta251" target="_blank" rel="noreferrer" className="contact-card">
              <span className="contact-icon-bg bg-blue" style={{ color: 'white' }}><Linkedin size={22} /></span>
              <div className="contact-info">
                <span className="channel-label">LinkedIn</span>
                <span className="channel-val">linkedin.com/in/Kritigupta251</span>
              </div>
              <ArrowUpRight size={18} className="contact-arrow" />
            </a>

            <a href="https://github.com/Kriti-2" target="_blank" rel="noreferrer" className="contact-card">
              <span className="contact-icon-bg bg-pink"><Github size={22} /></span>
              <div className="contact-info">
                <span className="channel-label">GitHub</span>
                <span className="channel-val">github.com/Kriti-2</span>
              </div>
              <ArrowUpRight size={18} className="contact-arrow" />
            </a>
          </div>

          <div className="contact-actions-footer">
            <button onClick={copyToClipboard} className="btn btn-primary btn-large">
              {copiedEmail ? <Check size={16} color="#15803d" /> : <Copy size={16} />}
              {copiedEmail ? 'Email Copied!' : 'Copy Email Address'}
            </button>
            <button onClick={() => setRecruiterMode(true)} className="btn btn-accent btn-large">
              <UserCheck size={16} /> Open Recruiter Mode
            </button>
            <a href="https://kriti2.tech" target="_blank" rel="noreferrer" className="btn btn-secondary btn-large">
              <Globe size={16} /> Visit kriti2.tech
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-left">
          <span className="handwriting footer-tagline">Crafted with care, curiosity &amp; code</span>
          <p className="footer-sub">Kriti Gupta · Computer Science Engineering Student @ SRM IST</p>
        </div>
        <div className="footer-right">
          <span className="footer-copy">© {new Date().getFullYear()} Kriti Gupta · Interactive Engineering Notebook</span>
        </div>
      </footer>

    </div>
  );
}
