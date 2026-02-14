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
        <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-foreground bg-accent rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
