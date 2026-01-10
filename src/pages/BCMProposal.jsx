import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi'

const BCMProposal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('bcm_proposal_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    const disableContextMenu = (e) => e.preventDefault()
    const disableKeyShortcuts = (e) => {
      if (
        (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'p')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
      ) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', disableContextMenu)
    document.addEventListener('keydown', disableKeyShortcuts)

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu)
      document.removeEventListener('keydown', disableKeyShortcuts)
    }
  }, [isAuthenticated])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('https://api.zeroaitech.tech/authenticate-docs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, page: 'bcm_proposal' })
      })

      const data = await response.json()

      if (data.status === 'success') {
        sessionStorage.setItem('bcm_proposal_auth', 'true')
        setIsAuthenticated(true)
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Protected Document - ZeroAI Technologies</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="glass dark:glass-dark rounded-2xl shadow-2xl p-8 border border-light-border dark:border-dark-border">
              <div className="text-center mb-8">
                {/* Logo */}
                <img 
                  src="/logo.png" 
                  alt="ZeroAI Technologies" 
                  className="w-24 h-auto mx-auto mb-6 dark:invert transition-all"
                />
                
                <div className="inline-flex items-center justify-center w-16 h-16 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full mb-4">
                  <HiLockClosed className="w-8 h-8 text-light-accent dark:text-dark-accent" />
                </div>
                <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                  Protected Document
                </h1>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  Enter password to access this confidential document
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text placeholder:text-light-textSecondary/60 dark:placeholder:text-dark-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
                  >
                    {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                  </button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-light-accent dark:bg-dark-accent hover:bg-light-accent/90 dark:hover:bg-dark-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Authenticating...' : 'Access Document'}
                </button>
              </form>

              <p className="mt-6 text-xs text-center text-light-textSecondary dark:text-dark-textSecondary">
                This document is password-protected and confidential
              </p>
            </div>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>BCM Proposal - Confidential - ZeroAI Technologies</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/logo.png" type="image/png" />
      </Helmet>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-12 select-none" style={{userSelect: 'none'}}>
        <div className="container-custom max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <img 
                  src="/logo.png" 
                  alt="ZeroAI Technologies" 
                  className="w-16 h-auto dark:invert transition-all flex-shrink-0"
                />
                <div>
                  <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-2">
                    Strategic AR/VR + Robotics Integration Proposal
                  </h1>
                  <p className="text-xl text-light-accent dark:text-dark-accent font-semibold">
                    BCM Schools Partnership
                  </p>
                </div>
              </div>
              <span className="px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold flex-shrink-0">
                CONFIDENTIAL
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-light-border dark:border-dark-border">
              <div>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Prepared By</p>
                <p className="font-semibold text-light-text dark:text-dark-text">ZeroAI Technologies Inc</p>
              </div>
              <div>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Date</p>
                <p className="font-semibold text-light-text dark:text-dark-text">January 2026</p>
              </div>
              <div>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Project Value</p>
                <p className="font-semibold text-light-accent dark:text-dark-accent">₹69 Lakhs</p>
              </div>
            </div>
          </motion.div>

          {/* Executive Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">Executive Summary</h2>
            <div className="space-y-4 text-light-textSecondary dark:text-dark-textSecondary">
              <p>
                ZeroAI Technologies proposes a comprehensive AR/VR + Robotics integration across BCM Schools' Science, Math, Computer Science, Art, History, and Geography curricula. This partnership will position BCM as India's first fully immersive STEM-enabled school network.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-light-border dark:border-dark-border">
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">Total Investment</p>
                  <p className="text-2xl font-bold text-light-text dark:text-dark-text">₹69,00,000</p>
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">Hardware + Training + Support</p>
                </div>
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-light-border dark:border-dark-border">
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">Year 1 Revenue Potential</p>
                  <p className="text-2xl font-bold text-light-accent dark:text-dark-accent">₹2-3 Crores</p>
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">Premium fees + Enrollment growth</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Investment Breakdown */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Investment Breakdown</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text">AR/VR Headsets & Equipment</p>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">15 Meta Quest 3 units + accessories</p>
                </div>
                <p className="text-xl font-bold text-light-text dark:text-dark-text">₹45,00,000</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text">Robotics Kits & Components</p>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">30+ kits for 6 subjects</p>
                </div>
                <p className="text-xl font-bold text-light-text dark:text-dark-text">₹15,00,000</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text">Teacher Training Program</p>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">3-month intensive certification</p>
                </div>
                <p className="text-xl font-bold text-light-text dark:text-dark-text">₹3,50,000</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text">12-Month Support & Maintenance</p>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Unlimited tech support + curriculum updates</p>
                </div>
                <p className="text-xl font-bold text-light-text dark:text-dark-text">₹5,50,000</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg border-2 border-light-accent dark:border-dark-accent">
                <p className="font-bold text-lg text-light-text dark:text-dark-text">Total Investment from ZeroAI</p>
                <p className="text-2xl font-bold text-light-accent dark:text-dark-accent">₹69,00,000</p>
              </div>
            </div>
          </motion.section>

          {/* Curriculum Integration */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">6-Subject Integration Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { subject: 'Science', activities: 'VR lab simulations, Robotics experiments, 3D molecular modeling' },
                { subject: 'Mathematics', activities: 'AR geometry visualization, Coding-based problem solving' },
                { subject: 'Computer Science', activities: 'AI/ML projects, Robotics programming, IoT integration' },
                { subject: 'Art', activities: 'VR sculpting, Digital design, Interactive installations' },
                { subject: 'History', activities: 'VR historical site tours, AR artifact reconstruction' },
                { subject: 'Geography', activities: 'VR globe exploration, AR terrain modeling' }
              ].map((item, index) => (
                <div key={index} className="p-5 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                  <h3 className="font-bold text-lg text-light-accent dark:text-dark-accent mb-2">{item.subject}</h3>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{item.activities}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Revenue Model */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Revenue Projections (Year 1)</h2>
            <div className="space-y-6">
              <div className="p-5 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <h3 className="font-semibold text-light-text dark:text-dark-text mb-3">Premium Fee Structure</h3>
                <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
                  <li className="flex justify-between">
                    <span>Additional ₹15,000/student annual tech fee</span>
                    <span className="font-semibold text-light-text dark:text-dark-text">₹1.5 Cr</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Enrollment growth (20% increase)</span>
                    <span className="font-semibold text-light-text dark:text-dark-text">₹50 L</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Weekend workshops & camps</span>
                    <span className="font-semibold text-light-text dark:text-dark-text">₹30 L</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-2">Estimated Total Year 1 Revenue</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹2.3 - 3 Crores</p>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-2">ROI: 300-400% in first year</p>
              </div>
            </div>
          </motion.section>

          {/* Competitive Moat */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Competitive Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-5 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div className="text-4xl font-bold text-light-accent dark:text-dark-accent mb-2">First</div>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">In India with full 6-subject integration</p>
              </div>
              <div className="text-center p-5 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div className="text-4xl font-bold text-light-accent dark:text-dark-accent mb-2">3-5 Years</div>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Lead time before competitors catch up</p>
              </div>
              <div className="text-center p-5 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div className="text-4xl font-bold text-light-accent dark:text-dark-accent mb-2">Premium</div>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Brand positioning as innovation leader</p>
              </div>
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Implementation Timeline</h2>
            <div className="space-y-4">
              {[
                { phase: 'Month 1-2', activity: 'Hardware procurement & lab setup', status: 'Setup' },
                { phase: 'Month 2-3', activity: '10-teacher intensive training program', status: 'Training' },
                { phase: 'Month 3-4', activity: 'Pilot program with select classes', status: 'Testing' },
                { phase: 'Month 4-6', activity: 'Full rollout across all 6 subjects', status: 'Launch' },
                { phase: 'Month 6-12', activity: 'Continuous support & curriculum refinement', status: 'Support' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-light-accent dark:text-dark-accent">{item.phase}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-light-text dark:text-dark-text">{item.activity}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-xs font-medium">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Urgency */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass dark:glass-dark rounded-2xl p-8 border border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10"
          >
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Time-Sensitive Opportunity</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
              The education technology landscape is rapidly evolving. Other premium schools are exploring similar integrations. First-mover advantage is critical for:
            </p>
            <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary list-disc list-inside">
              <li>Capturing market share before competitors</li>
              <li>Building brand reputation as innovation pioneer</li>
              <li>Attracting top-tier faculty and students</li>
              <li>Securing exclusive regional partnerships</li>
            </ul>
            <div className="mt-6 p-4 bg-white dark:bg-dark-surface rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">Recommended Action:</p>
              <p className="text-light-text dark:text-dark-text mt-1">Sign MoU within 2 weeks to lock in Q1 2026 implementation timeline</p>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}

export default BCMProposal
