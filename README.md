# ZeroAI Tech Official Website

🚀 **Professional company website** with modern design, glassmorphism effects, and smooth animations.

## ✨ Features

- 🎨 **Clean Design** - Off-white & black color scheme inspired by Apple and Google
- 🌓 **Dark/Light Mode** - Smooth theme switching
- 💎 **Glassmorphism** - Modern glass effects with Tailwind CSS
- ⚡ **Lightning Fast** - Built with Vite 6 and Bun
- 📱 **Mobile First** - Fully responsive design
- ♿ **Accessible** - WCAG compliant
- 🎭 **Smooth Animations** - Powered by Framer Motion

## 🛠️ Tech Stack

- **Framework:** React 18.3+
- **Build Tool:** Vite 6.0+
- **Package Manager:** Bun 1.1+
- **Styling:** Tailwind CSS 3.4+
- **Animations:** Framer Motion 12+
- **Routing:** React Router v7
- **Email:** EmailJS

## 🚀 Quick Start

### Prerequisites

- Install [Bun](https://bun.sh) (recommended) or Node.js 18+

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun preview
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📁 Project Structure

```
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## 🎨 Design System

### Colors

- **Off-White:** `#FAFAFA` (Light mode background)
- **Black:** `#0A0A0A` (Dark mode background)
- **Accent:** Subtle grays for hierarchy

### Typography

- **Headings:** Inter, sans-serif
- **Body:** System fonts for optimal performance

## 📦 Build & Deploy

### Build for Production

```bash
bun run build
```

Output will be in the `dist/` directory.

### Deploy to Shared Hosting

1. Build the project: `bun run build`
2. Upload the contents of `dist/` folder to your hosting
3. Configure your server to serve `index.html` for all routes

### Server Configuration

**Apache (.htaccess)**

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 🤝 Contributing

This is a private project. For questions or suggestions, contact the development team.

## 📄 License

© 2026 ZeroAI Technologies Inc. All rights reserved.

---

**Built with ❤️ by ZeroAI Tech Team**
