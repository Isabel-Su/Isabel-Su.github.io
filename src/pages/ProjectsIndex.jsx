import { projects } from '../content/projects'
import { PageHeader } from '../components/PageHeader'
import { ProjectCard } from '../components/ProjectCard'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './ProjectsIndex.module.css'

export default function ProjectsIndex() {
  useDocumentTitle('Projects')

  return (
    <div className="container">
      <PageHeader
        eyebrow={`${projects.length} projects`}
        title="Things I've built."
        lede="Mostly iOS, mostly on teams, mostly under a deadline."
      />

      {/* The first card spans the full width and everything after it sits two-up.
          Works for any number of projects — nothing to adjust when one is added. */}
      <Stagger className={styles.grid}>
        {projects.map((project, i) => (
          <StaggerItem key={project.slug} className={styles.cell}>
            <ProjectCard
              project={project}
              priority={i === 0}
              sizes={
                i === 0
                  ? '(max-width: 860px) 100vw, 74rem'
                  : '(max-width: 860px) 100vw, 37rem'
              }
            />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
