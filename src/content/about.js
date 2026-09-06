/*
 * About page content. Contact details live in site.js so they stay in one place.
 */

export const about = {
  // The photo of you. Drop a file at src/assets/images/about/portrait-<width>.jpg
  // (or run `npm run images`) and it appears automatically.
  portrait: {
    key: 'about/portrait',
    ratio: '4 / 5',
    alt: 'Isabel Su',
  },

  heading: 'A quick introduction.',

  paragraphs: [
    '[PLACEHOLDER: Replace this with a few genuine sentences about yourself. What you are studying and where, what kind of problems you gravitate toward, and one thing that is true about you that would not show up on a résumé. Shorter is better; three or four sentences is plenty.]',
  ],

  facts: [
    { label: 'Studying', value: 'Computer Science, Mathematics' },
    { label: 'Based in', value: 'NYC Metropolitan Area' },
    { label: 'Focus', value: 'AI/ML, iOS Development, Systems' },
  ],

  toolsHeading: 'Tools I reach for',
  tools: [
    {
      label: 'Languages',
      items: ['Java', 'Python', 'C/C++', 'Swift', 'SQL', 'Assembly', 'Bash', 'HTML', 'CSS'],
    },
    {
      label: 'ML / Data',
      items: ['Ollama', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib'],
    },
    {
      label: 'App Development',
      items: ['SwiftUI', 'React'],
    },
    {
      label: 'Backend / Infra',
      items: ['Spring Boot', 'MongoDB', 'Firebase'],
    },
    {
      label: 'Dev Tools',
      items: ['Git', 'Cursor'],
    },
  ],
}
