import campusFindLogo from '../assets/campus-find-logo.jpg';

export const projectsData = [
  {
    id: 'campus-find',
    num: '01',
    shadow: '#7c3aed',           // Campus Find deep purple shadow
    brand: {
      id: 'campus-find',
      logo: campusFindLogo,
      accent: '#7c3aed',         // deep purple — primary emphasis
      mid: '#a78bfa',            // medium purple — interactive
      lavender: '#ede9fe',       // soft lavender — backgrounds
      surface: '#f5f3ff',        // very light lavender — subtle surfaces
    },
    title: 'Campus Find',
    oneSentence: 'Lost & Found platform for university communities.',
    brief: 'Lost & Found platform for university communities.',
    tags: ['Real-time', 'Authentication', 'MERN', 'MongoDB'],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.IO', 'JWT'],
    github: 'https://github.com/Kriti-2/lost-and-found-hub',
    demo: 'https://campusfind.demo',
    img: campusFindLogo,

    // Step-by-step simple visual story (Progressive Disclosure)
    howItWorks: [
      {
        step: 1,
        title: 'Student',
        simple: 'Student opens the campus portal on their phone or laptop.',
        tech: 'React 18 single-page application'
      },
      {
        step: 2,
        title: 'Login',
        simple: 'Logs in securely with college Google credentials.',
        tech: 'JWT + Google OAuth 2.0 guard'
      },
      {
        step: 3,
        title: 'Report Item',
        simple: 'Posts photo and location of a lost or found item.',
        tech: 'Express.js REST API + Multer upload'
      },
      {
        step: 4,
        title: 'Someone Finds Item',
        simple: 'A classmate searches categorized campus listings.',
        tech: 'MongoDB text indexing & search'
      },
      {
        step: 5,
        title: 'Submit Claim',
        simple: 'Finder submits a verification claim with secret details.',
        tech: 'Atomic state lock on item record'
      },
      {
        step: 6,
        title: 'Owner Verifies',
        simple: 'Original owner checks the verification question and confirms.',
        tech: 'Protected transition endpoint'
      },
      {
        step: 7,
        title: 'Notification',
        simple: 'Both students get instant real-time alerts without refreshing.',
        tech: 'Socket.IO bidirectional event broadcast'
      }
    ],

    // Small interactive demonstration
    tryIt: {
      type: 'notification',
      buttonText: 'Send test notification',
      defaultItem: 'Blue Umbrella in Tech Park (Floor 3)',
      notificationTitle: '🔔 New claim received!'
    },

    // Notebook Handwritten Details (1–3 sentences)
    notebookNotes: {
      why: 'Students at SRM kept losing IDs and calculators with no unified place to verify claims beyond cluttered WhatsApp groups.',
      learned: 'Optimistic UI updates make real-time applications feel instantaneous even on spotty campus Wi-Fi.',
      fixed: 'Students repeatedly clicked submit, creating duplicate claims. I added request debouncing and an atomic MongoDB lock on pending items.'
    }
  },

  {
    id: 'margsense',
    num: '02',
    shadow: 'var(--green)',
    title: 'MargSense',
    oneSentence: 'Predictive traffic intelligence and illegal parking hotspot detection.',
    brief: 'Predictive traffic intelligence and illegal parking hotspot detection.',
    tags: ['Python', 'FastAPI', 'Geospatial', 'Machine Learning'],
    stack: ['Python', 'FastAPI', 'MapLibre GL', 'Machine Learning', 'WebSockets', 'Azure'],
    github: 'https://github.com/Kriti-2/Margsense',
    demo: 'https://margsense.demo',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

    // Step-by-step simple visual story
    howItWorks: [
      {
        step: 1,
        title: 'Traffic Sensors',
        simple: 'Sensors monitor vehicle dwell time and curb occupancy.',
        tech: 'Async HTTP telemetry stream'
      },
      {
        step: 2,
        title: 'Ingestion API',
        simple: 'High-speed Python server receives data in sub-100ms.',
        tech: 'FastAPI ASGI + Pydantic validation'
      },
      {
        step: 3,
        title: 'Forecast Model',
        simple: 'Predicts which road corridors will face parking violations.',
        tech: 'Random Forest + Prophet time-series'
      },
      {
        step: 4,
        title: 'Hotspot Clustering',
        simple: 'Groups coordinates into color-coded risk zones.',
        tech: 'GeoJSON polygons with NumPy/Pandas'
      },
      {
        step: 5,
        title: 'Map Overlay',
        simple: 'Renders dynamic GPU vector heatmaps on an interactive map.',
        tech: 'MapLibre GL JS vector tiles'
      },
      {
        step: 6,
        title: 'Safety Alert',
        simple: 'Broadcasts instant congestion alerts to traffic operators.',
        tech: 'Native WebSockets broadcast'
      }
    ],

    // Small interactive demonstration
    tryIt: {
      type: 'hotspot',
      buttonText: 'Predict hotspot',
      zones: [
        { id: 'z1', name: 'Corridor A (Tech Park)', baseRisk: 86, forecast: 'Heavy congestion expected 5:30 PM' },
        { id: 'z2', name: 'Metro Station Gate 2', baseRisk: 64, forecast: 'Moderate double-parking risk' },
        { id: 'z3', name: 'Commercial Market Ring', baseRisk: 92, forecast: 'Critical illegal parking hotspot' },
        { id: 'z4', name: 'Expressway Flyover Exit', baseRisk: 31, forecast: 'Clear traffic flow' }
      ]
    },

    // Notebook Handwritten Details (1–3 sentences)
    notebookNotes: {
      why: 'Accident and congestion reports were trapped in static PDFs instead of giving road authorities real-time predictive warnings.',
      learned: 'Serving thousands of spatial coordinates requires indexing geometry fields into GeoJSON for sub-100ms rendering.',
      fixed: 'The Prophet model drifted during holiday rain anomalies until external weather and calendar regressors were added.'
    }
  }
];
