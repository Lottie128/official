import { ABOUT_CONTENT } from './pages/about'
import { HOME_CONTENT } from './pages/home'
import { COMPANY_INFO } from './company'
import { SOCIAL_MEDIA } from './navigation'

type RouteSeo = {
  title: string
  description: string
  keywords: string[]
}

const withProtocol = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '')

export const SITE_URL = stripTrailingSlash(withProtocol(COMPANY_INFO.contact.website))

const defaultKeywords = [
  'ZeroAI Technologies',
  'automation systems',
  'robotics solutions',
  'AI education',
  'STEM robotics',
  'industrial automation',
]

export const DEFAULT_SEO: RouteSeo = {
  title: `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`,
  description: COMPANY_INFO.description,
  keywords: defaultKeywords,
}

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: `${COMPANY_INFO.name} | Automation, Robotics, and AI Education`,
    description: HOME_CONTENT.hero.description,
    keywords: [...defaultKeywords, 'IBM Partner Plus', 'STEM.org Certified'],
  },
  '/about': {
    title: `About ${COMPANY_INFO.shortName} | Mission, Vision, Leadership`,
    description: ABOUT_CONTENT.hero.subtitle,
    keywords: [...defaultKeywords, 'company overview', 'leadership', 'global operations'],
  },
  '/services': {
    title: `Services | ${COMPANY_INFO.shortName}`,
    description:
      'Explore industrial automation, robotics solutions, educational technology, and R&D services from ZeroAI Technologies.',
    keywords: [...defaultKeywords, 'AI-integrated solutions', 'research and development'],
  },
  '/projects': {
    title: `Projects | ${COMPANY_INFO.shortName}`,
    description: 'Discover ZeroAI projects across industrial automation, robotics, and educational technology.',
    keywords: [...defaultKeywords, 'case studies', 'autonomous navigation', 'service robot'],
  },
  '/contact': {
    title: `Contact ${COMPANY_INFO.shortName} | Start Your Project`,
    description: `Get in touch with ${COMPANY_INFO.name} for automation, robotics, and AI education solutions.`,
    keywords: [...defaultKeywords, 'contact ZeroAI', 'start your project'],
  },
  '/labs': {
    title: `Robotics Lab Packages | ${COMPANY_INFO.shortName}`,
    description: 'Build future-ready robotics and AI labs with ZeroAI training packages for institutions.',
    keywords: [...defaultKeywords, 'robotics lab packages', 'STEM labs', 'education technology'],
  },
  '/sitemap': {
    title: `Sitemap | ${COMPANY_INFO.shortName}`,
    description: 'Explore all ZeroAI pages for automation, robotics, projects, labs, and contact resources.',
    keywords: [...defaultKeywords, 'website sitemap'],
  },
}

export const getRouteSeo = (pathname: string): RouteSeo => {
  const normalized = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname
  return ROUTE_SEO[normalized] ?? DEFAULT_SEO
}

export const toAbsoluteUrl = (pathname: string) => {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${SITE_URL}${normalizedPath}`
}

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY_INFO.name,
  alternateName: COMPANY_INFO.shortName,
  url: SITE_URL,
  description: COMPANY_INFO.description,
  founder: {
    '@type': 'Person',
    name: COMPANY_INFO.founder.name,
    jobTitle: COMPANY_INFO.founder.title,
    description: COMPANY_INFO.founder.description,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: COMPANY_INFO.contact.email.primary,
      telephone: COMPANY_INFO.contact.phone,
      availableLanguage: ['en'],
    },
  ],
  sameAs: Object.values(SOCIAL_MEDIA),
  areaServed: COMPANY_INFO.locations.globalPresence,
  address: {
    '@type': 'PostalAddress',
    addressCountry: COMPANY_INFO.locations.headquarters,
  },
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: COMPANY_INFO.name,
  alternateName: COMPANY_INFO.shortName,
  url: SITE_URL,
  description: COMPANY_INFO.description,
  inLanguage: 'en',
}
