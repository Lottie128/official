import { Factory, GraduationCap, FlaskConical, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeader } from '@/components/shared/section-header'
import { StatCard } from '@/components/shared/stat-card'
import { useScrollFadeIn } from '@/hooks/use-scroll-fade-in'
import { useStaggerFadeIn } from '@/hooks/use-stagger-animation'
import { ABOUT_CONTENT, COMPANY_STATS, INFRASTRUCTURE } from '@/config'

export default function AboutPage() {
  const overviewRef = useScrollFadeIn()
  const missVisionRef = useStaggerFadeIn()
  const divisionsRef = useStaggerFadeIn()
  const statsRef = useStaggerFadeIn()
  const infraRef = useStaggerFadeIn()
  const marketsRef = useStaggerFadeIn()
  const achievementsRef = useStaggerFadeIn()
  const valuesRef = useStaggerFadeIn()
  const visionRef = useStaggerFadeIn()

  const divisionIcons = [Factory, GraduationCap, FlaskConical]

  return (
    <>
      <PageHeader
        title={ABOUT_CONTENT.hero.title}
        subtitle={ABOUT_CONTENT.hero.subtitle}
      />

      {/* Badges */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {ABOUT_CONTENT.hero.badges.map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full text-sm font-medium border border-border"
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={overviewRef} className="max-w-4xl mx-auto">
            <SectionHeader
              badge={ABOUT_CONTENT.overview.badge}
              title={ABOUT_CONTENT.overview.title}
            />

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border space-y-4">
              {ABOUT_CONTENT.overview.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={idx === 0 ? 'text-lg' : 'text-muted-foreground'}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div ref={missVisionRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <div className="text-5xl mb-4">{ABOUT_CONTENT.mission.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{ABOUT_CONTENT.mission.title}</h3>
              <p className="text-muted-foreground">
                {ABOUT_CONTENT.mission.description}
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <div className="text-5xl mb-4">{ABOUT_CONTENT.vision.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{ABOUT_CONTENT.vision.title}</h3>
              <p className="text-muted-foreground">{ABOUT_CONTENT.vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Divisions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Business Divisions"
            subtitle="Three integrated verticals driving innovation and growth"
          />

          <div ref={divisionsRef} className="grid md:grid-cols-3 gap-8">
            {ABOUT_CONTENT.divisions.map((division, index) => {
              const Icon = divisionIcons[index]
              return (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 border border-border"
                >
                  <div className="text-6xl font-bold text-muted-foreground/30 mb-4">
                    {division.number}
                  </div>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{division.title}</h3>
                  <p className="text-muted-foreground">{division.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-gradient-to-br from-accent/30 to-transparent">
        <div className="container mx-auto px-4">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <StatCard number={COMPANY_STATS.projects} label="Automation Projects" />
            <StatCard number={COMPANY_STATS.solutions} label="Robotics Solutions" />
            <StatCard number={COMPANY_STATS.students} label="Students Trained" />
            <StatCard number={COMPANY_STATS.countries} label="Countries" />
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge="Infrastructure"
              title="State-of-the-Art Facilities"
            />

            <div ref={infraRef} className="space-y-6">
              {INFRASTRUCTURE.map((item, index) => (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border flex gap-4 items-start"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Target Markets"
            subtitle="Serving diverse sectors with tailored automation and education solutions"
          />

          <div ref={marketsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {ABOUT_CONTENT.targetMarkets.map((market, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border text-center"
              >
                <p className="text-sm font-medium">{market.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader title="Key Achievements & Certifications" />

          <div ref={achievementsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_CONTENT.achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border text-center"
              >
                <h3 className="font-semibold mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Core Values"
            subtitle="The principles that guide everything we do"
          />

          <div ref={valuesRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {ABOUT_CONTENT.values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border text-center"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h4 className="font-semibold mb-2">{value.title}</h4>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Leadership & Team"
            subtitle="Visionaries and experts driving innovation"
          />

          {/* Founder */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-accent text-accent-foreground rounded-full">
                {ABOUT_CONTENT.leadership.founder.title}
              </span>
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary flex items-center justify-center text-primary-foreground text-3xl font-bold">
                {ABOUT_CONTENT.leadership.founder.initials}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {ABOUT_CONTENT.leadership.founder.name}
              </h3>
              <p className="text-primary font-medium mb-3">
                {ABOUT_CONTENT.leadership.founder.role}
              </p>
              <p className="text-muted-foreground">
                {ABOUT_CONTENT.leadership.founder.description}
              </p>
            </div>
          </div>

          {/* Board Advisors */}
          <div className="mb-12">
            <h3 className="text-center text-xl font-semibold mb-6">Board Advisors</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {ABOUT_CONTENT.leadership.advisors.map((advisor, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 border border-border text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent/50 to-accent/20 flex items-center justify-center text-primary text-xl font-bold">
                    {advisor.initials}
                  </div>
                  <h4 className="font-semibold mb-1">{advisor.name}</h4>
                  <p className="text-sm text-muted-foreground">{advisor.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Team */}
          <div>
            <h3 className="text-center text-xl font-semibold mb-6">Executive Team</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {ABOUT_CONTENT.leadership.executives.map((member, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 border border-border text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent/50 to-accent/20 flex items-center justify-center text-primary text-xl font-bold">
                    {member.initials}
                  </div>
                  <h4 className="font-semibold mb-1">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <TrendingUp className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">{ABOUT_CONTENT.futureVision.title}</h2>
            </div>
            <div ref={visionRef} className="space-y-4">
              {ABOUT_CONTENT.futureVision.goals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                >
                  <span className="text-2xl">→</span>
                  <span className="text-lg">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
