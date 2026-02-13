import { Link } from 'react-router'
import {
  Award,
  Globe,
  Handshake,
  BadgeCheck,
  Lightbulb,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { useScrollFadeIn } from '@/hooks/use-scroll-fade-in'
import { useStaggerFadeIn } from '@/hooks/use-stagger-animation'
import { SectionHeader } from '@/components/shared/section-header'
import { StatCard } from '@/components/shared/stat-card'
import { Button } from '@/components/ui/button'
import { HOME_CONTENT, COMPANY_STATS } from '@/config'

export default function HomePage() {
  const heroRef = useScrollFadeIn()
  const trustRef = useStaggerFadeIn()
  const statsRef = useStaggerFadeIn()
  const offeringsRef = useStaggerFadeIn()
  const reasonsRef = useStaggerFadeIn()
  const ctaRef = useScrollFadeIn()

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div ref={heroRef} className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-card/50 backdrop-blur-sm rounded-full text-sm font-medium border border-border">
              <Award className="text-primary" />
              {HOME_CONTENT.hero.badge}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {HOME_CONTENT.hero.title}
              <span className="block text-primary mt-2">
                {HOME_CONTENT.hero.titleAccent}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {HOME_CONTENT.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={HOME_CONTENT.hero.cta.primary.path}>
                <Button size="lg" className="gap-2">
                  {HOME_CONTENT.hero.cta.primary.label}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={HOME_CONTENT.hero.cta.secondary.path}>
                <Button size="lg" variant="outline">
                  {HOME_CONTENT.hero.cta.secondary.label}
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div ref={trustRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {HOME_CONTENT.trustIndicators.map((item, index) => (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border"
                >
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge={HOME_CONTENT.introduction.badge}
              title={HOME_CONTENT.introduction.title}
            />

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border space-y-4 text-center">
              {HOME_CONTENT.introduction.content.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0 ? 'text-lg' : 'text-muted-foreground'
                  }
                >
                  {paragraph}
                </p>
              ))}

              <div
                ref={statsRef}
                className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border"
              >
                <StatCard number={COMPANY_STATS.projects} label="Automation Projects" />
                <StatCard number={COMPANY_STATS.solutions} label="Robotics Solutions" />
                <StatCard number={COMPANY_STATS.students} label="Students Trained" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Offerings */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="What We Do"
            subtitle="Three integrated verticals driving innovation across industries"
          />

          <div ref={offeringsRef} className="grid md:grid-cols-3 gap-8">
            {HOME_CONTENT.offerings.map((offering, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="text-6xl font-bold text-muted-foreground/30 mb-4">
                  {offering.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{offering.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {offering.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary font-medium group"
                >
                  Explore Solutions
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={HOME_CONTENT.whyChooseUs.title}
            subtitle={HOME_CONTENT.whyChooseUs.subtitle}
          />

          <div ref={reasonsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_CONTENT.whyChooseUs.reasons.map((item, index) => {
              const icons = [Lightbulb, Handshake, BadgeCheck, Globe]
              const Icon = icons[index]
              return (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border text-center"
                >
                  <Icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div ref={ctaRef} className="max-w-3xl mx-auto text-center">
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">{HOME_CONTENT.cta.title}</h2>
            <p className="text-lg mb-8 opacity-90">{HOME_CONTENT.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={HOME_CONTENT.cta.actions.primary.path}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-primary hover:bg-background/90"
                >
                  {HOME_CONTENT.cta.actions.primary.label}
                </Button>
              </Link>
              <Link to={HOME_CONTENT.cta.actions.secondary.path}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  {HOME_CONTENT.cta.actions.secondary.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
