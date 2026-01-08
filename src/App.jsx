import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Products from './pages/Products'
import Team from './pages/Team'
import Contact from './pages/Contact'
import BusinessPlan from './pages/BusinessPlan'
import PitchDeck from './pages/PitchDeck'
import EvolutionLab from './pages/EvolutionLab'
import RoboticsLab from './pages/RoboticsLab'
import HardwareSelection from './pages/HardwareSelection'

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="products" element={<Products />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="business-plan" element={<BusinessPlan />} />
          <Route path="pitch-deck" element={<PitchDeck />} />
          <Route path="evolution-lab" element={<EvolutionLab />} />
          <Route path="robotics-lab" element={<RoboticsLab />} />
          <Route path="hardware-selection" element={<HardwareSelection />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
