import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiLockClosed, HiEye, HiEyeOff, HiDownload } from 'react-icons/hi'

const RoboticsTraining = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('robotics_training_auth')
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
        body: JSON.stringify({ password, page: 'robotics_training' })
      })
      const data = await response.json()
      
      if (data.status === 'success') {
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

  const handleDownloadPDF = () => {
    window.print()
  }

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Robotics Training Program - Protected Document</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="glass-card text-center">
              <div className="mx-auto w-16 h-16 bg-neutral-900 dark:bg-white rounded-2xl flex items-center justify-center mb-6">
                <HiLockClosed className="w-8 h-8 text-white dark:text-neutral-900" />
              </div>
              
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Protected Document
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Enter password to access this confidential document
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="input-field pr-12"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                  >
                    {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                  </button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Authenticating...' : 'Access Document'}
                </button>
              </form>

              <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-600">
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
        <title>Robotics Training Program - BCM Schools</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          
          body {
            font-size: 7.5pt !important;
            line-height: 1.3 !important;
          }
          
          h1 { font-size: 16pt !important; margin-bottom: 4px !important; }
          h2 { font-size: 12pt !important; margin: 8px 0 4px 0 !important; }
          h3 { font-size: 10pt !important; margin: 6px 0 3px 0 !important; }
          p { font-size: 8pt !important; margin: 2px 0 !important; }
          
          .print-section {
            padding: 10px 0 !important;
            margin-bottom: 6px !important;
            page-break-inside: avoid !important;
          }
          
          table {
            font-size: 7.5pt !important;
            margin: 4px 0 !important;
          }
          
          th, td {
            padding: 4px 6px !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="no-print fixed top-24 right-6 z-50">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700 rounded-xl font-medium text-sm shadow-lg transition-all duration-200"
          >
            <HiDownload className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-5xl mx-auto">
            <div className="print-section text-center mb-8">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                Robotics Kit Training Program
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                BCM Schools • 3-Month Intensive + 12-Month Support
              </p>
            </div>

            <div className="print-section mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">🎯 The Problem</h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-2">
                BCM's robotics kits are <strong>underutilized</strong>. Staff needs training to: understand components, 
                program effectively, and design curriculum.
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 p-3 rounded-lg">
                <strong>Focus:</strong> Robotics kits mastery only—NOT AR/VR training.
              </p>
            </div>

            <div className="print-section mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">🏆 Credentials</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">IBM Partner Plus</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Advanced technology partner certification</p>
                </div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">STEM.org Accredited</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Premier global STEM authority</p>
                </div>
              </div>
            </div>

            <div className="print-section mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">📚 3 Phases Over 3 Months</h2>
              <div className="space-y-4">
                <div className="card">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Phase 1: Hardware Mastery (Month 1)</h3>
                  <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                    <p><strong>Week 1-2:</strong> Catalog components, microcontroller architecture</p>
                    <p><strong>Week 3-4:</strong> Arduino IDE, programming basics</p>
                    <p><strong>Week 5-8:</strong> Debugging, troubleshooting</p>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Phase 2: Project Implementation (Month 2)</h3>
                  <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                    <p><strong>Week 1-2:</strong> Line-following, obstacle-avoiding robots</p>
                    <p><strong>Week 3-4:</strong> Multi-sensor, PID, wireless</p>
                    <p><strong>Week 5-8:</strong> Smart home, autonomous nav</p>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Phase 3: Teaching Certification (Month 3)</h3>
                  <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                    <p><strong>Week 1-2:</strong> Curriculum design, rubrics</p>
                    <p><strong>Week 3-4:</strong> Mock classes, safety</p>
                    <p><strong>Week 5-8:</strong> Exams, certification</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="print-section mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">⏰ Time Commitment</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-neutral-200 dark:border-neutral-800">
                  <thead className="bg-neutral-100 dark:bg-neutral-900">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Component</th>
                      <th className="px-4 py-2 text-right font-semibold">Hours/Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-neutral-200 dark:border-neutral-800">
                      <td className="px-4 py-2">In-Person Workshops</td>
                      <td className="px-4 py-2 text-right">32 (4 days)</td>
                    </tr>
                    <tr className="border-t border-neutral-200 dark:border-neutral-800">
                      <td className="px-4 py-2">Video Materials</td>
                      <td className="px-4 py-2 text-right">8-10</td>
                    </tr>
                    <tr className="border-t border-neutral-200 dark:border-neutral-800">
                      <td className="px-4 py-2">Project Work</td>
                      <td className="px-4 py-2 text-right">5-7</td>
                    </tr>
                    <tr className="border-t border-neutral-200 dark:border-neutral-800">
                      <td className="px-4 py-2">Assessments</td>
                      <td className="px-4 py-2 text-right">3-4</td>
                    </tr>
                    <tr className="border-t-2 border-neutral-300 dark:border-neutral-700 font-bold bg-neutral-50 dark:bg-neutral-900">
                      <td className="px-4 py-2">Total</td>
                      <td className="px-4 py-2 text-right">~50 hrs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="print-section mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">💰 Investment</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-neutral-200 dark:border-neutral-800">
                  <thead className="bg-neutral-100 dark:bg-neutral-900">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Item</th>
                      <th className="px-4 py-2 text-right font-semibold">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-neutral-200 dark:border-neutral-800">
                      <td className="px-4 py-2">12 Workshop Days</td>
                      <td className="px-4 py-2 text-right">₹1,50,000</td>
                    </tr>
                    <tr className="border-t border-neutral-200 dark:border-neutral-800">
                      <td className="px-4 py-2">Trainer & Materials</td>
                      <td className="px-4 py-2 text-right">₹1,50,000</td>
                    </tr>
                    <tr className="border-t border-neutral-200 dark:border-neutral-800">
                      <td className="px-4 py-2">Year-Long Support</td>
                      <td className="px-4 py-2 text-right">₹50,000</td>
                    </tr>
                    <tr className="border-t-2 border-neutral-300 dark:border-neutral-700 font-bold bg-neutral-50 dark:bg-neutral-900">
                      <td className="px-4 py-2">Total (5+ Trainers)</td>
                      <td className="px-4 py-2 text-right">₹3,50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="print-section">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">✨ Next Steps</h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                Your robotics kits are powerful. Trained teachers multiply that power.
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Let's schedule a kickoff meeting to begin transformation.
              </p>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-xs text-neutral-500 dark:text-neutral-600">
                © 2026 ZeroAI Technologies Inc. Confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoboticsTraining