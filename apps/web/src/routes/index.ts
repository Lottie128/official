import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layouts/root-layout'
import Home from './home'
import About from './about'
import Services from './services'
import Projects from './projects'
import Contact from './contact'
import RoboticsLab from './robotics-lab'
import EvolutionLab from './evolution-lab'
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
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'robotics-lab',
        Component: RoboticsLab,
      },
      {
        path: 'evolution-lab',
        Component: EvolutionLab,
      },
      {
        path: 'sitemap',
        Component: Sitemap,
      },
    ],
  },
])
