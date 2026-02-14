export const LAB_PACKAGES = [
  {
    id: 1,
    tier: 'Tier 1',
    name: 'Ignition Lab',
    subtitle: 'The Foundation Stage',
    theme: 'Curiosity Begins Here',
    price: '₹ 0.5L - ₹ 2.5L',
    setupTime: '2-3 days',
    purpose: 'Introduce students to robotics, programming, and problem-solving basics',
    ideal: 'Schools beginning their robotics journey',
    color: 'var(--lab-ignition)',
    components: [
      {
        name: 'Desktop Workstation',
        spec: 'Intel i5 / 8GB / 256GB SSD',
        usage: 'Used by students to code, design, and control robots.',
      },
      {
        name: '3D Printer (Basic)',
        spec: 'PLA-based, 200x200x200mm',
        usage: 'Students can design and print small robot parts and models.',
      },
      {
        name: 'Arduino Robotics Kit',
        spec: 'Basic microcontroller + sensors',
        usage: 'For simple robot and automation projects.',
      },
      {
        name: 'IoT Starter Kit',
        spec: 'ESP32 / Wi-Fi module + sensors',
        usage: 'Introduces students to smart devices and IoT basics.',
      },
      {
        name: 'Smart Mini Projector',
        spec: 'Portable, HDMI-compatible',
        usage: 'Used for lessons, tutorials, and displaying projects.',
      },
      {
        name: 'Furniture (Tables & Chairs)',
        spec: '2 desks + 2 chairs',
        usage: 'Provides comfortable, safe workspace for students.',
      },
      {
        name: 'Safety & Tool Kit',
        spec: 'Goggles, gloves, soldering iron, tools',
        usage: 'For safe electronics work and basic assembly.',
      },
    ],
    impact: [
      'How electricity powers robots',
      'Simple coding (block-based or Arduino)',
      'Problem-solving and teamwork',
      'The joy of building something real',
    ],
  },
  {
    id: 2,
    tier: 'Tier 2',
    name: 'Evolution Lab',
    subtitle: 'The Discovery Stage',
    theme: 'Innovation Takes Shape',
    price: '₹ 3L - ₹ 5L',
    setupTime: '5-7 days',
    purpose: 'Expand creativity by combining robotics, 3D design, and smart technology',
    ideal: 'Schools with technical stream or early engineering focus',
    color: 'var(--lab-evolution)',
    components: [
      {
        name: 'Upgraded 3D Printer',
        spec: 'Dual material, 300x300x400mm',
        usage: 'Prints stronger and larger prototypes.',
      },
      {
        name: 'Laser Cutter / Engraver',
        spec: 'CO₂ 40W desktop',
        usage: 'Used for cutting wood, acrylic, and engraving designs.',
      },
      {
        name: 'AI & ML Starter Kit',
        spec: 'Raspberry Pi + Camera',
        usage: 'Introduces face and object recognition.',
      },
      {
        name: 'Smart Lighting System',
        spec: 'Wi-Fi RGB bulbs',
        usage: 'Demonstrates IoT automation visually.',
      },
      {
        name: 'Touchscreen Display / Kiosk',
        spec: '21-inch interactive display',
        usage: 'For showing ongoing projects and lessons.',
      },
      {
        name: 'Safety Enclosure',
        spec: 'Acrylic laser/3D printer cover',
        usage: 'Protects students during machine operation.',
      },
    ],
    impact: [
      'How smart homes and cities work',
      'The basics of AI and automation',
      'To build functional, real-world mini-projects',
    ],
  },
  {
    id: 3,
    tier: 'Tier 3',
    name: 'Intelligence Lab',
    subtitle: 'The Innovation Stage',
    theme: 'Machines That Think',
    price: '₹ 5L - ₹ 8L',
    setupTime: '10-14 days',
    purpose:
      'Equip students with advanced tools to create intelligent robots and automation systems',
    ideal: 'Colleges, polytechnics, and research institutions',
    color: 'var(--lab-intelligence)',
    components: [
      {
        name: 'Advanced Workstations',
        spec: 'i7 / 16GB / GPU',
        usage: 'For AI model training and robotics simulation.',
      },
      {
        name: 'Industrial-Grade 3D Printer',
        spec: 'High precision / large build volume',
        usage: 'Creates durable robot frames and parts.',
      },
      {
        name: 'PLC Trainer Kit',
        spec: 'Siemens / Delta compact PLC',
        usage: 'Teaches industrial automation logic.',
      },
      {
        name: 'AR/VR Headsets',
        spec: 'Meta Quest / Pico',
        usage: 'For virtual design, visualization, and safety training.',
      },
      {
        name: 'Digital Dashboard',
        spec: 'PC-based IoT display',
        usage: 'Shows live data from devices and sensors.',
      },
      {
        name: 'Safety & Environmental Sensors',
        spec: 'Gas, fire, temp sensors',
        usage: 'Ensures lab safety and automation alerts.',
      },
    ],
    impact: [
      'Artificial intelligence, machine vision, and automation basics',
      'To build semi-autonomous robots and control systems',
      'To collaborate like real engineers in a safe, futuristic environment',
    ],
  },
  {
    id: 4,
    tier: 'Tier 4',
    name: 'Singularity Lab',
    subtitle: 'The Future Stage',
    theme: 'Where Education Meets the Future',
    price: '₹ 8L - ₹ 15L+',
    setupTime: '20-30 days',
    purpose:
      'Create a fully automated, AI-powered, next-generation robotics lab for advanced innovation',
    ideal: 'Universities, research centers, and innovation hubs',
    color: 'var(--lab-singularity)',
    components: [
      {
        name: 'AI Workstation / Server',
        spec: 'GPU cluster / AI-ready PC',
        usage: 'For training AI and deep learning models.',
      },
      {
        name: 'Autonomous Service Robot',
        spec: 'Custom-built mobile robot',
        usage: 'Acts as a demo robot for visitors and learning.',
      },
      {
        name: 'Smart Glass Display / Mirror',
        spec: 'Interactive glass interface',
        usage: 'Displays school info, weather, and controls.',
      },
      {
        name: 'Full Home Assistant System',
        spec: 'Integrated automation setup',
        usage: 'Controls lights, fans, doors, and music via voice.',
      },
      {
        name: 'Smart Workstations',
        spec: 'Desks with motion sensors',
        usage: 'Auto-adjust lighting and power based on activity.',
      },
      {
        name: 'VR Robotics Training',
        spec: 'Full VR simulation suite',
        usage: 'Allows virtual robotics practice safely.',
      },
      {
        name: 'Smart Security System',
        spec: 'AI cameras + biometric access',
        usage: 'Secure, monitored 24/7.',
      },
      {
        name: 'Robotic Arm',
        spec: 'Educational or collaborative robot',
        usage: 'Demonstrates industrial automation.',
      },
    ],
    impact: [
      'What the future of work looks like',
      'How AI, robotics, and automation integrate seamlessly',
      'To step into a fully functioning innovation lab',
    ],
  },
  {
    id: 5,
    tier: 'Custom',
    name: 'Infinity Lab',
    subtitle: 'The Limitless Stage',
    theme: 'No Limits, Just Vision',
    price: '₹ 15L+',
    setupTime: '30+ days',
    purpose: 'Create a bespoke, industry-leading innovation center customized to your vision',
    ideal: 'Large universities, corporate research centers, and innovation hubs',
    color: 'var(--lab-infinity)',
    components: [
      {
        name: 'Custom Hardware Selection',
        spec: 'Tailored to specific needs',
        usage: 'Built around your institution\'s goals.',
      },
      {
        name: 'Advanced AI Infrastructure',
        spec: 'Multi-GPU servers, cloud integration',
        usage: 'Enterprise-level AI research and deployment.',
      },
      {
        name: 'Multiple Autonomous Robots',
        spec: 'Service, industrial, and research robots',
        usage: 'Complete robotics ecosystem.',
      },
      {
        name: 'Full Smart Building Integration',
        spec: 'Building-wide automation',
        usage: 'Lights, climate, security, all automated.',
      },
      {
        name: 'Extended Reality Lab',
        spec: 'VR/AR/MR systems',
        usage: 'Immersive learning and design.',
      },
      {
        name: 'Industrial Manufacturing Equipment',
        spec: 'CNC, laser cutters, industrial 3D printers',
        usage: 'Production-grade prototyping.',
      },
    ],
    impact: [
      'Build a world-class innovation center',
      'Attract top talent and funding',
      'Lead the future of education and research',
    ],
  },
]

export const TRAINING_PLANS = [
  { key: 'none', label: 'No Training', fee: 0 },
  { key: '1month', label: '1 Month Training', fee: 25000 },
  { key: '3months', label: '3 Months Training', fee: 65000 },
  { key: '6months', label: '6 Months Training', fee: 120000 },
]

export const TEACHER_TRAINING = [
  { key: 'none', label: 'No Teacher Training', fee: 0 },
  { key: 'basic', label: 'Basic Teacher Training (2 days)', fee: 15000 },
  { key: 'advanced', label: 'Advanced Teacher Training (5 days)', fee: 35000 },
]
