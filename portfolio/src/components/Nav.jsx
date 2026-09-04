import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { site } from '../content/site'
import { PrefetchLink } from './PrefetchLink'
import { DUR, EASE } from '../motion/tokens'
import styles from './Nav.module.css'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()

  // The bar only gains a background once the page has moved, so the hero sits on
  // clean paper. Solid fill rather than a backdrop blur — blur behind a fixed
  // element repaints on every scroll frame and is the first thing to stutter on
  // a cheap phone.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.linkActive : ''}`

  return (
    <>
      <header className={`${styles.bar} ${scrolled ? styles.barScrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <PrefetchLink to="/" className={styles.mark} aria-label={`${site.name} — home`}>
            {site.initials}
          </PrefetchLink>

          <nav className={styles.links} aria-label="Primary">
            {site.nav.map((item) => (
              <PrefetchLink key={item.to} to={item.to} nav className={linkClass}>
                {item.label}
              </PrefetchLink>
            ))}
          </nav>

          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            className={styles.overlay}
            initial={reduced ? {} : { opacity: 0 }}
            animate={reduced ? {} : { opacity: 1, transition: { duration: DUR.base, ease: EASE } }}
            exit={reduced ? {} : { opacity: 0, transition: { duration: DUR.fast, ease: EASE } }}
          >
            <nav className={styles.overlayNav} aria-label="Primary, mobile">
              {site.nav.map((item, i) => (
                <m.div
                  key={item.to}
                  initial={reduced ? {} : { opacity: 0, y: 12 }}
                  animate={
                    reduced
                      ? {}
                      : {
                          opacity: 1,
                          y: 0,
                          transition: { duration: DUR.base, ease: EASE, delay: 0.04 + i * 0.05 },
                        }
                  }
                >
                  <PrefetchLink to={item.to} className={styles.overlayLink}>
                    {item.label}
                  </PrefetchLink>
                </m.div>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
