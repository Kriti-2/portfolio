import React from 'react';
import { Mail, ExternalLink, Code2, Database, Layout, Server, Sparkles } from 'lucide-react';
import './App.css';

const Github = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#home" className="nav-item active">✦ HOME</a>
          <a href="#about" className="nav-item">ABOUT</a>
          <a href="#projects" className="nav-item">PROJECTS</a>
        </div>
        <div className="social-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="https://linkedin.com/in/Kritigupta251" target="_blank" rel="noreferrer" style={{color: '#111', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontWeight: 'bold'}}>
            <div style={{background: '#ffde59', padding: '0.5rem', borderRadius: '50%', border: '2px solid #111', display: 'flex'}}>
              <Linkedin size={20} />
            </div>
            <span className="hidden-mobile">LinkedIn</span>
          </a>
          <a href="https://github.com/Kriti-2" target="_blank" rel="noreferrer" style={{color: '#111', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontWeight: 'bold'}}>
            <div style={{background: '#ff66c4', padding: '0.5rem', borderRadius: '50%', border: '2px solid #111', display: 'flex'}}>
              <Github size={20} />
            </div>
            <span className="hidden-mobile">GitHub</span>
          </a>
          <a href="mailto:kritigup251@gmail.com" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <Mail size={16} /> CONTACT
          </a>
        </div>
      </nav>

      <header id="home" className="hero">
        <p className="handwriting" style={{ transform: 'rotate(-5deg)', marginBottom: '-0.5rem', fontSize: '2rem' }}>Hi, my name is</p>
        <div className="hero-name-box">
          <div className="badge badge-1">Full-Stack</div>
          <h1 className="hero-name pixel-font">KRITI GUPTA</h1>
          <div className="badge badge-2">Engineer</div>
        </div>
        <h2 className="hero-subtitle">
          I build software that <span style={{ color: 'var(--green)' }}>gets out of your way</span> <Sparkles style={{display: 'inline', color: 'var(--pink)'}}/>
        </h2>
      </header>

      <section id="about" className="about-section">
        <div className="polaroid-container">
          <div className="polaroid">
            <div className="tape"></div>
            <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Coding workspace" />
            <p className="handwriting" style={{ textAlign: 'center', marginTop: '1rem' }}>my workspace</p>
          </div>
        </div>
        <div>
          <div style={{ display: 'inline-block', border: '3px solid #111', padding: '0.25rem 1rem', transform: 'rotate(-2deg)', marginBottom: '1.5rem', background: 'white' }}>
            <span className="pixel-font" style={{ fontSize: '1.5rem' }}>what's up</span>
          </div>
          <p className="handwriting about-text">
            I'm a Computer Science Engineering student who gets a little too excited about building scalable backend systems and beautiful interfaces. ✨ I care about writing clean code, edge cases everyone forgets, and shipping applications that genuinely make someone's day easier. 🎨
          </p>
          
          <div className="skills-container">
            <div className="skill-pill skill-yellow"><Code2 size={18}/> C++, Java, JS, Python</div>
            <div className="skill-pill skill-green"><Layout size={18}/> React, HTML, CSS</div>
            <div className="skill-pill skill-pink"><Server size={18}/> Node.js, Express, FastAPI</div>
            <div className="skill-pill skill-blue"><Database size={18}/> MongoDB, MySQL</div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div style={{ textAlign: 'center' }}>
          <h2 className="section-title pixel-font">MY PROJECTS</h2>
        </div>
        
        <div className="project-grid">
          {/* Project 1 */}
          <div className="project-card" style={{ boxShadow: '12px 12px 0 var(--blue)' }}>
            <div className="project-content">
              <span className="project-tag" style={{ background: 'var(--blue)', color: 'white' }}>MERN Stack</span>
              <h3 className="project-title">Campus Find</h3>
              <p className="project-desc">
                A full-stack Lost & Found platform featuring real-time email notifications, secure user authentication with JWT & Google OAuth, and moderation workflows with profanity filtering.
              </p>
              <div className="project-links">
                <a href="https://github.com/Kriti-2/lost-and-found-hub" target="_blank" rel="noreferrer" className="btn btn-primary">
                  <Github size={18} /> Source Code
                </a>
              </div>
            </div>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Campus Find" />
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card" style={{ boxShadow: '12px 12px 0 var(--green)' }}>
            <div className="project-content">
              <span className="project-tag" style={{ background: 'var(--green)', color: '#111' }}>React & FastAPI</span>
              <h3 className="project-title">MargSense</h3>
              <p className="project-desc">
                Traffic intelligence platform predicting illegal parking and congestion hotspots. Built with React, FastAPI, WebSockets for real-time alerts, and interactive geospatial dashboards using MapLibre GL JS.
              </p>
              <div className="project-links">
                <a href="https://github.com/Kriti-2/Margsense" target="_blank" rel="noreferrer" className="btn btn-primary">
                  <Github size={18} /> Source Code
                </a>
              </div>
            </div>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="MargSense" />
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card" style={{ boxShadow: '12px 12px 0 var(--yellow)' }}>
            <div className="project-content">
              <span className="project-tag" style={{ background: 'var(--yellow)', color: '#111' }}>Blockchain</span>
              <h3 className="project-title">Blockchain Identity System</h3>
              <p className="project-desc">
                A decentralized application leveraging smart contracts for secure and immutable digital identity verification. Explores the core concepts of cryptography, distributed ledgers, and consensus mechanisms.
              </p>
              <div className="project-links">
                <a href="https://github.com/Kriti-2/food-trace-blockchain" target="_blank" rel="noreferrer" className="btn btn-primary">
                  <Github size={18} /> Source Code
                </a>
              </div>
            </div>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1639762681485-074b7f4ec651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Blockchain" />
            </div>
          </div>

          {/* Project 4 */}
          <div className="project-card" style={{ boxShadow: '12px 12px 0 var(--pink)' }}>
            <div className="project-content">
              <span className="project-tag" style={{ background: 'var(--pink)', color: '#111' }}>AI & ML</span>
              <h3 className="project-title">WorkBalance AI</h3>
              <p className="project-desc">
                An intelligent scheduling and analytics platform that optimizes task distribution and promotes healthy work-life balance using predictive modeling and natural language processing.
              </p>
              <div className="project-links">
                <a href="https://github.com/Kriti-2/workbalance-ai" target="_blank" rel="noreferrer" className="btn btn-primary">
                  <Github size={18} /> Source Code
                </a>
              </div>
            </div>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="WorkBalance AI" />
            </div>
          </div>
          
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '4rem 2rem', fontFamily: 'Inter' }}>
        <p className="handwriting" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Let's build something great together!</p>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>© {new Date().getFullYear()} Kriti Gupta. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;
