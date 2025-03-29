
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" aria-labelledby="hero-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-40" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="animate-fade-in">
            <div 
              ref={textRef}
              className="inline-block mb-4 px-6 py-2.5 rounded-full bg-primary/10 text-primary text-base font-medium relative overflow-hidden group animate-on-scroll"
            >
              <span className="relative z-10 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-semibold">
                Empowering Young Minds
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-blue-400/20 transform translate-y-3/4 group-hover:translate-y-0 transition-transform duration-500"></span>
              <span className="absolute -inset-px rounded-full bg-gradient-to-r from-primary to-blue-400 opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-500"></span>
            </div>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance">
              Transform Your Future with
              <span className="text-primary animate-pulse-subtle"> SGK14</span> EdTech
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            Gain essential skills in MS Office, coding, public speaking, and career development 
            through interactive courses designed for Students.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in [animation-delay:400ms]">
            <Button size="lg" asChild className="relative overflow-hidden group">
              <Link to="/courses" aria-label="Browse our course catalog" className="relative z-10">
                <span className="relative z-10 flex items-center">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover-scale">
              <Link to="/about" aria-label="Learn more about SGK14">Learn More</Link>
            </Button>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in [animation-delay:600ms]">
            <div className="flex items-center gap-2 animate-on-scroll">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium">IIT Bombay</div>
                <div className="text-xs text-muted-foreground">Certification Partner</div>
              </div>
            </div>
            <div className="flex items-center gap-2 animate-on-scroll [animation-delay:200ms]">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium">10,000+</div>
                <div className="text-xs text-muted-foreground">Students Enrolled</div>
              </div>
            </div>
            <div className="flex items-center gap-2 animate-on-scroll [animation-delay:400ms]">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium">95%</div>
                <div className="text-xs text-muted-foreground">Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-in {
          animation: slide-up 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes slide-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-on-scroll:nth-child(1) { animation-delay: 0ms; }
        .animate-on-scroll:nth-child(2) { animation-delay: 200ms; }
        .animate-on-scroll:nth-child(3) { animation-delay: 400ms; }
      `}</style>
    </section>
  );
};

export default Hero;
