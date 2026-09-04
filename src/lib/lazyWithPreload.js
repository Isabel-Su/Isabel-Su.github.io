import { lazy } from 'react'

/**
 * React.lazy plus a `.preload()` escape hatch.
 *
 * Route chunks normally only start downloading once you click, which puts a
 * network round-trip inside the page transition. Calling preload() on hover or
 * focus means the chunk is usually already parsed by the time navigation
 * happens, so the transition never stalls on a Suspense fallback.
 */
export function lazyWithPreload(factory) {
  let promise
  const load = () => (promise ??= factory())

  const Component = lazy(load)
  Component.preload = load
  return Component
}
