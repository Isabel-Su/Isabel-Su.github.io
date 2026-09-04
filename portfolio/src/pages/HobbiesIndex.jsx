import { hobbies } from '../content/hobbies'
import { Figure } from '../components/Figure'
import { PageHeader } from '../components/PageHeader'
import { PrefetchLink } from '../components/PrefetchLink'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './HobbiesIndex.module.css'

export default function HobbiesIndex() {
  useDocumentTitle('Hobbies')

  return (
    <div className="container">
      <PageHeader
        eyebrow="Outside of work"
        title="Everything else."
        lede="What I spend time on when there is no deadline attached."
      />

      <Stagger className={styles.grid}>
        {hobbies.map((hobby, i) => (
          <StaggerItem key={hobby.slug}>
            <PrefetchLink to={`/hobbies/${hobby.slug}`} className={styles.card}>
              <div className={styles.media}>
                <Figure
                  image={hobby.cover}
                  priority={i < 2}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 31vw"
                  showCaption={false}
                  className={styles.figure}
                />
              </div>
              <h2 className={styles.name}>{hobby.name}</h2>
              <p className={styles.tagline}>{hobby.tagline}</p>
            </PrefetchLink>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
