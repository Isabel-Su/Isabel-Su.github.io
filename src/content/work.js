/*
 * Work experience.
 *
 * Entries sort themselves — `current` roles float to the top, then everything
 * else by end date descending. So adding the Discrete Math TA role is appending
 * the object below and nothing else; it will slot into the right place on its own.
 *
 *   {
 *     id: 'gt-discrete-math',
 *     org: 'Georgia Institute of Technology',
 *     role: 'Undergraduate Teaching Assistant, Discrete Mathematics',
 *     location: 'Atlanta, GA',
 *     dates: 'Jan 2027 – Present',
 *     range: { start: '2027-01', end: null },
 *     current: true,
 *     kind: 'teaching',
 *     summary: '…one sentence…',
 *     highlights: ['…', '…'],
 *   }
 *
 * `kind` drives the small label on the card: 'industry' | 'research' | 'teaching'.
 */

export const kindLabels = {
  industry: 'Industry',
  research: 'Research',
  teaching: 'Teaching',
}

// REVIEW: the framing line at the top of the Work page. It exists to make the
// finance/AI split read as intentional range rather than a scattered résumé.
export const workIntro =
  'One summer on a corporate audit floor in Newark, one year in an AI lab in Atlanta. Different vocabularies, same instinct — find the manual, error-prone process everyone has quietly accepted, and turn it into something that runs on its own.'

export const work = [
  {
    id: 'prudential',
    org: 'Prudential Financial',
    role: 'Finance Intern',
    location: 'Newark, NJ',
    dates: 'Jun – Aug 2026',
    range: { start: '2026-06', end: '2026-08' },
    current: false,
    kind: 'industry',
    summary:
      'Automation and scoping work inside Prudential’s company-wide SOX/MAR compliance program.',
    highlights: [
      'Automated SOX checklist consolidation and business-unit-level report generation in VBA, significantly improving both the speed and the accuracy of the process — the same pain point had already been flagged internally as a candidate for a paid AI vendor solution.',
      'Supported materiality threshold and scoping decisions for the company-wide SOX/MAR program, reconciling multi-billion-dollar balances across ledgers and reports while the business was actively restructuring.',
    ],
  },

  {
    id: 'gt-vip-nexus',
    org: 'GT VIP AI Makerspace Nexus',
    role: 'Software Developer',
    location: 'Atlanta, GA',
    dates: 'Jan 2026 – Present',
    range: { start: '2026-01', end: null },
    current: true,
    kind: 'research',
    summary:
      'Building retrieval-augmented tooling that turns research code into something students can actually run.',
    highlights: [
      'Worked in a 3-person subteam to build a RAG pipeline on open-source LLMs, refactoring a legacy codebase into a deployable, student-facing notebook spanning AI, biology/chemistry, and CS coursework.',
      'Developed the feedback system and chatbot components that carry the quizzing notebook’s interactive functionality.',
    ],
  },
]

/** Current roles first, then most recently ended. */
export const sortedWork = [...work].sort((a, b) => {
  const aEnd = a.range.end ?? '9999-99'
  const bEnd = b.range.end ?? '9999-99'
  if (aEnd !== bEnd) return bEnd.localeCompare(aEnd)
  return (b.range.start ?? '').localeCompare(a.range.start ?? '')
})
