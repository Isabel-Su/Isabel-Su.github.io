#!/usr/bin/env node
/*
 * Route smoke test.
 *
 * Renders every route through react-dom/server and fails on any thrown error,
 * React warning, or suspiciously empty output. It is not a browser — it will not
 * catch a layout bug — but it does catch the things that actually break a static
 * SPA in practice: a bad import, a missing content key, an undefined field on a
 * data object added to src/content/.
 *
 * Worth re-running after editing anything in src/content/:  npm run check
 */

import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createElement } from 'react'

/*
 * Each route names a string that must appear in its rendered markup. Asserting
 * on content rather than output size is what makes this catch a page that
 * renders its shell but drops its data.
 *
 * Avoid apostrophes in expectations — React escapes them to &#x27;.
 */
const ROUTES = [
  { path: '/', expect: ['Isabel Su', 'sign language lessons', 'Hobbies', 'PLACEHOLDER', 'home/banner'] },
  {
    path: '/projects',
    expect: [
      'Talking Fingers',
      'SkillSwap',
      'GridX',
      'Wave Simulator',
      'Classifier for Service Choice in Tennis',
      'EZ-Eats Meal Planner',
    ],
  },
  {
    path: '/projects/talking-fingers',
    expect: ['Senior Developer', 'Vision', 'spaced-repetition', 'semantic search', 'Best App Overall'],
  },
  {
    path: '/projects/skillswap',
    expect: ['Junior Developer', 'Firebase', 'skill-tracking'],
  },
  {
    path: '/projects/gridx',
    expect: ['Contributor, team of 4', 'Pandas', 'NumPy', 'valuation model', '36 hours'],
  },
  {
    path: '/projects/wave-simulator',
    expect: ['Wave Simulator', 'NumPy', 'interference'],
  },
  {
    path: '/projects/tennis-service-classifier',
    expect: ['TensorFlow', 'coin-toss', 'Google Colab'],
  },
  {
    path: '/projects/ez-eats',
    expect: ['EZ-Eats', 'Spring Boot', 'MongoDB'],
  },
  {
    path: '/work',
    expect: [
      'Prudential Financial',
      'Nexus',
      'SOX',
      'RAG pipeline',
      'Discrete Math TA',
      'AI Safety Initiative',
      'Technical Safety Fellow',
    ],
  },
  {
    path: '/about',
    expect: [
      'Contact',
      'isabelsu2025@gmail.com',
      'about/portrait',
      'NYC Metropolitan Area',
      'Tools I reach for',
      'Scikit-Learn',
    ],
  },
  {
    path: '/hobbies',
    expect: ['Photography', 'Origami', 'Tennis', 'Running', 'Hiking', 'Restaurants'],
  },
  { path: '/hobbies/photography', expect: ['Photography', 'hobbies/photography-01'] },
  { path: '/hobbies/origami', expect: ['Origami', 'hobbies/origami-01'] },
  { path: '/hobbies/restaurants', expect: ['Restaurants', 'Beli', 'hobbies/restaurants-01'] },
  { path: '/hobbies/tennis', expect: ['Tennis', 'hobbies/tennis-cover'] },
  { path: '/hobbies/running', expect: ['Running'] },
  { path: '/hobbies/hiking', expect: ['Hiking'] },
  { path: '/definitely-not-a-real-page', expect: ['404', 'Projects'] },
]

// Home Labbing was cut; make sure nothing quietly reintroduces it.
const FORBIDDEN = ['Home Lab', 'home-lab']

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

// Capture React's console warnings as failures rather than letting them scroll by.
const warnings = []
const realError = console.error
console.error = (...args) => {
  warnings.push(args.join(' '))
  realError(...args)
}

let failed = 0

/*
 * Every page is a React.lazy chunk, so the first renderToString of a route only
 * produces the Suspense fallback. Rendering once to kick off the import, letting
 * the promise settle, then rendering again gives the real page markup — which is
 * the whole point of the check.
 */
async function renderRoute(App, route) {
  const element = createElement(StaticRouter, { location: route }, createElement(App))
  renderToString(element)
  await new Promise((resolve) => setTimeout(resolve, 0))
  return renderToString(element)
}

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  const { pages } = await vite.ssrLoadModule('/src/routes.jsx')

  // Warm every chunk up front so no route is the unlucky one that pays for it.
  await Promise.all(Object.values(pages).map((page) => page.preload()))

  for (const { path, expect } of ROUTES) {
    try {
      const html = await renderRoute(App, path)

      const missing = expect.filter((needle) => !html.includes(needle))
      const forbidden = FORBIDDEN.filter((needle) => html.includes(needle))

      if (missing.length || forbidden.length) {
        const problems = [
          missing.length ? `missing ${missing.map((m) => `"${m}"`).join(', ')}` : '',
          forbidden.length ? `contains removed content ${forbidden.join(', ')}` : '',
        ]
          .filter(Boolean)
          .join('; ')
        console.log(`  FAIL  ${path.padEnd(34)} ${problems}`)
        failed += 1
      } else {
        console.log(`  ok    ${path.padEnd(34)} ${expect.length} assertions, ${html.length} chars`)
      }
    } catch (error) {
      console.log(`  FAIL  ${path.padEnd(34)} ${error.message}`)
      failed += 1
    }
  }
} finally {
  console.error = realError
  await vite.close()
}

if (warnings.length) {
  console.log(`\n${warnings.length} React warning(s):`)
  for (const warning of warnings) console.log(`  ${warning}`)
}

console.log(
  `\n${ROUTES.length - failed}/${ROUTES.length} routes rendered${failed ? `, ${failed} failed` : ' cleanly'}.`,
)

process.exit(failed || warnings.length ? 1 : 0)
