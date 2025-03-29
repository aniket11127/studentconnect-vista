
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'
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
          <img 
            src="/logo.png" 
            alt="SGK14 Logo" 
            width="40" 
            height="40" 
            className="h-10 w-auto"
            loading="eager"
          />
          <span>SGK14</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              aria-label={`Navigate to ${link.name}`}
            >
              {link.name}
            </Link>
          ))}
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
          <div className="md:hidden fixed inset-0 z-50 glass animate-fade-in">
            <div className="flex flex-col h-full pt-20 pb-6 px-6">
              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={closeMenu}
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
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
