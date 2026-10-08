import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CornerDownLeft, Terminal, ArrowRight, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { buildLogsData } from '../data/buildLogs';

export default function TerminalConsole({ 
  onOpenTrace, 
  onSelectProject, 
  onToggleRecruiterMode,
  onNavigate 
}) {
  const [terminalHistory, setTerminalHistory] = useState([
    {
      cmd: 'whoami',
      output: (
        <span>
          Kriti Gupta — B.Tech Computer Science Engineering student @ SRM IST (CGPA: 9.0/10.0).<br />
          Full-Stack Developer focused on APIs, real-time distributed features &amp; predictive systems.<br />
          Status: [ACTIVE] Open for Software Engineering internships &amp; collaborative builds.
        </span>
      )
    },
    {
      cmd: 'projects',
      output: (
        <div>
          <span>Registered Projects (click to inspect codebase):</span>
          <div className="terminal-clickable-list">
            {projectsData.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectProject(p.num, 'readme');
                  onNavigate('projects');
                }}
                className="term-project-link mono-font"
              >
                ▸ [{p.id}] — {p.title} ({p.tag})
              </button>
            ))}
          </div>
        </div>
      )
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  const runCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();

    if (lower === 'clear') {
      setTerminalHistory([]);
      setInputVal('');
      return;
    }

    let outputElement = null;

    if (lower === 'whoami') {
      outputElement = (
        <span>
          Kriti Gupta — B.Tech Computer Science Engineering student @ SRM IST (CGPA: 9.0/10.0).<br />
          Specializing in Full-Stack Web Architecture, high-concurrency RESTful APIs, 
          real-time distributed sockets, geospatial dashboards &amp; machine learning pipelines.<br />
          Status: [ACTIVE] Open for Summer/Fall Internships &amp; Software Engineering roles.
        </span>
      );
    } else if (lower === 'projects') {
      outputElement = (
        <div>
          <span>Flagship Codebases (click to open codebase explorer):</span>
          <div className="terminal-clickable-list">
            {projectsData.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectProject(p.num, 'readme');
                  onNavigate('projects');
                }}
                className="term-project-link mono-font"
              >
                ▸ [{p.id}] — {p.title} ({p.tag})
              </button>
            ))}
          </div>
        </div>
      );
    } else if (lower.startsWith('trace')) {
      const parts = lower.split(' ');
      const targetId = parts[1] || 'campus-find';
      const found = projectsData.find(p => p.id === targetId || p.id.includes(targetId)) || projectsData[0];

      onOpenTrace(found.num);
      onNavigate('projects');

      outputElement = (
        <span>
          [DISPATCH] Launching real-time system trace for: <strong>{found.title}</strong>...<br />
          Navigating to architecture pipeline visualizer.
        </span>
      );
    } else if (lower === 'skills') {
      outputElement = (
        <div>
          <span>Proof of Skills (Technology &rarr; Where I used it):</span>
          <div className="terminal-skills-print">
            {skillsData.map((s, idx) => (
              <div key={idx} className="term-skill-item">
                <strong style={{ color: 'var(--yellow)' }}>{s.tech || s.name}</strong> &rarr; {s.proof || s.usages?.join(' · ')}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (lower === 'notes' || lower === 'build-notes' || lower === 'journal' || lower === 'log') {
      onNavigate('build-notes');
      outputElement = (
        <div>
          <span>Navigating to Build Notes... Authentic engineering lessons &amp; takeaways.</span>
        </div>
      );
    } else if (lower === 'recruiter') {
      onToggleRecruiterMode();
      outputElement = (
        <span>
          [DISPATCH] Activated RECRUITER MODE (30-second condensed overview).
        </span>
      );
    } else if (lower === 'resume') {
      outputElement = (
        <span>
          Education: SRM IST B.Tech CSE (CGPA 9.0/10.0) | NPTEL NLP Certified (2026)<br />
          Flipkart Gridlock Hackathon 2.0 (Top 1,600 / 11K+ teams)<br />
          Contact: kritigup251@gmail.com | Phone: +91 8858586275<br />
          <a href="https://kriti2.tech" target="_blank" rel="noreferrer" style={{ color: 'var(--green)' }}>
            Visit live web profile &rarr;
          </a>
        </span>
      );
    } else if (lower === 'contact') {
      outputElement = (
        <span>
          Direct Endpoints:<br />
          - Email: kritigup251@gmail.com<br />
          - Phone: +91 8858586275<br />
          - LinkedIn: linkedin.com/in/Kritigupta251<br />
          - GitHub: github.com/Kriti-2<br />
          - Domain: https://kriti2.tech
        </span>
      );
    } else if (lower === 'help') {
      outputElement = (
        <span>
          Connected CLI Commands:<br />
          • <strong>projects</strong>          &rarr; List codebases (click any to open)<br />
          • <strong>trace &lt;id&gt;</strong>       &rarr; Run architecture trace (e.g. "trace campus-find")<br />
          • <strong>skills</strong>            &rarr; Print evidence-based skill usage<br />
          • <strong>journal</strong>           &rarr; Jump to personal Build Log<br />
          • <strong>recruiter</strong>         &rarr; Toggle 30-Second Recruiter Mode<br />
          • <strong>resume</strong>            &rarr; Print credentials &amp; contact summary<br />
          • <strong>whoami</strong>            &rarr; Engineer bio and status<br />
          • <strong>clear</strong>             &rarr; Clear console buffer
        </span>
      );
    } else {
      outputElement = (
        <span>
          Command not found: "{raw}". Type <strong>help</strong> to see valid connected commands.
        </span>
      );
    }

    setTerminalHistory(prev => [...prev, { cmd: raw, output: outputElement }]);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  return (
    <section id="terminal" className="section-inner terminal-section">
      <div className="section-label-wrapper">
        <div className="section-label pixel-font">
          <span className="section-num">&gt;_</span> DEVELOPER CONSOLE
        </div>
        <span className="section-subtext handwriting">interactive CLI connected directly to portfolio states</span>
      </div>

      {/* Live Dev Activity Ticker */}
      <div className="dev-status-ticker">
        <div className="ticker-item"><span className="pulse-green">●</span> <strong>BRANCH:</strong> main (clean)</div>
        <div className="ticker-item"><span className="pulse-blue">●</span> <strong>RUNTIME:</strong> Node v20.x · Python 3.11</div>
        <div className="ticker-item"><span className="pulse-purple">●</span> <strong>DEPLOYED ON:</strong> Microsoft Azure &amp; Vercel</div>
        <div className="ticker-item"><span className="pulse-yellow">●</span> <strong>STATUS:</strong> OPEN_FOR_SUMMER_INTERNSHIPS</div>
      </div>

      {/* The Authentic Developer Terminal Container */}
      <div className="interactive-terminal">
        <div className="terminal-header-bar">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <div className="terminal-title mono-font">
            kriti@developer-laptop: ~/portfolio (bash)
          </div>
          <button 
            onClick={() => setTerminalHistory([])} 
            className="terminal-clear-btn" 
            title="Clear Terminal Output"
          >
            <RotateCcw size={13} />
            <span className="hidden-mobile">CLEAR</span>
          </button>
        </div>

        {/* Quick Clickable Connected Command Presets */}
        <div className="terminal-presets-row">
          <span className="presets-label mono-font">Connected Commands:</span>
          {['whoami', 'projects', 'trace campus-find', 'trace margsense', 'skills', 'journal', 'recruiter'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="preset-cmd-pill mono-font"
            >
              <Play size={10} style={{ marginRight: 4 }} />
              {cmd}
            </button>
          ))}
        </div>

        {/* Scrollable Command Log */}
        <div className="terminal-body" ref={terminalEndRef}>
          <div className="terminal-banner mono-font">
            {`Welcome to Kriti Gupta's Connected Developer Console (v2.8)
Type 'help' to see connected commands, or click the quick pills above to navigate.`}
          </div>

          {terminalHistory.map((item, index) => (
            <div key={index} className="terminal-log-entry">
              <div className="terminal-prompt-line mono-font">
                <span className="term-user">kriti@srm-ist</span>
                <span className="term-colon">:</span>
                <span className="term-path">~/portfolio</span>
                <span className="term-branch">(main)</span>
                <span className="term-dollar">$</span>
                <span className="term-cmd-text">{item.cmd}</span>
              </div>
              <div className="terminal-output mono-font">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <form onSubmit={handleSubmit} className="terminal-input-form">
            <span className="term-user">kriti@srm-ist</span>
            <span className="term-colon">:</span>
            <span className="term-path">~/portfolio</span>
            <span className="term-branch">(main)</span>
            <span className="term-dollar">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'projects', 'trace campus-find', 'recruiter'..."
              className="terminal-text-input mono-font"
              spellCheck="false"
              autoComplete="off"
            />
            <button type="submit" className="terminal-send-btn mono-font" title="Run command">
              <CornerDownLeft size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
