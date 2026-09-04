import { Reveal } from '../motion/Reveal'
import styles from './Section.module.css'

/**
 * A titled content block. The heading sits in a narrow left column on wide
 * screens and stacks above the content on narrow ones — an editorial two-column
 * rhythm that also keeps body copy near the ideal measure without extra work.
 */
export function Section({ title, index, children, aside = true, className = '' }) {
  return (
    <Reveal
      as="section"
      className={`${styles.section} ${aside ? styles.split : ''} ${className}`}
    >
      {title && (
        <div className={styles.head}>
          {index != null && <span className={styles.index}>{String(index).padStart(2, '0')}</span>}
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </Reveal>
  )
}
