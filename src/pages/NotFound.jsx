import { PageHeader } from '../components/PageHeader'
import { PrefetchLink } from '../components/PrefetchLink'
import { site } from '../content/site'
import { Reveal } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './NotFound.module.css'

export default function NotFound() {
  useDocumentTitle('Not found')

  return (
    <div className="container">
      <PageHeader
        eyebrow="404"
        title="This page doesn't exist."
        lede="Which is either a broken link or a very old one. Here is everything that does exist:"
      />

      <Reveal as="nav" className={styles.links} aria-label="Site sections">
        {site.nav.map((item) => (
          <PrefetchLink key={item.to} to={item.to} className={styles.link}>
            {item.label}
          </PrefetchLink>
        ))}
      </Reveal>
    </div>
  )
}
