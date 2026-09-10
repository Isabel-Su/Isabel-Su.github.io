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
    "I study computer science and math at Georgia Tech. I enjoy solving challenging problems by collaborating with other passionate people. I care about keeping my work polished and maintainable, rather than rushing to ship it. Outside of class I'm usually behind a camera, on a court, or folding paper into shapes it doesn't want to hold. I grew up in New Jersey and still consider the NYC area home.",
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
