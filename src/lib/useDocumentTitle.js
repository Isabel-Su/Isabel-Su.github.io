import { useEffect } from 'react'
import { site } from '../content/site'

/**
 * Sets the tab title per route. Static hosting means no server-rendered <title>,
 * so this is what makes browser history and bookmarks legible.
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.name
  }, [title])
}
