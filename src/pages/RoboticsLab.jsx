import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  FaRobot,
  FaPrint,
  FaEnvelope,
  FaDesktop,
  FaCube,
  FaMicrochip,
  FaWifi,
  FaProjectDiagram,
  FaChair,
  FaHardHat,
  FaBrain,
  FaBolt,
  FaEye,
  FaServer,
  FaHome,
  FaShieldAlt,
  FaGraduationCap,
  FaIndustry,
  FaUniversity,
  FaCut,
  FaMagic,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import { TRAINING_PLANS, TEACHER_TRAINING, formatINR } from './RoboticsLab.helpers'

const RoboticsLab = () => {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [expandedComponents, setExpandedComponents] = useState({})
  const [trainingSelections, setTrainingSelections] = useState({})
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
  })

  const setTraining = (pkgId, field, value) => {
    setTrainingSelections((prev) => ({
      ...prev,
      [pkgId]: {
        plan: prev[pkgId]?.plan || 'none',
        gender: prev[pkgId]?.gender || 'male',
        teacherPlan: prev[pkgId]?.teacherPlan || 'none',
        teacherCount: prev[pkgId]?.teacherCount || 0,
        [field]: value,
      },
    }))
  }

  const getSel = (pkgId) =>
    trainingSelections[pkgId] || {
      plan: 'none',
      gender: 'male',
      teacherPlan: 'none',
      teacherCount: 0,
    }

  const getTrainingFee = (pkgId) =>
    TRAINING_PLANS.find((p) => p.key === getSel(pkgId).plan)?.fee || 0

  const getTeacherFee = (pkgId) => {
    const sel = getSel(pkgId)
    const per = TEACHER_TRAINING.find((t) => t.key === sel.teacherPlan)?.fee || 0
    return per * (Number(sel.teacherCount) || 0)
  }

  const packages = [
    {
      id: 1,
      tier: 'Tier 1',
      name: 'Ignition Lab',
      subtitle: 'The Foundation Stage',
      theme: 'Curiosity Begins Here',
      price: '₹ 0.5L - ₹ 2.5L',
      setupTime: '2-3 days',
      purpose: 'Introduce students to robotics, programming, and problem-solving basics',
      ideal: 'Schools beginning their robotics journey',
      icon: FaGraduationCap,
      color: '#10b981',
      components: [
        {
          name: 'Desktop Workstation',
          spec: 'Intel i5 / 8GB / 256GB SSD',
          usage: 'Used by students to code, design, and control robots.',
          icon: FaDesktop,
        },
        {
          name: '3D Printer (Basic)',
          spec: 'PLA-based, 200x200x200mm',
          usage: 'Students can design and print small robot parts and models.',
          icon: FaCube,
        },
        {
          name: 'Arduino Robotics Kit',
          spec: 'Basic microcontroller + sensors',
          usage: 'For simple robot and automation projects.',
          icon: FaMicrochip,
        },
        {
          name: 'IoT Starter Kit',
          spec: 'ESP32 / Wi-Fi module + sensors',
          usage: 'Introduces students to smart devices and IoT basics.',
          icon: FaWifi,
        },
        {
          name: 'Smart Mini Projector',
          spec: 'Portable, HDMI-compatible',
          usage: 'Used for lessons, tutorials, and displaying projects.',
          icon: FaProjectDiagram,
        },
        {
          name: 'Furniture (Tables & Chairs)',
          spec: '2 desks + 2 chairs',
          usage: 'Provides comfortable, safe workspace for students.',
          icon: FaChair,
        },
        {
          name: 'Safety & Tool Kit',
          spec: 'Goggles, gloves, soldering iron, tools',
          usage: 'For safe electronics work and basic assembly.',
          icon: FaHardHat,
        },
      ],
      impact: [
        'How electricity powers robots',
        'Simple coding (block-based or Arduino)',
        'Problem-solving and teamwork',
        'The joy of building something real',
      ],
    },
    {
      id: 2,
      tier: 'Tier 2',
      name: 'Evolution Lab',
      subtitle: 'The Discovery Stage',
      theme: 'Innovation Takes Shape',
      price: '₹ 3L - ₹ 5L',
      setupTime: '5-7 days',
      purpose: 'Expand creativity by combining robotics, 3D design, and smart technology',
      ideal: 'Schools with technical stream or early engineering focus',
      icon: FaIndustry,
      color: '#667eea',
      components: [
        {
          name: 'Upgraded 3D Printer',
          spec: 'Dual material, 300x300x400mm',
          usage: 'Prints stronger and larger prototypes.',
          icon: FaCube,
        },
        {
          name: 'Laser Cutter / Engraver',
          spec: 'CO₂ 40W desktop',
          usage: 'Used for cutting wood, acrylic, and engraving designs.',
          icon: FaCut,
        },
        {
          name: 'AI & ML Starter Kit',
          spec: 'Raspberry Pi + Camera',
          usage: 'Introduces face and object recognition.',
          icon: FaBrain,
        },
        {
          name: 'Smart Lighting System',
          spec: 'Wi-Fi RGB bulbs',
          usage: 'Demonstrates IoT automation visually.',
          icon: FaBolt,
        },
        {
          name: 'Touchscreen Display / Kiosk',
          spec: '21-inch interactive display',
          usage: 'For showing ongoing projects and lessons.',
          icon: FaProjectDiagram,
        },
        {
          name: 'Safety Enclosure',
          spec: 'Acrylic laser/3D printer cover',
          usage: 'Protects students during machine operation.',
          icon: FaShieldAlt,
        },
      ],
      impact: [
        'How smart homes and cities work',
        'The basics of AI and automation',
        'To build functional, real-world mini-projects',
      ],
    },
    {
      id: 3,
      tier: 'Tier 3',
      name: 'Intelligence Lab',
      subtitle: 'The Innovation Stage',
      theme: 'Machines That Think',
      price: '₹ 5L - ₹ 8L',
      setupTime: '10-14 days',
      purpose:
        'Equip students with advanced tools to create intelligent robots and automation systems',
      ideal: 'Colleges, polytechnics, and research institutions',
      icon: FaRobot,
      color: '#a855f7',
      components: [
        {
          name: 'Advanced Workstations',
          spec: 'i7 / 16GB / GPU',
          usage: 'For AI model training and robotics simulation.',
          icon: FaDesktop,
        },
        {
          name: 'Industrial-Grade 3D Printer',
          spec: 'High precision / large build volume',
          usage: 'Creates durable robot frames and parts.',
          icon: FaCube,
        },
        {
          name: 'PLC Trainer Kit',
          spec: 'Siemens / Delta compact PLC',
          usage: 'Teaches industrial automation logic.',
          icon: FaMicrochip,
        },
        {
          name: 'AR/VR Headsets',
          spec: 'Meta Quest / Pico',
          usage: 'For virtual design, visualization, and safety training.',
          icon: FaEye,
        },
        {
          name: 'Digital Dashboard',
          spec: 'PC-based IoT display',
          usage: 'Shows live data from devices and sensors.',
          icon: FaProjectDiagram,
        },
        {
          name: 'Safety & Environmental Sensors',
          spec: 'Gas, fire, temp sensors',
          usage: 'Ensures lab safety and automation alerts.',
          icon: FaShieldAlt,
        },
      ],
      impact: [
        'Artificial intelligence, machine vision, and automation basics',
        'To build semi-autonomous robots and control systems',
        'To collaborate like real engineers in a safe, futuristic environment',
      ],
    },
    {
      id: 4,
      tier: 'Tier 4',
      name: 'Singularity Lab',
      subtitle: 'The Future Stage',
      theme: 'Where Education Meets the Future',
      price: '₹ 8L - ₹ 15L+',
      setupTime: '20-30 days',
      purpose:
        'Create a fully automated, AI-powered, next-generation robotics lab for advanced innovation',
      ideal: 'Universities, research centers, and innovation hubs',
      icon: FaUniversity,
      color: '#00d9ff',
      components: [
        {
          name: 'AI Workstation / Server',
          spec: 'GPU cluster / AI-ready PC',
          usage: 'For training AI and deep learning models.',
          icon: FaServer,
        },
        {
          name: 'Autonomous Service Robot',
          spec: 'Custom-built mobile robot',
          usage: 'Acts as a demo robot for visitors and learning.',
          icon: FaRobot,
        },
        {
          name: 'Smart Glass Display / Mirror',
          spec: 'Interactive glass interface',
          usage: 'Displays school info, weather, and controls.',
          icon: FaMagic,
        },
        {
          name: 'Full Home Assistant System',
          spec: 'Integrated automation setup',
          usage: 'Controls lights, fans, doors, and music via voice.',
          icon: FaHome,
        },
        {
          name: 'Smart Workstations',
          spec: 'Desks with motion sensors',
          usage: 'Auto-adjust lighting and power based on activity.',
          icon: FaDesktop,
        },
        {
          name: 'VR Robotics Training',
          spec: 'Full VR simulation suite',
          usage: 'Allows virtual robotics practice safely.',
          icon: FaEye,
        },
        {
          name: 'Smart Security System',
          spec: 'Face recognition + cameras',
          usage: 'Enhances lab safety and access control.',
          icon: FaShieldAlt,
        },
      ],
      impact: [
        'Experience a real research-grade lab environment',
        'Learn high-level robotics, automation, and AI concepts',
        'Build innovations ready for national/international exhibitions',
        'Develop real-world problem-solving and entrepreneurship skills',
      ],
    },
  ]

  const handleEmailSubmit = async (e) => {
    e.preventDefault()

    const submitButton = e.target.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent
    submitButton.textContent = 'Sending...'
    submitButton.disabled = true

    try {
      const response = await fetch('https://api.zeroaitech.tech/send-package-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: emailData.name,
          email: emailData.email,
          phone: emailData.phone,
          organization: emailData.organization,
          packageId: selectedPackage?.id,
          packageName: selectedPackage?.name,
          packageSubtitle: selectedPackage?.subtitle,
          packageTheme: selectedPackage?.theme,
          packagePrice: selectedPackage?.price,
          setupTime: selectedPackage?.setupTime,
          purpose: selectedPackage?.purpose,
          ideal: selectedPackage?.ideal,
          trainingPlan: getSel(selectedPackage?.id)?.plan,
          trainerGender: getSel(selectedPackage?.id)?.gender,
          teacherPlan: getSel(selectedPackage?.id)?.teacherPlan,
          teacherCount: getSel(selectedPackage?.id)?.teacherCount,
          trainingFee: getTrainingFee(selectedPackage?.id),
          teacherFee: getTeacherFee(selectedPackage?.id),
          totalAddons:
            getTrainingFee(selectedPackage?.id) + getTeacherFee(selectedPackage?.id),
        }),
      })

      const result = await response.json()

      if (result.status === 'success') {
        alert(
          '🎉 Package information sent successfully! Check your email for details. We will contact you within 24 hours.'
        )
        setShowEmailModal(false)
        setEmailData({ name: '', email: '', phone: '', organization: '' })
      } else {
        alert(
          `❌ Error: ${result.message || 'Failed to send package information. Please try again.'}`
        )
      }
    } catch (error) {
      console.error('Email send error:', error)
      alert('❌ Network error occurred. Please check your connection and try again.')
    } finally {
      submitButton.textContent = originalText
      submitButton.disabled = false
    }
  }

  return (
    <>
      <Helmet>
        <title>Smart Robotics & AI Lab Packages | ZeroAI Technologies Inc</title>
        <meta
          name="description"
          content="Complete robotics lab solutions with IBM-certified training. 4 tier packages from ₹0.5L to ₹15L+"
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
              <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                <FaRobot /> STEM.org Certified | Complete Lab Solutions
              </span>
              <h1 className="heading-xl mb-4">🧠 Smart Robotics & AI Lab Packages</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Transform education with <strong>cutting-edge robotics labs</strong> designed for
                every learning stage.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Packages */}
        <section className="section">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Complete Package Solutions</h2>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Four modular tiers designed to grow with your institution's needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg) => {
                const IconComponent = pkg.icon
                const isExpanded = !!expandedComponents[pkg.id]
                const visibleComponents = isExpanded
                  ? pkg.components
                  : pkg.components.slice(0, 4)
                const remainingCount = Math.max(pkg.components.length - 4, 0)
                const sel = getSel(pkg.id)
                const trainingFee = getTrainingFee(pkg.id)
                const teacherFee = getTeacherFee(pkg.id)
                const totalAddons = (trainingFee || 0) + (teacherFee || 0)

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-bold text-light-textSecondary dark:text-dark-textSecondary">
                        {String(pkg.id).padStart(2, '0')}
                      </div>
                      <IconComponent className="text-4xl" style={{ color: pkg.color }} />
                    </div>

                    <h3 className="heading-md mb-2">{pkg.name}</h3>
                    <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary italic mb-1">
                      {pkg.subtitle}
                    </p>
                    <p className="text-sm mb-6" style={{ color: pkg.color }}>
                      &quot;{pkg.theme}&quot;
                    </p>

                    <div className="card bg-light-accent/5 dark:bg-dark-accent/5 mb-6">
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>💰 Package Price:</strong> {pkg.price}
                        </div>
                        <div>
                          <strong>🕐 Setup Time:</strong> {pkg.setupTime}
                        </div>
                        <div>
                          <strong>🎯 Purpose:</strong> {pkg.purpose}
                        </div>
                        <div>
                          <strong>👥 Ideal For:</strong> {pkg.ideal}
                        </div>
                        <div className="text-light-accent dark:text-dark-accent font-semibold">
                          ✅ Complimentary humanoid mascot included
                        </div>
                        <div style={{ color: pkg.color }} className="font-semibold">
                          🔧 Added Services Total: {formatINR(totalAddons)}
                        </div>
                      </div>
                    </div>

                    {/* Training Section */}
                    <div className="card bg-gradient-to-br from-light-accent/10 to-transparent dark:from-dark-accent/10 mb-6">
                      <h4 className="font-semibold mb-4">🎓 Training & Management</h4>
                      <div className="grid gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Frequency</label>
                          <select
                            value={sel.plan}
                            onChange={(e) => setTraining(pkg.id, 'plan', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                          >
                            {TRAINING_PLANS.map((p) => (
                              <option key={p.key} value={p.key}>
                                {p.label} {p.fee ? `— ${formatINR(p.fee)}/year` : ''}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Trainer</label>
                          <select
                            value={sel.gender}
                            onChange={(e) => setTraining(pkg.id, 'gender', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                          >
                            <option value="male">Male Trainer</option>
                            <option value="female">Female Trainer</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Teacher Training
                          </label>
                          <select
                            value={sel.teacherPlan}
                            onChange={(e) => setTraining(pkg.id, 'teacherPlan', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                          >
                            {TEACHER_TRAINING.map((t) => (
                              <option key={t.key} value={t.key}>
                                {t.label}
                                {t.fee ? ` — ${formatINR(t.fee)}/instructor` : ''}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Instructors</label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={sel.teacherCount}
                            onChange={(e) => setTraining(pkg.id, 'teacherCount', e.target.value)}
                            placeholder="0"
                            className="w-full px-3 py-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                          />
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg text-sm">
                        💡 <strong>Policy:</strong> Trainer present full-day on scheduled days. Lab
                        operates only under trainer or trained authorized staff. Misuse voids
                        warranty.
                      </div>

                      <div className="mt-3 text-center p-2 bg-light-accent/20 dark:bg-dark-accent/20 rounded-lg font-semibold text-sm">
                        💰 Training: {trainingFee ? `${formatINR(trainingFee)}/year` : 'None'} •
                        👨‍🏫 Teacher Training: {formatINR(teacherFee)}
                      </div>
                    </div>

                    {/* Components */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-4">🧩 Components Included</h4>
                      <div className="space-y-3">
                        {visibleComponents.map((component, idx) => {
                          const CompIcon = component.icon
                          return (
                            <div
                              key={idx}
                              className="flex gap-3 p-3 bg-light-surface dark:bg-dark-surface rounded-lg"
                            >
                              <div className="w-10 h-10 flex items-center justify-center bg-light-background dark:bg-dark-background rounded-lg flex-shrink-0">
                                <CompIcon style={{ color: pkg.color }} />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-sm mb-1">{component.name}</h5>
                                <p
                                  className="text-xs font-medium mb-1"
                                  style={{ color: pkg.color }}
                                >
                                  {component.spec}
                                </p>
                                <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                  {component.usage}
                                </p>
                              </div>
                            </div>
                          )
                        })}

                        {!isExpanded && remainingCount > 0 && (
                          <button
                            onClick={() =>
                              setExpandedComponents((s) => ({ ...s, [pkg.id]: true }))
                            }
                            className="w-full py-2 text-sm font-semibold rounded-lg border-2 border-dashed hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                            style={{ borderColor: pkg.color, color: pkg.color }}
                          >
                            <FaChevronDown className="inline mr-2" />
                            Show {remainingCount} More Components
                          </button>
                        )}

                        {isExpanded && (
                          <button
                            onClick={() =>
                              setExpandedComponents((s) => ({ ...s, [pkg.id]: false }))
                            }
                            className="w-full py-2 text-sm font-semibold rounded-lg border-2 hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                            style={{ borderColor: pkg.color, color: pkg.color }}
                          >
                            <FaChevronUp className="inline mr-2" />
                            Show Less Components
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-light-border dark:border-dark-border">
                      <button
                        onClick={() => {
                          setSelectedPackage(pkg)
                          setShowEmailModal(true)
                        }}
                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                      >
                        <FaEnvelope /> Email Details
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-gradient-to-br from-light-accent/10 to-transparent dark:from-dark-accent/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card text-center max-w-3xl mx-auto"
            >
              <FaRobot className="text-6xl text-light-accent dark:text-dark-accent mx-auto mb-6" />
              <h2 className="heading-lg mb-4">Ready to Transform Your Institution?</h2>
              <p className="mb-8">
                Complete training packages with IBM certification options. Trainer present full-day
                on scheduled days. Complimentary mascot included. Professional setup and support.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => {
                    setShowEmailModal(true)
                    setSelectedPackage(packages[0])
                  }}
                  className="btn-primary"
                >
                  Get Quote Today
                </button>
              </div>
            </motion.div>
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
                <h3 className="heading-md">📧 Request Package Information</h3>
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
                        placeholder="Principal/Director/Coordinator"
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

                  {selectedPackage && (
                    <div className="card bg-gradient-to-r from-light-accent/10 to-transparent dark:from-dark-accent/10">
                      <h4 className="font-semibold mb-2">
                        Selected: {selectedPackage.name}
                      </h4>
                      <p className="text-light-accent dark:text-dark-accent font-semibold">
                        Package Price: {selectedPackage.price}
                      </p>
                      <p className="font-semibold">
                        Added Services:{' '}
                        {formatINR(
                          getTrainingFee(selectedPackage.id) +
                            getTeacherFee(selectedPackage.id)
                        )}
                      </p>
                    </div>
                  )}
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
                    Send Package Info
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

export default RoboticsLab
