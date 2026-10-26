import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticle } from '../lib/articles'
import { getLife } from '../content/life'
import { getProject } from '../content/projects'
import { formatDate } from '../lib/formatDate'
import { PrefetchLink } from '../components/PrefetchLink'
import { Reveal } from '../motion/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import NotFound from './NotFound'
import styles from './Article.module.css'

export default function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)
  const [html, setHtml] = useState('')

  useDocumentTitle(article?.title)

  useEffect(() => {
    if (!article) return undefined
    let cancelled = false
    article.load().then((mod) => {
      if (!cancelled) setHtml(mod.html)
    })
    return () => {
      cancelled = true
    }
  }, [article])

  if (!article) return <NotFound />

  const categories = article.tags.map((tag) => getLife(tag)).filter(Boolean)
  const linkedProjects = article.projects.map((id) => getProject(id)).filter(Boolean)

  return (
    <div className="container">
      <PrefetchLink to="/life" className={styles.back}>
        &#8592; Life
      </PrefetchLink>

      <header className={styles.header}>
        <h1 className={`display ${styles.title}`}>{article.title}</h1>
        <time className={styles.date} dateTime={article.updated}>
          {formatDate(article.updated)}
        </time>
      </header>

      <Reveal className={styles.meta}>
        {categories.length > 0 && (
          <p className={styles.links}>
            {categories.map((category) => (
              <PrefetchLink key={category.slug} to={`/life/${category.slug}`} className="link">
                {category.name}
              </PrefetchLink>
            ))}
          </p>
        )}
        {linkedProjects.length > 0 && (
          <p className={styles.links}>
            {linkedProjects.map((project) => (
              <PrefetchLink
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="link keep-case"
              >
                {project.title}
              </PrefetchLink>
            ))}
          </p>
        )}
      </Reveal>

      <Reveal>
        <div className={`prose ${styles.body}`} dangerouslySetInnerHTML={{ __html: html }} />
      </Reveal>
    </div>
  )
}
