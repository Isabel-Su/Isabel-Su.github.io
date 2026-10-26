/*
 * Life archive categories.
 *
 * One template (src/pages/LifeCategory.jsx) renders all of these. `mode`:
 *
 *   'gallery' — intro paragraph + a full masonry portfolio grid
 *   'simple'  — intro paragraph + a handful of photos in a lighter row
 *   'text'    — intro paragraph only
 *
 * Articles live in src/content/articles/ as markdown. They tag these slugs
 * (and optionally project slugs) and show up in the articles toggle here.
 *
 * Adding a category is appending an object. Adding a photo is adding an entry
 * to `images` and dropping the matching file into src/assets/images/hobbies/.
 */

export const life = [
  {
    slug: 'photography',
    name: 'Photography',
    mode: 'gallery',
    tagline: 'Mostly light, occasionally people.',
    intro: [
      '[PLACEHOLDER: A few sentences about what pulls you toward a photo — what you shoot, when you started, what you are still trying to get right.]',
    ],
    cover: { key: 'hobbies/photography-cover', ratio: '4 / 3', alt: 'Photography' },
    lightbox: true,
    images: [
      { key: 'hobbies/photography-01', ratio: '4 / 5', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/photography-02', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/photography-03', ratio: '4 / 5', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/photography-04', ratio: '1 / 1', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/photography-05', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/photography-06', ratio: '4 / 5', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/photography-07', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/photography-08', ratio: '1 / 1', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/photography-09', ratio: '4 / 5', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
    ],
  },

  {
    slug: 'reading',
    name: 'Reading',
    mode: 'text',
    tagline: 'What I am in the middle of, and what stuck.',
    intro: [
      '[PLACEHOLDER: A few sentences on how you read, what you reach for, and why it belongs here.]',
    ],
  },

  {
    slug: 'tennis',
    name: 'Tennis',
    mode: 'simple',
    tagline: 'Long rallies, short memory.',
    intro: [
      '[PLACEHOLDER: A couple of sentences on how long you have played, who you play with, and what you are working on.]',
    ],
    cover: { key: 'hobbies/tennis-cover', ratio: '4 / 3', alt: 'Tennis' },
    images: [
      { key: 'hobbies/tennis-01', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/tennis-02', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/tennis-03', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
    ],
  },

  {
    slug: 'running',
    name: 'Running',
    mode: 'simple',
    tagline: 'The cheapest way to think clearly.',
    intro: [
      '[PLACEHOLDER: A couple of sentences on your usual routes, distances, and why you keep going out.]',
    ],
    cover: { key: 'hobbies/running-cover', ratio: '4 / 3', alt: 'Running' },
    images: [
      { key: 'hobbies/running-01', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/running-02', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/running-03', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
    ],
  },

  {
    slug: 'hiking',
    name: 'Hiking',
    mode: 'simple',
    tagline: 'Elevation, and the excuse to bring a camera.',
    intro: [
      '[PLACEHOLDER: A couple of sentences on where you hike, a trail worth naming, and what you like about it.]',
    ],
    cover: { key: 'hobbies/hiking-cover', ratio: '4 / 3', alt: 'Hiking' },
    images: [
      { key: 'hobbies/hiking-01', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/hiking-02', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
      { key: 'hobbies/hiking-03', ratio: '3 / 2', alt: '[PLACEHOLDER]', caption: '[PLACEHOLDER: caption]' },
    ],
  },

  {
    slug: 'travel',
    name: 'Travel',
    mode: 'text',
    tagline: 'Places I went, and what I noticed.',
    intro: [
      '[PLACEHOLDER: A few sentences on how you travel and what you want this archive to hold.]',
    ],
  },

  {
    slug: 'thoughts',
    name: 'Thoughts',
    mode: 'text',
    tagline: 'Notes that did not fit anywhere else.',
    intro: [
      '[PLACEHOLDER: A few sentences on what lands in this folder — half-formed ideas, longer arguments, things you wanted to write down.]',
    ],
  },

  {
    slug: 'other',
    name: 'Other',
    mode: 'text',
    tagline: 'The rest of it.',
    intro: [
      '[PLACEHOLDER: A few sentences on the miscellaneous — things that are not a category of their own yet.]',
    ],
  },
]

export const getLife = (slug) => life.find((item) => item.slug === slug)

/** Previous/next for category-page navigation. Wraps around the ends. */
export function getLifeNeighbors(slug) {
  const i = life.findIndex((item) => item.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: life[(i - 1 + life.length) % life.length],
    next: life[(i + 1) % life.length],
  }
}

export const lifeSlugs = life.map((item) => item.slug)
