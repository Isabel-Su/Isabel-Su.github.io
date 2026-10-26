import { useParams } from 'react-router-dom'
import { getLife, getLifeNeighbors } from '../content/life'
import { articlesForTag } from '../lib/articles'
import { Copy } from '../components/Placeholder'
import { Figure } from '../components/Figure'
import { Gallery } from '../components/Gallery'
import { PageHeader } from '../components/PageHeader'
import { PrefetchLink } from '../components/PrefetchLink'
import { PrevNext } from '../components/PrevNext'
import { ProcessToggle } from '../components/ProcessToggle'
import { Reveal } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import NotFound from './NotFound'
import styles from './LifeCategory.module.css'

export default function LifeCategory() {
  const { slug } = useParams()
  const category = getLife(slug)

  useDocumentTitle(category?.name)

  if (!category) return <NotFound />

  const { prev, next } = getLifeNeighbors(slug)
  const isGallery = category.mode === 'gallery'
  const isSimple = category.mode === 'simple'

  return (
    <div className="container">
      <PrefetchLink to="/life" className={styles.back}>
        &#8592; Life
      </PrefetchLink>

      <PageHeader eyebrow="Life" title={category.name} lede={category.tagline} />

      <Reveal className={styles.intro}>
        <div className="prose">
          {category.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={styles.introText}>
              <Copy>{paragraph}</Copy>
            </p>
          ))}
        </div>
      </Reveal>

      {isGallery && (
        <section className={styles.gallery}>
          <Gallery
            images={category.images}
            variant="masonry"
            lightbox={category.lightbox !== false}
          />
        </section>
      )}

      {isSimple && (
        <>
          <Reveal className={styles.lead}>
            <Figure image={category.cover} priority sizes="(max-width: 860px) 100vw, 74rem" />
          </Reveal>

          {category.images?.length > 0 && (
            <section className={styles.row}>
              <Gallery
                images={category.images}
                variant="row"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
            </section>
          )}
        </>
      )}

      <ProcessToggle articles={articlesForTag(slug)} empty="No articles in this folder yet." />

      <PrevNext prev={prev} next={next} basePath="/life" labelKey="name" />
    </div>
  )
}
