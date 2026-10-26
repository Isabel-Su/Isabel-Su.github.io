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
  life: lazyWithPreload(() => import('./pages/LifeIndex')),
  lifeCategory: lazyWithPreload(() => import('./pages/LifeCategory')),
  article: lazyWithPreload(() => import('./pages/Article')),
  about: lazyWithPreload(() => import('./pages/About')),
  notFound: lazyWithPreload(() => import('./pages/NotFound')),
}

/*
 * Project, life category, and article pages are single :slug routes driven by
 * content files — adding a project or dropping a markdown file creates a
 * working URL with no change here.
 */
export const routes = [
  { path: '/', Component: pages.home },
  { path: '/projects', Component: pages.projects },
  { path: '/projects/:slug', Component: pages.projectDetail },
  { path: '/life', Component: pages.life },
  { path: '/life/articles/:slug', Component: pages.article },
  { path: '/life/:slug', Component: pages.lifeCategory },
  { path: '/about', Component: pages.about },
  { path: '*', Component: pages.notFound },
]

/** Warm the chunk a link points at. Called on hover/focus by <PrefetchLink>. */
export function preloadFor(to) {
  if (!to) return
  const [, head, tail] = to.split('/')

  if (!head) return pages.home.preload()
  if (head === 'projects') return (tail ? pages.projectDetail : pages.projects).preload()
  if (head === 'life') {
    if (tail === 'articles') return pages.article.preload()
    return (tail ? pages.lifeCategory : pages.life).preload()
  }
  if (head === 'about') return pages.about.preload()
}
