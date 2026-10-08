export const buildLogsData = [
  {
    id: 'log-01',
    date: '08 OCT 2026',
    tag: 'DEBUGGING',
    tagColor: 'var(--pink)',
    title: 'Solving WebSocket Connection Drops on Mobile Wi-Fi Sleep',
    problem: 'During campus testing of Campus Find, students using mobile browsers stopped receiving lost item alerts when their phone screens went to sleep or when switching between campus Wi-Fi APs.',
    investigation: 'Inspected network logs. The TCP socket closed silently during deep OS sleep, but the client socket state retained its previous connection status until the server ping timeout elapsed (up to 45 seconds).',
    fix: 'Implemented an active client heartbeat with visibilitychange event listeners. On document visibility change to "visible", the client immediately probes connection health and triggers an explicit reconnect with state re-sync if the socket was dormant.',
    lesson: 'Mobile operating systems aggressively throttle background TCP sockets. Always design WebSocket frontends around reconnection reconciliation rather than assuming persistent connection longevity.'
  },
  {
    id: 'log-02',
    date: '24 SEP 2026',
    tag: 'ENGINEERING NOTE',
    tagColor: 'var(--green)',
    title: 'Why I Decoupled Real-Time Vector Map Rerenders in MargSense',
    problem: 'Directly pushing raw GeoJSON updates into MapLibre GL on every single incoming vehicle telemetry tick caused micro-stutters and frame drops on lower-spec machines.',
    investigation: 'Telemetry points were arriving at variable frequencies (10-15 updates/sec). Each update triggered a full layer re-render across dozens of polygon boundaries.',
    fix: 'Created an in-memory client buffer in React with a 500ms requestAnimationFrame throttling loop. Updates are batched into a single source setData() call, preserving a silky 60fps vector pan and zoom.',
    lesson: 'UI frame rates should be decoupled from backend telemetry ingestion frequencies. Batch at the visual presentation boundary.'
  },
  {
    id: 'log-03',
    date: '12 AUG 2026',
    tag: 'ARCHITECTURE',
    tagColor: 'var(--yellow)',
    title: 'Designing Fail-Safe Automated Moderation Workflows',
    problem: 'Automated profanity filtering could accidentally suppress legitimate lost item posts containing words that trigger false-positive substring matches (e.g., brand names or abbreviations).',
    investigation: 'Naive regex matching was too aggressive. Hard-deleting posts or immediately rejecting submissions frustrated genuine users.',
    fix: 'Implemented a two-tier moderation workflow: high-confidence offensive phrases automatically soft-hide the post to pending review, while moderate scores flag the post for community review while keeping it discoverable with a warning tag.',
    lesson: 'Moderation pipelines should fail softly. Never destroy user-submitted data irreversibly when automated heuristics lack 100% confidence.'
  }
];
