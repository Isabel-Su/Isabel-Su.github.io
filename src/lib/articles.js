import { articles } from 'virtual:articles'

export { articles }

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug) ?? null
}

export function articlesForTag(tag) {
  return articles.filter((article) => article.tags.includes(tag))
}

export function articlesForProject(slug) {
  return articles
    .filter((article) => article.projects.includes(slug))
    .sort((a, b) => a.stamp - b.stamp || a.slug.localeCompare(b.slug))
}

export function recentArticles(limit = 4) {
  return articles.slice(0, limit)
}
