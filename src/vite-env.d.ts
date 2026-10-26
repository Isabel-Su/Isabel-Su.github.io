declare module 'virtual:articles' {
  export type ArticleMeta = {
    slug: string
    title: string
    updated: string
    stamp: number
    tags: string[]
    projects: string[]
    summary: string
    load: () => Promise<{ html: string }>
  }

  export const articles: ArticleMeta[]
}
