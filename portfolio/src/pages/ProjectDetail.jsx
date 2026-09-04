import { useParams } from 'react-router-dom'
import { getProject, getProjectNeighbors } from '../content/projects'
import { PageHeader } from '../components/PageHeader'
import { Figure } from '../components/Figure'
import { Gallery } from '../components/Gallery'
import { Section } from '../components/Section'
import { PrevNext } from '../components/PrevNext'
import { PrefetchLink } from '../components/PrefetchLink'
import { Reveal } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import NotFound from './NotFound'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  useDocumentTitle(project?.title)

  if (!project) return <NotFound />

  const { prev, next } = getProjectNeighbors(slug)

  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.period },
    { label: 'Built with', value: project.stack?.join(', ') },
  ].filter((item) => item.value)

  return (
    <div className="container">
      <PrefetchLink to="/projects" className={styles.back}>
        &#8592; Projects
      </PrefetchLink>

      <PageHeader eyebrow={project.context} title={project.title} lede={project.tagline} />

      <Reveal as="dl" className={styles.meta}>
        {meta.map((item) => (
          <div key={item.label} className={styles.metaItem}>
            <dt className="eyebrow">{item.label}</dt>
            <dd className={styles.metaValue}>{item.value}</dd>
          </div>
        ))}
      </Reveal>

      {/* The cover is the one image on the page loaded eagerly — it is above the
          fold on most screens, so lazy-loading it would delay the LCP. */}
      <Reveal className={styles.cover}>
        <Figure image={project.cover} priority sizes="(max-width: 860px) 100vw, 74rem" />
      </Reveal>

      {project.award && (
        <Reveal className={styles.award}>
          <p className={styles.awardText}>{project.award}</p>
        </Reveal>
      )}

      <div className={styles.sections}>
        {project.sections.map((section, i) => (
          <Section key={section.heading} title={section.heading} index={i + 1}>
            <div className="prose">
              {section.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            {section.points?.length > 0 && (
              <ul className={styles.points}>
                {section.points.map((point) => (
                  <li key={point.slice(0, 40)} className={styles.point}>
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        ))}
      </div>

      {project.gallery?.length > 0 && (
        <section className={styles.gallery}>
          <Reveal>
            <span className="eyebrow">Screens</span>
          </Reveal>
          <div className={styles.galleryGrid}>
            <Gallery
              images={project.gallery}
              variant="row"
              sizes="(max-width: 640px) 100vw, 30vw"
            />
          </div>
        </section>
      )}

      <PrevNext prev={prev} next={next} basePath="/projects" />
    </div>
  )
}
