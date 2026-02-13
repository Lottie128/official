import { useScrollFadeIn } from '@/hooks/use-scroll-fade-in'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
}

export function SectionHeader({ badge, title, subtitle }: SectionHeaderProps) {
  const ref = useScrollFadeIn()

  return (
    <div ref={ref} className="text-center mb-12">
      {badge && (
        <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </div>
  )
}
