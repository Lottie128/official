import { useEffect } from 'react'
import { useUIStore } from '@/stores/ui-store'

export function useTheme() {
  const { theme, toggleTheme } = useUIStore()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return { theme, toggleTheme }
}
