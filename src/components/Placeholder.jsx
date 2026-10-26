import { isPlaceholder } from '../lib/placeholder'

/**
 * Renders copy with the shared placeholder treatment when the string still
 * contains a `[PLACEHOLDER` marker. Final copy passes through unchanged.
 */
export function Copy({ children, className = '' }) {
  if (typeof children !== 'string') return children
  if (!isPlaceholder(children)) return children
  return <span className={`placeholder ${className}`.trim()}>{children}</span>
}
