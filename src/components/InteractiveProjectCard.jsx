import React, { useState } from 'react';
import { 
  Play, Bell, MapPin, ExternalLink, ChevronRight, 
  CheckCircle2, Sparkles, RefreshCw, Send, AlertTriangle, Lightbulb, Pin
} from 'lucide-react';

const GithubIcon = ({ size = 15 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
  </svg>
);

export default function InteractiveProjectCard({ project }) {
  // Active view: 'story' (How it works), 'try' (Interactive demo), 'notes' (Notebook details)
  const [activeView, setActiveView] = useState('story');
  
  // Selected step in visual story
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);

  // Mini-demo states
  // Campus Find:
  const [testItemName, setTestItemName] = useState(project.tryIt?.defaultItem || 'Blue Umbrella in Tech Park');
  const [receivedAlert, setReceivedAlert] = useState(null);
  const [isSendingAlert, setIsSendingAlert] = useState(false);

  // MargSense:
  const [selectedZone, setSelectedZone] = useState(project.tryIt?.zones?.[0]?.id || 'z1');
  const [predictedResult, setPredictedResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // Trigger test notification for Campus Find
  const handleSendTestNotification = () => {
    setIsSendingAlert(true);
    setReceivedAlert(null);

    setTimeout(() => {
      setIsSendingAlert(false);
      setReceivedAlert({
        title: project.tryIt.notificationTitle,
        item: testItemName || 'Student ID Card (B.Tech CSE)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        channel: 'WebSocket (Socket.IO client)'
      });
    }, 450);
  };

  // Trigger hotspot prediction for MargSense
  const handlePredictHotspot = () => {
    setIsPredicting(true);
    setPredictedResult(null);

    const zoneObj = project.tryIt.zones.find(z => z.id === selectedZone) || project.tryIt.zones[0];
    setTimeout(() => {
      setIsPredicting(false);
      // Small variation for realistic feel
      const risk = Math.min(98, Math.max(25, zoneObj.baseRisk + Math.floor(Math.random() * 7 - 3)));
      setPredictedResult({
        zone: zoneObj.name,
        riskScore: risk,
        riskLevel: risk > 75 ? 'HIGH RISK' : risk > 50 ? 'MODERATE' : 'LOW RISK',
        forecast: zoneObj.forecast,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 500);
  };

  const selectedStep = project.howItWorks[selectedStepIdx] || project.howItWorks[0];

  return (
    <div className="interactive-project-card" style={{ boxShadow: `7px 7px 0 ${project.shadow}` }}>
      {/* Top Banner: Number + Title + One-Sentence + Visual Tags */}
      <div className="proj-card-top-bar">
        <div className="proj-title-cluster">
          <span className="proj-number pixel-font">{project.num}</span>
          <div>
            <h3 className="proj-main-title">{project.title}</h3>
            <p className="proj-one-sentence">{project.oneSentence}</p>
          </div>
        </div>

        {/* 3-4 Visual Tags */}
        <div className="proj-tags-list">
          {project.tags.map(tag => (
            <span key={tag} className="proj-tag-pill">{tag}</span>
          ))}
        </div>
      </div>

      {/* Interactive Controls Row */}
      <div className="proj-mode-selector-bar">
        <div className="proj-mode-buttons">
          <button
            onClick={() => setActiveView('story')}
            className={`proj-mode-btn ${activeView === 'story' ? 'active' : ''}`}
          >
            <Sparkles size={13} />
            <span>SEE HOW IT WORKS</span>
          </button>

          <button
            onClick={() => setActiveView('try')}
            className={`proj-mode-btn ${activeView === 'try' ? 'active' : ''}`}
          >
            <Play size={12} />
            <span>TRY IT</span>
          </button>

          <button
            onClick={() => setActiveView('notes')}
            className={`proj-mode-btn ${activeView === 'notes' ? 'active' : ''}`}
          >
            <Lightbulb size={13} />
            <span>NOTEBOOK NOTES</span>
          </button>
        </div>

        <div className="proj-external-links">
          <a href={project.github} target="_blank" rel="noreferrer" className="proj-repo-link" title="Source Code">
            <GithubIcon size={14} />
            <span>GITHUB</span>
          </a>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          VIEW 1: SEE HOW IT WORKS (Gentle Visual Story)
          ─────────────────────────────────────────────────────────── */}
      {activeView === 'story' && (
        <div className="proj-view-container visual-story-view">
          <div className="story-intro-line handwriting">
            Follow the flow from start to finish — click any step to see how it works:
          </div>

          {/* Connected Step Pipeline */}
          <div className="story-pipeline">
            {project.howItWorks.map((step, idx) => {
              const isSelected = selectedStepIdx === idx;
              return (
                <React.Fragment key={step.step}>
                  <button
                    onClick={() => setSelectedStepIdx(idx)}
                    className={`story-step-node ${isSelected ? 'active' : ''}`}
                  >
                    <span className="step-num-badge mono-font">{step.step}</span>
                    <strong className="step-node-title">{step.title}</strong>
                  </button>
                  {idx < project.howItWorks.length - 1 && (
                    <span className="story-arrow">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Progressive Disclosure Card */}
          <div className="story-step-explanation-box">
            <div className="step-exp-header">
              <span className="step-exp-badge mono-font">STEP 0{selectedStep.step}</span>
              <h4 className="step-exp-title">{selectedStep.title}</h4>
            </div>

            {/* Simple explanation first */}
            <p className="step-simple-text">{selectedStep.simple}</p>

            {/* Technical disclosure second */}
            <div className="step-tech-disclosure">
              <span className="mono-font tech-tag-label">Under the hood:</span>
              <span className="mono-font tech-tag-val">{selectedStep.tech}</span>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW 2: TRY IT (One Small Interactive Mini-Demo)
          ─────────────────────────────────────────────────────────── */}
      {activeView === 'try' && (
        <div className="proj-view-container try-it-view">
          <div className="try-it-header">
            <span className="interactive-badge mono-font">● INTERACTIVE DEMONSTRATION</span>
            <span className="try-it-subtext handwriting">experience the core feature directly</span>
          </div>

          {/* Campus Find Demo: Send test notification */}
          {project.tryIt.type === 'notification' && (
            <div className="demo-canvas notification-demo-canvas">
              <div className="demo-input-cluster">
                <label className="demo-input-label mono-font">Test Item to Claim:</label>
                <div className="demo-input-row">
                  <input
                    type="text"
                    value={testItemName}
                    onChange={(e) => setTestItemName(e.target.value)}
                    placeholder="e.g. Blue Umbrella in Tech Park"
                    className="demo-text-input mono-font"
                  />
                  <button
                    onClick={handleSendTestNotification}
                    disabled={isSendingAlert}
                    className="btn btn-accent demo-action-btn"
                  >
                    <Bell size={14} />
                    <span>{isSendingAlert ? 'Emitting...' : project.tryIt.buttonText}</span>
                  </button>
                </div>
              </div>

              {/* Live Toast alert display */}
              {receivedAlert ? (
                <div className="simulated-alert-box animated-alert">
                  <div className="alert-top">
                    <span className="alert-bell-icon">🔔</span>
                    <strong className="alert-title">{receivedAlert.title}</strong>
                    <span className="alert-time mono-font">{receivedAlert.time}</span>
                  </div>
                  <p className="alert-body">
                    Claim submitted for: <strong>"{receivedAlert.item}"</strong>
                  </p>
                  <div className="alert-footer mono-font">
                    <span>Transport: {receivedAlert.channel}</span>
                    <span className="badge-online">STATUS: DELIVERED</span>
                  </div>
                </div>
              ) : (
                <div className="demo-idle-placeholder">
                  <span className="handwriting">Click "Send test notification" above to trigger a simulated real-time event ✦</span>
                </div>
              )}
            </div>
          )}

          {/* MargSense Demo: Predict Hotspot */}
          {project.tryIt.type === 'hotspot' && (
            <div className="demo-canvas hotspot-demo-canvas">
              <div className="hotspot-zones-grid">
                {project.tryIt.zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => { setSelectedZone(zone.id); setPredictedResult(null); }}
                    className={`hotspot-zone-card ${selectedZone === zone.id ? 'active' : ''}`}
                  >
                    <div className="zone-card-top">
                      <MapPin size={13} />
                      <strong className="zone-name">{zone.name}</strong>
                    </div>
                    <span className="zone-forecast-sub mono-font">{zone.forecast}</span>
                  </button>
                ))}
              </div>

              <div className="hotspot-action-row">
                <button
                  onClick={handlePredictHotspot}
                  disabled={isPredicting}
                  className="btn btn-accent demo-action-btn"
                >
                  <Sparkles size={14} />
                  <span>{isPredicting ? 'Computing Inference...' : project.tryIt.buttonText}</span>
                </button>
              </div>

              {/* Prediction Result */}
              {predictedResult ? (
                <div className="simulated-prediction-box animated-alert">
                  <div className="pred-score-bar">
                    <span className="pred-zone-title">{predictedResult.zone}</span>
                    <span className={`pred-risk-pill ${predictedResult.riskScore > 75 ? 'bg-pink' : predictedResult.riskScore > 50 ? 'bg-yellow' : 'bg-green'}`}>
                      {predictedResult.riskLevel} ({predictedResult.riskScore}%)
                    </span>
                  </div>
                  <p className="pred-body">
                    <strong>Model Forecast:</strong> {predictedResult.forecast} (Evaluated at {predictedResult.timestamp})
                  </p>
                  <div className="pred-footer mono-font">
                    <span>Pipeline: Random Forest + Prophet</span>
                    <span className="badge-online">INFERENCE: 42ms</span>
                  </div>
                </div>
              ) : (
                <div className="demo-idle-placeholder">
                  <span className="handwriting">Select a corridor and click "Predict hotspot" to test the predictive model ✦</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW 3: NOTEBOOK DETAILS (1–3 Sentence Handwritten Notes)
          ─────────────────────────────────────────────────────────── */}
      {activeView === 'notes' && (
        <div className="proj-view-container notebook-notes-view">
          <div className="notebook-stickers-grid">
            {/* Why I built this */}
            <div className="notebook-sticky sticky-why">
              <div className="sticky-pin" />
              <div className="sticky-header">
                <Lightbulb size={16} className="sticky-icon" />
                <h5 className="sticky-title mono-font">WHY I BUILT THIS</h5>
              </div>
              <p className="sticky-text">{project.notebookNotes.why}</p>
            </div>

            {/* What I learned */}
            <div className="notebook-sticky sticky-learned">
              <div className="sticky-pin" />
              <div className="sticky-header">
                <Pin size={16} className="sticky-icon" />
                <h5 className="sticky-title mono-font">WHAT I LEARNED</h5>
              </div>
              <p className="sticky-text">{project.notebookNotes.learned}</p>
            </div>

            {/* Something I had to fix */}
            <div className="notebook-sticky sticky-fixed">
              <div className="sticky-pin" />
              <div className="sticky-header">
                <AlertTriangle size={16} className="sticky-icon" />
                <h5 className="sticky-title mono-font">SOMETHING I HAD TO FIX</h5>
              </div>
              <p className="sticky-text">{project.notebookNotes.fixed}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
