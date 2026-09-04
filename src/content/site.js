/*
 * Global site content: identity, navigation, contact.
 * Editing anything here updates it everywhere it appears.
 */

export const site = {
  name: 'Isabel Su',
  initials: 'IS',

  // REVIEW: the home page opening line. Written to be quiet and specific rather
  // than a pitch — it names three real, very different things you've built and
  // lets the range do the talking. Overwrite freely; it's the most "you" sentence
  // on the site.
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
 */
export const entryPoints = [
  {
    to: '/projects',
    label: 'Projects',
    blurb: 'iOS apps, valuation models, and the occasional 36-hour sprint.',
  },
  {
    to: '/work',
    label: 'Work',
    blurb: 'Corporate finance automation and AI research, in that order.',
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
  },
]
