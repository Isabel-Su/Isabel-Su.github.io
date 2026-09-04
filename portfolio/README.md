# Isabel Su — Portfolio

A static portfolio site. Vite + React, React Router for client-side routing,
Framer Motion for transitions, plain CSS with a token layer. Deploys to GitHub
Pages automatically on every push to `main`.

Live at **https://isabel-su.github.io** once deployed.

---

## Running it locally

```bash
npm install
npm run dev          # http://localhost:5173
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Renders every route and asserts its content is present |
| `npm run images` | Compresses photos from `assets-raw/` into the site |
| `npm run lint` | Lints with oxlint |

`npm run check` is the useful one after editing content — it catches a typo in a
slug or a missing field before you push.

---

## Putting it live

This is set up as a **GitHub user page**, which is why the site lives at the root
of the domain rather than under a subpath.

### One-time setup

1. **Create the repo.** On github.com, create a new repository named exactly
   `Isabel-Su.github.io`. The name has to match your username exactly — that is
   what makes GitHub treat it as your user page. Make it **public**, and do not
   add a README, `.gitignore`, or license (this project already has them).

2. **Push this project to it.**

   ```bash
   git remote add origin https://github.com/Isabel-Su/Isabel-Su.github.io.git
   git branch -M main
   git push -u origin main
   ```

3. **Turn on Pages.** In the repo, go to **Settings → Pages**, and under
   **Build and deployment → Source**, choose **GitHub Actions**. Not "Deploy from
   a branch" — the workflow in this repo does the building.

4. **Watch it build.** The **Actions** tab will show the "Deploy to GitHub Pages"
   run. First one takes a couple of minutes. When it's green, the site is live.

### After that

Every push to `main` rebuilds and redeploys on its own. You can also trigger a
deploy by hand from the Actions tab (the workflow has `workflow_dispatch`
enabled) if you ever need to redeploy without a commit.

### If you ever move it to a normal repo

If this becomes a project repo served at `isabel-su.github.io/portfolio` instead,
change one line in [vite.config.js](vite.config.js):

```js
base: '/portfolio/',   // was '/'
```

The router reads `import.meta.env.BASE_URL` for its `basename`, so nothing else
needs to change.

### Why there's a `404.html`

GitHub Pages serves plain files and has no idea about client-side routes, so
loading `https://isabel-su.github.io/projects/gridx` directly would normally hit
a 404. The build copies `index.html` to `404.html`, so Pages serves the app for
any unknown path and React Router takes it from there. This is handled by a small
plugin in `vite.config.js` — nothing to maintain.

---

## Editing content

**All site content lives in [`src/content/`](src/content/) as plain data.** You
should almost never need to touch a component to update the site.

```
src/content/
  site.js        name, tagline, nav links, email/GitHub/LinkedIn
  projects.js    the projects, their narratives, and their images
  work.js        work experience
  hobbies.js     hobbies, and which layout each one uses
  about.js       about paragraph, portrait, and the facts list
```

### Adding a project

Append an object to the `projects` array in
[`src/content/projects.js`](src/content/projects.js). The route
`/projects/<slug>`, the card on the index page, and the previous/next links all
appear automatically. Copy an existing entry as a template — the fields are
documented in a comment at the top of the file.

### Adding a work role (e.g. the Discrete Math TA position)

Append an object to the `work` array in
[`src/content/work.js`](src/content/work.js). There is a ready-to-fill template
in the comment block at the top of that file.

Entries **sort themselves** — anything with `current: true` floats to the top,
then everything else by end date, most recent first. So you can paste a new role
anywhere in the array and it will land in the right place.

### Adding a hobby

Append to the `hobbies` array in
[`src/content/hobbies.js`](src/content/hobbies.js) and pick a `mode`:

- `'gallery'` — intro paragraph plus a full masonry photo grid with a lightbox.
  Used by Photography and Origami.
- `'simple'` — intro paragraph, one lead image, and a light row of photos.
  Used by Tennis, Running, and Hiking.

Both modes are the same template
([`src/pages/HobbyDetail.jsx`](src/pages/HobbyDetail.jsx)), so a new hobby never
means writing a new layout.

---

## Images

### Empty slots are intentional

Any image that hasn't been added yet renders as a labelled placeholder frame
showing the filename it's waiting for, at the right aspect ratio. The layout is
already correct; the photos just aren't in it yet. Nothing will shift when you
add them.

### Adding photos

1. Drop full-resolution originals into `assets-raw/`, in a subfolder matching
   where they belong:

   ```
   assets-raw/
     projects/talking-fingers-01.png
     hobbies/photography-01.jpg
     about/portrait.jpg
   ```

2. Run the pipeline:

   ```bash
   npm run images
   ```

   Each photo becomes AVIF, WebP, and JPEG at 480px, 960px, and 1600px wide,
   written to `src/assets/images/`. EXIF orientation is applied and metadata is
   stripped. Re-running only reprocesses files that changed.

3. Reference it in the content file by its **key** — the folder and filename with
   no extension and no size suffix:

   ```js
   cover: { key: 'hobbies/photography-01', ratio: '3 / 2', alt: 'Sunset over the ridge' }
   ```

The site then serves the smallest appropriate file for each device, so a phone
never downloads a 3000px photo.

Note that `assets-raw/` is **gitignored** — only the compressed output is
committed, which keeps the repo small. Keep your originals backed up somewhere
else.

### If you'd rather not use the script

You can skip `npm run images` and put files directly in `src/assets/images/`.
Export them at roughly the size they'll display (1600px wide is plenty for
anything full-width, 960px for a card) and save as WebP or JPEG at around 80%
quality. Name them without a size suffix and they'll work as single-size images.

### `ratio` matters

The `ratio` on each image (`'4 / 3'`, `'3 / 2'`, `'9 / 19.5'` for phone
screenshots) is what reserves space before the file loads. Set it to the actual
proportions of your photo, or it will be cropped to fit.

---

## Design

### Colors, type, spacing

Everything visual resolves back to
[`src/styles/tokens.css`](src/styles/tokens.css). Warm neutrals on a warm paper
ground, with one muted green as the only accent — used on links, the active nav
item, and small marks, never as a fill. Changing the whole palette means editing
that one block.

Type is [Fraunces](https://fonts.google.com/specimen/Fraunces) for display and
[Inter Tight](https://fonts.google.com/specimen/Inter+Tight) for body, both
self-hosted as variable fonts (no Google Fonts request, nothing to load from a
third party).

### Motion

Every animation on the site comes from
[`src/motion/tokens.js`](src/motion/tokens.js) — one easing curve, one fade-up
reveal, one page transition. Only `transform` and `opacity` are animated, which
keeps everything on the compositor and off the main thread.

Scroll reveals all go through `<Reveal>`, so their distance and timing are
identical everywhere. `prefers-reduced-motion` is respected throughout.

### Performance

- Each page is a separate chunk, loaded on demand
- Nav links preload their destination chunk on hover, so navigation doesn't wait on the network
- Framer Motion is loaded via `LazyMotion` with only the features actually used
- Images are lazy-loaded below the fold and have their space reserved in advance
- No layout shift, no web fonts from a CDN, no analytics, no tracking

---

## Things to review

A few content and design decisions were judgment calls. They're marked with
`REVIEW:` or `TODO(isabel):` comments in the code, so searching for those will
find all of them:

```bash
grep -rn "REVIEW:\|TODO(isabel)" src/
```

The big ones:

- **`src/content/site.js`** — the one-line identity statement on the home page
- **`src/content/about.js`** — the About paragraph is a placeholder; replace it
- **`src/content/hobbies.js`** — all five hobby intros are placeholders
- **`src/content/projects.js`** — the project narratives expand your bullets into
  problem/build/outcome arcs; the tech stack listed for Talking Fingers is
  inferred and should be corrected
- **`src/content/work.js`** — the framing line at the top of the Work page
