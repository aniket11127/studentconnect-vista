
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    resources: [
      { name: 'Help Center', path: '/help' },
      { name: 'Community', path: '/community' },
      { name: 'Certification', path: '/certification' },
      { name: 'Resume Builder', path: '/resume-builder' },
      { name: 'Career Guidance', path: '/career' },
    ],
    skills: [
      { name: 'MS Office', path: '/curriculum' },
      { name: 'Python', path: '/curriculum' },
      { name: 'HTML & CSS', path: '/curriculum' },
      { name: 'SQL', path: '/curriculum' },
      { name: 'Public Speaking', path: '/curriculum' },
    ],
  };

  return (
    <footer className="bg-secondary/50 py-12 lg:py-16 mt-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and info - Updated contact information */}
          <div className="space-y-5 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 font-bold text-xl" aria-label="SGK14 - Home">
              <div className="h-12 w-auto">
                <img 
                  src="/lovable-uploads/a7b92d72-5b5a-4c45-b8d6-df9a520a09df.png" 
                  alt="SGK14 Logo" 
                  className="h-full w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
                  loading="lazy"
                />
              </div>
              <span className="text-primary font-semibold">SGK14</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto md:mx-0">
              Empowering MP Board students with essential digital skills and career guidance for a successful future.
            </p>
            <div className="space-y-3 text-sm">
              <a 
                href="mailto:info.sgk14@gmail.com" 
                className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground hover:text-foreground hover:underline transition-all duration-200" 
                aria-label="Email us"
                target="_blank"
                rel="noopener"
              >
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>info.sgk14@gmail.com</span>
              </a>
              <a 
                href="tel:+917869094321" 
                className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground hover:text-foreground hover:underline transition-all duration-200" 
                aria-label="Call us"
                target="_blank"
                rel="noopener"
              >
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+91 78690 94321</span>
              </a>
              <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary flex-shrink-0" />
                <span>Vijay Nagar, Indore, Madhya Pradesh</span>
              </div>
            </div>
            
            {/* Privacy Verified Badge */}
            <div className="flex items-center justify-center md:justify-start gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Privacy Verified
              </div>
            </div>
          </div>

          {/* Company links */}
          <div className="text-center md:text-left">
            <h3 className="font-medium text-base mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills links - Replaced Courses with Skills */}
          <div className="text-center md:text-left">
            <h3 className="font-medium text-base mb-5">Skills</h3>
            <ul className="space-y-3">
              {footerLinks.skills.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="text-center md:text-left">
            <h3 className="font-medium text-base mb-5">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} SGK14. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com/sgk14" className="w-9 h-9 rounded-full flex items-center justify-center bg-background hover:bg-primary/10 transition-colors" aria-label="Facebook">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://twitter.com/sgk14_edtech" className="w-9 h-9 rounded-full flex items-center justify-center bg-background hover:bg-primary/10 transition-colors" aria-label="Twitter">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
                aria-hidden="true"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="https://instagram.com/sgk14_edtech" className="w-9 h-9 rounded-full flex items-center justify-center bg-background hover:bg-primary/10 transition-colors" aria-label="Instagram">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://linkedin.com/company/sgk14-edtech" className="w-9 h-9 rounded-full flex items-center justify-center bg-background hover:bg-primary/10 transition-colors" aria-label="LinkedIn">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
