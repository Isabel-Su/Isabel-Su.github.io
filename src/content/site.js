/*
 * Global site content: identity, navigation, contact.
 * Editing anything here updates it everywhere it appears.
 */

export const site = {
  name: 'Isabel Su',
  initials: 'IS',

  // Drop a file at src/assets/images/home/banner-<width>.jpg (or run
  // `npm run images` from assets-raw/home/banner.jpg). Until then the home
  // hero shows a labelled placeholder behind the name.
  homeBanner: {
    key: 'home/banner',
    alt: '',
  },

  // PLACEHOLDER: home opening blurb. Wording left as-is for Isabel to rewrite;
  // the home page flags it visually so it cannot ship unnoticed.
  identity:
    'Computer science at Georgia Tech. I work on software that makes complicated things easier to use — sign language lessons, retrieval pipelines, audit checklists.',

  education: {
    school: 'Georgia Institute of Technology',
    schoolShort: 'Georgia Tech',
    degree: 'B.S. Computer Science',
    gradYear: 2028,
    gpa: '4.0',
  },

  contact: {
    email: 'isabelsu2025@gmail.com',
    github: { label: 'github.com/Isabel-Su', href: 'https://github.com/Isabel-Su' },
    linkedin: {
      label: 'linkedin.com/in/Isabel-Su',
      href: 'https://www.linkedin.com/in/Isabel-Su',
    },
  },

  // Nav order = the order these appear in the header and on the home page.
  nav: [
    { label: 'Projects', to: '/projects' },
    { label: 'Work', to: '/work' },
    { label: 'Hobbies', to: '/hobbies' },
    { label: 'About', to: '/about' },
  ],
}

/**
 * The four entry points on the home page. `blurb` is the one-line description
 * under each; keep them short — they're read at a glance, not studied.
 *
 * `placeholder: true` flags the one-liner for rewrite without changing wording.
 */
export const entryPoints = [
  {
    to: '/projects',
    label: 'Projects',
    blurb: 'iOS apps, valuation models, and the occasional 36-hour sprint.',
    placeholder: true,
  },
  {
    to: '/work',
    label: 'Work',
    blurb: 'Corporate finance automation and AI research, in that order.',
    placeholder: true,
  },
  {
    to: '/hobbies',
    label: 'Hobbies',
    blurb: 'Photographs, folded paper, and a lot of miles.',
  },
  {
    to: '/about',
    label: 'About',
    blurb: 'The short version, plus how to reach me.',
    placeholder: true,
  },
]
