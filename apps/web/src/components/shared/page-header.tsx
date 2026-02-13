import { useScrollFadeIn } from '@/hooks/use-scroll-fade-in'

interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
}

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  const ref = useScrollFadeIn()

  return (
    <section ref={ref} className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-transparent mx-auto mb-6" />
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
