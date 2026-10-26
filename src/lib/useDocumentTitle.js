import { useEffect } from 'react'
import { site } from '../content/site'

/**
 * Sets the tab title per route. Static hosting means no server-rendered <title>,
 * so this is what makes browser history and bookmarks legible.
 *
 * Titles are lowercase to match the site; pass `keepCase` for proper nouns
 * like project names. The site name always keeps its capitals.
 */
export function useDocumentTitle(title, { keepCase = false } = {}) {
  useEffect(() => {
    const page = title && (keepCase ? title : title.toLowerCase())
    document.title = page ? `${page} — ${site.name}` : site.name
  }, [title, keepCase])
}
