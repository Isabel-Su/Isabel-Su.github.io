import { useId, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { ArticleRow } from './ArticleRow'
import { DUR, EASE } from '../motion/tokens'
import styles from './ProcessToggle.module.css'

/** Collapsible list of articles. Collapsed by default, like a Notion toggle. */
export function ProcessToggle({ articles, label = 'Process', empty = 'Nothing here yet.' }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const panelId = useId()

  return (
    <section className={styles.wrap}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.mark} aria-hidden="true">
          {open ? '−' : '+'}
        </span>
        {label}
        <span className={styles.count}>{articles.length}</span>
      </button>

      <m.div
        id={panelId}
        className={styles.panel}
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          transition: reduced ? { duration: 0 } : { duration: DUR.base, ease: EASE },
        }}
      >
        <div className={styles.list}>
          {articles.length ? (
            articles.map((article) => <ArticleRow key={article.slug} article={article} />)
          ) : (
            <p className={styles.empty}>{empty}</p>
          )}
        </div>
      </m.div>
    </section>
  )
}
