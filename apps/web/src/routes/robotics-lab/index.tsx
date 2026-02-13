import { PageHeader } from '@/components/shared/page-header'
import { SectionHeader } from '@/components/shared/section-header'
import { useStaggerFadeIn } from '@/hooks/use-stagger-animation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { LAB_PACKAGES } from '@/config'

export default function RoboticsLabPage() {
  const packagesRef = useStaggerFadeIn()

  return (
    <>
      <PageHeader
        title="Robotics Lab Packages"
        subtitle="Transform your institution with comprehensive robotics training packages"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Training Packages"
            subtitle="Choose the perfect package for your educational needs"
          />

          <div ref={packagesRef} className="space-y-8 max-w-6xl mx-auto">
            {LAB_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                style={{ borderTopColor: pkg.color, borderTopWidth: '4px' }}
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <Badge className="mb-2" style={{ backgroundColor: pkg.color }}>
                        {pkg.tier}
                      </Badge>
                      <h3 className="text-3xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                        {pkg.subtitle}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                        "{pkg.theme}"
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                      <div className="text-3xl font-bold" style={{ color: pkg.color }}>
                        {pkg.price}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Setup: {pkg.setupTime}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Purpose:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{pkg.purpose}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Ideal For:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{pkg.ideal}</p>
                  </div>

                  {/* Components Accordion */}
                  <Accordion type="single" collapsible className="mb-6">
                    <AccordionItem value="components">
                      <AccordionTrigger className="text-lg font-semibold">
                        Package Components ({pkg.components.length} items)
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                          {pkg.components.map((component, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                            >
                              <h5 className="font-semibold mb-1">{component.name}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {component.spec}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {component.usage}
                              </p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Learning Impact */}
                  <div>
                    <h4 className="font-semibold mb-3">Students Will Learn:</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {pkg.impact.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Contact us to discuss which package best fits your institution's needs and get a
              detailed quote.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-green-600 dark:bg-green-500 text-white rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
