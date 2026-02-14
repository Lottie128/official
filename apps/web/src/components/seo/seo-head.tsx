import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { getRouteSeo, ORGANIZATION_SCHEMA, SITE_URL, toAbsoluteUrl, WEBSITE_SCHEMA } from '@/config/seo'

const upsertMeta = (selector: string, attrs: Record<string, string>, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value))
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const upsertLink = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value))
}

const upsertJsonLd = (id: string, payload: object) => {
  let element = document.head.querySelector<HTMLScriptElement>(`script#${id}`)
  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(payload)
}

export const SeoHead = () => {
  const { pathname } = useLocation()

  const seo = useMemo(() => getRouteSeo(pathname), [pathname])
  const canonicalUrl = useMemo(() => toAbsoluteUrl(pathname), [pathname])

  useEffect(() => {
    document.title = seo.title

    upsertMeta('meta[name="description"]', { name: 'description' }, seo.description)
    upsertMeta('meta[name="keywords"]', { name: 'keywords' }, seo.keywords.join(', '))
    upsertMeta('meta[name="robots"]', { name: 'robots' }, 'index, follow, max-image-preview:large')

    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'website')
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, WEBSITE_SCHEMA.name)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, seo.title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, seo.description)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, seo.description)

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })

    upsertJsonLd('seo-schema-organization', ORGANIZATION_SCHEMA)
    upsertJsonLd('seo-schema-website', WEBSITE_SCHEMA)
    upsertJsonLd('seo-schema-webpage', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: canonicalUrl,
      isPartOf: SITE_URL,
    })
  }, [canonicalUrl, seo.description, seo.keywords, seo.title])

  return null
}
