export const PROJECTS = [
  {
    id: 'smart-driveshaft',
    name: 'Smart Driveshaft Paint System',
    description: 'AI-integrated automated painting system with precision control and quality assurance.',
    category: 'Industrial Automation',
    tech: ['AI', 'Automation', 'Quality Control'],
  },
  {
    id: 'service-robot',
    name: 'Human-Height Service Robot',
    description: 'Fully autonomous, voice-controlled service robot for hospitality and healthcare.',
    category: 'Robotics',
    tech: ['Autonomous Navigation', 'Voice Control', 'Computer Vision'],
  },
  {
    id: 'farmauto',
    name: 'FarmAuto',
    description: 'RC farming robot - semi-autonomous agricultural bot for precision farming operations.',
    category: 'Agricultural Tech',
    tech: ['Robotics', 'Precision Agriculture', 'Automation'],
  },
  {
    id: 'robotics-kits',
    name: 'ZeroAI Robotics Kits',
    description: 'DIY STEM educational kits for hands-on learning in robotics and automation.',
    category: 'Education',
    tech: ['Education', 'Robotics', 'STEM'],
  },
  {
    id: 'home-assistant',
    name: 'Home Assistant Integration',
    description: 'Voice-based control systems for smart home automation and IoT devices.',
    category: 'Smart Home',
    tech: ['IoT', 'Voice Control', 'Automation'],
  },
  {
    id: 'autonomous-navigation',
    name: 'Autonomous Navigation Systems',
    description: 'Advanced navigation and path-planning solutions for mobile robots.',
    category: 'Robotics',
    tech: ['Autonomous Navigation', 'Path Planning', 'Computer Vision'],
  },
]

export const CATEGORY_COLORS: Record<string, string> = {
  'Industrial Automation': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
  Robotics: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
  'Agricultural Tech': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
  Education: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200',
  'Smart Home': 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200',
}
