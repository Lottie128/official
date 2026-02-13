import { Outlet } from 'react-router'
import { Navbar } from './navbar'
import { Footer } from './footer'

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
