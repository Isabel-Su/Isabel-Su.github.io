import { m, useReducedMotion } from 'framer-motion'
import { fadeUp, fadeUpTight, stagger, still } from '../motion/tokens'
import styles from './PageHeader.module.css'

/**
 * The opening moment of every page: a small label, one large statement, one
 * short sentence. Sharing this component is what keeps the first three seconds
 * of each route feeling like the same site.
 *
 * Unlike <Reveal>, this animates on mount rather than on scroll — it is already
 * in view, and waiting for an intersection callback would read as a stutter.
 */
export function PageHeader({ eyebrow, title, lede, children, align = 'left' }) {
  const reduced = useReducedMotion()

  return (
    <m.header
      className={`${styles.header} ${align === 'center' ? styles.center : ''}`}
      variants={reduced ? still : stagger}
      initial="hidden"
      animate="visible"
    >
      {eyebrow && (
        <m.p className={`eyebrow ${styles.eyebrow}`} variants={reduced ? still : fadeUpTight}>
          {eyebrow}
        </m.p>
      )}

      <m.h1 className={`display ${styles.title}`} variants={reduced ? still : fadeUp}>
        {title}
      </m.h1>

      {lede && (
        <m.p className={`lede ${styles.lede}`} variants={reduced ? still : fadeUp}>
          {lede}
        </m.p>
      )}

      {children && (
        <m.div className={styles.extra} variants={reduced ? still : fadeUp}>
          {children}
        </m.div>
      )}
    </m.header>
  )
}
