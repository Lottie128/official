import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiArrowRight } from 'react-icons/hi'

const Products = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  }

  const products = [
    {
      name: 'Smart Driveshaft Paint System',
      description: 'AI-integrated automated painting system with precision control and quality assurance.',
      category: 'Industrial Automation',
    },
    {
      name: 'Human-Height Service Robot',
      description: 'Fully autonomous, voice-controlled service robot for hospitality and healthcare.',
      category: 'Robotics',
    },
    {
      name: 'Smart Traffic Control',
      description: 'ESP-based camera detection system that operates without internet connectivity.',
      category: 'IoT Solutions',
    },
    {
      name: 'ZeroAI Robotics Kits',
      description: 'DIY STEM educational kits for hands-on learning in robotics and automation.',
      category: 'Education',
    },
    {
      name: 'Home Assistant Integration',
      description: 'Voice-based control systems for smart home automation and IoT devices.',
      category: 'Smart Home',
    },
    {
      name: 'Autonomous Navigation Systems',
      description: 'Advanced navigation and path-planning solutions for mobile robots.',
      category: 'Robotics',
    },
  ]

  const categoryColors = {
    'Industrial Automation': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    'Robotics': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    'IoT Solutions': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    'Education': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200',
    'Smart Home': 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200',
  }

  return (
    <>
      <Helmet>
        <title>Our Products | ZeroAI Technologies Inc</title>
        <meta
          name="description"
          content="Innovative automation and robotics products including industrial systems, service robots, IoT solutions, and educational kits."
        />
      </Helmet>

      <section className="section pt-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl mb-4">Our Products</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-light-accent to-transparent dark:from-dark-accent mx-auto mb-6"></div>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
              Innovative solutions that power the future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="glass-card hover:shadow-lift group"
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    categoryColors[product.category] || 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  {product.category}
                </span>
                <h3 className="heading-sm mb-3">{product.name}</h3>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  {product.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-light-accent dark:text-dark-accent font-medium text-sm group-hover:gap-3 transition-all"
                >
                  Learn More
                  <HiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Products
