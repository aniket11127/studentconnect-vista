
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Curriculum', path: '/curriculum' },
    { name: 'AI Chat', path: '/ai-chat' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-background/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-xl tracking-tight"
          onClick={closeMenu}
          aria-label="SGK14 - Home"
        >
          <div className="h-12 w-auto relative flex items-center justify-center">
            <img 
              src="/lovable-uploads/a7b92d72-5b5a-4c45-b8d6-df9a520a09df.png" 
              alt="SGK14 Logo" 
              className="h-full w-auto object-contain"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
              loading="eager"
            />
          </div>
          <span className="hidden sm:inline-block ml-2 text-primary font-semibold">SKILL GROWTH & KNOWLEDGE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors px-2 py-1 rounded-md",
                    isActive(link.path) 
                      ? "text-primary font-semibold" 
                      : "text-foreground/80 hover:text-primary hover:bg-accent/50"
                  )}
                  aria-label={`Navigate to ${link.name}`}
                >
                  {link.name}
                  {link.name === 'AI Chat' && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full">New</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground p-2 rounded-md focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-in fade-in">
            <div className="flex flex-col h-full pt-20 pb-6 px-6">
              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-lg font-medium transition-colors p-2 rounded-md", 
                      isActive(link.path) 
                        ? "text-primary font-semibold bg-primary/10" 
                        : "hover:text-primary hover:bg-accent/50"
                    )}
                    onClick={closeMenu}
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                    {link.name === 'AI Chat' && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full">New</span>
                    )}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3 mt-auto">
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={closeMenu}>
                    Log in
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/signup" onClick={closeMenu}>
                    Sign up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
