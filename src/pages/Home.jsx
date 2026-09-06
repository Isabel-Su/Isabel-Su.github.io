import { m, useReducedMotion } from 'framer-motion'
import { entryPoints, site } from '../content/site'
import { PlaceholderMark } from '../components/Placeholder'
import { PrefetchLink } from '../components/PrefetchLink'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { fadeUp, fadeUpTight, stagger, still } from '../motion/tokens'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './Home.module.css'

export default function Home() {
  useDocumentTitle()
  const reduced = useReducedMotion()

  return (
    <>
      {/* The opening screen. Content sits at the bottom of the first viewport —
          the empty space above the name is doing as much work as the name. */}
      <m.section
        className={`container ${styles.hero}`}
        variants={reduced ? still : stagger}
        initial="hidden"
        animate="visible"
      >
        <m.p className={`eyebrow ${styles.eyebrow}`} variants={reduced ? still : fadeUpTight}>
          {site.education.degree} &middot; {site.education.schoolShort} &middot; Class of{' '}
          {site.education.gradYear}
        </m.p>

        <m.h1 className={`display ${styles.name}`} variants={reduced ? still : fadeUp}>
          {site.name}
        </m.h1>

        <m.hr className={styles.rule} variants={reduced ? still : fadeUpTight} />

        <m.div variants={reduced ? still : fadeUp}>
          <PlaceholderMark note="PLACEHOLDER — rewrite this blurb">
            <p className={styles.statement}>{site.identity}</p>
          </PlaceholderMark>
        </m.div>
      </m.section>

      {/* The real navigation of the site: four large rows rather than a menu. */}
      <Stagger as="nav" className={`container ${styles.index}`} aria-label="Sections">
        {entryPoints.map((entry, i) => (
          <StaggerItem key={entry.to}>
            <PrefetchLink to={entry.to} className={styles.row}>
              <span className={styles.rowIndex}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.rowLabel}>{entry.label}</span>
              <span className={`${styles.rowBlurb} ${entry.placeholder ? 'placeholder' : ''}`}>
                {entry.placeholder ? `[PLACEHOLDER] ${entry.blurb}` : entry.blurb}
              </span>
              <span className={styles.rowArrow} aria-hidden="true">
                &#8594;
              </span>
            </PrefetchLink>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  )
}
