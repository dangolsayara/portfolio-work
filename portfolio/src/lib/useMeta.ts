import { useEffect } from 'react'

/** Per-route title, description and canonical/OG updates without a dependency. */
export function useMeta({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path?: string
}) {
  useEffect(() => {
    document.title = title

    const set = (selector: string, attr: string, value: string) => {
      const el = document.head.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
    set('meta[name="twitter:title"]', 'content', title)
    set('meta[name="twitter:description"]', 'content', description)

    if (path) {
      const url = `${window.location.origin}${path}`
      set('link[rel="canonical"]', 'href', url)
      set('meta[property="og:url"]', 'content', url)
    }
  }, [title, description, path])
}
