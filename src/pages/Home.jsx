import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  FaRobot,
  FaCog,
  FaGraduationCap,
  FaGlobe,
  FaAward,
  FaIndustry,
  FaHandshake,
  FaCertificate,
  FaLightbulb,
  FaChartLine,
} from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  }

  return (
    <>
      <Helmet>
        <title>ZeroAI Technologies Inc | Leading Automation, Robotics & AI Education Company</title>
        <meta
          name="description"
          content="ZeroAI Technologies Inc - Premier automation systems, robotics solutions, and AI-driven educational technology. IBM Partner Plus Member. STEM.org Certified."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="section pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-light-accent/5 to-transparent dark:from-dark-accent/5"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass dark:glass-dark rounded-full text-sm font-medium"
            >
              <FaAward className="text-light-accent dark:text-dark-accent" />
              IBM Partner Plus Member | STEM.org Certified
            </motion.div>

            <h1 className="heading-xl mb-6">
              Engineering the Future of
              <span className="block text-light-accent dark:text-dark-accent mt-2">
                Intelligent Systems
              </span>
            </h1>

            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary mb-8 max-w-2xl mx-auto">
              World-class <strong>automation</strong>, <strong>robotics</strong>, and{' '}
              <strong>AI-driven education</strong> solutions transforming industries globally
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary flex items-center justify-center gap-2">
                Start Your Project
                <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {[
                { icon: FaCertificate, label: 'IBM Partner Plus' },
                { icon: FaAward, label: 'STEM.org Certified' },
                { icon: FaGlobe, label: '4 Countries' },
                { icon: FaHandshake, label: '500+ Clients' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass dark:glass-dark rounded-lg p-4 text-center"
                >
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-light-accent dark:text-dark-accent" />
                  <p className="text-sm font-medium">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-light-accent dark:text-dark-accent bg-light-accent/10 dark:bg-dark-accent/10 rounded-full">
                Who We Are
              </span>
              <h2 className="heading-lg mb-6">Pioneering Innovation in Automation & AI</h2>
            </div>

            <div className="card space-y-4 text-center">
              <p className="text-lg">
                <strong>ZeroAI Technologies Inc (ARD)</strong> is a multidisciplinary innovation
                company specializing in automation systems, robotics solutions, and AI-driven
                educational technology.
              </p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Founded by <strong>Lottie Mukuka</strong>, an international entrepreneur and AI
                specialist, we operate with a dual focus on industrial automation and educational
                innovation. With headquarters in <strong>India</strong> and global collaborations
                in <strong>Switzerland</strong>, <strong>Australia</strong>, and{' '}
                <strong>Zambia</strong>, we deliver cutting-edge solutions that transform industries
                and empower learners worldwide.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-light-border dark:border-dark-border">
                <div>
                  <div className="text-3xl font-bold text-light-accent dark:text-dark-accent">100+</div>
                  <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                    Automation Projects
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-light-accent dark:text-dark-accent">50+</div>
                  <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                    Robotics Solutions
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-light-accent dark:text-dark-accent">500+</div>
                  <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                    Students Trained
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Offerings */}
      <section className="section bg-light-surface dark:bg-dark-surface">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-lg mb-4">What We Do</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              Three integrated verticals driving innovation across industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                icon: FaIndustry,
                title: 'Industrial Automation & Robotics',
                description:
                  'End-to-end automation solutions for manufacturing environments. Smart manufacturing, AI-integrated systems, and quality control that drive efficiency and precision.',
              },
              {
                number: '02',
                icon: FaGraduationCap,
                title: 'Educational Technology & STEM',
                description:
                  'AI-driven learning labs, robotics kits, and hands-on workshops. Empowering the next generation through experiential learning in AI, IoT, and robotics.',
              },
              {
                number: '03',
                icon: FaCog,
                title: 'Research & Development',
                description:
                  'Cutting-edge research in applied AI, energy-efficient robotics, and IoT systems. Pushing boundaries in automation and intelligent systems.',
              },
            ].map((offering, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lift group"
              >
                <div className="text-6xl font-bold text-light-border dark:text-dark-border mb-4">
                  {offering.number}
                </div>
                <offering.icon className="w-12 h-12 text-light-accent dark:text-dark-accent mb-4" />
                <h3 className="heading-sm mb-3">{offering.title}</h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  {offering.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-light-accent dark:text-dark-accent font-medium group-hover:gap-3 transition-all"
                >
                  Explore Solutions
                  <HiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-lg mb-4">Why Choose ZeroAI Technologies</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              Trusted by industry leaders and educational institutions worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaLightbulb,
                title: 'Innovation-First Approach',
                description: 'Leveraging cutting-edge technology to solve complex challenges',
              },
              {
                icon: FaHandshake,
                title: 'Proven Track Record',
                description: '100+ successful projects across automation and education sectors',
              },
              {
                icon: FaCertificate,
                title: 'Industry Certified',
                description: 'IBM Partner Plus Member and STEM.org Certified Organization',
              },
              {
                icon: FaGlobe,
                title: 'Global Presence',
                description: 'Operations in 4 countries with world-class delivery standards',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="glass-card text-center"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-light-accent dark:text-dark-accent" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-light-accent to-light-accent/80 dark:from-dark-accent dark:to-dark-accent/80 text-white">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
            <FaChartLine className="w-16 h-16 mx-auto mb-6" />
            <h2 className="heading-lg mb-4">Ready to Transform Your Operations?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's discuss how ZeroAI Technologies can help you achieve your automation,
              robotics, or educational technology goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-light-accent dark:text-dark-accent rounded-lg font-semibold hover:shadow-lift transform hover:scale-105 transition-all"
              >
                Get Started Today
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-light-accent dark:hover:text-dark-accent transition-all"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
