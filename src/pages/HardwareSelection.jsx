import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  FaRobot,
  FaEnvelope,
  FaShoppingCart,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import { HARDWARE_CATEGORIES, formatINR } from './HardwareSelection.helpers'

const HardwareSelection = () => {
  const [selectedTier, setSelectedTier] = useState('tier1')
  const [selections, setSelections] = useState({})
  const [expandedCategories, setExpandedCategories] = useState({})
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
  })

  const getCurrentTier = () => HARDWARE_CATEGORIES.find((t) => t.id === selectedTier)

  const toggleSelection = (category, itemIndex) => {
    const key = `${selectedTier}_${category}_${itemIndex}`
    setSelections((prev) => {
      const newSelections = { ...prev }
      if (newSelections[key]) {
        delete newSelections[key]
      } else {
        newSelections[key] = true
      }
      return newSelections
    })
  }

  const isSelected = (category, itemIndex) => {
    return !!selections[`${selectedTier}_${category}_${itemIndex}`]
  }

  const getSelectedItems = () => {
    const tier = getCurrentTier()
    if (!tier) return []

    const items = []
    tier.hardware.forEach((hw) => {
      hw.items.forEach((item, idx) => {
        if (isSelected(hw.category, idx)) {
          items.push({
            category: hw.category,
            ...item,
          })
        }
      })
    })
    return items
  }

  const calculateTotal = () => {
    return getSelectedItems().reduce((sum, item) => {
      return sum + (item.priceMin + item.priceMax) / 2
    }, 0)
  }

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const tier = getCurrentTier()
  const selectedItems = getSelectedItems()
  const totalCost = calculateTotal()
  const isWithinBudget = tier && totalCost <= tier.maxBudget

  const handleEmailSubmit = async (e) => {
    e.preventDefault()

    const submitButton = e.target.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent
    submitButton.textContent = 'Sending...'
    submitButton.disabled = true

    try {
      const response = await fetch('https://api.zeroaitech.tech/send-hardware-quote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...emailData,
          tierName: tier?.name,
          tierSubtitle: tier?.subtitle,
          selectedItems: selectedItems,
          totalCost: totalCost,
          maxBudget: tier?.maxBudget,
          isWithinBudget: isWithinBudget,
        }),
      })

      const result = await response.json()
      if (result.status === 'success') {
        alert(
          "🎉 Quote request sent successfully! We'll contact you within 24 hours."
        )
        setShowEmailModal(false)
        setEmailData({ name: '', email: '', phone: '', organization: '' })
      } else {
        alert(`❌ Error: ${result.message || 'Failed to send quote request.'}`)
      }
    } catch (error) {
      alert('❌ Network error. Please try again.')
    } finally {
      submitButton.textContent = originalText
      submitButton.disabled = false
    }
  }

  return (
    <>
      <Helmet>
        <title>Hardware Selection - School Evolution Lab | ZeroAI Technologies Inc</title>
        <meta
          name="description"
          content="Select hardware components for your robotics lab. 4 tiers with complete configuration options."
        />
      </Helmet>

      <div className="min-h-screen pt-32 pb-20">
        {/* Hero */}
        <section className="section bg-gradient-to-br from-light-accent/10 to-transparent dark:from-dark-accent/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="heading-xl mb-4">
                📦 School Evolution Lab: Hardware Selection
              </h1>
              <p className="text-xl">
                Select hardware for your lab tier. Maximum budget:{' '}
                <strong style={{ color: tier?.color }}>{formatINR(tier?.maxBudget)}</strong>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tier Selection */}
        <section className="section">
          <div className="container-custom">
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {HARDWARE_CATEGORIES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTier(t.id)
                    setSelections({})
                  }}
                  className={`card text-left transition-all ${
                    selectedTier === t.id
                      ? 'ring-2 shadow-lift'
                      : 'hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selectedTier === t.id ? t.color : 'transparent',
                  }}
                >
                  <h3 className="font-semibold mb-2" style={{ color: t.color }}>
                    {t.name}
                  </h3>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                    {t.subtitle}
                  </p>
                </button>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-[1fr_400px] gap-8">
              {/* Hardware Categories */}
              <div className="space-y-6">
                {tier?.hardware.map((hw, hwIdx) => {
                  const isExpanded = expandedCategories[hw.category] !== false
                  return (
                    <motion.div
                      key={hwIdx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: hwIdx * 0.05 }}
                      className="glass-card overflow-hidden"
                    >
                      <button
                        onClick={() => toggleCategory(hw.category)}
                        className="w-full p-6 flex justify-between items-center hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors"
                        style={{
                          background: `linear-gradient(135deg, ${tier.color}22 0%, ${tier.color}11 100%)`,
                        }}
                      >
                        <h3 className="text-xl font-semibold" style={{ color: tier.color }}>
                          {hw.category}
                        </h3>
                        {isExpanded ? (
                          <FaChevronUp style={{ color: tier.color }} />
                        ) : (
                          <FaChevronDown style={{ color: tier.color }} />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-6 space-y-4">
                          {hw.items.map((item, itemIdx) => {
                            const selected = isSelected(hw.category, itemIdx)
                            return (
                              <div
                                key={itemIdx}
                                onClick={() => toggleSelection(hw.category, itemIdx)}
                                className={`card cursor-pointer transition-all ${
                                  selected
                                    ? 'ring-2 shadow-md'
                                    : 'hover:shadow-sm'
                                }`}
                                style={{
                                  borderColor: selected ? tier.color : 'transparent',
                                  background: selected
                                    ? `linear-gradient(135deg, ${tier.color}22 0%, ${tier.color}11 100%)`
                                    : undefined,
                                }}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span
                                        className="px-2 py-1 rounded text-xs font-bold text-white"
                                        style={{ background: tier.color }}
                                      >
                                        {item.type}
                                      </span>
                                      <h4 className="font-semibold">{item.name}</h4>
                                    </div>
                                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-2">
                                      {item.description}
                                    </p>
                                    <p
                                      className="text-sm font-semibold mb-3"
                                      style={{ color: tier.color }}
                                    >
                                      ✅ {item.benefit}
                                    </p>
                                    <div className="flex justify-between items-center">
                                      <p className="font-bold">
                                        {formatINR(item.priceMin)} - {formatINR(item.priceMax)}
                                      </p>
                                      <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                        {item.notes}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="ml-4 w-8 h-8 rounded-full flex items-center justify-center"
                                    style={{
                                      background: selected
                                        ? tier.color
                                        : 'rgba(255, 255, 255, 0.1)',
                                    }}
                                  >
                                    {selected ? (
                                      <FaCheckCircle className="text-white" />
                                    ) : (
                                      <FaTimesCircle className="text-white/40" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Summary Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card sticky top-32"
                >
                  <h3
                    className="text-xl font-semibold mb-4 flex items-center gap-2"
                    style={{ color: tier?.color }}
                  >
                    <FaShoppingCart /> Your Selection
                  </h3>

                  <div
                    className="card mb-6"
                    style={{
                      background: isWithinBudget
                        ? 'rgba(16, 185, 129, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      borderColor: isWithinBudget ? '#10b981' : '#ef4444',
                    }}
                  >
                    <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-2">
                      Total Cost
                    </div>
                    <div className="text-3xl font-bold mb-2">{formatINR(totalCost)}</div>
                    <div
                      className="text-sm font-semibold mb-2"
                      style={{ color: isWithinBudget ? '#10b981' : '#ef4444' }}
                    >
                      {isWithinBudget ? '✅ Within Budget' : '⚠️ Over Budget'}
                    </div>
                    <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                      Budget: {formatINR(tier?.maxBudget)}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">
                      Selected Items ({selectedItems.length})
                    </h4>
                    <div className="max-h-96 overflow-y-auto space-y-2">
                      {selectedItems.length === 0 ? (
                        <p className="text-center text-light-textSecondary dark:text-dark-textSecondary py-8 text-sm">
                          No items selected yet
                        </p>
                      ) : (
                        selectedItems.map((item, idx) => (
                          <div key={idx} className="card bg-light-surface dark:bg-dark-surface">
                            <div className="text-xs mb-1" style={{ color: tier?.color }}>
                              {item.category}
                            </div>
                            <div className="font-semibold text-sm mb-1">{item.name}</div>
                            <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                              {formatINR(item.priceMin)} - {formatINR(item.priceMax)}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowEmailModal(true)}
                    disabled={selectedItems.length === 0}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FaEnvelope /> Request Quote
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="heading-md">📧 Request Hardware Quote</h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-3xl text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleEmailSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block font-semibold mb-2">Organization Name *</label>
                    <input
                      type="text"
                      required
                      value={emailData.organization}
                      onChange={(e) =>
                        setEmailData({ ...emailData, organization: e.target.value })
                      }
                      placeholder="School/College/Institution Name"
                      className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Contact Person *</label>
                      <input
                        type="text"
                        required
                        value={emailData.name}
                        onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
                        placeholder="Principal/Director"
                        className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={emailData.phone}
                        onChange={(e) => setEmailData({ ...emailData, phone: e.target.value })}
                        placeholder="+91-XXXXXXXXXX"
                        className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={emailData.email}
                      onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                      placeholder="contact@yourschool.edu"
                      className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                    />
                  </div>

                  <div
                    className="card"
                    style={{
                      background: `linear-gradient(135deg, ${tier?.color}22 0%, ${tier?.color}11 100%)`,
                      borderColor: tier?.color,
                    }}
                  >
                    <h4 className="font-semibold mb-2">Your Selection Summary</h4>
                    <p className="mb-2" style={{ color: tier?.color }}>
                      {tier?.name} - {selectedItems.length} items
                    </p>
                    <p className="text-2xl font-bold">Total: {formatINR(totalCost)}</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Send Quote Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </>
  )
}

export default HardwareSelection
