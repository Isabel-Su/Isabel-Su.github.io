import { m, useReducedMotion } from 'framer-motion'
import { entryPoints, site } from '../content/site'
import { Figure } from '../components/Figure'
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
      {/* Opening screen. The banner fills from the top of the page down to the
          edge under the name; the blurb sits on paper below that. */}
      <m.section
        className={styles.hero}
        variants={reduced ? still : stagger}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.bannerPanel}>
          <div className={styles.bannerMedia} aria-hidden="true">
            <Figure
              image={site.homeBanner}
              fill
              priority
              showCaption={false}
              sizes="100vw"
            />
          </div>

          <div className={`container ${styles.bannerCopy}`}>
            <m.p className={`eyebrow ${styles.eyebrow}`} variants={reduced ? still : fadeUpTight}>
              {site.education.degree} &middot; {site.education.schoolShort} &middot; Class of{' '}
              {site.education.gradYear}
            </m.p>

            <m.h1 className={`display ${styles.name}`} variants={reduced ? still : fadeUp}>
              {site.name}
            </m.h1>
          </div>
        </div>

        <m.div className={`container ${styles.statementWrap}`} variants={reduced ? still : fadeUp}>
          <PlaceholderMark note="PLACEHOLDER — rewrite this blurb">
            <p className={styles.statement}>{site.identity}</p>
          </PlaceholderMark>
        </m.div>
      </m.section>

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
