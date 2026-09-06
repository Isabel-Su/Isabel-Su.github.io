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
        lede="[PLACEHOLDER: A short, generic intro for this page — not tied to any one project.]"
      />

      <Stagger className={styles.grid}>
        {projects.map((project, i) => (
          <StaggerItem key={project.slug} className={styles.cell}>
            <ProjectCard
              project={project}
              priority={i < 2}
              sizes="(max-width: 860px) 100vw, 37rem"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
