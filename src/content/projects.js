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
 *   demo      optional trailing video, same slot as gallery. Omit it and the
 *             page has no demo. `true` is a labelled placeholder; or
 *             `{ src, title?, caption?, ratio? }` for a YouTube/Vimeo URL or file.
 *   sections  [{ heading, body: [paragraphs], points: [bullets] }]
 *   gallery   optional screenshots. Omit it and the page has no Screens block.
 *
 * Detail pages share one template: what it is → how it was built →
 * challenges/decisions → what I took away, then optional Screens and/or Demo.
 * Strings starting with `[PLACEHOLDER` are flagged in the UI.
 */

export const projects = [
  {
    slug: 'gt-movies-store',
    title: 'GT Movies Store',
    tagline: 'A Django movies store — browse, pick a film, and follow the path a customer would actually take.',
    context: 'CS 2340: Intro to Software Engineering',
    role: 'Independent',
    period: 'Sep 2026',
    stack: ['Python', 'Django', 'Bootstrap'],
    cover: {
      key: 'projects/gt-movies-store-cover',
      ratio: '16 / 10',
      alt: 'GT Movies Store',
    },
    demo: {
      caption:
        '[PLACEHOLDER: A walkthrough of the store — listing, detail, and the rest of the required user stories.]',
    },
    sections: [
      {
        heading: 'What it is',
        body: [
          'A functioning movies store website: accounts, a catalog, and the screens a customer moves through to find a film and complete the purchase.',
          '[PLACEHOLDER: Elaborate on the web app. Walk through the screens and features, and how each one answers a required user story.]',
        ],
      },
      {
        heading: 'How it was built',
        body: [
          'Python and Django on the server, Bootstrap for a responsive UI. Models, views, and templates sit behind the storefront so listing, detail, cart, and checkout stay in one app.',
          '[PLACEHOLDER: Which parts of the stack you owned, and how models / views / templates connect to those user stories.]',
        ],
      },
      {
        heading: 'Challenges & decisions',
        body: [
          '[PLACEHOLDER: How you worked on this. Any methodology or approach, how you navigated questions and doubts, and what was hard about the user stories, models, or templates.]',
        ],
      },
      {
        heading: 'What I took away',
        body: [
          '[PLACEHOLDER: What building the store taught you, or what you would do differently.]',
        ],
      },
    ],
  },

  {
    slug: 'talking-fingers',
    title: 'Talking Fingers',
    tagline:
      'A computer-vision app that watches you sign, built to widen who gets to learn ASL.',
    context: 'GT iOS Club',
    role: 'Senior Developer',
    period: 'Jan – Apr 2026',
    stack: ['Swift', 'SwiftUI', 'Vision'],
    award:
      'First app in GT iOS Club history to sweep all three semi-annual awards — Popular App, Best Design, and Best App Overall.',
    cover: {
      key: 'projects/talking-fingers-cover',
      ratio: '4 / 3',
      alt: 'Talking Fingers app interface',
    },
    sections: [
      {
        heading: 'What it is',
        body: [
          'American Sign Language is usually learned in a classroom or with a tutor, which puts it out of reach for plenty of people who genuinely want to pick it up. The apps that try to fill that gap mostly quiz recognition — can you identify this sign — which is a different skill from being able to produce one yourself.',
          'Talking Fingers was built around the camera instead, so the learning loop closes on whether your hands are actually doing the right thing.',
        ],
      },
      {
        heading: 'How it was built',
        body: [
          'An iPhone app in Swift and SwiftUI. Sign production is checked through the camera using Apple’s Vision framework, rather than a generic computer-vision stack.',
          'I owned foundational pieces of the app the rest of the product was assembled on top of. Three of those were mine end to end.',
        ],
        points: [
          'Implemented multiple spaced-repetition scheduling algorithms rather than committing to one, so review intervals could be tuned against long-term retention instead of how well someone happened to do in a single session.',
          'Built semantic search across the lesson library, so a learner can ask for something the way they would actually phrase it and get relevant lessons back without guessing the exact term the curriculum used.',
          'Drove the core UI/UX — the structure of the learning flow and how the app looks and behaves while you are in it.',
        ],
      },
      {
        heading: 'Challenges & decisions',
        body: [
          '[PLACEHOLDER: What was hard, which tradeoffs you made, and why. Specifics — Vision, scheduling, search, the learning flow — not generalities.]',
        ],
      },
      {
        heading: 'What I took away',
        body: [
          '[PLACEHOLDER: What this project changed about how you build, or what you would do differently. The design-award argument (an accessibility tool has to be pleasant enough that people keep opening it) can live here if it still feels true.]',
        ],
      },
    ],
    gallery: [
      { key: 'projects/talking-fingers-01', ratio: '9 / 19.5', alt: 'Lesson view' },
      { key: 'projects/talking-fingers-02', ratio: '9 / 19.5', alt: 'Practice view' },
      { key: 'projects/talking-fingers-03', ratio: '9 / 19.5', alt: 'Search view' },
    ],
  },

  {
    slug: 'skillswap',
    title: 'SkillSwap',
    tagline:
      'A skill-trading app with tracking for lessons, quizzes, and a picture of your own progress over time.',
    context: 'GT iOS Club',
    role: 'Junior Developer',
    period: 'Aug – Nov 2025',
    stack: ['Swift', 'SwiftUI', 'Firebase'],
    cover: {
      key: 'projects/skillswap-cover',
      ratio: '4 / 3',
      alt: 'SkillSwap app interface',
    },
    sections: [
      {
        heading: 'What it is',
        body: [
          'SkillSwap is a skill-tracking app: people work through lessons, take quizzes, and get a real picture of how they are improving. Content can be filtered dynamically, and progress is something you can actually look at rather than a score from a single session.',
        ],
      },
      {
        heading: 'How it was built',
        body: [
          'An iPhone app in Swift and SwiftUI, with Firebase as the database. The screens only work if the data underneath them can answer questions you did not think of on day one — filtering, analytics, a history of lessons and quizzes that turns into a trend.',
        ],
        points: [
          'A Firebase schema plus custom data structures built for dynamic filtering and analytics at scale.',
          'A data analysis pipeline that tracks skill growth from cumulative lesson and quiz data, turning a scattered history of activity into a trend a person can actually read.',
          'Interactive charts and filters on top of that pipeline, so progress is explorable rather than a single static number.',
        ],
      },
      {
        heading: 'Challenges & decisions',
        body: [
          '[PLACEHOLDER: What was hard about the Firebase schema, the pipeline, or the charts. Tradeoffs you made as the content set grew.]',
        ],
      },
      {
        heading: 'What I took away',
        body: [
          '[PLACEHOLDER: What you learned building the data layer. The judging-demo moment (analytics shaping core product functionality) can live here if you want it.]',
        ],
      },
    ],
  },

  {
    slug: 'gridx',
    title: 'GridX',
    tagline: 'What if an NFL roster were a portfolio? A valuation model that prices players like assets.',
    context: 'HackGT',
    role: 'Contributor, team of 4',
    period: 'Sep 2025',
    stack: ['React', 'Pandas', 'NumPy'],
    award: 'Functional end-to-end prototype in 36 hours.',
    cover: {
      key: 'projects/gridx-cover',
      ratio: '16 / 10',
      alt: 'GridX team valuation dashboard',
    },
    sections: [
      {
        heading: 'What it is',
        body: [
          'Arguments about which NFL players are worth what are usually qualitative — vibes, highlights, and a lot of confident opinions. GridX started from a different question: if you treated a player as a tradeable asset with an actual price, what would the price be, and what would a whole team be worth?',
        ],
      },
      {
        heading: 'How it was built',
        body: [
          'A formula-driven valuation model, scored in Pandas and NumPy directly from performance statistics, that uses those scores to drive rankings. On top of the model, a React front end visualizes team valuations and performance trends so the numbers are explorable instead of buried in a table.',
          'Four of us took it from an idea to a working end-to-end prototype in 36 hours — model, data, and interface, all connected. Every scoring decision had to be simple enough to justify out loud and fast enough to compute live.',
        ],
      },
      {
        heading: 'Challenges & decisions',
        body: [
          '[PLACEHOLDER: What you personally built in the 36 hours, and which modelling or interface tradeoffs the time constraint forced.]',
        ],
      },
      {
        heading: 'What I took away',
        body: [
          '[PLACEHOLDER: What a 36-hour prototype taught you that a longer project would not have.]',
        ],
      },
    ],
  },

  {
    slug: 'wave-simulator',
    title: 'Wave Simulator',
    tagline:
      'A NumPy simulation of interference, reflection, and superposition.',
    context: 'Independent',
    role: 'Independent',
    period: 'May – Jun 2025',
    stack: ['Python', 'NumPy'],
    cover: {
      key: 'projects/wave-simulator-cover',
      ratio: '16 / 10',
      alt: 'Wave Simulator visualization',
    },
    sections: [
      {
        heading: 'What it is',
        body: [
          'A wave simulation that models interference, reflection, and superposition — the physics ideas that are easy to write down and harder to see.',
        ],
      },
      {
        heading: 'How it was built',
        body: [
          'Written in Python with NumPy doing the wave math. Visualization tools render the simulation as it runs, so interference patterns and reflections can be watched rather than inferred from numbers.',
        ],
      },
      {
        heading: 'Challenges & decisions',
        body: [
          '[PLACEHOLDER: What was actually hard — numerical stability, boundary conditions, making the visualization honest, or something else.]',
        ],
      },
      {
        heading: 'What I took away',
        body: [
          '[PLACEHOLDER: What building this changed about how you think about simulation, visualization, or physics code.]',
        ],
      },
    ],
  },

  {
    slug: 'tennis-service-classifier',
    title: 'Classifier for Service Choice in Tennis',
    tagline:
      'A neural net that predicts the better coin-toss call in a tennis match.',
    context: 'Independent',
    role: 'Independent',
    period: 'Jun – Aug 2024',
    stack: ['Python', 'NumPy', 'Pandas', 'TensorFlow'],
    cover: {
      key: 'projects/tennis-classifier-cover',
      ratio: '16 / 10',
      alt: 'Tennis service-choice classifier',
    },
    sections: [
      {
        heading: 'What it is',
        body: [
          'A neural network classifier that predicts the better coin-toss decision in a tennis match — serve or receive — given what you know about the players and the situation.',
        ],
      },
      {
        heading: 'How it was built',
        body: [
          'Built in Google Colab with NumPy, Pandas, and TensorFlow. Features came from serve speed, player ranking, and gender, with a default ranking fill-in when ranking data was missing.',
        ],
      },
      {
        heading: 'Challenges & decisions',
        body: [
          '[PLACEHOLDER: Feature choices, missing-data handling, how you evaluated the model, what did not work.]',
        ],
      },
      {
        heading: 'What I took away',
        body: [
          '[PLACEHOLDER: What this taught you about classifiers, sports data, or working in a notebook.]',
        ],
      },
    ],
  },

  {
    slug: 'ez-eats',
    title: 'EZ-Eats Meal Planner',
    tagline:
      'A full-stack meal planner with calorie targets and dietary filters.',
    context: 'AP Computer Science A Class',
    role: 'Contributor, team of 3',
    period: 'May – Jun 2023',
    stack: ['Java', 'Spring Boot', 'MongoDB', 'HTML/CSS', 'Bootstrap'],
    cover: {
      key: 'projects/ez-eats-cover',
      ratio: '16 / 10',
      alt: 'EZ-Eats meal planner',
    },
    sections: [
      {
        heading: 'What it is',
        body: [
          'A full-stack web app for planning meals against calorie targets and dietary constraints.',
        ],
      },
      {
        heading: 'How it was built',
        body: [
          'Java and Spring Boot on the server, MongoDB for persistence, HTML/CSS and Bootstrap for a responsive UI. Controllers and repositories sit between the meal-plan algorithms — calorie totals, dietary filters — and the browser. Service logic was tested for reliability.',
        ],
      },
      {
        heading: 'Challenges & decisions',
        body: [
          '[PLACEHOLDER: What was hard about the planner logic, the data model, or wiring the UI to the service layer.]',
        ],
      },
      {
        heading: 'What I took away',
        body: [
          '[PLACEHOLDER: What a first full-stack app taught you that later projects built on.]',
        ],
      },
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
