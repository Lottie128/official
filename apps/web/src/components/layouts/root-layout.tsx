import { Outlet } from 'react-router'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { Toaster } from '@/components/ui/sonner'
import { SeoHead } from '@/components/seo/seo-head'

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
