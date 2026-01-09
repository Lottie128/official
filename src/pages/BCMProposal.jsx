import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FaLock, FaUnlock, FaEye, FaEyeSlash } from 'react-icons/fa'

const BCMProposal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  useEffect(() => {
    const auth = sessionStorage.getItem('bcm_proposal_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      const disableRightClick = (e) => e.preventDefault()
      const disableKeys = (e) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.key === 's')
        ) {
          e.preventDefault()
        }
      }

      document.addEventListener('contextmenu', disableRightClick)
      document.addEventListener('keydown', disableKeys)
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'

      return () => {
        document.removeEventListener('contextmenu', disableRightClick)
        document.removeEventListener('keydown', disableKeys)
        document.body.style.userSelect = ''
        document.body.style.webkitUserSelect = ''
      }
    }
  }, [isAuthenticated])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        'https://api.zeroaitech.tech/authenticate-docs.php',
        { password, page: 'bcm_proposal' },
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (response.data.status === 'success') {
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

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResetMessage('')

    try {
      const response = await axios.post(
        'https://api.zeroaitech.tech/reset-password.php',
        { email: resetEmail, page: 'bcm_proposal' },
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (response.data.status === 'success') {
        setResetMessage('Password reset email sent! Check your inbox.')
        setTimeout(() => setShowForgotPassword(false), 3000)
      } else {
        setResetMessage('Failed to send reset email. Please contact support.')
      }
    } catch (err) {
      setResetMessage('Error sending reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Protected Document | ZeroAI Technologies Inc</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </Helmet>

        <div className="min-h-screen flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-md w-full mx-4"
          >
            {!showForgotPassword ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-light to-primary-dark mb-4">
                    <FaLock className="text-2xl text-white" />
                  </div>
                  <h2 className="heading-lg mb-2">Protected Document</h2>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Enter password to access BCM Proposal
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field w-full pr-12"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500 text-red-500 text-sm">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? 'Authenticating...' : 'Access Document'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary-light hover:text-primary-dark transition-colors w-full text-center"
                  >
                    Forgot Password?
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="heading-lg mb-2">Reset Password</h2>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Enter your email to receive password reset instructions
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="input-field w-full"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {resetMessage && (
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        resetMessage.includes('sent')
                          ? 'bg-green-500/10 border border-green-500 text-green-500'
                          : 'bg-red-500/10 border border-red-500 text-red-500'
                      }`}
                    >
                      {resetMessage}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary flex-1">
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>BCM Proposal - AR/VR + Robotics Integration | ZeroAI Technologies Inc</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen pt-32 pb-20">
        <article className="container-custom max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-light/20 to-primary-dark/20 border border-primary-light/30 mb-6">
              <FaUnlock className="text-primary-light" />
              <span className="text-sm font-semibold">Confidential Proposal</span>
            </div>
            <h1 className="heading-xl mb-6">BCM Schools AR/VR + Robotics Integration</h1>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto">
              Transform Punjab's leading AR/VR education hub into an unreplicable STEM powerhouse
            </p>
          </motion.div>

          <div className="prose-custom">
            {/* Executive Summary */}
            <section className="glass-card mb-12">
              <h2>🎯 Executive Summary: Your Competitive Position</h2>
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-green-400 mb-3">You are NOT weak at AR/VR</h3>
                <p>
                  You're actually the <strong>strongest player in Punjab's AR/VR education space</strong>. That's your
                  competitive strength. You invested heavily. Good.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-yellow-400 mb-3">The Problem</h3>
                <p>Every school in Punjab can do what you're doing with AR/VR. It's becoming commoditized.</p>
                <p className="font-bold text-lg mt-4">
                  Keep your AR/VR advantage. Add robotics and AI to make it unreplicable.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-red-500/5 border-red-500/30">
                  <h4 className="text-red-400 mb-2">AR/VR skills alone</h4>
                  <p className="text-sm">Supply &gt; Demand. Everyone can learn it. Low salary, high competition.</p>
                </div>
                <div className="card bg-green-500/5 border-green-500/30">
                  <h4 className="text-green-400 mb-2">Robotics + IoT + AI skills</h4>
                  <p className="text-sm">
                    Demand &gt;&gt; Supply. Industry desperate. ₹6-8 LPA entry. 5-year path to ₹15-20 LPA.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6 mt-6">
                <h3 className="text-blue-400 mb-3">Your Unique Position</h3>
                <p>
                  You're the <strong>ONLY school in Punjab</strong> with expensive AR/VR hardware + robotics integration
                  + employment guarantee. By the time competitors catch up (18-24 months), you'll have proven outcomes,
                  locked partnerships, and market dominance.
                </p>
              </div>
            </section>

            {/* B.Ed Strategy */}
            <section className="glass-card mb-12">
              <h2>🎓 The B.Ed College Gateway Strategy</h2>
              <p className="text-lg font-semibold text-primary-light mb-4">
                B.Ed colleges are the GATEWAY to scaling education.
              </p>
              <p>
                If you own the curriculum that trains B.Ed students, those teachers teach 1,000+ students annually across
                Punjab. <strong>You become the standard for teacher training in the state.</strong>
              </p>
            </section>

            {/* Investment Breakdown */}
            <section className="glass-card mb-12">
              <h2>💰 Investment Breakdown (ZeroAI's Investment)</h2>
              <p className="mb-6">
                This is what <strong>ZeroAI invests</strong> in building for you (not what BCM invests):
              </p>

              <div className="mb-8">
                <h3>Hardware & Installation (₹45,92,000)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Description</th>
                        <th>Cost (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Custom Robotics PCB Design</td>
                        <td>Custom circuit boards for BCM's specific lab needs. Designed by me over 2 weeks.</td>
                        <td>₹2,50,000</td>
                      </tr>
                      <tr>
                        <td>PCB Manufacturing</td>
                        <td>Batch production of 24 custom robotics units + sensors + components (China/PCBWay)</td>
                        <td>₹7,92,000</td>
                      </tr>
                      <tr>
                        <td>Smart Lab Table Design</td>
                        <td>Custom design of 3 tables with embedded sensors, LED arrays, haptic feedback</td>
                        <td>₹4,50,000</td>
                      </tr>
                      <tr>
                        <td>Lab Table Manufacturing</td>
                        <td>Build and integrate smart tables (sensors, controllers, testing)</td>
                        <td>₹13,50,000</td>
                      </tr>
                      <tr>
                        <td>Holographic Display System</td>
                        <td>65" advanced holographic projection synchronized with Meta Quest headsets</td>
                        <td>₹8,00,000</td>
                      </tr>
                      <tr>
                        <td>IoT Sensors & Mesh Network</td>
                        <td>Temperature, pressure, humidity, light, motion sensors + wireless mesh</td>
                        <td>₹3,50,000</td>
                      </tr>
                      <tr>
                        <td>Smart Lighting System</td>
                        <td>RGB LEDs with adaptive brightness for different learning modes</td>
                        <td>₹2,00,000</td>
                      </tr>
                      <tr>
                        <td>On-Site Installation</td>
                        <td>Team travels to Ludhiana, installs, configures, tests all hardware. 3 weeks on-site.</td>
                        <td>₹3,50,000</td>
                      </tr>
                      <tr className="font-bold">
                        <td colSpan="2">TOTAL HARDWARE & INSTALLATION</td>
                        <td>₹45,92,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3>Software & Curriculum (₹20,00,000)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Description</th>
                        <th>Cost (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>AR/VR-Robotics Integration</td>
                        <td>Custom middleware connecting robotics to Unity AR/VR environment</td>
                        <td>₹5,00,000</td>
                      </tr>
                      <tr>
                        <td>6-Subject Curriculum Design</td>
                        <td>Physics, Chemistry, Biology, Robotics/IoT, Engineering, CS. 50+ modules</td>
                        <td>₹3,50,000</td>
                      </tr>
                      <tr>
                        <td>AR/VR Visualization</td>
                        <td>Create AR/VR scenes (molecular structures, physics simulations, engineering models)</td>
                        <td>₹2,50,000</td>
                      </tr>
                      <tr>
                        <td>Google Gemini AI Lab Professor</td>
                        <td>Custom chatbot trained on curriculum, multi-language, robotics knowledge base</td>
                        <td>₹1,50,000</td>
                      </tr>
                      <tr>
                        <td>Teacher Training Program</td>
                        <td>3-month program. Train 10 core trainers. Hands-on curriculum workshops</td>
                        <td>₹3,50,000</td>
                      </tr>
                      <tr>
                        <td>B.Ed College Curriculum</td>
                        <td>AR/VR-STEM-Robotics module for B.Ed college (150 teachers/year)</td>
                        <td>₹1,50,000</td>
                      </tr>
                      <tr>
                        <td>Placement Portal</td>
                        <td>Job matching system, student profiles, employer dashboard</td>
                        <td>₹1,50,000</td>
                      </tr>
                      <tr>
                        <td>Marketing & Launch Strategy</td>
                        <td>Positioning, campaigns, media, case studies, testimonials</td>
                        <td>₹1,50,000</td>
                      </tr>
                      <tr className="font-bold">
                        <td colSpan="2">TOTAL SOFTWARE & CURRICULUM</td>
                        <td>₹20,00,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3>Year 1 Support (₹3,00,000)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Description</th>
                        <th>Cost (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Technical Support</td>
                        <td>Monthly reviews, troubleshooting, continuous improvement, bug fixes. On-call</td>
                        <td>₹2,00,000</td>
                      </tr>
                      <tr>
                        <td>Software Licenses</td>
                        <td>Google Gemini API, IoT cloud platform, development tools</td>
                        <td>₹1,00,000</td>
                      </tr>
                      <tr className="font-bold">
                        <td colSpan="2">TOTAL YEAR 1 SUPPORT</td>
                        <td>₹3,00,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-light/20 to-primary-dark/20 border border-primary-light/30 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Total ZeroAI Investment</h3>
                <p className="text-3xl font-bold text-primary-light">₹68,92,000 (~₹69 Lakhs)</p>
                <p className="mt-2 text-sm">This is ZeroAI's investment to build your unique advantage. NOT BCM's cost.</p>
              </div>
            </section>

            {/* BCM Investment */}
            <section className="glass-card mb-12">
              <h2>📊 BCM's Minimal Investment</h2>
              <p className="mb-6">BCM's investment is MINIMAL because you already have the expensive parts:</p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>You Already Have?</th>
                      <th>Additional Cost?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Meta Quest 3 Headsets</td>
                      <td className="text-green-400">✓ YES</td>
                      <td>₹0 (you own it)</td>
                    </tr>
                    <tr>
                      <td>Unity Game Dev Licenses</td>
                      <td className="text-green-400">✓ YES</td>
                      <td>₹0 (you own it)</td>
                    </tr>
                    <tr>
                      <td>Lab Space & Infrastructure</td>
                      <td className="text-green-400">✓ YES</td>
                      <td>₹0 (you own it)</td>
                    </tr>
                    <tr>
                      <td>Staff Costs</td>
                      <td className="text-yellow-400">Partial</td>
                      <td>₹5-10 L/year (existing + 1-2 new tech support)</td>
                    </tr>
                    <tr>
                      <td>Electricity/Infrastructure</td>
                      <td className="text-yellow-400">Partial</td>
                      <td>₹2-3 L/year (higher power draw)</td>
                    </tr>
                    <tr>
                      <td>Maintenance & Components</td>
                      <td className="text-red-400">No</td>
                      <td>₹1.5-2 L/year (sensor replacements, repairs)</td>
                    </tr>
                    <tr className="font-bold">
                      <td colSpan="2">BCM's Total Annual Operational Cost</td>
                      <td>₹8.5-15 L/year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-green-400 mb-3">Payment Structure</h3>
                <p className="mb-4">
                  <strong>Why this timing?</strong> You start generating revenue in Month 7 (first student batches). By
                  Month 11, you've recovered the entire investment through student fees + corporate partnerships. Year 1
                  support fees are paid from profit, not capital.
                </p>
              </div>
            </section>

            {/* Revenue Projections */}
            <section className="glass-card mb-12">
              <h2>💹 Revenue Projections & ROI</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Timeline</th>
                      <th>Revenue Source</th>
                      <th>Estimated Revenue</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Phase 1-3 (Jan-Jun)</td>
                      <td>—</td>
                      <td>₹0 (Setup & training)</td>
                      <td>Investment phase</td>
                    </tr>
                    <tr>
                      <td>Month 7 (Jul)</td>
                      <td>First student batch enrollment</td>
                      <td>₹15-20 L</td>
                      <td className="text-green-400">✓ First revenue</td>
                    </tr>
                    <tr>
                      <td>Month 8-9</td>
                      <td>Corporate upskilling inquiry</td>
                      <td>₹20-40 L</td>
                      <td className="text-yellow-400">In negotiation</td>
                    </tr>
                    <tr>
                      <td>Month 11</td>
                      <td>Cumulative: Student fees + corporate</td>
                      <td>₹60-70 L</td>
                      <td className="text-green-400">✓ BREAK-EVEN</td>
                    </tr>
                    <tr className="font-bold">
                      <td>Year 1 Total</td>
                      <td>All revenue streams</td>
                      <td>₹2.05-3.15 Cr</td>
                      <td className="text-green-400">✓ Profitable</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-green-400 mb-3">Year 1 Financial Summary</h3>
                <ul className="space-y-2">
                  <li>Total Revenue: <strong>₹2.05-3.15 Crores</strong></li>
                  <li>Operating Costs: <strong>₹30-35 L</strong></li>
                  <li className="text-xl font-bold text-green-400">
                    Net Profit Year 1: ₹1.0-2.1 Crores = 2.7x ROI
                  </li>
                </ul>
              </div>
            </section>

            {/* Curriculum Integration */}
            <section className="glass-card mb-12">
              <h2>📚 6-Subject Curriculum Integration</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card bg-blue-500/5 border-blue-500/30">
                  <h3>Physics</h3>
                  <p className="text-sm">
                    Forces, motion, circuits, optics, waves, energy—visualized in AR/VR while robotics demonstrates
                    real-world applications.
                  </p>
                </div>
                <div className="card bg-green-500/5 border-green-500/30">
                  <h3>Chemistry</h3>
                  <p className="text-sm">
                    Molecular structures in AR, chemical reactions in real-time, atomic behavior simulation connected to
                    lab experiments.
                  </p>
                </div>
                <div className="card bg-purple-500/5 border-purple-500/30">
                  <h3>Biology</h3>
                  <p className="text-sm">
                    Human body systems, cellular processes, genetic visualization, ecosystem modeling using AR/VR
                    immersion.
                  </p>
                </div>
                <div className="card bg-orange-500/5 border-orange-500/30">
                  <h3>Robotics/IoT</h3>
                  <p className="text-sm font-bold">
                    THE CORE: Build robots physically while controlling in AR. CAD, 3D printing, PCB design, IoT projects,
                    autonomous systems.
                  </p>
                </div>
                <div className="card bg-red-500/5 border-red-500/30">
                  <h3>Engineering</h3>
                  <p className="text-sm">
                    Structural analysis, machine design, circuit design, mechanical advantage using custom robotics
                    hardware.
                  </p>
                </div>
                <div className="card bg-cyan-500/5 border-cyan-500/30">
                  <h3>Computer Science</h3>
                  <p className="text-sm">
                    Algorithm visualization, coding challenges, game development with Unity licenses, AI concepts with
                    real robotics feedback.
                  </p>
                </div>
              </div>
            </section>

            {/* Competitive Moat */}
            <section className="glass-card mb-12">
              <h2>🏰 Your Unreplicable Competitive Moat</h2>
              <div className="space-y-4">
                <div className="card bg-gradient-to-r from-primary-light/10 to-primary-dark/10 border-primary-light/30">
                  <h3 className="text-primary-light">1. First-Mover Advantage</h3>
                  <p>
                    No other school in Punjab has AR/VR + robotics + employment guarantee. By the time competitors attempt
                    replication (18-24 months), you'll have proven outcomes, locked partnerships, and market dominance.
                  </p>
                </div>
                <div className="card bg-gradient-to-r from-primary-light/10 to-primary-dark/10 border-primary-light/30">
                  <h3 className="text-primary-light">2. Custom Hardware Barrier</h3>
                  <p>
                    Custom robotics PCBs designed by me, manufactured in China. Competitors can't instantly replicate—they'd
                    need 6-12 months and ₹50+ L investment to design their own.
                  </p>
                </div>
                <div className="card bg-gradient-to-r from-primary-light/10 to-primary-dark/10 border-primary-light/30">
                  <h3 className="text-primary-light">3. B.Ed College Curriculum Control</h3>
                  <p>
                    You train 150 B.Ed students annually. If these teachers teach robotics in 20+ schools across Punjab, you
                    own the curriculum standard for the entire state.
                  </p>
                </div>
                <div className="card bg-gradient-to-r from-primary-light/10 to-primary-dark/10 border-primary-light/30">
                  <h3 className="text-primary-light">4. Proven Employment Outcomes</h3>
                  <p>
                    75%+ placement rate at ₹6-8 LPA. This is verifiable and valuable to parents. AR/VR alone can't promise
                    this—robotics + industry partnerships make it real.
                  </p>
                </div>
              </div>
            </section>

            {/* Terms */}
            <section className="glass-card mb-12">
              <h2>🤝 Partnership Terms</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-blue-500/5 border-blue-500/30">
                  <h3 className="text-blue-400 mb-3">ZeroAI Invests ₹69 Lakhs to:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Design and manufacture custom robotics hardware</li>
                    <li>✓ Build smart lab infrastructure</li>
                    <li>✓ Develop AR/VR-robotics integration software</li>
                    <li>✓ Create 6-subject curriculum</li>
                    <li>✓ Train 10 core trainers personally</li>
                    <li>✓ Provide Year 1 technical support</li>
                  </ul>
                </div>
                <div className="card bg-green-500/5 border-green-500/30">
                  <h3 className="text-green-400 mb-3">BCM Receives:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Unreplicable competitive advantage</li>
                    <li>✓ ₹2-3 Cr Year 1 revenue potential</li>
                    <li>✓ Market leadership in Punjab</li>
                    <li>✓ B.Ed curriculum control</li>
                    <li>✓ Employment guarantee program</li>
                    <li>✓ State-wide teacher training authority</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Urgency */}
            <section className="glass-card mb-12">
              <h2>⚡ Timeline & Urgency</h2>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
                <p className="text-lg font-semibold mb-4">
                  If we sign by end of February, hardware manufacturing completes by April, installation finishes by May,
                  and you launch student programs in July.
                </p>
                <p className="text-2xl font-bold text-yellow-400">That's 6 months from today to full revenue generation.</p>
              </div>
              <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-lg p-6">
                <p className="text-lg font-semibold text-red-400">
                  Delay 3 months? You lose ₹50+ L in Year 1 revenue and miss the first-mover advantage window.
                </p>
              </div>
            </section>

            {/* Decision */}
            <section className="glass-card">
              <h2>✨ The Decision</h2>
              <div className="space-y-6">
                <div className="card bg-red-500/5 border-red-500/30">
                  <h3 className="text-red-400">Option 1: Continue with AR/VR alone</h3>
                  <p>Beautiful lab, zero revenue, zero employment outcomes, no competitive advantage</p>
                </div>
                <div className="text-center text-3xl font-bold py-4">OR</div>
                <div className="card bg-green-500/5 border-green-500/30">
                  <h3 className="text-green-400">Option 2: Add robotics + AI + employment guarantee</h3>
                  <p>
                    ₹2-3 Cr Year 1 revenue, market leadership in Punjab, unreplicable competitive moat
                  </p>
                </div>
              </div>

              <div className="mt-8 p-8 bg-gradient-to-r from-primary-light/20 to-primary-dark/20 border border-primary-light/30 rounded-lg text-center">
                <p className="text-xl font-semibold mb-4">Your infrastructure is ready.</p>
                <p className="text-xl font-semibold mb-4">Your teachers are ready.</p>
                <p className="text-xl font-semibold mb-4">The market is ready.</p>
                <p className="text-2xl font-bold text-primary-light mt-6">
                  All that's needed is decision, agreement, and execution.
                </p>
                <p className="text-lg mt-6">Let's build this together. Line by line. Discussion by discussion. And execute.</p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}

export default BCMProposal
