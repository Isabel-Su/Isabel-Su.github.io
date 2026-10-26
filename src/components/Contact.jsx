import { site } from '../content/site'
import styles from './Contact.module.css'

const { email, github, linkedin } = site.contact

export const contactItems = [
  { label: 'Email', value: email, href: `mailto:${email}` },
  { label: 'GitHub', value: github.label, href: github.href },
  { label: 'LinkedIn', value: linkedin.label, href: linkedin.href },
]

/**
 * Contact block on the About page; the footer renders `contactItems` itself.
 * Plain links, no form — there is no backend behind a static site, and a form
 * that silently fails is worse than no form.
 */
export function ContactLinks() {
  return (
    <ul className={styles.list}>
      {contactItems.map((item) => (
        <li key={item.label} className={styles.item}>
          <span className={`eyebrow ${styles.label}`}>{item.label}</span>
          <a
            className={styles.value}
            href={item.href}
            target={item.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
          >
            {item.value}
          </a>
        </li>
      ))}
    </ul>
  )
}
