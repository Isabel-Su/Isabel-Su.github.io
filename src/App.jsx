import { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { PageTransition } from './motion/PageTransition'
import { routes } from './routes'
import styles from './App.module.css'

export default function App() {
  const location = useLocation()

  return (
    /*
      LazyMotion + <m.*> instead of <motion.*> ships only the features this site
      actually uses. domAnimation covers variants, exit animations, whileInView,
      and hover/focus/tap — everything here — while leaving out drag, layout
      projection, and pan, which together are most of the library's weight.

      strict makes that enforceable: importing `motion` anywhere under this
      provider throws instead of silently pulling the full bundle back in.
    */
    <LazyMotion features={domAnimation} strict>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav />

      <main id="main" className={styles.main}>
        {/*
          mode="wait" holds the incoming page until the outgoing one has finished
          fading, which is what makes the transition read as one movement instead
          of a cross-dissolve.

          <Routes> is passed an explicit `location` so the element AnimatePresence
          keeps around during exit renders the OLD route rather than snapping to
          the new one the moment the URL changes.

          initial={false} suppresses the transition on first paint — each page's
          own <PageHeader> already animates in, and running both reads as a stutter.
        */}
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}
        >
          <PageTransition key={location.pathname}>
            <Suspense fallback={<div className={styles.fallback} aria-hidden="true" />}>
              <Routes location={location}>
                {routes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
    </LazyMotion>
  )
}
