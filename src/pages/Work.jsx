import { kindLabels, sortedWork, workIntro } from '../content/work'
import { PageHeader } from '../components/PageHeader'
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './Work.module.css'

export default function Work() {
  useDocumentTitle('Work')

  return (
    <div className="container">
      <PageHeader
        eyebrow="Experience"
        title="Two rooms, one habit."
        lede="Automating the thing everyone had stopped noticing was manual."
      />

      {/* The framing line. Its whole job is to make the finance/AI split read as
          deliberate range rather than an unfocused résumé. */}
      <Reveal className={styles.intro}>
        <p className={styles.introText}>{workIntro}</p>
      </Reveal>

      <Stagger as="ol" className={styles.list}>
        {sortedWork.map((role) => (
          <StaggerItem as="li" key={role.id} className={styles.entry}>
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
              {role.summary && <p className={styles.summary}>{role.summary}</p>}

              <ul className={styles.highlights}>
                {role.highlights.map((highlight) => (
                  <li key={highlight.slice(0, 40)} className={styles.highlight}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
