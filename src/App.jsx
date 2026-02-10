import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import BusinessPlan from './pages/BusinessPlan'
import EvolutionLab from './pages/EvolutionLab'
import RoboticsLab from './pages/RoboticsLab'
import HardwareSelection from './pages/HardwareSelection'
import BCMProposal from './pages/BCMProposal'
import RoboticsTraining from './pages/RoboticsTraining'
import Sitemap from './pages/Sitemap'

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
        <Navbar />
        <ScrollToTop />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/business-plan" element={<BusinessPlan />} />
            <Route path="/evolution-lab" element={<EvolutionLab />} />
            <Route path="/robotics-lab" element={<RoboticsLab />} />
            <Route path="/hardware-selection" element={<HardwareSelection />} />
            <Route path="/bcm-proposal" element={<BCMProposal />} />
            <Route path="/robotics-training" element={<RoboticsTraining />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App