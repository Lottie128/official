export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
  {
    label: 'Labs',
    path: '/robotics-lab',
    children: [
      { label: 'Robotics Lab', path: '/robotics-lab' },
      { label: 'Evolution Lab', path: '/evolution-lab' },
    ],
  },
]

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ],
  resources: [
    { label: 'Robotics Lab', path: '/robotics-lab' },
    { label: 'Evolution Lab', path: '/evolution-lab' },
    { label: 'Sitemap', path: '/sitemap' },
  ],
}

export const SOCIAL_MEDIA = {
  linkedin: 'https://linkedin.com/company/zeroaitech',
  twitter: 'https://twitter.com/zeroaitech',
  instagram: 'https://instagram.com/zeroaitech',
}
