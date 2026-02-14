import { PageHeader } from '@/components/shared/page-header'
import { ServiceCard } from '@/components/shared/service-card'
import { useStaggerFadeIn } from '@/hooks/use-stagger-animation'
import { SERVICES } from '@/config'

export default function ServicesPage() {
  const servicesRef = useStaggerFadeIn()

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive automation and robotics solutions tailored to your needs"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={servicesRef} className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
