import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layouts/root-layout'
import Home from './home'
import About from './about'
import Services from './services'
import Projects from './projects'
import Sitemap from './sitemap'

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
        Component: About,
      },
      {
        path: 'services',
        Component: Services,
      },
      {
        path: 'projects',
        Component: Projects,
      },
      {
        path: 'sitemap',
        Component: Sitemap,
      },
    ],
  },
])
