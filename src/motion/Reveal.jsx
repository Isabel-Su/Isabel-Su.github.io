import { m, useReducedMotion } from 'framer-motion'
import { fadeUp, fadeUpTight, stagger, still } from './tokens'

/**
 * Every scroll-triggered reveal on the site goes through this component, so the
 * distance, duration, and trigger point are identical on every page.
 *
 * @param {string}  as       html tag to render (default 'div')
 * @param {number}  delay    seconds to hold before animating
 * @param {boolean} tight    shorter travel, for items nested inside a revealed block
 */
export function Reveal({
  as = 'div',
  delay = 0,
  tight = false,
  className,
  children,
  ...rest
}) {
  const reduced = useReducedMotion()
  const Tag = m[as] ?? m.div
  const base = reduced ? still : tight ? fadeUpTight : fadeUp

  // The delay has to be folded into the variant itself. A `transition` prop is
  // only a default — a variant that carries its own transition (all of ours do)
  // overrides it wholesale, and the delay would silently do nothing.
  const variants = delay
    ? { ...base, visible: { ...base.visible, transition: { ...base.visible.transition, delay } } }
    : base

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      // once: never re-animates on scroll-back — re-triggering reads as a gimmick.
      // The negative bottom margin fires the reveal slightly before the element
      // reaches the viewport edge, so content is settled by the time it's read.
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Reveals children in sequence. Wrap items in <StaggerItem>.
 * Use for lists and grids; use <Reveal> for single blocks.
 */
export function Stagger({ as = 'div', className, children, ...rest }) {
  const reduced = useReducedMotion()
  const Tag = m[as] ?? m.div

  return (
    <Tag
      className={className}
      variants={reduced ? still : stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ as = 'div', tight = false, className, children, ...rest }) {
  const reduced = useReducedMotion()
  const Tag = m[as] ?? m.div

  return (
    <Tag
      className={className}
      variants={reduced ? still : tight ? fadeUpTight : fadeUp}
      {...rest}
    >
      {children}
    </Tag>
  )
}
