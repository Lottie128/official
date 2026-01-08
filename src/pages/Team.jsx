import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const Team = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  }

  const team = [
    {
      name: 'Lottie Mukuka',
      role: 'Founder, CEO & Chief Architect',
      description: "International entrepreneur and AI specialist leading ZeroAI's vision",
      initials: 'LM',
      isFounder: true,
    },
    {
      name: 'Andreas Fries',
      role: 'Board Advisor',
      description: 'Expert in Engineering & Systems Design',
      initials: 'AF',
    },
    {
      name: 'Theresa Mukuka Fries',
      role: 'Board Advisor',
      description: 'Specialist in Education & Training programs',
      initials: 'TF',
    },
    {
      name: 'Mando',
      role: 'Chief Advisor',
      description: 'Strategic guidance and business development',
      initials: 'M',
    },
    {
      name: 'Yalam Pachu',
      role: 'Customer Relations',
      description: 'Client engagement and support',
      initials: 'YP',
    },
    {
      name: 'Harshdeep Sandhu',
      role: 'Development Advisor',
      description: 'Technical development and innovation',
      initials: 'HS',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Our Team | ZeroAI Technologies Inc</title>
        <meta
          name="description"
          content="Meet the visionaries driving innovation at ZeroAI Technologies Inc. Expert team in automation, robotics, and AI education."
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
            <h1 className="heading-xl mb-4">Leadership Team</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-light-accent to-transparent dark:from-dark-accent mx-auto mb-6"></div>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
              Meet the visionaries driving innovation at ZeroAI
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, rotateY: 2 }}
                className={`glass-card text-center ${
                  member.isFounder ? 'lg:col-span-3 max-w-md mx-auto' : ''
                }`}
              >
                <div
                  className={`${
                    member.isFounder ? 'w-32 h-32 text-4xl' : 'w-24 h-24 text-2xl'
                  } mx-auto mb-4 rounded-full bg-gradient-to-br from-light-accent to-light-accent/60 dark:from-dark-accent dark:to-dark-accent/60 flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {member.initials}
                </div>
                <h3 className={member.isFounder ? 'heading-md mb-2' : 'heading-sm mb-2'}>
                  {member.name}
                </h3>
                <h4 className="text-light-accent dark:text-dark-accent font-medium mb-3">
                  {member.role}
                </h4>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Team
