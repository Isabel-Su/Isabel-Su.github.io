/*
 * The complete motion vocabulary for the site. Every animated element pulls from
 * this file, which is what makes the whole thing feel like one hand rather than
 * six different effects.
 *
 * Rules this file exists to enforce:
 *   - only `transform` and `opacity` animate (compositor-only, never triggers layout)
 *   - one easing curve everywhere
 *   - motion is short and decelerating; nothing bounces, spins, or overshoots
 */

// Quiet decelerating curve. Fast out of the gate, long settle.
export const EASE = [0.22, 1, 0.36, 1]
export const EASE_IN = [0.4, 0, 1, 1]

export const DUR = {
  fast: 0.18,
  base: 0.32,
  slow: 0.62,
}

/** The default scroll reveal: fade up a short distance. Used by <Reveal>. */
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE },
  },
}

/** Same feel, shorter travel — for items inside an already-revealed block. */
export const fadeUpTight = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
}

/** Container that walks its children in. Pair with fadeUp/fadeUpTight items. */
export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

/** Route-level transition. Exit is deliberately faster than enter. */
export const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.2, ease: EASE_IN },
  },
}

/** Flattened variants for prefers-reduced-motion — same states, no movement. */
export const still = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 1, transition: { duration: 0 } },
}
