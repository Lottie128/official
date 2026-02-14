export const loadAboutRoute = () => import('./about')
export const loadServicesRoute = () => import('./services')
export const loadProjectsRoute = () => import('./projects')
export const loadContactRoute = () => import('./contact')
export const loadLabsRoute = () => import('./labs')
export const loadSitemapRoute = () => import('./sitemap')

const prefetchMap: Record<string, () => Promise<unknown>> = {
  '/about': loadAboutRoute,
  '/services': loadServicesRoute,
  '/projects': loadProjectsRoute,
  '/contact': loadContactRoute,
  '/labs': loadLabsRoute,
  '/sitemap': loadSitemapRoute,
}

export function prefetchRoute(path: string) {
  prefetchMap[path]?.()
}
