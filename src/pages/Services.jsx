import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaIndustry, FaRobot, FaChalkboardTeacher, FaFlask } from 'react-icons/fa'

const Services = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  }

  const services = [
    {
      icon: FaIndustry,
      title: 'Industrial Automation',
      description:
        'End-to-end automation and robotics integration for manufacturing and production environments.',
      features: ['Smart Manufacturing', 'Process Automation', 'Quality Control Systems', 'AI-Integrated Solutions'],
    },
    {
      icon: FaRobot,
      title: 'Robotics Solutions',
      description: 'Custom robotics development from concept to deployment for diverse applications.',
      features: ['Autonomous Robots', 'Service Robots', 'Industrial Arms', 'IoT Integration'],
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Educational Technology',
      description:
        'AI-driven learning labs, STEM robotics kits, and hands-on workshops for future innovators.',
      features: ['STEM Workshops', 'Robotics Kits', 'AI Training', 'Virtual Labs'],
      link: '/robotics-lab',
    },
    {
      icon: FaFlask,
      title: 'Research & Development',
      description: 'Cutting-edge research in applied AI, energy-efficient robotics, and IoT systems.',
      features: ['Applied AI Research', 'Energy Systems', 'IoT Innovation', 'Future Mobility'],
    },
  ]

  return (
    <>
      <Helmet>
        <title>Our Services | ZeroAI Technologies Inc</title>
        <meta
          name="description"
          content="Comprehensive automation and robotics solutions including industrial automation, robotics solutions, educational technology, and R&D services."
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
            <h1 className="heading-xl mb-4">Our Services</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-light-accent to-transparent dark:from-dark-accent mx-auto mb-6"></div>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
              Comprehensive automation and robotics solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card hover:shadow-lift"
              >
                <service.icon className="w-14 h-14 text-light-accent dark:text-dark-accent mb-4" />
                {service.link ? (
                  <Link to={service.link} className="block">
                    <h3 className="heading-sm mb-3 hover:text-light-accent dark:hover:text-dark-accent transition-colors">
                      {service.title}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="heading-sm mb-3">{service.title}</h3>
                )}
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-light-textSecondary dark:text-dark-textSecondary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-light-accent dark:bg-dark-accent"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
