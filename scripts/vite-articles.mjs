/*
 * Build-time article catalog.
 *
 * Drop a markdown file in src/content/articles/ (any subfolder) and it appears
 * on /life, under each tagged category, and on any project it names. The
 * virtual module `virtual:articles` is the only thing the app imports.
 *
 * Dates: frontmatter `updated`, else last git commit, else file mtime.
 * Files whose names start with `_` are ignored. `draft: true` is omitted from
 * production builds. A first-level folder that matches a category is an
 * implicit tag. No tags at all means `other`.
 */

import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { Marked } from 'marked'

const VIRTUAL_ID = 'virtual:articles'
const RESOLVED_INDEX = `\0${VIRTUAL_ID}`
const BODY_PREFIX = '\0virtual:article-body:'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const ARTICLES_DIR = resolve(ROOT, 'src/content/articles')

function asList(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean)
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function gitDate(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8',
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out || null
  } catch {
    return null
  }
}

const pad = (n) => String(n).padStart(2, '0')

const localDay = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/*
 * Returns { day: 'YYYY-MM-DD', stamp: ms }. `day` is the calendar date as the
 * author saw it, so the page never shifts it across a timezone boundary.
 * YAML parses a bare `2026-10-12` as UTC midnight, so its UTC parts are the
 * date that was written. Git's %cI carries the committer's own offset, so its
 * leading date is already local to whoever committed.
 */
function frontmatterDate(value) {
  if (!value) return null
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null
    return { day: value.toISOString().slice(0, 10), stamp: value.getTime() }
  }
  const text = String(value).trim()
  const date = new Date(text)
  if (Number.isNaN(date.getTime())) return null
  const day = /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : localDay(date)
  return { day, stamp: date.getTime() }
}

function resolveDate(data, file) {
  const fromHeader = frontmatterDate(data.updated)
  if (fromHeader) return fromHeader

  const committed = gitDate(file)
  if (committed) return { day: committed.slice(0, 10), stamp: new Date(committed).getTime() }

  const modified = new Date(statSync(file).mtimeMs)
  return { day: localDay(modified), stamp: modified.getTime() }
}

function walk(dir, files = []) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch (error) {
    if (error.code === 'ENOENT') return files
    throw error
  }

  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path, files)
    else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      files.push(path)
    }
  }
  return files
}

function escapeAttr(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function collect({ categories, production }) {
  const files = walk(ARTICLES_DIR)
  const articles = []
  const seen = new Set()

  for (const file of files) {
    const raw = readFileSync(file, 'utf8')
    const parsed = matter(raw)
    const data = parsed.data ?? {}

    if (production && data.draft === true) continue

    const slug = basename(file, '.md')
    if (seen.has(slug)) {
      throw new Error(`Duplicate article slug "${slug}" (${file})`)
    }
    seen.add(slug)

    const rel = relative(ARTICLES_DIR, file)
    const firstFolder = rel.includes('/') ? rel.split('/')[0] : null
    const tags = asList(data.tags)
    if (firstFolder && categories.has(firstFolder) && !tags.includes(firstFolder)) {
      tags.unshift(firstFolder)
    }
    if (tags.length === 0) tags.push('other')

    const images = []
    const marked = new Marked()
    marked.use({
      gfm: true,
      renderer: {
        image({ href, title, text }) {
          const alt = escapeAttr(text || '')
          const titleAttr = title ? ` title="${escapeAttr(title)}"` : ''
          if (!href || /^(https?:|data:|\/)/i.test(href)) {
            return `<img src="${escapeAttr(href || '')}" alt="${alt}"${titleAttr} />`
          }
          const abs = resolve(dirname(file), href)
          const i = images.length
          images.push(abs)
          return `<img src="__IMG_${i}__" alt="${alt}"${titleAttr} />`
        },
      },
    })

    const html = String(marked.parse(parsed.content, { async: false })).trim()

    const { day, stamp } = resolveDate(data, file)

    articles.push({
      slug,
      title: data.title ? String(data.title) : slug.replace(/-/g, ' '),
      updated: day,
      stamp,
      tags,
      projects: asList(data.projects),
      summary: data.summary ? String(data.summary) : '',
      file,
      html,
      images,
    })
  }

  articles.sort((a, b) => b.stamp - a.stamp || a.slug.localeCompare(b.slug))
  return articles
}

function serializeIndex(articles) {
  const records = articles.map((article) => {
    const meta = {
      slug: article.slug,
      title: article.title,
      updated: article.updated,
      stamp: article.stamp,
      tags: article.tags,
      projects: article.projects,
      summary: article.summary,
    }
    return `  {
    ...${JSON.stringify(meta)},
    load: () => import(${JSON.stringify(`virtual:article-body:${article.slug}`)})
  }`
  })

  return `export const articles = [
${records.join(',\n')}
]
`
}

function serializeBody(article) {
  const imports = article.images
    .map((path, i) => `import img${i} from ${JSON.stringify(`${path}?url`)}`)
    .join('\n')

  let htmlExpr = JSON.stringify(article.html)
  for (let i = 0; i < article.images.length; i++) {
    htmlExpr += `.replaceAll(${JSON.stringify(`__IMG_${i}__`)}, img${i})`
  }

  return `${imports ? `${imports}\n\n` : ''}export const html = ${htmlExpr}
`
}

export function articlesPlugin({ categories }) {
  const categorySet = new Set(categories)
  let production = false
  let cache = null

  const loadAll = () => {
    cache = collect({ categories: categorySet, production })
    return cache
  }

  return {
    name: 'articles',
    configResolved(config) {
      production = config.command === 'build'
      cache = null
    },
    configureServer(server) {
      const invalidate = (file) => {
        if (!file.startsWith(ARTICLES_DIR)) return
        cache = null
        const mod = server.moduleGraph.getModuleById(RESOLVED_INDEX)
        if (mod) server.reloadModule(mod)
        for (const [id, module] of server.moduleGraph.idToModuleMap) {
          if (id.startsWith(BODY_PREFIX)) server.reloadModule(module)
        }
      }

      server.watcher.add(ARTICLES_DIR)
      server.watcher.on('change', invalidate)
      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_INDEX
      if (id.startsWith('virtual:article-body:')) return `\0${id}`
    },
    load(id) {
      if (id === RESOLVED_INDEX) {
        return serializeIndex(loadAll())
      }

      if (id.startsWith(BODY_PREFIX)) {
        const slug = id.slice(BODY_PREFIX.length)
        const article = (cache ?? loadAll()).find((item) => item.slug === slug)
        if (!article) return 'export const html = ""\n'
        return serializeBody(article)
      }
    },
  }
}
