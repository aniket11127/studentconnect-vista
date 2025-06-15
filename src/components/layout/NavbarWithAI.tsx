import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger, 
  DrawerClose 
} from '@/components/ui/drawer';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from '@/components/layout/UserMenu';
import { Button } from '@/components/ui/button';
import { MessageCircle, Code } from 'lucide-react';
import { useEnrollment } from "@/hooks/useEnrollment";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { enrolled, isLoading: enrollLoading } = useEnrollment();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Detect scroll position to apply styling conditionally
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  // Only show portal links if the student is enrolled
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Curriculum', path: '/curriculum' },
    user && enrolled && { name: 'Code Editor', path: '/editor', icon: <Code size={16} className="mr-1" /> },
    user && enrolled && { name: 'AI Chat', path: '/ai-chat' },
    user && enrolled && { name: 'Videos', path: '/videos' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ].filter(Boolean);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-10 md:h-12 w-auto flex items-center">
              <img 
                src="/lovable-uploads/4eaa1a0e-6c88-482c-92bd-3faa661433cd.png" 
                alt="SGK14 EdTech" 
                className="h-full w-auto object-contain"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))' }}
              />
            </div>
            <span className="ml-2 text-lg font-bold text-primary">SGK14</span>
          </Link>
          {/* Desktop Navigation (only show "portal" links if enrolled) */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    location.pathname.startsWith(link.path)
                      ? 'text-primary font-medium'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {link.icon && link.icon}
                  {link.name}
                  {link.path === '/ai-chat' && user && enrolled && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full">
                      New
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          )}
          {/* User Menu or Auth Buttons */}
          <div className="flex items-center gap-2">
            {!isMobile && !user && (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
            {/* Show UserMenu/Enroll Now if logged in */}
            {!isMobile && user && !enrollLoading && (
              enrolled ? <UserMenu /> : (
                <Button asChild size="sm" variant="outline">
                  <Link to="/enroll">Enroll Now</Link>
                </Button>
              )
            )}
            {/* Quick Access Buttons for Mobile - only if enrolled */}
            {isMobile && user && enrolled && (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="icon" className="mr-1">
                  <Link to="/editor">
                    <Code className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon" className="mr-1">
                  <Link to="/ai-chat">
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            )}
            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle menu"
                    className="md:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="4" x2="20" y1="12" y2="12" />
                      <line x1="4" x2="20" y1="6" y2="6" />
                      <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="p-4">
                  <div className="flex flex-col space-y-3 mt-2">
                    {navLinks.map((link) => (
                      <DrawerClose key={link.path} asChild>
                        <Link
                          to={link.path}
                          className={`flex items-center px-3 py-3 text-base rounded-md ${
                            location.pathname.startsWith(link.path)
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-accent'
                          }`}
                        >
                          {link.icon && link.icon}
                          {link.name}
                          {link.path === '/ai-chat' && user && enrolled && (
                            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full">
                              New
                            </span>
                          )}
                        </Link>
                      </DrawerClose>
                    ))}
                    {user ? (
                      <div className="pt-2 border-t">
                        {enrolled ? <UserMenu /> : (
                          <Button asChild variant="outline" className="w-full">
                            <Link to="/enroll">Enroll Now</Link>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="pt-2 border-t flex flex-col space-y-2">
                        <Button asChild>
                          <Link to="/signup">Sign Up</Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link to="/login">Log In</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// NOTE: This file is now over 200 lines. It should be refactored soon!
