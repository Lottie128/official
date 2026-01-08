import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  FaGlobe,
  FaRocket,
  FaAward,
  FaIndustry,
  FaGraduationCap,
  FaFlask,
  FaChartLine,
  FaCertificate,
  FaHandshake,
} from 'react-icons/fa'

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  }

  return (
    <>
      <Helmet>
        <title>About Us | ZeroAI Technologies Inc - Leading Automation & Robotics Company</title>
        <meta
          name="description"
          content="Learn about ZeroAI Technologies Inc (ARD) - A multidisciplinary innovation company founded by Lottie Mukuka. IBM Partner Plus Member, STEM.org Certified, with global operations across 4 countries."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="section pt-32 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="heading-xl mb-6">Pioneering the Future of Intelligent Automation</h1>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary mb-8">
              A multidisciplinary innovation company blending engineering precision with scalable
              technology
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 glass dark:glass-dark rounded-full text-sm font-medium">
                <FaCertificate className="text-light-accent dark:text-dark-accent" /> IBM Partner
                Plus
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 glass dark:glass-dark rounded-full text-sm font-medium">
                <FaAward className="text-light-accent dark:text-dark-accent" /> STEM.org Certified
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 glass dark:glass-dark rounded-full text-sm font-medium">
                <FaGlobe className="text-light-accent dark:text-dark-accent" /> Global Operations
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-light-accent dark:text-dark-accent bg-light-accent/10 dark:bg-dark-accent/10 rounded-full">
                Company Overview
              </span>
              <h2 className="heading-lg mb-6">Who We Are</h2>
            </div>

            <div className="card space-y-4">
              <p className="text-lg">
                <strong>ZeroAI Technologies Inc (ARD)</strong> is a multidisciplinary innovation
                company specializing in automation systems, robotics solutions, and AI-driven
                educational technology.
              </p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Founded by <strong>Lottie Mukuka</strong>, an international entrepreneur and AI
                specialist, we operate with a dual focus on industrial automation and educational
                innovation — blending engineering precision with scalable technology.
              </p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Operating from <strong>India</strong> with global collaborations in{' '}
                <strong>Switzerland</strong>, <strong>Australia</strong>, and <strong>Zambia</strong>,
                we are a growing ecosystem of engineers, educators, and innovators creating practical
                solutions that transform industries and empower learners worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-light-surface dark:bg-dark-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div {...fadeInUp} className="glass-card text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="heading-sm mb-4">Mission</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                To accelerate the adoption of intelligent automation and future-ready education,
                enabling industries and institutions to operate smarter, safer, and more sustainably.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="glass-card text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="heading-sm mb-4">Vision</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                To become a global leader in integrated automation and AI education, pioneering
                accessible technology that bridges industry and academia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Divisions */}
      <section className="section">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-lg mb-4">Business Divisions</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              Three integrated verticals driving innovation and growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                icon: FaIndustry,
                title: 'Industrial Automation & Robotics',
                description:
                  'End-to-end automation and robotics integration for manufacturing and production environments, delivering efficiency, precision, and scalability through smart manufacturing, AI-integrated solutions, and quality control systems.',
              },
              {
                number: '02',
                icon: FaGraduationCap,
                title: 'Educational Technology & STEM Innovation',
                description:
                  'AI-driven learning labs, STEM robotics kits, and hands-on workshops for AI, IoT, and robotics education across all levels. Empowering the next generation of innovators through experiential learning.',
              },
              {
                number: '03',
                icon: FaFlask,
                title: 'Research & Development',
                description:
                  'Cutting-edge research in applied AI, energy-efficient robotics, IoT systems, and futuristic mobility concepts. Pushing the boundaries of what's possible in automation and intelligent systems.',
              },
            ].map((division, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="card group hover:shadow-lift"
              >
                <div className="text-6xl font-bold text-light-border dark:text-dark-border mb-4">
                  {division.number}
                </div>
                <division.icon className="w-12 h-12 text-light-accent dark:text-dark-accent mb-4" />
                <h3 className="heading-sm mb-3">{division.title}</h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                  {division.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section bg-gradient-to-br from-light-accent/10 to-transparent dark:from-dark-accent/10">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: '100+', label: 'Automation Projects' },
              { number: '50+', label: 'Robotics Solutions' },
              { number: '500+', label: 'Students Trained' },
              { number: '4', label: 'Countries' },
            ].map((metric, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="glass-card text-center"
              >
                <div className="text-4xl font-bold text-light-accent dark:text-dark-accent mb-2">
                  {metric.number}
                </div>
                <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-light-accent dark:text-dark-accent bg-light-accent/10 dark:bg-dark-accent/10 rounded-full">
                Infrastructure
              </span>
              <h2 className="heading-lg mb-6">State-of-the-Art Facilities</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: '🏢',
                  title: 'ZeroAI Robotics & AI Lab',
                  description:
                    '10x10m smart facility equipped with IoT systems, robotic benches, and LED glass interfaces',
                },
                {
                  icon: '💻',
                  title: 'Virtual Campus',
                  description:
                    'LMS-integrated student portal at students.zeroaitech.tech with real-time learning analytics',
                },
                {
                  icon: '🛠️',
                  title: 'Technology Stack',
                  description:
                    'Flask, Node.js, React.js, TensorFlow, OpenCV, PyTorch, ROS, MQTT, ESP32, Jetson Nano',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="card flex gap-4 items-start"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="section bg-light-surface dark:bg-dark-surface">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-lg mb-4">Target Markets</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              Serving diverse sectors with tailored automation and education solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { icon: FaIndustry, label: 'Manufacturing Industries' },
              { icon: FaGraduationCap, label: 'Educational Institutions' },
              { icon: FaAward, label: 'Government Skill Programs' },
              { icon: FaFlask, label: 'Corporate R&D' },
              { icon: FaGlobe, label: 'Global STEM Educators' },
            ].map((market, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="glass-card text-center hover:shadow-lift"
              >
                <market.icon className="w-8 h-8 mx-auto mb-3 text-light-accent dark:text-dark-accent" />
                <p className="text-sm font-medium">{market.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-lg mb-4">Key Achievements & Certifications</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaHandshake,
                title: 'IBM Partner Plus Member',
                description: 'Official partnership for enterprise automation solutions',
              },
              {
                icon: FaCertificate,
                title: 'STEM.org Certified',
                description: 'Recognized organization for STEM education excellence',
              },
              {
                icon: FaRocket,
                title: 'Innovation Awards',
                description: 'Recognition for autonomous robot prototypes and industrial systems',
              },
              {
                icon: FaGlobe,
                title: 'Global Presence',
                description: 'Operations across India, Switzerland, Australia, and Zambia',
              },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="card text-center hover:shadow-lift"
              >
                <achievement.icon className="w-12 h-12 mx-auto mb-4 text-light-accent dark:text-dark-accent" />
                <h3 className="font-semibold mb-2">{achievement.title}</h3>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-light-surface dark:bg-dark-surface">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-lg mb-4">Core Values</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              { icon: '💡', title: 'Innovation', description: 'Pushing boundaries with cutting-edge technology' },
              { icon: '🤝', title: 'Integrity', description: 'Building trust through transparency and ethics' },
              { icon: '🌱', title: 'Sustainability', description: 'Creating solutions for a better tomorrow' },
              { icon: '⚡', title: 'Empowerment', description: 'Enabling success through education and tools' },
              { icon: '🏆', title: 'Excellence', description: 'Delivering exceptional quality in every project' },
            ].map((value, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="glass-card text-center"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h4 className="font-semibold mb-2">{value.title}</h4>
                <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-lg mb-4">Leadership & Team</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              Visionaries and experts driving innovation
            </p>
          </motion.div>

          {/* Founder */}
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto mb-12">
            <div className="card text-center">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full">
                Founder & CEO
              </span>
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-light-accent to-light-accent/60 dark:from-dark-accent dark:to-dark-accent/60 flex items-center justify-center text-white text-3xl font-bold">
                LM
              </div>
              <h3 className="heading-sm mb-2">Lottie Mukuka</h3>
              <p className="text-light-accent dark:text-dark-accent font-medium mb-3">
                Chief Executive Officer & Chief Architect
              </p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                International entrepreneur and AI specialist leading ZeroAI's vision for intelligent
                automation and future-ready education
              </p>
            </div>
          </motion.div>

          {/* Board Advisors */}
          <div className="mb-12">
            <h3 className="text-center text-xl font-semibold mb-6">Board Advisors</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { initials: 'AF', name: 'Andreas Fries', role: 'Engineering & Systems Design' },
                { initials: 'TF', name: 'Theresa Mukuka Fries', role: 'Education & Training Programs' },
                { initials: 'M', name: 'Mando', role: 'Strategic Guidance & Business Development' },
              ].map((advisor, index) => (
                <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.1 }} className="card text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-light-accent/20 to-light-accent/10 dark:from-dark-accent/20 dark:to-dark-accent/10 flex items-center justify-center text-light-accent dark:text-dark-accent text-xl font-bold">
                    {advisor.initials}
                  </div>
                  <h4 className="font-semibold mb-1">{advisor.name}</h4>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{advisor.role}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Executive Team */}
          <div>
            <h3 className="text-center text-xl font-semibold mb-6">Executive Team</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { initials: 'YP', name: 'Yalam Pachu', role: 'Customer Relations' },
                { initials: 'HS', name: 'Harshdeep Sandhu', role: 'Development Advisor' },
              ].map((member, index) => (
                <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.1 }} className="card text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-light-accent/20 to-light-accent/10 dark:from-dark-accent/20 dark:to-dark-accent/10 flex items-center justify-center text-light-accent dark:text-dark-accent text-xl font-bold">
                    {member.initials}
                  </div>
                  <h4 className="font-semibold mb-1">{member.name}</h4>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="section bg-gradient-to-br from-light-accent to-light-accent/80 dark:from-dark-accent dark:to-dark-accent/80 text-white">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <FaChartLine className="w-16 h-16 mx-auto mb-4" />
              <h2 className="heading-lg mb-4">Future Vision 2025-2030</h2>
            </div>
            <div className="space-y-4">
              {[
                'Launch ZeroAI Cloud Platform for scalable automation',
                'Deploy 50+ educational labs across India',
                'Expand operations to Europe and Africa',
                'Establish ZeroAI Robotics Academy',
                'Develop Autonomous Service Robot v2.0',
              ].map((goal, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 glass-strong-dark p-4 rounded-lg"
                >
                  <span className="text-2xl">→</span>
                  <span className="text-lg">{goal}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About
