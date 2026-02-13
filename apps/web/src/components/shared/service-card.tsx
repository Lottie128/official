import { Link } from 'react-router'
import { ArrowRight, Factory, Bot, GraduationCap, FlaskConical } from 'lucide-react'
import { useHoverLift } from '@/hooks/use-hover-lift'

const iconMap = {
  'industrial-automation': Factory,
  'robotics-solutions': Bot,
  'educational-technology': GraduationCap,
  'research-development': FlaskConical,
}

interface ServiceCardProps {
  id: string
  title: string
  description: string
  features: string[]
  link?: string
}

export function ServiceCard({ id, title, description, features, link }: ServiceCardProps) {
  const ref = useHoverLift()
  const Icon = iconMap[id as keyof typeof iconMap] || Bot

  const CardContent = (
    <div
      ref={ref}
      className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border h-full transition-shadow hover:shadow-lg"
    >
      <Icon className="w-14 h-14 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
      {link && (
        <div className="mt-6 flex items-center gap-2 text-primary font-medium text-sm">
          Explore Solutions <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </div>
  )

  if (link) {
    return <Link to={link}>{CardContent}</Link>
  }

  return CardContent
}
