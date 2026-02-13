import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { useStaggerFadeIn } from '@/hooks/use-stagger-animation'
import { Button } from '@/components/ui/button'

export default function SitemapPage() {
  const ref = useStaggerFadeIn()

  const sitemapSections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/', description: 'Welcome to ZeroAI Technologies' },
        { name: 'About Us', path: '/about', description: 'Learn about our mission and vision' },
        { name: 'Services', path: '/services', description: 'Our automation and robotics services' },
        { name: 'Projects', path: '/projects', description: 'Innovative solutions and products' },
        { name: 'Contact', path: '/contact', description: 'Get in touch with our team' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Robotics Lab', path: '/robotics-lab', description: 'Advanced robotics research facility' },
        { name: 'Evolution Lab', path: '/evolution-lab', description: 'Our innovation laboratory' },
      ],
    },
  ]

  return (
    <>
      <PageHeader
        title="Sitemap"
        subtitle="Navigate through all pages and resources on our website"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div ref={ref} className="space-y-12">
            {sitemapSections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <Link key={linkIndex} to={link.path} className="block group">
                      <div className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                              {link.name}
                            </h3>
                            <ArrowRight className="w-4 h-4 text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SEO Footer */}
          <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Can't find what you're looking for?
            </p>
            <Link to="/contact">
              <Button className="gap-2">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
