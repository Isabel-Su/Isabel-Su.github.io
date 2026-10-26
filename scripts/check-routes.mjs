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
  {
    path: '/',
    expect: [
      'Isabel Su',
      'start to finish',
      'Life',
      'home/banner',
    ],
  },
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
    path: '/life',
    expect: ['Photography', 'Reading', 'Thoughts', 'Tennis', 'Running', 'Hiking', 'Travel', 'Recently'],
  },
  { path: '/life/photography', expect: ['Photography', 'hobbies/photography-01'] },
  { path: '/life/tennis', expect: ['Tennis', 'hobbies/tennis-cover'] },
  { path: '/life/running', expect: ['Running'] },
  { path: '/life/hiking', expect: ['Hiking'] },
  { path: '/life/reading', expect: ['Reading'] },
  { path: '/life/thoughts', expect: ['Thoughts'] },
  { path: '/life/travel', expect: ['Travel'] },
  { path: '/life/other', expect: ['Other'] },
  { path: '/definitely-not-a-real-page', expect: ['404', 'Projects'] },
  { path: '/work', expect: ['404'] },
  { path: '/hobbies', expect: ['404'] },
]

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

const warnings = []
const realError = console.error
console.error = (...args) => {
  warnings.push(args.join(' '))
  realError(...args)
}

let failed = 0

async function renderRoute(App, route) {
  const element = createElement(StaticRouter, { location: route }, createElement(App))
  renderToString(element)
  await new Promise((resolve) => setTimeout(resolve, 0))
  return renderToString(element)
}

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  const { pages } = await vite.ssrLoadModule('/src/routes.jsx')
  const { articles } = await vite.ssrLoadModule('/src/lib/articles.js')
  const { lifeSlugs } = await vite.ssrLoadModule('/src/content/life.js')
  const { projects } = await vite.ssrLoadModule('/src/content/projects.js')

  const projectSlugs = new Set(projects.map((project) => project.slug))
  const categorySet = new Set(lifeSlugs)

  for (const article of articles) {
    const badTags = article.tags.filter((tag) => !categorySet.has(tag))
    const badProjects = article.projects.filter((slug) => !projectSlugs.has(slug))
    if (badTags.length || badProjects.length) {
      const problems = [
        badTags.length ? `unknown tag(s) ${badTags.join(', ')}` : '',
        badProjects.length ? `unknown project(s) ${badProjects.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('; ')
      console.log(`  FAIL  article ${article.slug.padEnd(24)} ${problems}`)
      failed += 1
    }

    ROUTES.push({ path: `/life/articles/${article.slug}`, expect: [article.title] })

    for (const tag of article.tags) {
      const route = ROUTES.find((item) => item.path === `/life/${tag}`)
      if (route && !route.expect.includes(article.title)) route.expect.push(article.title)
    }

    for (const slug of article.projects) {
      const route = ROUTES.find((item) => item.path === `/projects/${slug}`)
      if (route && !route.expect.includes(article.title)) route.expect.push(article.title)
    }
  }

  await Promise.all(Object.values(pages).map((page) => page.preload()))

  for (const { path, expect } of ROUTES) {
    try {
      const html = await renderRoute(App, path)

      const missing = expect.filter((needle) => !html.includes(needle))

      if (missing.length) {
        console.log(`  FAIL  ${path.padEnd(34)} missing ${missing.map((m) => `"${m}"`).join(', ')}`)
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
