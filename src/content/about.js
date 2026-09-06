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

  // REVIEW: heading — short, declarative, sets up the paragraph below.
  heading: 'A quick introduction.',

  // TODO(isabel): this is the placeholder you asked for. Replace with your own
  // few sentences. Each string in this array renders as its own paragraph.
  paragraphs: [
    'Placeholder — replace this with a few genuine sentences about yourself. What you are studying and where, what kind of problems you gravitate toward, and one thing that is true about you that would not show up on a résumé. Shorter is better; three or four sentences is plenty.',
  ],

  // Small factual lines beside the photo. Add, remove, or reorder freely.
  facts: [
    { label: 'Studying', value: 'Computer Science, Mathematics' },
    { label: 'Based in', value: 'Atlanta, GA' }, // REVIEW: confirm
  ],
}
