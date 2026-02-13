import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeader } from '@/components/shared/section-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { HARDWARE_TIERS, formatINR } from '@/config'

export default function EvolutionLabPage() {
  const [selectedTier, setSelectedTier] = useState('tier1')

  const currentTier = HARDWARE_TIERS.find((t) => t.id === selectedTier)

  return (
    <>
      <PageHeader
        title="Evolution Lab - Hardware Selection"
        subtitle="Build your perfect robotics lab with our comprehensive hardware catalog"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Select Your Tier"
            subtitle="Choose the tier that matches your budget and requirements"
          />

          {/* Tier Selector */}
          <div className="max-w-6xl mx-auto mb-12">
            <Tabs value={selectedTier} onValueChange={setSelectedTier}>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
                {HARDWARE_TIERS.map((tier) => (
                  <TabsTrigger
                    key={tier.id}
                    value={tier.id}
                    className="flex-col items-start p-4 data-[state=active]:border-t-4"
                    style={{
                      borderTopColor:
                        selectedTier === tier.id ? tier.color : 'transparent',
                    }}
                  >
                    <div className="text-left w-full">
                      <div className="font-bold text-sm">{tier.name.split(':')[1]}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {tier.subtitle.split('-')[1]}
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {HARDWARE_TIERS.map((tier) => (
                <TabsContent key={tier.id} value={tier.id} className="mt-8">
                  {/* Tier Header */}
                  <div
                    className="bg-white dark:bg-gray-800 rounded-lg p-8 border-t-4 border-gray-200 dark:border-gray-700 mb-8"
                    style={{ borderTopColor: tier.color }}
                  >
                    <h2 className="text-3xl font-bold mb-2">{tier.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{tier.subtitle}</p>
                    <div className="flex items-center gap-4">
                      <Badge style={{ backgroundColor: tier.color }}>
                        Max Budget: {formatINR(tier.maxBudget)}
                      </Badge>
                    </div>
                  </div>

                  {/* Hardware Categories */}
                  <div className="space-y-6">
                    {tier.hardware.map((category, catIdx) => (
                      <div
                        key={catIdx}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        <Accordion type="single" collapsible>
                          <AccordionItem value={`category-${catIdx}`} className="border-0">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                              <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold">{category.category}</h3>
                                <Badge variant="secondary">{category.items.length} options</Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                              <div className="space-y-4 pt-4">
                                {category.items.map((item, itemIdx) => (
                                  <div
                                    key={itemIdx}
                                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                                  >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Badge variant="outline" className="text-xs">
                                            {item.type}
                                          </Badge>
                                          <h4 className="font-semibold">{item.name}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                          {item.description}
                                        </p>
                                        <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                                          ✓ {item.benefit}
                                        </p>
                                      </div>
                                      <div className="mt-2 md:mt-0 md:ml-4 text-left md:text-right flex-shrink-0">
                                        <div className="font-bold text-lg" style={{ color: tier.color }}>
                                          {formatINR(item.priceMin)} - {formatINR(item.priceMax)}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                          {item.notes}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Our experts can help you select the right hardware for your lab based on your budget
              and requirements.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-green-600 dark:bg-green-500 text-white rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
            >
              Get Expert Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
