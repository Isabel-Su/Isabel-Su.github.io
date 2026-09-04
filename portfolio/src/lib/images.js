/*
 * Image registry.
 *
 * Content files refer to images by a plain string key ("projects/gridx-cover").
 * This module resolves that key to hashed, built URLs by globbing the assets
 * folder — so adding an image is dropping a file in src/assets/images/ and
 * nothing else. Nothing here needs editing when images change.
 *
 * Expected filenames (what `npm run images` produces):
 *   src/assets/images/projects/gridx-cover-960.webp
 *                              ^folder  ^name    ^width ^format
 *
 * A file with no -<width> suffix still works; it just becomes a single-width
 * source with no srcset.
 */

const FORMATS = ['avif', 'webp', 'jpg', 'jpeg', 'png']

const files = import.meta.glob('../assets/images/**/*.{avif,webp,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** key -> { avif: [{w,url}], webp: [...], raster: [...] } */
const registry = {}

for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\.\.\/assets\/images\/(.+)\.([a-z]+)$/i)
  if (!match) continue

  const [, pathNoExt, ext] = match
  const format = ext.toLowerCase()
  if (!FORMATS.includes(format)) continue

  // Split a trailing -960 into name + width.
  const widthMatch = pathNoExt.match(/^(.*)-(\d{2,5})$/)
  const key = widthMatch ? widthMatch[1] : pathNoExt
  const width = widthMatch ? Number(widthMatch[2]) : null

  const entry = (registry[key] ??= { avif: [], webp: [], raster: [] })
  const bucket = format === 'avif' ? 'avif' : format === 'webp' ? 'webp' : 'raster'
  entry[bucket].push({ w: width, url })
}

// Ascending width so the largest is easy to grab as the fallback src.
for (const entry of Object.values(registry)) {
  for (const bucket of Object.values(entry)) {
    bucket.sort((a, b) => (a.w ?? 0) - (b.w ?? 0))
  }
}

const toSrcSet = (list) =>
  list.length && list[0].w
    ? list.map(({ w, url }) => `${url} ${w}w`).join(', ')
    : list[0]?.url || null

/**
 * @param {string} key e.g. "hobbies/photography-01"
 * @returns {{avif:string|null, webp:string|null, src:string, width:number|null}|null}
 *          null when the image has not been added yet — callers render a placeholder.
 */
export function getImage(key) {
  const entry = key && registry[key]
  if (!entry) return null

  const rasterList = entry.raster.length ? entry.raster : entry.webp
  const fallback = rasterList.at(-1)
  if (!fallback) return null

  return {
    avif: entry.avif.length ? toSrcSet(entry.avif) : null,
    webp: entry.webp.length ? toSrcSet(entry.webp) : null,
    src: fallback.url,
    srcSet: rasterList.length > 1 ? toSrcSet(rasterList) : null,
    width: fallback.w,
  }
}

/** Debug helper: every key currently resolvable. */
export const imageKeys = Object.keys(registry).sort()
