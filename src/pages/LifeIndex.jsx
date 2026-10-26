import { life } from '../content/life'
import { recentArticles } from '../lib/articles'
import { ArticleRow } from '../components/ArticleRow'
import { PageHeader } from '../components/PageHeader'
import { PrefetchLink } from '../components/PrefetchLink'
import { Reveal } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './LifeIndex.module.css'

export default function LifeIndex() {
  useDocumentTitle('Life')
  const recent = recentArticles(4)

  return (
    <div className={`container ${styles.page}`}>
      <PageHeader
        eyebrow="Outside of work"
        title="Everything else."
        lede="What I spend time on when there is no deadline attached."
      />

      <div className={styles.layout}>
        <Reveal as="section" className={styles.feed} aria-labelledby="recently-heading">
          <h2 id="recently-heading" className={`eyebrow ${styles.heading}`}>
            Recently
          </h2>
          {recent.length ? (
            <div>
              {recent.map((article) => (
                <ArticleRow key={article.slug} article={article} summary />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Nothing here yet.</p>
          )}
        </Reveal>

        <Reveal as="nav" className={styles.archive} aria-labelledby="archive-heading">
          <h2 id="archive-heading" className={`eyebrow ${styles.heading}`}>
            Archive
          </h2>
          <ul className={styles.menu}>
            {life.map((category) => (
              <li key={category.slug}>
                <PrefetchLink to={`/life/${category.slug}`} className={styles.menuLink}>
                  {category.name}
                </PrefetchLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  )
}
