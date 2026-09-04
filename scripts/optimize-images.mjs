#!/usr/bin/env node
/*
 * Image pipeline.
 *
 *   assets-raw/hobbies/DSC_0421.jpg          (full-res, straight off the camera)
 *        ↓  npm run images
 *   src/assets/images/hobbies/DSC_0421-480.avif
 *                             DSC_0421-480.webp
 *                             DSC_0421-480.jpg   … and 960, 1600
 *
 * src/lib/images.js picks those up automatically and <Figure> serves them as a
 * <picture> with srcset, so a phone never downloads a 6000px photo.
 *
 * Folder structure under assets-raw/ is preserved, and the folder + filename
 * become the key used in the content files ("hobbies/DSC_0421").
 *
 * Re-running is cheap: outputs newer than their source are skipped.
 */

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const SRC_DIR = join(root, 'assets-raw')
const OUT_DIR = join(root, 'src/assets/images')

// 480 covers phones at 1x/small 2x, 960 covers most cards and tablets, 1600
// covers full-bleed on a desktop and 2x on a phone. A fourth size is rarely
// worth the build time or the srcset complexity.
const WIDTHS = [480, 960, 1600]

const QUALITY = { avif: 55, webp: 78, jpeg: 80 }
const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif'])

async function walk(dir) {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) return walk(full)
      if (entry.name.startsWith('.')) return []
      return INPUT_EXT.has(extname(entry.name).toLowerCase()) ? [full] : []
    }),
  )
  return files.flat()
}

async function isStale(source, output) {
  if (!existsSync(output)) return true
  const [a, b] = await Promise.all([stat(source), stat(output)])
  return a.mtimeMs > b.mtimeMs
}

async function processFile(file) {
  const rel = relative(SRC_DIR, file)
  const outSubdir = join(OUT_DIR, dirname(rel))
  const name = basename(rel, extname(rel))

  await mkdir(outSubdir, { recursive: true })

  // rotate() with no argument bakes in EXIF orientation, then metadata is
  // dropped — otherwise portrait phone photos render sideways once stripped.
  const input = sharp(file).rotate()
  const { width: srcWidth } = await input.metadata()

  let written = 0
  let skipped = 0

  for (const width of WIDTHS) {
    // Never upscale. A 700px source should not produce a blurry 1600px file.
    if (srcWidth && width > srcWidth && width !== WIDTHS[0]) continue
    const target = srcWidth ? Math.min(width, srcWidth) : width

    const variants = [
      { ext: 'avif', run: (p) => p.avif({ quality: QUALITY.avif, effort: 4 }) },
      { ext: 'webp', run: (p) => p.webp({ quality: QUALITY.webp }) },
      { ext: 'jpg', run: (p) => p.jpeg({ quality: QUALITY.jpeg, mozjpeg: true }) },
    ]

    for (const variant of variants) {
      const out = join(outSubdir, `${name}-${target}.${variant.ext}`)
      if (!(await isStale(file, out))) {
        skipped += 1
        continue
      }

      const buffer = await variant
        .run(sharp(file).rotate().resize({ width: target, withoutEnlargement: true }))
        .toBuffer()

      await writeFile(out, buffer)
      written += 1
    }
  }

  const key = join(dirname(rel), name).replace(/\\/g, '/').replace(/^\.\//, '')
  return { key, written, skipped }
}

const files = await walk(SRC_DIR)

if (!files.length) {
  console.log(`No source images found in ${relative(root, SRC_DIR)}/`)
  console.log('Drop full-resolution photos in there (subfolders are preserved) and re-run.')
  process.exit(0)
}

console.log(`Processing ${files.length} image${files.length === 1 ? '' : 's'}…\n`)

let totalWritten = 0
let totalSkipped = 0

for (const file of files) {
  const { key, written, skipped } = await processFile(file)
  totalWritten += written
  totalSkipped += skipped
  console.log(`  ${key.padEnd(42)} ${written} written${skipped ? `, ${skipped} up to date` : ''}`)
}

console.log(`\nDone. ${totalWritten} files written, ${totalSkipped} already current.`)
console.log('Reference these in src/content/*.js by their key, e.g. { key: "hobbies/DSC_0421" }.')
