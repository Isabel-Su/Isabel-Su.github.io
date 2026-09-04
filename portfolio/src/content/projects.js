/*
 * Projects.
 *
 * Array order = display order on /projects and prev/next order on detail pages.
 * Adding a project is appending one object — the route /projects/<slug>, the
 * index card, and the detail page all come from this data. No route edits.
 *
 * Shape:
 *   slug      url segment (must be unique)
 *   title     display name
 *   tagline   one sentence, shown on the card and under the detail heading
 *   context   where it was built (club, hackathon, class)
 *   role      your role
 *   period    human-readable date range
 *   stack     technologies — rendered as small labels
 *   award     optional single standout line, rendered with emphasis
 *   cover     { key, ratio, alt } — key resolves via src/lib/images.js
 *   sections  [{ heading, body: [paragraphs], points: [bullets] }]
 *   gallery   [{ key, ratio, alt, caption }] — screenshots, added later
 */

export const projects = [
  {
    slug: 'talking-fingers',
    title: 'Talking Fingers',
    tagline:
      'A computer-vision app that watches you sign, built to widen who gets to learn ASL.',
    context: 'GT iOS Club',
    role: 'Subteam Lead — 7 engineers',
    period: 'Jan – Apr 2026',
    // REVIEW: stack is inferred from "iPhone app" — you didn't specify the CV
    // framework. Correct or trim this list.
    stack: ['Swift', 'SwiftUI', 'Computer Vision'],
    award:
      'First app in GT iOS Club history to sweep all three semi-annual awards — Popular App, Best Design, and Best App Overall.',
    cover: {
      key: 'projects/talking-fingers-cover',
      ratio: '4 / 3',
      alt: 'Talking Fingers app interface',
    },
    sections: [
      {
        heading: 'The problem',
        body: [
          'American Sign Language is usually learned in a classroom or with a tutor, which puts it out of reach for plenty of people who genuinely want to pick it up. The apps that try to fill that gap mostly quiz recognition — can you identify this sign — which is a different skill from being able to produce one yourself.',
          // REVIEW: this sentence extrapolates from "computer-vision-based" to
          // describe camera-based feedback. Accurate to the concept, but confirm
          // it matches what the app actually does.
          'Talking Fingers was built around the camera instead, so the learning loop closes on whether your hands are actually doing the right thing.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'I led a 7-person subteam inside a 30+ person project, owning the foundational functionality the rest of the app was assembled on top of. Three pieces of that were mine end to end.',
        ],
        points: [
          'Implemented multiple spaced-repetition scheduling algorithms rather than committing to one, so review intervals could be tuned against long-term retention instead of how well someone happened to do in a single session.',
          'Built semantic search across the lesson library, so a learner can ask for something the way they would actually phrase it and get relevant lessons back without guessing the exact term the curriculum used.',
          'Drove the core UI/UX — the structure of the learning flow and how the app looks and behaves while you are in it.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'Talking Fingers became the first app in GT iOS Club history to sweep all three semi-annual awards: Popular App, Best Design, and Best App Overall. The design award is the one I care about most, since the whole argument of the project was that an accessibility tool has to be pleasant enough that people keep opening it.',
        ],
      },
    ],
    gallery: [
      // Drop screenshots into src/assets/images/projects/ and they appear here.
      { key: 'projects/talking-fingers-01', ratio: '9 / 19.5', alt: 'Lesson view' },
      { key: 'projects/talking-fingers-02', ratio: '9 / 19.5', alt: 'Practice view' },
      { key: 'projects/talking-fingers-03', ratio: '9 / 19.5', alt: 'Search view' },
    ],
  },

  {
    slug: 'skillswap',
    title: 'SkillSwap',
    tagline:
      'The data layer behind a skill-tracking app — schema, pipeline, and the charts that came out of it.',
    context: 'GT iOS Club',
    role: 'Data & Analytics — 25+ person team',
    period: 'Aug – Nov 2025',
    stack: ['Swift', 'SwiftUI', 'Document DB'],
    cover: {
      key: 'projects/skillswap-cover',
      ratio: '4 / 3',
      alt: 'SkillSwap app interface',
    },
    sections: [
      {
        heading: 'The problem',
        body: [
          // REVIEW: framing inferred from what you described building (filtering,
          // analytics, lesson/quiz data). Adjust if SkillSwap's premise differs.
          'On a 25+ person team the visible work is screens, but the thing that decides whether those screens can exist is the shape of the data underneath them. SkillSwap needed to filter content dynamically and show people a real picture of their own progress — neither of which works if the schema can only answer the questions you thought of on day one.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'I designed and implemented the document-based database schema and the custom data structures sitting on top of it, in Swift and SwiftUI, specifically so dynamic filtering and analytics would still hold up as the content set grew.',
        ],
        points: [
          'A document-based schema plus custom data structures built for dynamic filtering and analytics at scale.',
          'A data analysis pipeline that tracks skill growth from cumulative lesson and quiz data, turning a scattered history of activity into a trend a person can actually read.',
          'Interactive charts and filters on top of that pipeline, so progress is explorable rather than a single static number.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'The analytics work stopped being a side feature and shaped core product functionality — it was central to the final judging demo, which is the honest test of whether a data layer earned its keep.',
        ],
      },
    ],
    gallery: [
      { key: 'projects/skillswap-01', ratio: '9 / 19.5', alt: 'Progress charts' },
      { key: 'projects/skillswap-02', ratio: '9 / 19.5', alt: 'Filtered browse view' },
    ],
  },

  {
    slug: 'gridx',
    title: 'GridX',
    tagline: 'What if an NFL roster were a portfolio? A valuation model that prices players like assets.',
    context: 'HackGT',
    role: 'Built with 3 teammates',
    period: 'Sep 2025',
    stack: ['React', 'Data Visualization'],
    award: 'Functional end-to-end prototype in 36 hours.',
    cover: {
      key: 'projects/gridx-cover',
      ratio: '16 / 10',
      alt: 'GridX team valuation dashboard',
    },
    sections: [
      {
        heading: 'The problem',
        body: [
          'Arguments about which NFL players are worth what are usually qualitative — vibes, highlights, and a lot of confident opinions. GridX started from a different question: if you treated a player as a tradeable asset with an actual price, what would the price be, and what would a whole team be worth?',
        ],
      },
      {
        heading: 'What we built',
        body: [
          'A formula-driven valuation model that scores player and team value directly from performance statistics, and uses those scores to drive rankings. On top of the model, a React front end visualizes team valuations and performance trends so the numbers are explorable instead of buried in a table.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'Four of us took it from an idea to a working end-to-end prototype in 36 hours — model, data, and interface, all connected. The constraint was the interesting part: every scoring decision had to be simple enough to justify out loud and fast enough to compute live.',
        ],
      },
    ],
    gallery: [
      { key: 'projects/gridx-01', ratio: '16 / 10', alt: 'Valuation dashboard' },
      { key: 'projects/gridx-02', ratio: '16 / 10', alt: 'Performance trends' },
    ],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

/** Previous/next for detail-page navigation. Wraps around the ends. */
export function getProjectNeighbors(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  }
}
