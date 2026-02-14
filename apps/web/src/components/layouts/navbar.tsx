import { Link, useLocation } from 'react-router'
import { Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useUIStore } from '@/stores/ui-store'
import { useTheme } from '@/hooks/use-theme'
import { NAV_LINKS } from '@/config'
import { cn } from '@/lib/utils'
import Logo from '@/assets/logo'
import { prefetchRoute } from '@/routes/prefetch'

export function Navbar() {
  const location = useLocation()
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { theme, toggleTheme } = useTheme()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleIntentPrefetch = (path: string) => {
    prefetchRoute(path)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg hidden sm:inline">ZeroAI Technologies</span>
            <span className="font-bold text-lg sm:hidden">ZeroAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => handleIntentPrefetch(link.path)}
                onFocus={() => handleIntentPrefetch(link.path)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(link.path)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-accent/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">Open navigation menu</span>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-4 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onMouseEnter={() => handleIntentPrefetch(link.path)}
                      onFocus={() => handleIntentPrefetch(link.path)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                        isActive(link.path)
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
