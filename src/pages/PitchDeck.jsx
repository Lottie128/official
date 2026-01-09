import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  FaRocket,
  FaChartLine,
  FaHandshake,
  FaGlobe,
  FaAward,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaInstagram,
  FaLinkedin,
  FaLink,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa'

const PitchDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const slides = [
    {
      id: 'hero',
      title: 'ZeroAI Technologies',
      subtitle: 'Engineering the Future of Intelligent Automation',
      content: 'Seeking $10K–$25K to complete Innovation Centre and scale enterprise operations',
      highlight: 'Verified Track Record • IBM Partner Plus • STEM.org Certified',
    },
    {
      id: 'founder',
      title: 'Meet the Founder',
      subtitle: 'Lottie Mukuka - CEO & Chief Architect',
      content:
        'International entrepreneur with verified achievements in robotics education and industrial automation',
      metrics: ['Whizrobo Mentor', 'India Book of Records', 'Multi-country Operations'],
    },
    {
      id: 'traction',
      title: 'Proven Impact',
      subtitle: 'Real Results, Verifiable Outcomes',
      metrics: [
        { label: 'Automation Projects', value: '100+', verified: true },
        { label: 'Students Trained', value: '500+', verified: true },
        { label: 'School Partnerships', value: '15+', verified: true },
        { label: 'Countries', value: '4', verified: true },
      ],
    },
    {
      id: 'market',
      title: 'Market Opportunity',
      subtitle: "Ludhiana: India's Industrial Heart",
      content:
        'SME manufacturing hub with $2B+ automation demand. No local competitors combining R&D + Education + Products.',
      stats: ['₹10L-₹50L per school contract', '₹3L-₹20L per enterprise pilot'],
    },
    {
      id: 'ask',
      title: 'The Ask',
      subtitle: '$10K–$25K Investment',
      options: [
        {
          type: 'Equity',
          terms: '8%-16% stake scaled to milestones',
          recommended: true,
        },
        {
          type: 'Loan',
          terms: '14%-20% APR, 24-36 months with revenue-share kicker',
        },
        {
          type: 'Convertible Note',
          terms: 'Converts at future valuation milestone',
        },
      ],
    },
    {
      id: 'verification',
      title: 'Verify Everything',
      subtitle: 'Click to Confirm Our Claims',
      links: [
        {
          label: 'Smart Wheel Chair Project',
          url: 'https://whizrobo.com/awards/smart-wheel-chair/',
          desc: 'Lottie Mukuka credited as mentor',
        },
        {
          label: 'Bhartiya Vidya Mandir Workshop',
          url: 'https://www.bvmdugri.com/bvmschool/news-detail/351/WORKSHOP-ON-ARTIFICIAL-INTELLIGENCE',
          desc: 'AI workshop resource person',
        },
        {
          label: 'ZeroAI Technologies Website',
          url: 'https://www.zeroaitech.tech/',
          desc: 'Company profile and services',
        },
        {
          label: 'Lottie Mukuka LinkedIn',
          url: 'https://in.linkedin.com/in/lottie-mukuka-8b984110a',
          desc: 'Professional background',
        },
        {
          label: 'Instagram - FLARE 2025',
          url: 'https://www.instagram.com/lottie_mukuka/?hl=en',
          desc: 'Recent events and projects',
        },
      ],
    },
    {
      id: 'cta',
      title: 'Next Steps',
      subtitle: "Let's Build the Future Together",
      actions: [
        'Schedule 30-min walkthrough',
        'View working prototypes in Ludhiana',
        'Access password-protected investor portal',
        'Review certificates and verification docs',
      ],
    },
  ]

  const currentSlide = slides[activeSlide]

  return (
    <>
      <Helmet>
        <title>Investor Pitch Deck | ZeroAI Technologies Inc</title>
        <meta
          name="description"
          content="ZeroAI Technologies Inc investor pitch deck. Seeking $10K-$25K for Innovation Centre and enterprise scaling."
        />
      </Helmet>

      <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-light-accent to-transparent dark:from-dark-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 20}px, ${(mousePosition.y / window.innerHeight - 0.5) * 20}px)`,
                transition: 'transform 0.3s ease',
                boxShadow: '0 0 10px currentColor',
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="glass-card mb-6 flex justify-between items-center">
            <div>
              <h1 className="heading-md mb-1 bg-gradient-to-r from-light-accent to-light-accent/70 dark:from-dark-accent dark:to-dark-accent/70 bg-clip-text text-transparent">
                ZeroAI Technologies
              </h1>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                Investor Pitch Deck • Slide {activeSlide + 1} of {slides.length}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaAward className="text-light-accent dark:text-dark-accent" />
              <span>IBM Partner Plus</span>
            </div>
          </div>

          {/* Slide Content */}
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-card min-h-[500px] max-h-[65vh] overflow-y-auto"
          >
            {currentSlide.id === 'hero' && (
              <div className="text-center">
                <FaRocket className="text-6xl text-light-accent dark:text-dark-accent mx-auto mb-6 animate-bounce" />
                <h2 className="heading-xl mb-4 bg-gradient-to-r from-light-text via-light-accent to-light-accent/70 dark:from-dark-text dark:via-dark-accent dark:to-dark-accent/70 bg-clip-text text-transparent">
                  {currentSlide.title}
                </h2>
                <p className="text-xl mb-6">{currentSlide.subtitle}</p>
                <div className="card bg-gradient-to-r from-light-accent/10 to-transparent dark:from-dark-accent/10 border-2 border-light-accent/30 dark:border-dark-accent/30 mb-6">
                  <p className="text-lg font-semibold text-light-accent dark:text-dark-accent">
                    {currentSlide.content}
                  </p>
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                  {currentSlide.highlight.split(' • ').map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold"
                    >
                      <FaCheckCircle />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentSlide.id === 'founder' && (
              <div>
                <div className="grid md:grid-cols-[150px_1fr] gap-6 items-center mb-6">
                  <div className="w-32 h-32 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-light-accent to-light-accent/60 dark:from-dark-accent dark:to-dark-accent/60 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                    LM
                  </div>
                  <div>
                    <h2 className="heading-lg text-light-accent dark:text-dark-accent mb-2">
                      {currentSlide.title}
                    </h2>
                    <p className="text-lg mb-3">{currentSlide.subtitle}</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">
                      {currentSlide.content}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {currentSlide.metrics.map((metric, i) => (
                    <div key={i} className="card text-center border border-light-accent/30 dark:border-dark-accent/30">
                      <FaCheckCircle className="text-2xl text-green-500 mx-auto mb-2" />
                      <p className="font-semibold">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentSlide.id === 'traction' && (
              <div>
                <h2 className="heading-lg text-light-accent dark:text-dark-accent mb-3">
                  {currentSlide.title}
                </h2>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
                  {currentSlide.subtitle}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentSlide.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="card text-center bg-gradient-to-br from-light-accent/10 to-transparent dark:from-dark-accent/10 border-2 border-light-accent/30 dark:border-dark-accent/30"
                    >
                      <div className="text-5xl font-black bg-gradient-to-r from-light-accent to-light-accent/70 dark:from-dark-accent dark:to-dark-accent/70 bg-clip-text text-transparent mb-2">
                        {metric.value}
                      </div>
                      <div className="font-semibold mb-2">{metric.label}</div>
                      {metric.verified && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold">
                          <FaCheckCircle />
                          Verified
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentSlide.id === 'verification' && (
              <div>
                <FaAward className="text-5xl text-light-accent dark:text-dark-accent mb-4" />
                <h2 className="heading-lg text-light-accent dark:text-dark-accent mb-3">
                  {currentSlide.title}
                </h2>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
                  {currentSlide.subtitle}
                </p>
                <div className="space-y-4">
                  {currentSlide.links.map((link, i) => (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 8, scale: 1.02 }}
                      className="block card hover:border-light-accent dark:hover:border-dark-accent transition-all group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-light-accent dark:text-dark-accent mb-1">
                            {link.label}
                          </h4>
                          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                            {link.desc}
                          </p>
                        </div>
                        <FaExternalLinkAlt className="text-2xl text-light-accent dark:text-dark-accent group-hover:scale-110 transition-transform" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {currentSlide.id === 'cta' && (
              <div className="text-center">
                <FaHandshake className="text-6xl text-light-accent dark:text-dark-accent mx-auto mb-8 animate-pulse" />
                <h2 className="heading-xl mb-4 bg-gradient-to-r from-light-accent to-light-accent/70 dark:from-dark-accent dark:to-dark-accent/70 bg-clip-text text-transparent">
                  {currentSlide.title}
                </h2>
                <p className="text-xl mb-8">{currentSlide.subtitle}</p>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {currentSlide.actions.map((action, i) => (
                    <div
                      key={i}
                      className="card bg-gradient-to-r from-light-accent/10 to-transparent dark:from-dark-accent/10 font-semibold"
                    >
                      ✓ {action}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 justify-center flex-wrap mb-8">
                  <a
                    href="mailto:info@zeroaitech.tech"
                    className="btn-primary flex items-center gap-2"
                  >
                    <FaEnvelope /> Contact Us Today
                  </a>
                  <a href="tel:+917717347050" className="btn-secondary flex items-center gap-2">
                    <FaPhone /> Schedule Call
                  </a>
                </div>
                <div className="card">
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
                    Connect with us:
                  </p>
                  <div className="flex gap-4 justify-center">
                    <a
                      href="https://www.instagram.com/lottie_mukuka/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-accent dark:text-dark-accent text-2xl hover:scale-110 transition-transform"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://in.linkedin.com/in/lottie-mukuka-8b984110a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-accent dark:text-dark-accent text-2xl hover:scale-110 transition-transform"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://www.zeroaitech.tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-accent dark:text-dark-accent text-2xl hover:scale-110 transition-transform"
                    >
                      <FaLink />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Add other slides similarly */}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 gap-4">
            <button
              onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
              disabled={activeSlide === 0}
              className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === activeSlide
                      ? 'bg-light-accent dark:bg-dark-accent shadow-lg scale-125'
                      : 'bg-light-border dark:bg-dark-border hover:bg-light-accent/50 dark:hover:bg-dark-accent/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
              disabled={activeSlide === slides.length - 1}
              className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PitchDeck
