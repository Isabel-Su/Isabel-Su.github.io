import { lazyWithPreload } from './lib/lazyWithPreload'

/*
 * Every page is its own chunk, so a visitor landing on /about never downloads
 * the gallery or lightbox code. Each is preloadable so nav hover can warm the
 * chunk before the click.
 */
export const pages = {
  home: lazyWithPreload(() => import('./pages/Home')),
  projects: lazyWithPreload(() => import('./pages/ProjectsIndex')),
  projectDetail: lazyWithPreload(() => import('./pages/ProjectDetail')),
  work: lazyWithPreload(() => import('./pages/Work')),
  hobbies: lazyWithPreload(() => import('./pages/HobbiesIndex')),
  hobbyDetail: lazyWithPreload(() => import('./pages/HobbyDetail')),
  about: lazyWithPreload(() => import('./pages/About')),
  notFound: lazyWithPreload(() => import('./pages/NotFound')),
}

/*
 * Project and hobby detail pages are single :slug routes driven by the content
 * files — adding an entry to src/content/projects.js creates a working URL with
 * no change here.
 */
export const routes = [
  { path: '/', Component: pages.home },
  { path: '/projects', Component: pages.projects },
  { path: '/projects/:slug', Component: pages.projectDetail },
  { path: '/work', Component: pages.work },
  { path: '/hobbies', Component: pages.hobbies },
  { path: '/hobbies/:slug', Component: pages.hobbyDetail },
  { path: '/about', Component: pages.about },
  { path: '*', Component: pages.notFound },
]

/** Warm the chunk a link points at. Called on hover/focus by <PrefetchLink>. */
export function preloadFor(to) {
  if (!to) return
  const [, head, tail] = to.split('/')

  if (!head) return pages.home.preload()
  if (head === 'projects') return (tail ? pages.projectDetail : pages.projects).preload()
  if (head === 'hobbies') return (tail ? pages.hobbyDetail : pages.hobbies).preload()
  if (head === 'work') return pages.work.preload()
  if (head === 'about') return pages.about.preload()
}
