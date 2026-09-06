/** True when a content string is still waiting on Isabel's rewrite. */
export function isPlaceholder(value) {
  return typeof value === 'string' && value.includes('[PLACEHOLDER')
}
