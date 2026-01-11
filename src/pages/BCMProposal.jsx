import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiLockClosed, HiEye, HiEyeOff, HiDownload } from 'react-icons/hi'

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

  const handleDownloadPDF = () => {
    window.print()
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
      
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body { 
            background: white !important;
            color: black !important;
            font-size: 8pt !important;
            line-height: 1.3 !important;
          }
          .no-print { display: none !important; }
          .print-content {
            background: white !important;
            box-shadow: none !important;
            border: none !important;
          }
          section, .glass, .glass-dark { 
            background: white !important;
            padding: 10px !important;
            margin-bottom: 6px !important;
            page-break-inside: avoid !important;
          }
          h1 { font-size: 14pt !important; margin-bottom: 4px !important; }
          h2 { font-size: 11pt !important; margin: 6px 0 3px 0 !important; }
          h3 { font-size: 9pt !important; margin: 4px 0 2px 0 !important; }
          p, li { font-size: 7.5pt !important; margin: 1px 0 !important; }
          table { font-size: 7.5pt !important; border-collapse: collapse !important; }
          th, td { border: 1px solid #333 !important; padding: 4px !important; }
          * {
            color: black !important;
            box-shadow: none !important;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-12 select-none" style={{userSelect: 'none'}}>
        {/* FIXED: Explicit button colors for visibility */}
        <div className="fixed top-20 right-6 z-40 no-print">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <HiDownload className="w-5 h-5" />
            Download PDF
          </motion.button>
        </div>

        <div className="container-custom max-w-5xl print-content">
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
                    Strategic AR/VR + Robotics + AI Integration
                  </h1>
                  <p className="text-xl text-light-accent dark:text-dark-accent font-semibold">
                    BCM Schools Partnership Proposal
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
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Investment Options</p>
                <p className="font-semibold text-light-accent dark:text-dark-accent">₹67 L or ₹3.23 Cr</p>
              </div>
            </div>
          </motion.div>

          {/* Current State Analysis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Current State: The Gap Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="font-bold text-lg text-green-700 dark:text-green-400 mb-4">✅ BCM Schools HAS:</h3>
                <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
                  <li>• Robotics kits (underutilized)</li>
                  <li>• Motivated students</li>
                  <li>• Strong institutional reputation</li>
                  <li>• Physical infrastructure</li>
                  <li>• Existing B.Ed college</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-4">❌ BCM Schools is MISSING:</h3>
                <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
                  <li>• Trained robotics instructors</li>
                  <li>• AR/VR integration systems</li>
                  <li>• AI-powered teaching assistants</li>
                  <li>• Industry-grade curriculum</li>
                  <li>• Revenue-generating programs</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Two Options Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 text-center">Two Clear Paths Forward</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 1 */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-xl p-6">
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-lg mb-2">
                    OPTION 1
                  </span>
                  <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">₹67 Lakhs</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text">Scale:</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">Upgrade ONE BCM location with complete robotics + AI integration</p>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text">Year 1 Revenue:</p>
                    <p className="text-green-600 dark:text-green-400 font-bold">₹2.05-3.15 Crores</p>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text">Best For:</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">Single location proof-of-concept, lower capital requirement</p>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-xl p-6">
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg font-bold text-lg mb-2">
                    OPTION 2
                  </span>
                  <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">₹3.23 Crores</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text">Scale:</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">Build India's (possibly world's) most advanced AI + Robotics + AR/VR STEM hub across BCM's 3 major locations</p>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text">Year 1 Revenue:</p>
                    <p className="text-green-600 dark:text-green-400 font-bold">₹5-8 Crores</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-800/30 rounded p-2 text-xs">
                    <p className="font-bold text-purple-700 dark:text-purple-300">This is UNRIVALLED in India. Possibly in the world. A visit to this lab alone is a mega-revenue stream.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text">Best For:</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">Market dominance, unprecedented competitive advantage, maximum revenue potential</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Google Gemini AI Explanation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">Why Google Gemini AI + Human Teachers = Magic</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
              Google Gemini AI Lab Professor is INCREDIBLE, but it's NOT a replacement for human teachers. Here's why:
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Real Example:</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-3">
                Student builds a robotic arm. AI helps debug their code in real-time (instant feedback).
              </p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-3">
                Teacher observes progress and says: <strong>"Your approach works perfectly for 1 unit. But here's the challenge: how would you scale this to 100 units? What's the cost problem? What's the manufacturing constraint?"</strong>
              </p>
              <p className="text-green-600 dark:text-green-400 font-semibold">
                That's the magic. That's job readiness. That's what gets students ₹6-8 LPA jobs.
              </p>
            </div>
            <p className="text-light-textSecondary dark:text-dark-textSecondary font-semibold">
              You don't need to figure anything out. We handle everything:
            </p>
            <ul className="mt-4 space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
              <li>• AI integration and training</li>
              <li>• Teacher upskilling program</li>
              <li>• Curriculum design</li>
              <li>• Hardware setup and configuration</li>
              <li>• Ongoing technical support</li>
            </ul>
          </motion.section>

          {/* NEW: IMPLEMENTATION ROADMAP */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border-2 border-orange-500 dark:border-orange-400"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-orange-500 text-white rounded-lg font-bold">
                ROADMAP
              </span>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">Complete Implementation Strategy</h2>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold text-orange-700 dark:text-orange-400 mb-3">
                ⚠️ IMPORTANT: MoU & Intellectual Property Protection
              </p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-3">
                Before full implementation begins, we will sign a <strong>Memorandum of Understanding (MoU)</strong> that protects:
              </p>
              <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
                <li>• <strong>Proprietary Implementation Strategies</strong> - Our unique USPs and methodologies</li>
                <li>• <strong>Partner Network & Relationships</strong> - Hardware vendors, software partners, industry connections</li>
                <li>• <strong>Curriculum & AI Integration IP</strong> - Custom-built Google Gemini training modules</li>
                <li>• <strong>Marketing & Go-to-Market Strategies</strong> - Revenue channel partnerships and positioning tactics</li>
                <li>• <strong>Teacher Training Frameworks</strong> - Proprietary certification and upskilling programs</li>
              </ul>
              <p className="text-orange-700 dark:text-orange-400 font-semibold mt-4">
                📋 We will discuss this roadmap over a <strong>2-week consultation period</strong> before MoU signing.
              </p>
            </div>

            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">Phase-by-Phase Implementation Timeline</h3>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
              Below is the complete execution strategy from contract signing to ongoing maintenance. Each phase has been designed based on industry best practices for EdTech deployments.
            </p>

            <div className="space-y-6">
              {/* Phase 1: Planning & Preparation */}
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-light-text dark:text-dark-text">Phase 1: Strategic Planning & Site Preparation</h4>
                  <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold">Weeks 1-4</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  <strong>Objective:</strong> Assess infrastructure, finalize location(s), define success metrics, and establish project governance.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">1.1 Needs Assessment & Stakeholder Alignment</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Conduct site visits to all BCM locations (if Option 2)</li>
                      <li>• Assess existing robotics equipment and infrastructure readiness</li>
                      <li>• Identify key stakeholders (principal, STEM coordinators, IT department)</li>
                      <li>• Define KPIs: student enrollment targets, revenue goals, teacher certification timelines</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">1.2 Location Selection & Space Design</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• <strong>Option 1:</strong> Select single BCM location with highest student engagement potential</li>
                      <li>• <strong>Option 2:</strong> Identify flagship hub location + 2 satellite locations across BCM campuses</li>
                      <li>• Confirm electrical capacity, internet bandwidth (minimum 50 Mbps), and HVAC requirements</li>
                      <li>• Design lab layout: smart table placement, holographic display positioning, robot demo zones</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">1.3 Procurement & Partner Coordination</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Finalize hardware orders: smart tables, robotics kits, holographic displays, Unitree robots (Option 2)</li>
                      <li>• Coordinate with Google Gemini API integration partners</li>
                      <li>• Secure corporate sponsorship commitments (4-5 partners for Option 1, 8-10 for Option 2)</li>
                      <li>• Schedule teacher training instructors and certification bodies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 2: Installation & Integration */}
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border-l-4 border-green-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-light-text dark:text-dark-text">Phase 2: Hardware Installation & System Integration</h4>
                  <span className="px-3 py-1 bg-green-500 text-white rounded text-sm font-semibold">Weeks 5-10</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  <strong>Objective:</strong> Deploy all hardware, integrate AI/AR/VR systems, and conduct full system testing before teacher training begins.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">2.1 Physical Setup (Weeks 5-7)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Install smart tables with embedded sensors and haptic feedback systems</li>
                      <li>• Mount holographic displays and configure projection systems</li>
                      <li>• Set up robotics workstations with custom PCBs, sensors, and actuators</li>
                      <li>• Deploy humanoid robots and Unitree robot dogs (Option 2 only)</li>
                      <li>• Establish IoT mesh network for multi-location synchronization (Option 2)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">2.2 Software Integration (Weeks 7-9)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Deploy Google Gemini AI Lab Professor with real-time code debugging capabilities</li>
                      <li>• Integrate AR/VR middleware for robotics visualization (students see robot movements in 3D)</li>
                      <li>• Configure learning management system (LMS) for student progress tracking</li>
                      <li>• Load 50+ curriculum modules (Option 1) or 100+ modules (Option 2)</li>
                      <li>• Set up analytics dashboards for teacher performance monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">2.3 System Testing & Quality Assurance (Week 10)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Run end-to-end test scenarios: student builds robotic arm → AI debugs → AR visualization displays 3D model</li>
                      <li>• Stress-test network with 30+ simultaneous users per location</li>
                      <li>• Verify holographic display synchronization across locations (Option 2)</li>
                      <li>• Conduct cybersecurity audit and data privacy compliance check</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 3: Teacher Training */}
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-light-text dark:text-dark-text">Phase 3: Teacher Training & Certification Program</h4>
                  <span className="px-3 py-1 bg-purple-500 text-white rounded text-sm font-semibold">Weeks 11-22 (3 months)</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  <strong>Objective:</strong> Upskill 10 trainers (Option 1) or 30 trainers (Option 2) to deliver industry-grade robotics + AI + AR/VR education.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">3.1 Intensive Training Curriculum (12 weeks)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• <strong>Weeks 11-14:</strong> Robotics fundamentals (sensors, actuators, PCB design, motor control)</li>
                      <li>• <strong>Weeks 15-18:</strong> AI integration (Google Gemini prompting, real-time debugging, adaptive learning)</li>
                      <li>• <strong>Weeks 19-22:</strong> AR/VR pedagogy (holographic visualization, immersive learning design)</li>
                      <li>• Weekly hands-on labs: Teachers build projects students will complete (e.g., line-following robot, gesture-controlled arm)</li>
                      <li>• Certification exam at Week 22: Theory test + practical project demonstration</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">3.2 Pedagogical Training: AI + Human Teacher Synergy</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• How to use AI for <strong>instant feedback</strong> (e.g., code debugging) while teachers focus on <strong>critical thinking</strong></li>
                      <li>• Real-world problem framing: "Your robot works for 1 unit. How do you scale to 100? What's the cost constraint?"</li>
                      <li>• Classroom management with 30+ students using smart tables simultaneously</li>
                      <li>• Differentiated instruction: Beginner vs. Advanced student pathways</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">3.3 B.Ed College Integration (Optional Add-On)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Train B.Ed students to assist in robotics labs (150 students × ₹10-15k additional fee)</li>
                      <li>• Develop "Teaching STEM with AI" module for future educators</li>
                      <li>• Create case studies for B.Ed curriculum: "How BCM became India's robotics education leader"</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 4: Marketing & Student Recruitment */}
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-light-text dark:text-dark-text">Phase 4: Go-to-Market Strategy & Enrollment Launch</h4>
                  <span className="px-3 py-1 bg-yellow-500 text-white rounded text-sm font-semibold">Weeks 20-26</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  <strong>Objective:</strong> Build market awareness, secure student enrollments, and establish corporate partnerships before program launch.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">4.1 Digital Marketing Channels</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• <strong>Social Media:</strong> Instagram/Facebook campaigns showcasing lab setup, teacher training, student testimonials</li>
                      <li>• <strong>LinkedIn:</strong> Thought leadership posts positioning BCM as India's AI + Robotics education authority</li>
                      <li>• <strong>YouTube:</strong> Video tours of holographic displays, humanoid robots, student project demos</li>
                      <li>• <strong>Email Marketing:</strong> Target 10,000+ parents in Ludhiana/Punjab with ₹50-75k program offer</li>
                      <li>• <strong>Google Ads:</strong> "Best Robotics Training in Punjab" / "AI + Robotics for Class 9-12"</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">4.2 Partnership & Collaboration Strategies</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• <strong>Corporate Sponsorships:</strong> Approach tech companies (TCS, Infosys, local startups) for ₹5-15 L sponsorships</li>
                      <li>• <strong>School Visit Programs (Option 2):</strong> Invite 100-150 schools for ₹5-10 L lab tour packages</li>
                      <li>• <strong>Industry Partnerships:</strong> Collaborate with IEEE, Robotics clubs, Maker communities for credibility</li>
                      <li>• <strong>Government Tie-Ups:</strong> Apply for NEP 2020 STEM lab grants, position as model institution</li>
                      <li>• <strong>University Collaborations:</strong> Partner with engineering colleges for student internships at BCM labs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">4.3 Launch Event & Media Coverage</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Host grand opening event: Live humanoid robot(ZeroAI Partner Unitree Robotics) demonstration, holographic STEM visualization, student project showcase</li>
                      <li>• Invite local media: Punjab newspapers, TV channels, education magazines</li>
                      <li>• Press release: "BCM Schools Launches India's Most Advanced AI + Robotics + AR/VR STEM Hub"</li>
                      <li>• Influencer partnerships: Education YouTubers, STEM advocates tour the facility</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">4.4 Student Enrollment Strategy</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• <strong>Target:</strong> 80 students Year 1 (Option 1) or 200+ students (Option 2)</li>
                      <li>• Early bird discount: First 30 students get ₹10k off ₹50-75k program fee</li>
                      <li>• Free demo classes: "Build Your First Robot in 2 Hours" weekend workshops</li>
                      <li>• Parent info sessions: "Why AI + Robotics = ₹6-8 LPA Jobs for Your Child"</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 5: Program Launch */}
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-light-text dark:text-dark-text">Phase 5: Program Launch & Pilot Batch Execution</h4>
                  <span className="px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold">Weeks 27-40</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  <strong>Objective:</strong> Deliver first cohort of students, iterate based on feedback, and prepare for scale-up.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">5.1 Student Onboarding (Week 27)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Orientation day: Lab tour, meet instructors, receive robotics kits</li>
                      <li>• Pre-assessment: Test students' baseline coding/electronics knowledge</li>
                      <li>• Set learning pathways: Foundation (beginners) vs. Advanced (experienced students)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">5.2 Weekly Curriculum Delivery (Weeks 28-40)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• <strong>Weeks 28-32:</strong> Robotics basics (Arduino programming, sensor integration, motor control)</li>
                      <li>• <strong>Weeks 33-36:</strong> AI-powered robotics (Google Gemini code debugging, voice-controlled robots)</li>
                      <li>• <strong>Weeks 37-40:</strong> Capstone project (e.g., autonomous warehouse robot, gesture-controlled prosthetic arm)</li>
                      <li>• AI provides instant feedback, teachers guide strategic thinking</li>
                      <li>• AR/VR visualization: Students see their robot's movement path before building</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">5.3 Corporate Upskilling Batches (Parallel Track)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Launch 2-3 corporate training batches (Option 1) or 5-6 batches (Option 2)</li>
                      <li>• Target: Mid-career professionals looking to upskill in AI/Robotics</li>
                      <li>• Pricing: ₹40-75 L per batch (20-30 professionals)</li>
                      <li>• Weekend-only format: Fridays 6-9 PM, Saturdays 9 AM-5 PM</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">5.4 Continuous Feedback & Iteration</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Weekly teacher check-ins: What's working? What needs adjustment?</li>
                      <li>• Student surveys every 4 weeks: Engagement, difficulty level, project satisfaction</li>
                      <li>• Parent feedback sessions: ROI perception, career readiness confidence</li>
                      <li>• AI analytics: Which modules have highest completion rates? Where do students struggle?</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 6: Maintenance & Optimization */}
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border-l-4 border-teal-500">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-light-text dark:text-dark-text">Phase 6: Ongoing Maintenance & Continuous Improvement</h4>
                  <span className="px-3 py-1 bg-teal-500 text-white rounded text-sm font-semibold">Month 12+</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  <strong>Objective:</strong> Sustain long-term excellence, optimize systems, and scale revenue streams.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">6.1 Technical Support & System Maintenance</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• <strong>Monthly:</strong> Software updates, AI model improvements, curriculum module additions</li>
                      <li>• <strong>Quarterly:</strong> Hardware audits (replace worn sensors, recalibrate robots, upgrade holographic displays)</li>
                      <li>• <strong>Annual:</strong> Full system refresh (new robotics kits, updated AR/VR middleware)</li>
                      <li>• 24/7 helpdesk for critical issues (robot malfunction, network outage, AI system errors)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">6.2 Performance Monitoring & Data Analytics</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Track KPIs: Student completion rates, job placement success (₹6-8 LPA target), corporate client retention</li>
                      <li>• AI-powered insights: Which teaching methods yield highest student engagement?</li>
                      <li>• Revenue analytics: Which streams are most profitable? Where to double down?</li>
                      <li>• Quarterly review meetings: BCM leadership + ZeroAI team alignment</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">6.3 Teacher Continuous Professional Development</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• Annual advanced training: New robotics trends (swarm robotics, soft robotics, bio-inspired robots)</li>
                      <li>• Peer learning circles: Teachers share best practices, troubleshoot challenges together</li>
                      <li>• Industry exposure: Teachers visit robotics companies, attend conferences (e.g., IEEE Robotics)</li>
                      <li>• Certification renewals: Keep credentials up to date with latest AI/Robotics standards</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-light-text dark:text-dark-text mb-1">6.4 Scale-Up Strategies (Year 2+)</p>
                    <ul className="text-sm text-light-textSecondary dark:text-dark-textSecondary space-y-1 ml-4">
                      <li>• <strong>If Option 1:</strong> Expand to 2-3 locations (upgrade to Option 2 scale)</li>
                      <li>• <strong>If Option 2:</strong> License curriculum to 5-10 additional schools (₹20-30 L per school)</li>
                      <li>• Franchise model: "BCM-Powered STEM Labs" in other cities (Chandigarh, Delhi, Amritsar)</li>
                      <li>• International expansion: Target markets in Philippines, Ghana, Zambia (as per your profile)</li>
                      <li>• Government contracts: Become official NEP 2020 STEM lab supplier for Punjab schools</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-400 mb-3">✅ Why This Roadmap Works</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-3">
                This implementation strategy is based on proven EdTech best practices from successful school technology rollouts worldwide. It incorporates:
              </p>
              <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
                <li>• <strong>Phased Rollout:</strong> Reduces risk, allows for iteration, prevents overwhelming teachers/students</li>
                <li>• <strong>Stakeholder Engagement:</strong> Involves principals, teachers, parents from Day 1</li>
                <li>• <strong>Data-Driven Decisions:</strong> Uses KPIs and analytics to optimize continuously</li>
                <li>• <strong>Sustainable Growth:</strong> Maintenance plan ensures long-term excellence</li>
                <li>• <strong>Protected IP:</strong> MoU safeguards your investment in our unique strategies and partnerships</li>
              </ul>
              <p className="text-green-700 dark:text-green-400 font-semibold mt-4">
                📅 Let's discuss this roadmap in detail over the next 2 weeks before finalizing the MoU and implementation plan.
              </p>
            </div>
          </motion.section>

          {/* Option 1 Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold">
                OPTION 1
              </span>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">₹67 Lakhs Investment Breakdown</h2>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-light-surface dark:bg-dark-surface">
                    <th className="px-4 py-3 text-left font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Components</th>
                    <th className="px-4 py-3 text-right font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Cost (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Hardware & Robotics</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Custom PCBs, robotics kits, sensors, smart tables (3 tables), basic holographic display</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹35,00,000</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Installation & Integration</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">On-site setup, AR/VR-robotics middleware, testing, configuration</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹8,00,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Software & Curriculum</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Google Gemini integration, 50+ modules, visualization development, B.Ed module</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹15,00,000</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Teacher Training</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">3-month intensive program for 10 trainers, materials, certification</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹5,00,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Year 1 Support</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Monthly optimization, bug fixes, updates, technical support</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹4,00,000</td>
                  </tr>
                  <tr className="bg-blue-50 dark:bg-blue-900/30 font-bold">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text" colSpan="2">TOTAL</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-blue-600 dark:text-blue-400 text-right text-lg">₹67,00,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">Option 1: Revenue Projections (Year 1)</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-light-surface dark:bg-dark-surface">
                    <th className="px-4 py-3 text-left font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Revenue Stream</th>
                    <th className="px-4 py-3 text-left font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Model</th>
                    <th className="px-4 py-3 text-right font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Year 1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Student Programs (Foundation + Advanced)</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">80 students × ₹50-75k</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹47.5 L</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Corporate Upskilling</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">2-3 batches × ₹40-50 L</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹90-120 L</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Company Sponsorships</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">4-5 partners × ₹5-10 L</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹30-50 L</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Curriculum Licensing</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">1-2 schools × ₹15-25 L</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹15-25 L</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">B.Ed College Enhancement</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">150 students × ₹10k additional</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹15 L</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Camps & Workshops</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">2 programs</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹10-15 L</td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/30 font-bold">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text" colSpan="2">TOTAL Year 1 Revenue</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-green-600 dark:text-green-400 text-right text-lg">₹2.05-3.15 Cr</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary" colSpan="2">Operating Costs</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right">₹30-35 L</td>
                  </tr>
                  <tr className="bg-green-100 dark:bg-green-900/50 font-bold text-lg">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text" colSpan="2">Net Profit Year 1</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-green-600 dark:text-green-400 text-right">₹1.0-2.1 Cr (2.7x ROI)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Option 2 Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass dark:glass-dark rounded-2xl p-8 mb-8 border border-light-border dark:border-dark-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-purple-500 text-white rounded-lg font-bold">
                OPTION 2
              </span>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">₹3.23 Crores Investment Breakdown</h2>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-light-surface dark:bg-dark-surface">
                    <th className="px-4 py-3 text-left font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Components</th>
                    <th className="px-4 py-3 text-right font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Cost (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Robotics Hardware</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Humanoid robotics (BCM mascot design), Unitree Go2 + A1 robot dogs, 24 custom PCB units, advanced sensors</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹1,05,00,000</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Smart Lab Infrastructure</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">9-12 smart tables across 3 locations, embedded sensors, haptic feedback systems, IoT mesh network</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹75,00,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Holographic & Display Systems</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Multiple 65" holographic displays (synchronized across 3 locations), advanced projection</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹35,00,000</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Installation & Integration (3 Locations)</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Multi-location setup, robot-to-VR middleware, network integration, full system testing</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹40,00,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Software & Curriculum (Advanced)</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Multi-instance Gemini deployment, 100+ advanced modules, visualization for 6 subjects, B.Ed training module</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹35,00,000</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Teacher Training Program</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">3-month intensive for 10 trainers per location (30 teachers total), advanced certification</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹15,00,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Flagship Hub Development</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Marketing, partnership coordination, case study development, positioning as India's Premier STEM hub</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹10,00,000</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Year 1 Support & Optimization</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Monthly reviews across 3 locations, continuous improvement, priority technical support</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹8,00,000</td>
                  </tr>
                  <tr className="bg-purple-50 dark:bg-purple-900/30 font-bold">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text" colSpan="2">TOTAL</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-purple-600 dark:text-purple-400 text-right text-lg">₹3,23,00,000 (~₹3.23 Crores)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">Option 2: Revenue Projections (Year 1)</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-light-surface dark:bg-dark-surface">
                    <th className="px-4 py-3 text-left font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Revenue Stream</th>
                    <th className="px-4 py-3 text-left font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Model</th>
                    <th className="px-4 py-3 text-right font-semibold text-light-text dark:text-dark-text border border-light-border dark:border-dark-border">Year 1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Student Programs (3 locations)</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">200+ students × ₹50-75k</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹1.2-1.5 Cr</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Corporate Upskilling</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">5-6 batches × ₹50-75 L</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹2.5-3.75 Cr</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Company Sponsorships</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">8-10 major partners × ₹10-15 L</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹80-150 L</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">School Visits & Lab Tours (NEW)</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">100-150 schools × ₹5-10 L per visit program</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹1.5-2 Cr</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Curriculum Licensing</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">3-5 schools × ₹20-30 L</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹60-150 L</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">B.Ed College Programs</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">150 students × ₹15k additional</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹22.5 L</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">School Leasing Partnerships</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">3-5 schools × ₹10-15 L/year</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹30-75 L</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">Corporate Workshops & Training</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary">10+ corporate clients</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right font-semibold">₹50-100 L</td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/30 font-bold">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text" colSpan="2">TOTAL Year 1 Revenue</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-green-600 dark:text-green-400 text-right text-lg">₹5-8 Cr</td>
                  </tr>
                  <tr className="bg-light-surface/50 dark:bg-dark-surface/50">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary" colSpan="2">Operating Costs (3 locations)</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-right">₹75-100 L</td>
                  </tr>
                  <tr className="bg-green-100 dark:bg-green-900/50 font-bold text-lg">
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text" colSpan="2">Net Profit Year 1</td>
                    <td className="px-4 py-3 border border-light-border dark:border-dark-border text-green-600 dark:text-green-400 text-right">₹2.5-4 Cr (1.9-3.0x ROI)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-400 mb-3">The Destination Lab Effect</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-3">
                <strong>This isn't just a training facility. It's a destination.</strong>
              </p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-3">
                <strong>Example:</strong> "We sent 50 teachers to BCM's Innovation Hub for 2 days. It transformed how they teach STEM. We paid ₹7 L for the experience. Completely worth it."
              </p>
              <p className="text-purple-700 dark:text-purple-400 font-semibold">
                This is the multiplier effect. You become THE authority in India on AI + Robotics + Education.
              </p>
            </div>
          </motion.section>

          {/* Final Decision */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass dark:glass-dark rounded-2xl p-8 border-2 border-light-accent dark:border-dark-accent"
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 text-center">The Decision is Simple</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-xl p-6">
                <p className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">Option 1 (₹67 L):</p>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">Prove the model in one location. ₹67 L investment. ₹2-3 Cr Year 1 revenue.</p>
              </div>
              
              <div className="text-center font-bold text-2xl text-light-text dark:text-dark-text my-4">OR</div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-xl p-6">
                <p className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">Option 2 (₹3.23 Cr):</p>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-3">Build India's unrivalled STEM hub. ₹3.23 Cr investment. ₹5-8 Cr Year 1 revenue. Global recognition. Destination lab. Untouchable competitive advantage.</p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center mt-6">
                <p className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                  Both options are bulletproof investments.
                </p>
                <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
                  Both paths lead to profitability and market leadership.
                </p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text mt-4">
                  Let's execute. Which path do you want to take?
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}

export default BCMProposal