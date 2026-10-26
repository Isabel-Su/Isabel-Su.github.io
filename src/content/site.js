/*
 * Global site content: identity, navigation, contact.
 * Editing anything here updates it everywhere it appears.
 */

export const site = {
  name: 'Isabel Su',
  initials: 'isu',

  // Drop a file at src/assets/images/home/banner-<width>.jpg (or run
  // `npm run images` from assets-raw/home/banner.jpg). Until then the home
  // hero shows a labelled placeholder behind the name.
  homeBanner: {
    key: 'home/banner',
    alt: '',
  },

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
    { label: 'Resume', href: '/resume.pdf', external: true },
    { label: 'Projects', to: '/projects' },
    { label: 'Life', to: '/life' },
    { label: 'About', to: '/about' },
  ],
}

/**
 * The 3 entry points on the home page. `blurb` is the one-line description
 * under each; keep them short — they're read at a glance, not studied.
 *
 * These describe what each page is rather than what is currently on it, so
 * adding a project or a role does not mean rewriting the home page.
 */
export const entryPoints = [
  {
    to: '/projects',
    label: 'Projects',
    blurb: 'Solutions to problems',
  },
  {
    to: '/life',
    label: 'Life',
    blurb: 'What I’m doing when I’m not at a keyboard',
  },
  {
    to: '/about',
    label: 'About',
    blurb: 'My story, plus how to reach me',
  },
]
