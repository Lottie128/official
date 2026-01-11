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
          <title>BCM Schools Partnership Proposal - Protected Document</title>
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

  const budgetData = [
    { item: 'VR Headsets', desc: '25 Meta Quest 3 units', amount: '₹12,00,000' },
    { item: 'Robotics Kits', desc: '50 advanced STEM kits', amount: '₹15,00,000' },
    { item: 'AR Software', desc: 'Enterprise licenses (3 years)', amount: '₹8,00,000' },
    { item: 'Lab Setup', desc: 'Infrastructure, furniture, networking', amount: '₹18,00,000' },
    { item: 'Training', desc: '6 months teacher certification', amount: '₹10,00,000' },
    { item: 'Support', desc: '12-month technical support', amount: '₹6,00,000' }
  ]

  const revenueData = [
    { source: 'Premium Fees', activities: 'STEM-focused curriculum premium', amount: '₹80 Lakhs - ₹1.2 Crores' },
    { source: 'Enrollment Growth', activities: 'New student admissions', amount: '₹60 Lakhs - ₹90 Lakhs' },
    { source: 'Workshops', activities: 'Weekend programs, summer camps', amount: '₹40 Lakhs - ₹60 Lakhs' },
    { source: 'Partnerships', activities: 'Tech company collaborations', amount: '₹30 Lakhs - ₹50 Lakhs' }
  ]

  const competitiveData = [
    { activity: 'Tech Integration', status: 'First Mover' },
    { activity: 'STEM Curriculum', status: 'Market Leader' },
    { activity: 'Teacher Training', status: 'Advanced' },
    { activity: 'Student Outcomes', status: 'Superior' }
  ]

  return (
    <>
      <Helmet>
        <title>BCM Schools Partnership Proposal - ZeroAI Technologies</title>
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
          
          .print-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            page-break-inside: avoid !important;
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
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-3">
                BCM Schools Partnership Proposal
              </h1>
              
              <div className="grid grid-cols-3 gap-6 mt-6 text-sm">
                <div>
                  <p className="text-neutral-500 dark:text-neutral-600 mb-1">Prepared By</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">ZeroAI Technologies Inc</p>
                </div>
                <div>
                  <p className="text-neutral-500 dark:text-neutral-600 mb-1">Date</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">January 2026</p>
                </div>
                <div>
                  <p className="text-neutral-500 dark:text-neutral-600 mb-1">Project Value</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">₹69 Lakhs</p>
                </div>
              </div>
            </div>

            <div className="print-section mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Executive Summary</h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                ZeroAI Technologies proposes a comprehensive AR/VR + Robotics integration across BCM Schools' Science, Math, 
                Computer Science, Art, History, and Geography curricula. This partnership will position BCM as India's first 
                fully immersive STEM-enabled school network.
              </p>
            </div>

            <div className="print-grid mb-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Total Investment</h3>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">₹69,00,000</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Hardware + Training + Support</p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Year 1 Revenue Potential</h3>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">₹2-3 Crores</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">ROI: 300-400%</p>
              </div>
            </div>

            <div className="print-section mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Investment Breakdown</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-neutral-200 dark:border-neutral-800">
                  <thead className="bg-neutral-100 dark:bg-neutral-900">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Item</th>
                      <th className="px-4 py-2 text-left font-semibold">Description</th>
                      <th className="px-4 py-2 text-right font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.map((row, idx) => (
                      <tr key={idx} className="border-t border-neutral-200 dark:border-neutral-800">
                        <td className="px-4 py-2 font-medium">{row.item}</td>
                        <td className="px-4 py-2 text-neutral-600 dark:text-neutral-400">{row.desc}</td>
                        <td className="px-4 py-2 text-right font-semibold">{row.amount}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-neutral-300 dark:border-neutral-700 font-bold bg-neutral-50 dark:bg-neutral-900">
                      <td className="px-4 py-2">Total Investment</td>
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2 text-right">₹69,00,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="print-section mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Revenue Projections</h2>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border border-neutral-200 dark:border-neutral-800">
                  <thead className="bg-neutral-100 dark:bg-neutral-900">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Revenue Source</th>
                      <th className="px-4 py-2 text-left font-semibold">Activities</th>
                      <th className="px-4 py-2 text-right font-semibold">Projected Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueData.map((item, idx) => (
                      <tr key={idx} className="border-t border-neutral-200 dark:border-neutral-800">
                        <td className="px-4 py-2 font-medium">{item.source}</td>
                        <td className="px-4 py-2 text-neutral-600 dark:text-neutral-400">{item.activities}</td>
                        <td className="px-4 py-2 text-right font-semibold">{item.amount}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-neutral-300 dark:border-neutral-700 font-bold bg-neutral-50 dark:bg-neutral-900">
                      <td className="px-4 py-2">Estimated Year 1 Revenue</td>
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2 text-right">₹2.3 - 3 Crores</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 mt-4">Competitive Advantage</h3>
              <div className="grid grid-cols-2 gap-3">
                {competitiveData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                    <span className="font-medium text-sm">{item.activity}</span>
                    <span className="text-xs px-2 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="print-section">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Time-Sensitive Opportunity</h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                First-mover advantage is critical:
              </p>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1 mb-4 ml-4">
                <li>Other premium schools exploring similar integrations</li>
                <li>Limited VR hardware availability in Q1 2026</li>
                <li>Enrollment season beginning February 2026</li>
              </ul>
              <div className="card bg-neutral-900 dark:bg-white text-white dark:text-neutral-900">
                <h3 className="text-lg font-semibold mb-2">Recommended Action:</h3>
                <p>Sign MoU within 2 weeks to lock in Q1 2026 implementation</p>
              </div>
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

export default BCMProposal