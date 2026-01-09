import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaCheckCircle, FaDownload, FaPaperPlane } from 'react-icons/fa'

const EvolutionLab = () => {
  const [selections, setSelections] = useState({})
  const [total, setTotal] = useState(0)

  const hardwareData = {
    printer: {
      title: '3D Printer',
      options: [
        {
          id: 'printer_basic',
          name: 'Basic: Creality Ender 3 V3 / Anycubic Kobra Neo',
          description: 'Entry-level FDM, 220x220x250mm print, PLA/ABS, easy setup',
          benefit: 'Best for basic prototyping, student small parts',
          price: 25000,
          notes: 'Economical, simplest, very reliable',
          tier: 'Basic',
        },
        {
          id: 'printer_mid',
          name: 'Mid: Flashforge X-Smart 3 / WOL ATAL 3D',
          description: 'Enclosed, touchscreen, larger volume, more filaments',
          benefit: 'Prints bigger, safer, better finish',
          price: 95000,
          notes: 'Enclosure improves safety',
          tier: 'Mid',
        },
        {
          id: 'printer_advanced',
          name: 'Advanced: 3idea Max 200 / X-Plus 3',
          description: 'Dual extruder, huge prints, industrial quality',
          benefit: 'Large projects, dual materials/colors',
          price: 200000,
          notes: 'Professional-grade, heavy use',
          tier: 'Advanced',
        },
      ],
    },
    laser: {
      title: 'Laser Engraver/Cutter',
      options: [
        {
          id: 'laser_basic',
          name: 'Basic: TWOTREES TTS-20 Pro / UV Portable',
          description: 'Desktop, 20W, paper, wood, simple crafts',
          benefit: 'Best for nameplates, basic PCB',
          price: 27500,
          notes: 'Compact, entry-level',
          tier: 'Basic',
        },
        {
          id: 'laser_mid',
          name: 'Mid: CO₂ 40W Desktop (Paras, 1390 Model)',
          description: '40-60W, wood/acrylic engraving, semi-pro',
          benefit: 'School logos, classroom signs',
          price: 160000,
          notes: 'More power, larger working area',
          tier: 'Mid',
        },
        {
          id: 'laser_advanced',
          name: 'Advanced: Fiber/CO₂ 60W+ Industrial',
          description: 'Faster, deeper cuts, pro-grade',
          benefit: 'Mass prototyping, advanced design',
          price: 250000,
          notes: 'Heavy-duty, Chiller included',
          tier: 'Advanced',
        },
      ],
    },
    robotics: {
      title: 'Robotics/Arduino Kit',
      options: [
        {
          id: 'robotics_basic',
          name: 'Basic: Standard UNO Starter Kit',
          description: 'Boards, motors, basic sensors',
          benefit: 'Simple logic and movement projects',
          price: 2750,
          notes: 'Ideal for absolute beginners',
          tier: 'Basic',
        },
        {
          id: 'robotics_mid',
          name: 'Mid: Advanced Arduino Robotics Kit',
          description: 'Includes LCD, RFID, relays, extra motors/sensors',
          benefit: 'Intermediate robotics, class competitions',
          price: 6750,
          notes: 'More sensors and moving parts',
          tier: 'Mid',
        },
        {
          id: 'robotics_advanced',
          name: 'Advanced: Arduino Engineering/Mechatronics',
          description: 'Full robotics lab, wheels, self-balance, rover, curriculum',
          benefit: 'Multi-project advanced STEM',
          price: 29500,
          notes: 'Suitable for engineering syllabus',
          tier: 'Advanced',
        },
      ],
    },
    iot: {
      title: 'IoT Kit (ESP32)',
      options: [
        {
          id: 'iot_basic',
          name: 'Basic: ESP32 Dev Board',
          description: 'Simple IoT demo, Wi-Fi/BLE onboard',
          benefit: 'Automation, sensors, coding intro',
          price: 3400,
          notes: 'Most affordable smart kit',
          tier: 'Basic',
        },
        {
          id: 'iot_mid',
          name: 'Mid: ESP32 Complete Starter Kit',
          description: 'Adds LCD, relays, sensor variety',
          benefit: 'Smart home projects, more applications',
          price: 8500,
          notes: 'Upgrades on basic kit',
          tier: 'Mid',
        },
        {
          id: 'iot_advanced',
          name: 'Advanced: Professional Wireless IoT Kit',
          description: 'Multiple ESP32s, touch panels, actuators',
          benefit: 'Automated classrooms, scalable IoT',
          price: 20000,
          notes: 'Project-ready for big labs',
          tier: 'Advanced',
        },
      ],
    },
    lighting: {
      title: 'Smart Lighting System',
      options: [
        {
          id: 'lighting_basic',
          name: 'Basic: 9W Wi-Fi RGB Bulb (Pack of 5)',
          description: 'Mobile app, color control, demo',
          benefit: 'Visual IoT, engagement',
          price: 3375,
          notes: 'Cheapest IoT visual tool',
          tier: 'Basic',
        },
        {
          id: 'lighting_mid',
          name: 'Mid: High-Watt RGB+CCT Bulb (Pack of 5)',
          description: 'Multi-mode, music sync, voice',
          benefit: 'Greater effect, multi-room',
          price: 5875,
          notes: 'Advanced interactions',
          tier: 'Mid',
        },
        {
          id: 'lighting_advanced',
          name: 'Advanced: Multi-bulb Network Kit (10 bulbs)',
          description: 'Full classroom integration, scene setups',
          benefit: 'Large group automation',
          price: 14500,
          notes: 'Multi-room/group activities',
          tier: 'Advanced',
        },
      ],
    },
    kiosk: {
      title: 'Touchscreen Kiosk',
      options: [
        {
          id: 'kiosk_basic',
          name: 'Entry: 19" Touch Display',
          description: 'Standalone, basic Android display',
          benefit: 'Run lessons, view projects',
          price: 40000,
          notes: 'Most affordable, easy for demos',
          tier: 'Basic',
        },
        {
          id: 'kiosk_mid',
          name: 'Mid: 21.5" Touch Kiosk',
          description: 'Larger, stronger stand, full install',
          benefit: 'Full classroom usage, interactive use',
          price: 62500,
          notes: 'Bigger, best for central location',
          tier: 'Mid',
        },
        {
          id: 'kiosk_advanced',
          name: 'Advanced: 24"+ Professional Kiosk',
          description: 'Multi-orientation, Windows/Android, audio',
          benefit: 'Digital noticeboard, monitor, advanced displays',
          price: 95000,
          notes: 'Most features, long-term use',
          tier: 'Advanced',
        },
      ],
    },
    robot: {
      title: 'Mascot Robot (Humanoid)',
      options: [
        {
          id: 'robot_basic',
          name: 'Basic: School Mascot Model',
          description: 'Decorative, small, non-interactive',
          benefit: 'STEM environment, branding',
          price: 35000,
          notes: 'Entry-level, no interactivity',
          tier: 'Basic',
        },
        {
          id: 'robot_mid',
          name: 'Mid: Simple Talking/Educational Robot',
          description: 'Talks, responds, basic movement',
          benefit: 'Attracts students, simple AI',
          price: 148500,
          notes: 'Functional, moderate AI',
          tier: 'Mid',
        },
        {
          id: 'robot_advanced',
          name: 'Advanced: Full-Feature Humanoid',
          description: 'Walks, talks, sensors, display',
          benefit: 'Major attraction, high engagement',
          price: 370000,
          notes: 'Full interactive, class teaching',
          tier: 'Advanced',
        },
      ],
    },
    safety: {
      title: 'Safety Enclosure',
      options: [
        {
          id: 'safety_basic',
          name: 'Basic: Acrylic desktop cover',
          description: 'For 3D printer/engraver, small',
          benefit: 'Prevents accidents',
          price: 6000,
          notes: 'Just enough for one device',
          tier: 'Basic',
        },
        {
          id: 'safety_mid',
          name: 'Mid: Customized cover (multi)',
          description: 'Bigger enclosure, more durable',
          benefit: 'Covers multiple machines',
          price: 10000,
          notes: 'For all desktop equipment',
          tier: 'Mid',
        },
        {
          id: 'safety_advanced',
          name: 'Advanced: Industrial enclosure',
          description: 'Large, ventilated, heavy-duty',
          benefit: 'Maximum safety/compliance',
          price: 17500,
          notes: 'High safety, supports all machines',
          tier: 'Advanced',
        },
      ],
    },
  }

  useEffect(() => {
    const newTotal = Object.values(selections).reduce((sum, item) => {
      return sum + (item ? item.price : 0)
    }, 0)
    setTotal(newTotal)
  }, [selections])

  const handleCheckbox = (category, option) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category]?.id === option.id ? null : option,
    }))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const exportSelections = () => {
    const selectedItems = Object.entries(selections)
      .filter(([_, item]) => item !== null)
      .map(([category, item]) => ({
        category: hardwareData[category].title,
        ...item,
      }))

    const dataStr = JSON.stringify(selectedItems, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportFileDefaultName = `evolution-lab-selection-${Date.now()}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const tierColors = {
    Basic: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    Mid: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    Advanced: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200',
  }

  return (
    <>
      <Helmet>
        <title>Evolution Lab - Hardware Selection | ZeroAI Technologies Inc</title>
        <meta
          name="description"
          content="Configure your Evolution Lab with professional hardware selection. Package range ₹3L - ₹5L."
        />
      </Helmet>

      <div className="min-h-screen pt-32 pb-20">
        {/* Header */}
        <section className="section bg-gradient-to-br from-light-accent/10 to-transparent dark:from-dark-accent/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="heading-xl mb-4">Evolution Lab: The Discovery Stage</h1>
              <p className="text-2xl text-light-accent dark:text-dark-accent font-semibold mb-8">
                "Innovation Takes Shape"
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="card text-center">
                  <div className="text-4xl mb-2">💰</div>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Package Price Range
                  </p>
                  <p className="text-xl font-bold text-light-accent dark:text-dark-accent">
                    ₹3L - ₹5L
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-2">🕐</div>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Setup Time
                  </p>
                  <p className="text-xl font-bold text-light-accent dark:text-dark-accent">
                    5-7 days
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Ideal For
                  </p>
                  <p className="text-xl font-bold text-light-accent dark:text-dark-accent">
                    Schools with technical stream
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Selection Section */}
        <section className="section">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Select Your Hardware Components</h2>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Choose one option from each category. All three tiers (Basic, Mid, Advanced) are
                shown for each hardware type.
              </p>
            </div>

            {Object.entries(hardwareData).map(([categoryKey, category]) => (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="heading-md mb-6 text-light-accent dark:text-dark-accent">
                  {category.title}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.options.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ y: -4 }}
                      onClick={() => handleCheckbox(categoryKey, option)}
                      className={`card cursor-pointer transition-all ${
                        selections[categoryKey]?.id === option.id
                          ? 'ring-2 ring-light-accent dark:ring-dark-accent shadow-lift'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            tierColors[option.tier]
                          }`}
                        >
                          {option.tier}
                        </span>
                        <input
                          type="checkbox"
                          checked={selections[categoryKey]?.id === option.id}
                          readOnly
                          className="w-5 h-5"
                        />
                      </div>
                      <h4 className="font-semibold mb-2">{option.name}</h4>
                      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-2">
                        {option.description}
                      </p>
                      <div className="text-sm mb-2">
                        <strong>Benefit:</strong> {option.benefit}
                      </div>
                      <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary italic mb-3">
                        {option.notes}
                      </div>
                      <div className="text-2xl font-bold text-light-accent dark:text-dark-accent">
                        {formatPrice(option.price)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="section bg-light-surface dark:bg-dark-surface">
          <div className="container-custom">
            <div className="glass-card max-w-3xl mx-auto">
              <h2 className="heading-lg mb-6">Your Selection Summary</h2>

              {Object.keys(selections).length === 0 ? (
                <p className="text-center text-light-textSecondary dark:text-dark-textSecondary py-8">
                  No items selected yet. Click on cards above to select.
                </p>
              ) : (
                <div className="space-y-3 mb-6">
                  {Object.entries(selections).map(
                    ([category, item]) =>
                      item && (
                        <div
                          key={category}
                          className="flex justify-between items-center p-3 bg-light-background dark:bg-dark-background rounded-lg"
                        >
                          <div>
                            <strong>{hardwareData[category].title}:</strong>
                            <span className="ml-2 text-sm">{item.name}</span>
                          </div>
                          <span className="font-bold text-light-accent dark:text-dark-accent">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      )
                  )}
                </div>
              )}

              <div className="border-t border-light-border dark:border-dark-border pt-6 mb-6">
                <div className="flex justify-between items-center text-2xl font-bold mb-4">
                  <span>Total Investment:</span>
                  <span
                    className={`${
                      total > 500000
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-light-accent dark:text-dark-accent'
                    }`}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                {total > 500000 && (
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    ⚠️ Your selection exceeds the maximum budget of ₹5,00,000
                  </p>
                )}
                {total > 0 && total <= 500000 && (
                  <p className="text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
                    <FaCheckCircle /> Within budget range (₹3L - ₹5L)
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={exportSelections}
                  disabled={Object.keys(selections).length === 0}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  <FaDownload /> Export Selection
                </button>
                <button
                  disabled={Object.keys(selections).length === 0 || total > 500000}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <FaPaperPlane /> Submit Quote Request
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="section">
          <div className="container-custom">
            <div className="card max-w-3xl mx-auto">
              <h3 className="heading-md mb-6">Additional Services Available</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Training (1 day/week):</span>
                  <strong>₹50,000/year</strong>
                </li>
                <li className="flex justify-between">
                  <span>Training (3 days/week):</span>
                  <strong>₹1,50,000/year</strong>
                </li>
                <li className="flex justify-between">
                  <span>Training (5 days/week):</span>
                  <strong>₹2,40,000/year</strong>
                </li>
                <li className="flex justify-between">
                  <span>Teacher Training (no IBM cert):</span>
                  <strong>₹15,000/instructor</strong>
                </li>
                <li className="flex justify-between">
                  <span>Teacher Training (with IBM cert):</span>
                  <strong>₹35,000/instructor</strong>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default EvolutionLab
