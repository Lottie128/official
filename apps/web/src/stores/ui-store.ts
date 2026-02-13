import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface UIState {
  theme: Theme
  mobileMenuOpen: boolean
  quoteDialogOpen: boolean
  quoteDialogData: Record<string, unknown> | null
  toggleTheme: () => void
  setMobileMenuOpen: (open: boolean) => void
  setQuoteDialogOpen: (open: boolean, data?: Record<string, unknown>) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      mobileMenuOpen: false,
      quoteDialogOpen: false,
      quoteDialogData: null,
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      setQuoteDialogOpen: (open, data = null) =>
        set({ quoteDialogOpen: open, quoteDialogData: data }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
