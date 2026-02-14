import { Suspense, lazy, type ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layouts/root-layout'
import Home from './home'
import {
  loadAboutRoute,
  loadContactRoute,
  loadLabsRoute,
  loadProjectsRoute,
  loadServicesRoute,
  loadSitemapRoute,
} from './prefetch'

const About = lazy(loadAboutRoute)
const Services = lazy(loadServicesRoute)
const Projects = lazy(loadProjectsRoute)
const Contact = lazy(loadContactRoute)
const Labs = lazy(loadLabsRoute)
const Sitemap = lazy(loadSitemapRoute)

function RouteFallback() {
  return <section className="py-32" aria-hidden />
}

function withSuspense(Component: ComponentType) {
  return function RouteComponent() {
    return (
      <Suspense fallback={<RouteFallback />}>
        <Component />
      </Suspense>
    )
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'about',
        Component: withSuspense(About),
      },
      {
        path: 'services',
        Component: withSuspense(Services),
      },
      {
        path: 'projects',
        Component: withSuspense(Projects),
      },
      {
        path: 'contact',
        Component: withSuspense(Contact),
      },
      {
        path: 'labs',
        Component: withSuspense(Labs),
      },
      {
        path: 'sitemap',
        Component: withSuspense(Sitemap),
      },
    ],
  },
])
