import { Figure } from './Figure'
import { Copy } from './Placeholder'
import { PrefetchLink } from './PrefetchLink'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project, priority = false, sizes }) {
  return (
    <PrefetchLink to={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.media}>
        <Figure
          image={project.cover}
          fill
          priority={priority}
          sizes={sizes}
          showCaption={false}
          className={styles.figure}
        />
      </div>

      <div className={styles.text}>
        <div className={styles.meta}>
          <span className="eyebrow">
            <Copy>{project.context}</Copy>
          </span>
          <span className={`eyebrow ${styles.period}`}>{project.period}</span>
        </div>

        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.tagline}>
          <Copy>{project.tagline}</Copy>
        </p>

        {project.stack?.length > 0 && (
          <ul className={styles.stack}>
            {project.stack.map((tech) => (
              <li key={tech} className={styles.tech}>
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </PrefetchLink>
  )
}
