import { site } from '../content/site'
import { contactItems } from './Contact'
import { PrefetchLink } from './PrefetchLink'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.name}>{site.name}</p>
          <p className={`faint ${styles.meta}`}>
            {site.education.schoolShort}, class of {site.education.gradYear}
          </p>
        </div>

        <nav className={styles.column} aria-label="Footer">
          <span className="eyebrow">Pages</span>
          {site.nav.map((item) => (
            <PrefetchLink key={item.to} to={item.to} className={styles.link}>
              {item.label}
            </PrefetchLink>
          ))}
        </nav>

        <div className={styles.column}>
          <span className="eyebrow">Elsewhere</span>
          {contactItems.map((item) => (
            <a
              key={item.label}
              className={styles.link}
              href={item.href}
              target={item.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className={`container ${styles.baseline}`}>
        <span className="faint">
          &copy; {new Date().getFullYear()} {site.name}
        </span>
        <span className="faint">Built with React and a lot of whitespace.</span>
      </div>
    </footer>
  )
}
