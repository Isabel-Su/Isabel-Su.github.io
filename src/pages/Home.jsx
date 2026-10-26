import { useEffect, useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { entryPoints, site } from '../content/site'
import { Figure } from '../components/Figure'
import { PrefetchLink } from '../components/PrefetchLink'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { stagger, still } from '../motion/tokens'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './Home.module.css'

function HeroMark({ children, delay }) {
  return (
    <span className={styles.mark}>
      <span
        className={`${styles.markFill} home-mark-fill`}
        aria-hidden="true"
        style={{ '--home-mark-delay': `${delay}s` }}
      />
      <span className={styles.markText}>{children}</span>
    </span>
  )
}

export default function Home() {
  useDocumentTitle()
  const reduced = useReducedMotion()
  const panel1Ref = useRef(null)

  useEffect(() => {
    if (reduced) return undefined
    document.documentElement.classList.add('home-snap')
    return () => document.documentElement.classList.remove('home-snap')
  }, [reduced])

  const { scrollYProgress } = useScroll({
    target: panel1Ref,
    offset: ['start start', 'end start'],
  })
  const bannerScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const bannerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55])
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <>
      <m.section
        ref={panel1Ref}
        className={`${styles.panel} ${styles.hero}`}
        variants={reduced ? still : stagger}
        initial="hidden"
        animate="visible"
      >
        <m.div
          className={styles.bannerMedia}
          aria-hidden="true"
          style={reduced ? undefined : { scale: bannerScale, opacity: bannerOpacity }}
        >
          <Figure image={site.homeBanner} fill priority showCaption={false} sizes="100vw" />
        </m.div>

        <m.div
          className={`container ${styles.bannerCopy}`}
          style={reduced ? undefined : { y: nameY }}
        >
          <p className={`eyebrow ${styles.eyebrow}`}>
            <HeroMark delay={0.12}>
              {site.education.degree} &middot; {site.education.schoolShort}
            </HeroMark>
          </p>

          <h1 className={`display ${styles.name} keep-case`}>
            <HeroMark delay={0.32}>{site.name}</HeroMark>
          </h1>
        </m.div>
      </m.section>

      <section className={`${styles.panel} ${styles.next}`}>
        <Stagger as="nav" className={`container ${styles.index}`} aria-label="Sections">
          {entryPoints.map((entry, i) => (
            <StaggerItem key={entry.to}>
              <PrefetchLink to={entry.to} className={styles.row}>
                <span className={styles.rowIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.rowLabel}>{entry.label}</span>
                <span className={styles.rowBlurb}>{entry.blurb}</span>
                <span className={styles.rowArrow} aria-hidden="true">
                  &#8594;
                </span>
              </PrefetchLink>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  )
}
