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

  // Home opening blurb. Deliberately written without naming projects or roles
  // so it does not go stale as the work behind it changes.
  identity:
    'I’m drawn to problems where the hard part is the thinking. I love working with other passionate people and building things that hold up over time, whether that means a polished app or a well-documented codebase.',

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
 * These describe what each page is rather than what is currently on it, so
 * adding a project or a role does not mean rewriting the home page.
 */
export const entryPoints = [
  {
    to: '/projects',
    label: 'Projects',
    blurb: 'The work I pick up on my own, start to finish.',
  },
  {
    to: '/work',
    label: 'Work',
    blurb: 'Research, teaching, and industry — where I’ve been paid to learn.',
  },
  {
    to: '/hobbies',
    label: 'Hobbies',
    blurb: 'What I’m doing when I’m not at a keyboard.',
  },
  {
    to: '/about',
    label: 'About',
    blurb: 'My story, plus how to reach me.',
  },
]
