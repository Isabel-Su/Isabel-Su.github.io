import { kindLabels, sortedWork, workIntro, workLede, workTitle } from '../content/work'
import { Copy } from '../components/Placeholder'
import { PageHeader } from '../components/PageHeader'
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './Work.module.css'

export default function Work() {
  useDocumentTitle('Work')

  return (
    <div className={`container ${styles.page}`}>
      <PageHeader eyebrow="Experience" title={workTitle} lede={workLede} />

      <Reveal className={styles.intro}>
        <p className={styles.introText}>
          <Copy>{workIntro}</Copy>
        </p>
      </Reveal>

      <Stagger as="ol" className={styles.list}>
        {sortedWork.map((role) => (
          <StaggerItem as="li" key={role.id} className={styles.entry}>
            <div className={styles.entryInner}>
              <div className={styles.aside}>
                <span className={`eyebrow ${styles.kind}`}>
                  {kindLabels[role.kind] ?? role.kind}
                </span>
                <span className={styles.dates}>{role.dates}</span>
                <span className={`faint ${styles.location}`}>{role.location}</span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.org}>{role.org}</h2>
                <p className={styles.role}>{role.role}</p>
                {role.summary && (
                  <p className={styles.summary}>
                    <Copy>{role.summary}</Copy>
                  </p>
                )}

                <ul className={styles.highlights}>
                  {role.highlights.map((highlight) => (
                    <li key={highlight.slice(0, 40)} className={styles.highlight}>
                      <Copy>{highlight}</Copy>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
