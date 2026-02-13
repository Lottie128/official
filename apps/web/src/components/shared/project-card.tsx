import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { useHoverLift } from '@/hooks/use-hover-lift'
import { CATEGORY_COLORS } from '@/config'
import { Badge } from '@/components/ui/badge'

interface ProjectCardProps {
  name: string
  description: string
  category: string
  tech: string[]
}

export function ProjectCard({ name, description, category, tech }: ProjectCardProps) {
  const ref = useHoverLift()

  return (
    <div
      ref={ref}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg group"
    >
      <Badge variant="secondary" className="mb-4">
        {category}
      </Badge>
      <h3 className="text-xl font-semibold mb-3">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((item, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm group-hover:gap-3 transition-all"
      >
        Learn More <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
