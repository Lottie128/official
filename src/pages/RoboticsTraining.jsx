import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FaLock, FaUnlock, FaEye, FaEyeSlash, FaDownload } from 'react-icons/fa'

const RoboticsTraining = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  useEffect(() => {
    const auth = sessionStorage.getItem('robotics_training_auth')
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
        { password, page: 'robotics_training' },
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (response.data.status === 'success') {
        sessionStorage.setItem('robotics_training_auth', 'true')
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
        { email: resetEmail, page: 'robotics_training' },
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

  const handleDownloadPDF = () => {
    window.print()
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
                  <img 
                    src="/logo.png" 
                    alt="ZeroAI Technologies" 
                    className="w-24 h-auto mx-auto mb-6 dark:invert transition-all"
                  />
                  
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-light to-primary-dark mb-4">
                    <FaLock className="text-2xl text-white" />
                  </div>
                  <h2 className="heading-lg mb-2">Protected Document</h2>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Enter password to access Robotics Training Program
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
                  <img 
                    src="/logo.png" 
                    alt="ZeroAI Technologies" 
                    className="w-20 h-auto mx-auto mb-6 dark:invert transition-all"
                  />
                  
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
        <title>Robotics Kit Training Program | ZeroAI Technologies Inc</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
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
          section, .glass-card, .card { 
            background: white !important;
            padding: 10px !important;
            margin-bottom: 6px !important;
            page-break-inside: avoid !important;
          }
          h1 { font-size: 16pt !important; margin-bottom: 4px !important; }
          h2 { font-size: 12pt !important; margin: 6px 0 3px 0 !important; }
          h3 { font-size: 10pt !important; margin: 4px 0 2px 0 !important; }
          h4 { font-size: 9pt !important; margin: 3px 0 1px 0 !important; }
          p, li { font-size: 7.5pt !important; margin: 1px 0 !important; }
          table { font-size: 7.5pt !important; border-collapse: collapse !important; }
          th, td { border: 1px solid #333 !important; padding: 4px !important; }
          * {
            color: black !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen pt-32 pb-20">
        {/* FIXED: Explicit button colors for visibility in both themes */}
        <div className="fixed top-20 right-6 z-40 no-print">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <FaDownload className="w-5 h-5" />
            Download PDF
          </motion.button>
        </div>

        <article className="container-custom max-w-5xl print-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <img 
              src="/logo.png" 
              alt="ZeroAI Technologies" 
              className="w-24 h-auto mx-auto mb-6 dark:invert transition-all"
            />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-light/20 to-primary-dark/20 border border-primary-light/30 mb-6">
              <FaUnlock className="text-primary-light" />
              <span className="text-sm font-semibold">Confidential Training Program</span>
            </div>
            <h1 className="heading-xl mb-6">Robotics Kit Training Program for BCM Schools</h1>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto">
              3-Month Intensive + 12-Month Support: Transform 10 Teachers into Certified Robotics Instructors
            </p>
          </motion.div>

          <div className="prose-custom">
            <section className="glass-card mb-12">
              <h2>🎯 The Problem</h2>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
                <p className="text-lg mb-4">
                  BCM Schools purchased robotics kits originally designed by ZeroAI Technologies Inc. These kits contain
                  custom hardware and non-traditional programming approaches that are currently <strong>underutilized</strong> because
                  your teaching staff needs hands-on professional training to:
                </p>
                <ul>
                  <li>Understand every component</li>
                  <li>Program the systems effectively</li>
                  <li>Design powerful curriculum around them</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6 mt-6">
                <h3 className="text-blue-400 mb-3">Clear Focus</h3>
                <p>
                  <strong>This program focuses exclusively on mastering the robotics kits themselves—NOT AR/VR training.</strong>
                  {' '}The robotics expertise you build here becomes the foundation for the later AR/VR-Robotics integration
                  solution.
                </p>
              </div>
            </section>

            <section className="glass-card mb-12">
              <h2>🏆 Trainer Credentials</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-blue-500/5 border-blue-500/30">
                  <h3 className="text-blue-400 mb-3">IBM Partner Plus</h3>
                  <p>
                    Recognized by IBM as an advanced technology partner. This certification carries significant weight in the
                    industry and adds credibility to your students' training credentials.
                  </p>
                </div>
                <div className="card bg-green-500/5 border-green-500/30">
                  <h3 className="text-green-400 mb-3">STEM.org Accredited</h3>
                  <p>
                    Officially accredited by STEM.org, the premier global STEM education authority. This is the same
                    certification obtained for previous companies selling these kits.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 mt-6">
                <h3 className="text-purple-400 mb-3">Private Contractor Structure</h3>
                <p>
                  The trainer works directly with BCM as a private contractor (not as a company employee). This structure
                  provides flexibility, focused expertise, and direct accountability.
                </p>
              </div>
            </section>

            <section className="glass-card mb-12">
              <h2>📚 Program Overview: 3 Phases Over 3 Months</h2>
              <p className="text-lg mb-6">Progressive, hands-on learning that takes your staff from beginner to expert.</p>

              <div className="card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 mb-8">
                <h3 className="text-blue-400 mb-4">Phase 1: Hardware Mastery (Month 1)</h3>
                <p className="font-semibold mb-4">
                  Focus: Deep understanding of every component and system in your robotics kits
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-2">Week 1-2: Complete Kit Inventory & Architecture</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Unbox and catalog every single component</li>
                      <li>• Learn microcontroller architecture (Arduino/ESP32)</li>
                      <li>• Understand sensor types and specifications</li>
                      <li>• Study motor types and power systems</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-2">Week 3-4: Programming & Microcontroller Control</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Arduino IDE setup and configuration</li>
                      <li>• Basic programming: variables, loops, functions</li>
                      <li>• Sensor reading and data interpretation</li>
                      <li>• Motor control and PWM signals</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-2">Week 5-8: Troubleshooting & Advanced Diagnostics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Circuit debugging with multimeters</li>
                      <li>• Common failure modes and fixes</li>
                      <li>• Component replacement procedures</li>
                      <li>• Serial monitor debugging techniques</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold text-green-400">
                    ✓ Outcome: Trainers understand every component and can troubleshoot hardware problems independently
                  </p>
                </div>
              </div>

              <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 mb-8">
                <h3 className="text-purple-400 mb-4">Phase 2: Project Implementation (Month 2)</h3>
                <p className="font-semibold mb-4">Focus: Build real, working robotics projects from scratch</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-pink-400 mb-2">Week 1-2: Standard Robotics Projects</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Line-following robot</li>
                      <li>• Obstacle-avoiding robot</li>
                      <li>• Light-seeking robot</li>
                      <li>• Temperature monitoring system</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pink-400 mb-2">Week 3-4: Multi-System Integration & Advanced Control</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Combine multiple sensors</li>
                      <li>• Implement PID control</li>
                      <li>• Wireless communication (Bluetooth/Wi-Fi)</li>
                      <li>• Mobile app integration</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pink-400 mb-2">Week 5-8: Complex Project Development</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Smart home automation</li>
                      <li>• Autonomous navigation</li>
                      <li>• Robotic arm control</li>
                      <li>• Custom project design</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold text-green-400">
                    ✓ Outcome: Trainers can design and build complex robotics projects independently and teach them to students
                  </p>
                </div>
              </div>

              <div className="card bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
                <h3 className="text-orange-400 mb-4">Phase 3: Teaching Certification (Month 3)</h3>
                <p className="font-semibold mb-4">
                  Focus: Become certified robotics instructors ready to teach 100+ students annually
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">Week 1-2: Curriculum Framework & Learning Design</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Design age-appropriate lessons</li>
                      <li>• Create assessment rubrics</li>
                      <li>• Develop project-based learning modules</li>
                      <li>• Build student workbooks</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">Week 3-4: Teaching Practice & Classroom Management</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Conduct mock classes</li>
                      <li>• Handle student questions effectively</li>
                      <li>• Manage lab equipment</li>
                      <li>• Safety protocols</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">Week 5-8: Certification Assessment & Professional Credentials</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Written knowledge exam</li>
                      <li>• Practical project demonstration</li>
                      <li>• Teaching demonstration</li>
                      <li>• Receive official certification</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold text-green-400">
                    ✓ Outcome: Officially certified instructors ready to teach robotics effectively and confidently
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-card mb-12">
              <h2>⏰ Time Commitment & Structure</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Time Commitment</th>
                      <th>Format & Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>In-Person Workshops</td>
                      <td>4 full days/month (32 hours)</td>
                      <td>Hands-on at BCM lab with actual robotics kits and trainer present</td>
                    </tr>
                    <tr>
                      <td>Video Learning Materials</td>
                      <td>8-10 hours/month</td>
                      <td>60+ recorded tutorials, component guides, programming demos</td>
                    </tr>
                    <tr>
                      <td>Project Work & Building</td>
                      <td>5-7 hours/month</td>
                      <td>Hands-on project development, testing, debugging, documentation</td>
                    </tr>
                    <tr>
                      <td>Assessments & Exams</td>
                      <td>3-4 hours/month</td>
                      <td>Knowledge quizzes, practical exams, project reviews, peer feedback</td>
                    </tr>
                    <tr className="font-bold">
                      <td>TOTAL Per Month</td>
                      <td>50-55 hours</td>
                      <td>~1.5 hours/day equivalent effort</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-blue-500/5 border-blue-500/30">
                  <h3 className="text-blue-400 mb-3">Year 1: Intensive Training</h3>
                  <p className="text-sm">3-month core program with 4 full days/month on-site training at BCM lab</p>
                </div>
                <div className="card bg-green-500/5 border-green-500/30">
                  <h3 className="text-green-400 mb-3">Year 2: Ongoing Support</h3>
                  <p className="text-sm">
                    Monthly weekend workshops throughout Year 2. Email support and community access for continuous improvement
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-card mb-12">
              <h2>💰 Investment Breakdown</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Details</th>
                      <th>Cost (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12 Full-Day Intensive Workshops</td>
                      <td>4 days/month × 3 months with trainer present at BCM lab</td>
                      <td>₹1,50,000</td>
                    </tr>
                    <tr>
                      <td>Expert Trainer Time & Instruction</td>
                      <td>Hands-on training, project guidance, assessment, certification</td>
                      <td>₹1,00,000</td>
                    </tr>
                    <tr>
                      <td>Complete Digital Materials</td>
                      <td>60+ videos, guides, curricula, templates, code examples</td>
                      <td>₹50,000</td>
                    </tr>
                    <tr>
                      <td>Lab Equipment & Supplies</td>
                      <td>Test components, sensors, repair tools for training activities</td>
                      <td>₹30,000</td>
                    </tr>
                    <tr>
                      <td>Assessment & Certification</td>
                      <td>Knowledge exams, practical assessments, official certification documents</td>
                      <td>₹20,000</td>
                    </tr>
                    <tr>
                      <td>Software & Development Tools</td>
                      <td>IDE licenses, simulation software, development tools, repositories</td>
                      <td>₹30,000</td>
                    </tr>
                    <tr>
                      <td>Year-Long Support & Coaching</td>
                      <td>12 monthly weekend workshops + email support + community access</td>
                      <td>₹80,000</td>
                    </tr>
                    <tr className="font-bold text-lg">
                      <td>TOTAL INVESTMENT (5+ Trainers)</td>
                      <td>Complete 3-Month Program + 12-Month Support</td>
                      <td>₹3,50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="glass-card mb-12">
              <h2>📊 Success Metrics & Accountability</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Target</th>
                      <th>How It's Measured</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Training Attendance</td>
                      <td>95%+ attendance in all workshops</td>
                      <td>Attendance sign-in logs</td>
                    </tr>
                    <tr>
                      <td>Knowledge Assessment</td>
                      <td>80%+ average score on written exams</td>
                      <td>Exam results and grading</td>
                    </tr>
                    <tr>
                      <td>Practical Competency</td>
                      <td>100% completion of hands-on assessments</td>
                      <td>Observed and evaluated by trainer</td>
                    </tr>
                    <tr>
                      <td>Project Completion</td>
                      <td>10+ projects built per trainer</td>
                      <td>Project documentation and working systems</td>
                    </tr>
                    <tr>
                      <td>Teaching Readiness</td>
                      <td>9/10+ confidence rating</td>
                      <td>Self-assessment and trainer evaluation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="glass-card mb-12">
              <h2>💹 Return on Investment</h2>
              <div className="space-y-6">
                <div className="card bg-green-500/5 border-green-500/30">
                  <h3 className="text-green-400 mb-3">Direct Financial Benefits</h3>
                  <ul className="space-y-2">
                    <li>
                      <strong>Cost Avoidance:</strong> ₹1.5-2 L saved by not hiring external robotics consultants
                    </li>
                    <li>
                      <strong>Student Programs:</strong> 50+ students × ₹30-50k = ₹25-30 L revenue
                    </li>
                    <li>
                      <strong>Annual Scale:</strong> 150-200 students × ₹40k avg = ₹60-80 L/year
                    </li>
                  </ul>
                </div>

                <div className="card bg-blue-500/5 border-blue-500/30">
                  <h3 className="text-blue-400 mb-3">Strategic Benefits</h3>
                  <ul className="space-y-2">
                    <li><strong>Knowledge Ownership:</strong> Internal expertise, no vendor lock-in</li>
                    <li><strong>Curriculum Control:</strong> Design custom programs aligned with BCM's vision</li>
                    <li><strong>Brand Enhancement:</strong> Certified trainers boost institutional credibility</li>
                    <li><strong>AR/VR Foundation:</strong> Expert staff enables smooth adoption of advanced integration features</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="glass-card">
              <h2>✨ Next Steps</h2>
              <div className="bg-gradient-to-r from-primary-light/20 to-primary-dark/20 border border-primary-light/30 rounded-lg p-8 text-center">
                <p className="text-xl font-semibold mb-4">
                  Your robotics kits are powerful. Your trained teachers multiply that power.
                </p>
                <p className="text-lg mb-6">
                  After 3 months of intensive training, your staff will be certified, confident instructors capable of
                  inspiring students and generating revenue.
                </p>
                <p className="text-2xl font-bold text-primary-light">
                  Let's schedule a kickoff meeting to confirm trainer selection, finalize dates, and begin the
                  transformation of your robotics program.
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}

export default RoboticsTraining