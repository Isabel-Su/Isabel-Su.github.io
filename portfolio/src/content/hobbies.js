/*
 * Hobbies.
 *
 * One template (src/pages/HobbyDetail.jsx) renders all of these. The only thing
 * that differs between them is `mode`:
 *
 *   'gallery' — intro paragraph + a full masonry portfolio grid (Photography, Origami)
 *   'simple'  — intro paragraph + a handful of photos in a lighter row (Tennis, Running, Hiking)
 *
 * Adding a hobby is appending an object. Adding a photo is adding an entry to
 * `images` and dropping the matching file into src/assets/images/hobbies/.
 *
 * TODO(isabel): every `intro` below is placeholder text written as a starting
 * point, not as final copy. Replace all five.
 */

export const hobbies = [
  {
    slug: 'photography',
    name: 'Photography',
    mode: 'gallery',
    tagline: 'Mostly light, occasionally people.',
    intro: [
      // TODO(isabel): replace. Two or three sentences on what you shoot and why.
      'Placeholder — a few sentences about what pulls you toward a photo: what you shoot, when you started, what you are still trying to get right.',
    ],
    cover: { key: 'hobbies/photography-cover', ratio: '4 / 3', alt: 'Photography' },
    lightbox: true,
    images: [
      { key: 'hobbies/photography-01', ratio: '4 / 5', alt: '', caption: '' },
      { key: 'hobbies/photography-02', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/photography-03', ratio: '4 / 5', alt: '', caption: '' },
      { key: 'hobbies/photography-04', ratio: '1 / 1', alt: '', caption: '' },
      { key: 'hobbies/photography-05', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/photography-06', ratio: '4 / 5', alt: '', caption: '' },
      { key: 'hobbies/photography-07', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/photography-08', ratio: '1 / 1', alt: '', caption: '' },
      { key: 'hobbies/photography-09', ratio: '4 / 5', alt: '', caption: '' },
    ],
  },

  {
    slug: 'origami',
    name: 'Origami',
    mode: 'gallery',
    tagline: 'One sheet, no cuts, a great deal of patience.',
    intro: [
      // TODO(isabel): replace.
      'Placeholder — a few sentences on how you got into folding, what kind of models you go for, and the one that took the longest.',
    ],
    cover: { key: 'hobbies/origami-cover', ratio: '4 / 3', alt: 'Origami' },
    lightbox: true,
    images: [
      { key: 'hobbies/origami-01', ratio: '1 / 1', alt: '', caption: '' },
      { key: 'hobbies/origami-02', ratio: '4 / 5', alt: '', caption: '' },
      { key: 'hobbies/origami-03', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/origami-04', ratio: '1 / 1', alt: '', caption: '' },
      { key: 'hobbies/origami-05', ratio: '4 / 5', alt: '', caption: '' },
      { key: 'hobbies/origami-06', ratio: '3 / 2', alt: '', caption: '' },
    ],
  },

  {
    slug: 'tennis',
    name: 'Tennis',
    mode: 'simple',
    tagline: 'Long rallies, short memory.',
    intro: [
      // TODO(isabel): replace.
      'Placeholder — a couple of sentences on how long you have played, who you play with, and what you are working on.',
    ],
    cover: { key: 'hobbies/tennis-cover', ratio: '4 / 3', alt: 'Tennis' },
    images: [
      { key: 'hobbies/tennis-01', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/tennis-02', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/tennis-03', ratio: '3 / 2', alt: '', caption: '' },
    ],
  },

  {
    slug: 'running',
    name: 'Running',
    mode: 'simple',
    tagline: 'The cheapest way to think clearly.',
    intro: [
      // TODO(isabel): replace.
      'Placeholder — a couple of sentences on your usual routes, distances, and why you keep going out.',
    ],
    cover: { key: 'hobbies/running-cover', ratio: '4 / 3', alt: 'Running' },
    images: [
      { key: 'hobbies/running-01', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/running-02', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/running-03', ratio: '3 / 2', alt: '', caption: '' },
    ],
  },

  {
    slug: 'hiking',
    name: 'Hiking',
    mode: 'simple',
    tagline: 'Elevation, and the excuse to bring a camera.',
    intro: [
      // TODO(isabel): replace.
      'Placeholder — a couple of sentences on where you hike, a trail worth naming, and what you like about it.',
    ],
    cover: { key: 'hobbies/hiking-cover', ratio: '4 / 3', alt: 'Hiking' },
    images: [
      { key: 'hobbies/hiking-01', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/hiking-02', ratio: '3 / 2', alt: '', caption: '' },
      { key: 'hobbies/hiking-03', ratio: '3 / 2', alt: '', caption: '' },
    ],
  },
]

export const getHobby = (slug) => hobbies.find((h) => h.slug === slug)

/** Previous/next for detail-page navigation. Wraps around the ends. */
export function getHobbyNeighbors(slug) {
  const i = hobbies.findIndex((h) => h.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: hobbies[(i - 1 + hobbies.length) % hobbies.length],
    next: hobbies[(i + 1) % hobbies.length],
  }
}
