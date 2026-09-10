import { useParams } from 'react-router-dom'
import { getHobby, getHobbyNeighbors } from '../content/hobbies'
import { Copy } from '../components/Placeholder'
import { Figure } from '../components/Figure'
import { Gallery } from '../components/Gallery'
import { PageHeader } from '../components/PageHeader'
import { PrefetchLink } from '../components/PrefetchLink'
import { PrevNext } from '../components/PrevNext'
import { Reveal } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import NotFound from './NotFound'
import styles from './HobbyDetail.module.css'

/**
 * One template for every hobby. The only branch is `mode`:
 *
 *   gallery — the photographs are the content, so the page goes straight from
 *             the intro into a masonry grid with a lightbox.
 *   simple  — a single lead image and a light row of supporting photos.
 *
 * Adding a hobby never means writing a new layout; it means adding an object to
 * src/content/hobbies.js and picking a mode.
 */
export default function HobbyDetail() {
  const { slug } = useParams()
  const hobby = getHobby(slug)

  useDocumentTitle(hobby?.name)

  if (!hobby) return <NotFound />

  const { prev, next } = getHobbyNeighbors(slug)
  const isGallery = hobby.mode === 'gallery'

  return (
    <div className="container">
      <PrefetchLink to="/hobbies" className={styles.back}>
        &#8592; Hobbies
      </PrefetchLink>

      <PageHeader eyebrow="Hobbies" title={hobby.name} lede={hobby.tagline} />

      <Reveal className={styles.intro}>
        <div className="prose">
          {hobby.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={styles.introText}>
              <Copy>{paragraph}</Copy>
            </p>
          ))}
        </div>
        {hobby.external && (
          <p className={styles.external}>
            <a
              className="link"
              href={hobby.external.href}
              target="_blank"
              rel="noreferrer"
            >
              <Copy>{hobby.external.label}</Copy>
            </a>
          </p>
        )}
      </Reveal>

      {isGallery ? (
        <section className={styles.gallery}>
          <Gallery images={hobby.images} variant="masonry" lightbox={hobby.lightbox !== false} />
        </section>
      ) : (
        <>
          <Reveal className={styles.lead}>
            <Figure image={hobby.cover} priority sizes="(max-width: 860px) 100vw, 74rem" />
          </Reveal>

          {hobby.images?.length > 0 && (
            <section className={styles.row}>
              <Gallery
                images={hobby.images}
                variant="row"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
            </section>
          )}
        </>
      )}

      <PrevNext prev={prev} next={next} basePath="/hobbies" labelKey="name" />
    </div>
  )
}
