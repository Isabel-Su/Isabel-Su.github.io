import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves a plain static file tree with no SPA rewrite rule, so a
// hard load of /projects/gridx would hit Pages' own 404. Shipping a byte-identical
// 404.html makes those deep links boot the app directly, with no redirect hop.
function spaFallback() {
  let outDir
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  // '/' is correct for a user page (Isabel-Su.github.io). If this ever moves to a
  // project repo served at /<repo>/, change this to '/<repo>/' and set the same
  // value as <BrowserRouter basename> in src/main.jsx.
  base: '/',
  plugins: [react(), spaFallback()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
})
