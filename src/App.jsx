import React, { useState, useEffect } from 'react';
import {
  Mail, Award, GraduationCap, Trophy, Check, Copy,
  Terminal, Layers, Phone, Globe, CheckCircle2, ArrowUpRight,
  MapPin, X, Menu
} from 'lucide-react';

import profileImg from './assets/kriti.jpg';
import './App.css';

import { projectsData } from './data/projects';
import { proofOfSkills } from './data/skills';
import { credentialsData } from './data/credentials';

import InteractiveProjectCard from './components/InteractiveProjectCard';
import BuildNotes from './components/BuildNotes';

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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('kritigup251@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = (e) => {
      if (!e.target.closest('.navbar') && !e.target.closest('.mobile-nav-drawer')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [mobileMenuOpen]);

  const NAV_LINKS = [
    { id: 'projects',     label: 'PROJECTS' },
    { id: 'skills',       label: 'SKILLS' },
    { id: 'about',        label: 'ABOUT' },
    { id: 'credentials',  label: 'CREDENTIALS' },
    { id: 'contact',      label: 'CONTACT' },
  ];

  return (
    <div className="app-container">

      {/* ── Email copied toast ── */}
      {copiedEmail && (
        <div className="toast-notification">
          <CheckCircle2 size={18} color="#15803d" />
          <span>Email copied: kritigup251@gmail.com</span>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav className="navbar">
        <a href="#home" onClick={() => setActiveNav('home')} className="nav-brand" title="Home">
          <span className="nav-brand-dot"></span>
          <span className="pixel-font nav-brand-text">KRITI GUPTA</span>
          <span className="nav-brand-pill mono-font">CS '27</span>
        </a>

        <div className="nav-links">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => scrollToSection(id)}
              className={`nav-item ${activeNav === id ? 'active' : ''}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href="https://linkedin.com/in/Kritigupta251" target="_blank" rel="noreferrer"
            className="nav-icon-badge bg-yellow" title="LinkedIn">
            <Linkedin size={15} />
          </a>
          <a href="https://github.com/Kriti-2" target="_blank" rel="noreferrer"
            className="nav-icon-badge bg-pink" title="GitHub">
            <Github size={15} />
          </a>
          <button onClick={copyToClipboard} className="btn btn-primary nav-copy-btn nav-email-btn" title="Copy email">
            {copiedEmail ? <Check size={13} color="#15803d" /> : <Copy size={13} />}
            <span className="copy-btn-text">{copiedEmail ? 'COPIED' : 'EMAIL'}</span>
          </button>
          <button className="hamburger-btn" onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog">
          <div className="mobile-nav-links">
            {NAV_LINKS.map(({ id, label }) => (
              <a key={id} href={`#${id}`}
                className={`mobile-nav-item ${activeNav === id ? 'active' : ''}`}
                onClick={() => scrollToSection(id)}>
                {label}
              </a>
            ))}
          </div>
          <div className="mobile-nav-actions">
            <div className="mobile-nav-socials">
              <a href="https://linkedin.com/in/Kritigupta251" target="_blank" rel="noreferrer"
                className="nav-icon-badge bg-yellow"><Linkedin size={18} /></a>
              <a href="https://github.com/Kriti-2" target="_blank" rel="noreferrer"
                className="nav-icon-badge bg-pink"><Github size={18} /></a>
              <button onClick={() => { copyToClipboard(); setMobileMenuOpen(false); }}
                className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                {copiedEmail ? <Check size={14} color="#15803d" /> : <Copy size={14} />}
                {copiedEmail ? 'COPIED' : 'COPY EMAIL'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <header id="home" className="hero">
        <div className="hero-top-badge">
          <span className="status-dot"></span>
          <span>SRM IST · B.Tech CSE (2023–2027) · CGPA 9.0/10.0</span>
        </div>

        <p className="handwriting hero-eyebrow">Hi there, I am</p>

        <div className="hero-name-box">
          <div className="hero-window-bar">
            <div className="window-dots">
              <span className="window-dot dot-red"></span>
              <span className="window-dot dot-yellow"></span>
              <span className="window-dot dot-green"></span>
            </div>
            <span className="window-title">KRITI_GUPTA.portfolio</span>
          </div>
          <div className="hero-name-content">
            <h1 className="hero-name pixel-font">KRITI GUPTA</h1>
            <div className="hero-tagline-bar">
              Full-Stack · Real-Time Systems · Data &amp; AI
            </div>
          </div>
        </div>

        <h2 className="hero-headline">
          "I build software that solves real problems."
        </h2>

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
          <a href="https://kriti2.tech" target="_blank" rel="noreferrer"
            className="hero-pill bg-blue" style={{ color: 'white', textDecoration: 'none' }}>
            <Globe size={13} style={{ marginRight: 5 }} /> kriti2.tech
          </a>
        </div>

        <div className="hero-buttons">
          <a href="#projects" className="btn btn-accent btn-large" onClick={() => scrollToSection('projects')}>
            <Layers size={17} /> Explore my work
          </a>
          <a href="#contact" className="btn btn-primary btn-large" onClick={() => scrollToSection('contact')}>
            <Mail size={17} /> Get in touch
          </a>
        </div>
      </header>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-inner projects-section">
        <div className="section-label-wrapper">
          <div className="section-label pixel-font">
            <span className="section-num">01.</span> FEATURED PROJECTS
          </div>
          <span className="section-subtext handwriting">
            things I've built — each card shows the story, the stack, and what I learned
          </span>
        </div>
        <div className="projects-stack-container">
          {projectsData.map((project) => (
            <InteractiveProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ── BUILD NOTES ── */}
      <BuildNotes />

      {/* ── SKILLS ── */}
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

        <div className="competency-box">
          <div className="competency-header">
            <Terminal size={18} />
            <span className="pixel-font competency-title">CORE CS DISCIPLINES</span>
          </div>
          <div className="competency-tags">
            <span className="comp-tag">Object-Oriented Programming (OOP)</span>
            <span className="comp-tag">Data Structures &amp; Algorithms</span>
            <span className="comp-tag">RESTful API Design</span>
            <span className="comp-tag">Relational Database Normalization</span>
            <span className="comp-tag">Continuous Integration &amp; Git Flow</span>
            <span className="comp-tag">Software Development Life Cycle</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
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

          <div className="about-bio-col">
            <h3 className="about-name-heading pixel-font">HI, I'M KRITI</h3>
            <p className="about-bio-text">
              I'm a Computer Science student at <strong>SRM IST</strong> (CGPA 9.0/10.0),
              building full-stack web apps, real-time systems, and data pipelines.
              I care about writing software that's reliable, readable, and actually solves the problem.
            </p>
            <p className="about-bio-text">
              Currently open to internship opportunities in software engineering or
              backend&nbsp;/&nbsp;full-stack roles.
            </p>

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

      {/* ── CREDENTIALS ── */}
      <section id="credentials" className="section-inner">
        <div className="section-label-wrapper">
          <div className="section-label pixel-font">
            <span className="section-num">05.</span> CREDENTIALS
          </div>
          <span className="section-subtext handwriting">certifications, hackathons &amp; academic record</span>
        </div>

        <div className="credentials-grid">
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
                      <div className="cgpa-pill"><strong>{edu.metric}</strong></div>
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
            Whether you have an internship opportunity, a software engineering project, or just want to say hi — my inbox is always open.
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
            <button onClick={copyToClipboard} className="btn btn-accent btn-large">
              {copiedEmail ? <Check size={16} color="#111" /> : <Copy size={16} />}
              {copiedEmail ? 'Email Copied!' : 'Copy Email Address'}
            </button>
            <a href="https://kriti2.tech" target="_blank" rel="noreferrer" className="btn btn-primary btn-large">
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
          <span className="footer-copy">© {new Date().getFullYear()} Kriti Gupta</span>
        </div>
      </footer>

    </div>
  );
}
