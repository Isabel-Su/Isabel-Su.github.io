import { about } from '../content/about'
import { Copy } from '../components/Placeholder'
import { Figure } from '../components/Figure'
import { ContactLinks } from '../components/Contact'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './About.module.css'

export default function About() {
  useDocumentTitle('About')

  return (
    <div className="container">
      <PageHeader eyebrow="About" title={about.heading} />

      <div className={styles.layout}>
        <Reveal className={styles.portrait}>
          <Figure
            image={about.portrait}
            priority
            sizes="(max-width: 860px) 100vw, 26rem"
          />
        </Reveal>

        <div className={styles.text}>
          <Reveal className="prose">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.paragraph}>
                <Copy>{paragraph}</Copy>
              </p>
            ))}
          </Reveal>

          {about.facts?.length > 0 && (
            <Reveal as="dl" className={styles.facts}>
              {about.facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className={styles.factValue}>{fact.value}</dd>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </div>

      {about.tools?.length > 0 && (
        <Reveal as="section" className={styles.tools} aria-labelledby="tools-heading">
          <span className="eyebrow">Toolkit</span>
          <h2 id="tools-heading" className={styles.toolsTitle}>
            {about.toolsHeading}
          </h2>
          <dl className={styles.toolGroups}>
            {about.tools.map((group) => (
              <div key={group.label} className={styles.toolGroup}>
                <dt className="eyebrow">{group.label}</dt>
                <dd className={styles.toolItems}>{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      <Reveal as="section" className={styles.contact} id="contact">
        <div className={styles.contactHead}>
          <span className="eyebrow">Contact</span>
          <h2 className={styles.contactTitle}>Say hello.</h2>
          <p className={styles.contactNote}>
            The fastest way to reach me is email. I read everything, and I answer
            most things within a day or two.
          </p>
        </div>
        <ContactLinks />
      </Reveal>
    </div>
  )
}
