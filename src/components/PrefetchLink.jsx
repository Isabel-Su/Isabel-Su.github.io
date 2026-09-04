import { Link, NavLink } from 'react-router-dom'
import { preloadFor } from '../routes'

/**
 * A Link that starts downloading the destination's chunk on hover or focus.
 * By the time the click lands the code is usually already parsed, so the page
 * transition never stalls on a Suspense fallback.
 */
export function PrefetchLink({ to, nav = false, children, ...rest }) {
  const warm = () => preloadFor(to)
  const Component = nav ? NavLink : Link

  return (
    <Component to={to} onMouseEnter={warm} onFocus={warm} onTouchStart={warm} {...rest}>
      {children}
    </Component>
  )
}
