/*
 * Work experience.
 *
 * Entries sort themselves — `current` roles float to the top, then everything
 * else by end date descending. Adding a role is appending the object; it slots
 * into the right place on its own.
 *
 *   {
 *     id: 'gt-discrete-math',
 *     org: 'Georgia Institute of Technology',
 *     role: 'Undergraduate Teaching Assistant, Discrete Mathematics',
 *     location: 'Atlanta, GA',
 *     dates: 'Aug 2026 – Present',
 *     range: { start: '2026-08', end: null },
 *     current: true,
 *     kind: 'teaching',
 *     summary: '…one sentence…',
 *     highlights: ['…', '…'],
 *   }
 *
 * `kind` drives the small label on the card: 'industry' | 'research' | 'teaching'.
 * Strings starting with `[PLACEHOLDER` are flagged in the UI.
 */

export const kindLabels = {
  industry: 'Industry',
  research: 'Research',
  teaching: 'Teaching',
}

export const workTitle = '[PLACEHOLDER: Work page headline]'
export const workLede = '[PLACEHOLDER: One-liner under the headline]'

export const workIntro =
  '[PLACEHOLDER: Intro blurb for the Work page — the overall narrative that frames the experience list below. Don’t ship this sentence.]'

export const work = [
  {
    id: 'gt-discrete-math',
    org: 'Georgia Institute of Technology',
    role: 'Discrete Math TA',
    location: 'Atlanta, GA',
    dates: 'Aug 2026 – Present',
    range: { start: '2026-08', end: null },
    current: true,
    kind: 'teaching',
    summary:
      '[PLACEHOLDER: One sentence on what this role is day to day.]',
    highlights: [
      '[PLACEHOLDER: Grading — what you grade, and what “done well” looks like.]',
      '[PLACEHOLDER: Office hours — who shows up, what you actually do there.]',
      '[PLACEHOLDER: Recitations / help sessions — format, and your part in them.]',
    ],
  },

  {
    id: 'ai-safety-initiative',
    org: 'AI Safety Initiative',
    role: 'Technical Safety Fellow',
    location: 'Atlanta, GA',
    dates: 'Feb – May 2026',
    range: { start: '2026-02', end: '2026-05' },
    current: false,
    kind: 'research',
    summary:
      'Reading current safety research and pressure-testing it in structured debate.',
    highlights: [
      'Analyzing 3–4 AI safety papers weekly spanning RLHF, alignment, unlearning, adversarial robustness, and model control, developing broad technical literacy across active safety research.',
      'Engaging in structured debate sessions critically evaluating risk frameworks, misalignment failure modes, and jailbreaking vulnerabilities across modern LLM architectures.',
    ],
  },

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

/** Current roles first (open-ended dates), then most recently ended. */
export const sortedWork = [...work].sort((a, b) => {
  const aEnd = a.range.end ?? '9999-99'
  const bEnd = b.range.end ?? '9999-99'
  if (aEnd !== bEnd) return bEnd.localeCompare(aEnd)
  return (b.range.start ?? '').localeCompare(a.range.start ?? '')
})
