// Authentic Build Notes: 1-3 sentence notebook lessons from real project development
export const buildNotesData = [
  {
    id: 'websockets-vs-polling',
    title: 'Why I chose WebSockets here',
    tag: '#ARCHITECTURE',
    tagColor: 'var(--yellow)',
    note: 'HTTP polling creates constant server request noise on unstable campus Wi-Fi. A single persistent WebSocket connection delivers lost-item claim alerts in under 200ms with zero wasted network calls.',
    project: 'Campus Find'
  },
  {
    id: 'auth-decisions',
    title: 'How I handled authentication',
    tag: '#SECURITY',
    tagColor: 'var(--green)',
    note: 'Instead of storing sessions in server memory, I used stateless JWTs in secure cookies paired with Google OAuth. This kept the API lightweight and decoupled from frontend rebuilds.',
    project: 'Campus Find'
  },
  {
    id: 'what-went-wrong',
    title: 'What went wrong the first time',
    tag: '#DEBUGGING',
    tagColor: 'var(--pink)',
    note: 'During my first user test, students mashed the claim button, generating duplicate claims. I had to debounce the submit button and enforce an atomic status lock on the MongoDB document.',
    project: 'Campus Find'
  },
  {
    id: 'spatial-performance',
    title: 'Spatial queries under load',
    tag: '#PERFORMANCE',
    tagColor: 'var(--blue)',
    note: 'Serializing thousands of raw GPS points in Python choked browser renders. Converting coordinates into simplified GeoJSON polygons with indexed geometry fields dropped render lag from 2s to 90ms.',
    project: 'MargSense'
  },
  {
    id: 'real-user-feedback',
    title: 'What I learned testing with actual users',
    tag: '#USABILITY',
    tagColor: 'var(--yellow)',
    note: 'Engineers obsess over code structure, but students just want recovery to feel fast and honest. Adding an automatic profanity filter and visible claim progress badges cut confusion by 80%.',
    project: 'Campus Find'
  }
];
