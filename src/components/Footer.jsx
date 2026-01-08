import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Products', path: '/products' },
      { name: 'Team', path: '/team' },
    ],
    resources: [
      { name: 'Business Plan', path: '/business-plan' },
      { name: 'Pitch Deck', path: '/pitch' },
      { name: 'Evolution Lab', path: '/evolution-lab' },
      { name: 'Robotics Lab', path: '/robotics-lab' },
    ],
  }

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="text-2xl font-bold">
                <span className="text-light-accent dark:text-dark-accent">Zero</span>
                <span className="text-light-text dark:text-dark-text">AI</span>
              </div>
            </Link>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              Engineering the future through automation, robotics, and AI-driven innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Lottie128"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-light-text dark:text-dark-text">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 text-light-text dark:text-dark-text">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-light-text dark:text-dark-text">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                <HiLocationMarker className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Ludhiana, Punjab, India</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                <HiMail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@zeroaitech.tech" className="hover:text-light-accent dark:hover:text-dark-accent">
                  info@zeroaitech.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              © {currentYear} ZeroAI Technologies Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <span className="text-light-textSecondary dark:text-dark-textSecondary">
                IBM Partner Plus Member
              </span>
              <span className="text-light-textSecondary dark:text-dark-textSecondary">
                STEM.org Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
