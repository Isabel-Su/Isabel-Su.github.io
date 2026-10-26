import { site } from '../content/site'
import { contactItems } from './Contact'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={`${styles.name} keep-case`}>{site.name}</p>
        <nav className={styles.links} aria-label="Contact">
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
        </nav>
      </div>
    </footer>
  )
}
