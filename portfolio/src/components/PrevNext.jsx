import { PrefetchLink } from './PrefetchLink'
import { Reveal } from '../motion/Reveal'
import styles from './PrevNext.module.css'

/**
 * Bottom-of-page navigation between sibling detail pages.
 * Shared by project and hobby detail routes.
 */
export function PrevNext({ prev, next, basePath, labelKey = 'title' }) {
  if (!prev && !next) return null

  return (
    <Reveal as="nav" className={styles.wrap} aria-label="More in this section">
      {prev && (
        <PrefetchLink to={`${basePath}/${prev.slug}`} className={`${styles.link} ${styles.prev}`}>
          <span className="eyebrow">Previous</span>
          <span className={styles.title}>{prev[labelKey]}</span>
        </PrefetchLink>
      )}

      {next && (
        <PrefetchLink to={`${basePath}/${next.slug}`} className={`${styles.link} ${styles.next}`}>
          <span className="eyebrow">Next</span>
          <span className={styles.title}>{next[labelKey]}</span>
        </PrefetchLink>
      )}
    </Reveal>
  )
}
