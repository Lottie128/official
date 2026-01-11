import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

const Sitemap = () => {
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
        { name: 'Business Plan', path: '/business-plan', description: 'Strategic business overview' },
        { name: 'Pitch Deck', path: '/pitch', description: 'Investment presentation' },
        { name: 'Evolution Lab', path: '/evolution-lab', description: 'Our innovation laboratory' },
        { name: 'Robotics Lab', path: '/robotics-lab', description: 'Advanced robotics research facility' },
      ],
    },
    {
      title: 'Educational Programs',
      links: [
        { name: 'Robotics Training', path: '/robotics-training', description: 'Comprehensive robotics education program' },
        { name: 'BCM Partnership Proposal', path: '/bcm-proposal', description: 'Strategic AR/VR + Robotics integration (Protected)' },
      ],
    },
    {
      title: 'Technical Resources',
      links: [
        { name: 'Hardware Selection Guide', path: '/hardware-selection', description: 'Robotics hardware recommendations' },
      ],
    },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  }

  return (
    <>
      <Helmet>
        <title>Sitemap | ZeroAI Technologies Inc</title>
        <meta
          name="description"
          content="Complete sitemap of ZeroAI Technologies - Browse all pages including services, projects, resources, and educational programs."
        />
      </Helmet>

      <section className="section pt-32">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl mb-4">Sitemap</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-light-accent to-transparent dark:from-dark-accent mx-auto mb-6"></div>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
              Navigate through all pages and resources on our website
            </p>
          </motion.div>

          <div className="space-y-12">
            {sitemapSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                {...fadeInUp}
                transition={{ delay: sectionIndex * 0.1 }}
                className="glass-card"
              >
                <h2 className="heading-md mb-6 text-light-accent dark:text-dark-accent">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      to={link.path}
                      className="block group"
                    >
                      <div className="flex items-start justify-between p-4 rounded-lg hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-all">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
                              {link.name}
                            </h3>
                            <HiArrowRight className="w-4 h-4 text-light-accent dark:text-dark-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* SEO Footer */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 glass-card text-center"
          >
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
              Can't find what you're looking for?
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Contact Us
              <HiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Sitemap