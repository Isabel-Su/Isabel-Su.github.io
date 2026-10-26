import { PrefetchLink } from './PrefetchLink'
import { formatDate } from '../lib/formatDate'
import styles from './ArticleRow.module.css'

export function ArticleRow({ article, summary = false }) {
  return (
    <PrefetchLink to={`/life/articles/${article.slug}`} className={styles.row}>
      <span className={styles.main}>
        <span className={styles.title}>{article.title}</span>
        {summary && article.summary ? (
          <span className={styles.summary}>{article.summary}</span>
        ) : null}
        {summary && article.tags.length > 0 ? (
          <span className={styles.tags}>{article.tags.join(' · ')}</span>
        ) : null}
      </span>
      <time className={styles.date} dateTime={article.updated}>
        {formatDate(article.updated)}
      </time>
    </PrefetchLink>
  )
}
