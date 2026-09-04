import { m, useReducedMotion } from 'framer-motion'
import { pageVariants, still } from './tokens'

/**
 * The route-level wrapper. Rendered as the keyed direct child of <AnimatePresence>
 * in App.jsx so the outgoing page finishes fading before the incoming one mounts.
 */
export function PageTransition({ children, ...rest }) {
  const reduced = useReducedMotion()

  return (
    <m.div
      variants={reduced ? still : pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...rest}
    >
      {children}
    </m.div>
  )
}
