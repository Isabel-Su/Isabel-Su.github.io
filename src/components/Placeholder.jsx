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

/**
 * Flags existing wording that should be rewritten, without changing the words.
 * For copy that reads as finished but is not — a `[PLACEHOLDER` marker would
 * be wrong there, so `Copy` cannot catch it. No callers at the moment.
 */
export function PlaceholderMark({ children, note = 'PLACEHOLDER — rewrite' }) {
  return (
    <span className="placeholder-mark">
      <span className="placeholder-flag">{note}</span>
      {children}
    </span>
  )
}
