
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden" aria-labelledby="hero-heading">
      {/* Animated Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-50" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-2/3 w-60 h-60 bg-primary/20 rounded-full blur-2xl animate-float-slow [animation-delay:2s]" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl animate-float-slow [animation-delay:3s]" />
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              ref={textRef}
              className="inline-block mb-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-blue-400/20 text-primary text-base font-medium relative overflow-hidden group animate-on-scroll"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-15 -translate-x-full group-hover:animate-shimmer"></span>
              <span className="relative z-10 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-semibold">
                Empowering Young Minds with SGK14
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-blue-400/20 transform translate-y-3/4 group-hover:translate-y-0 transition-transform duration-500"></span>
              <span className="absolute -inset-px rounded-full bg-gradient-to-r from-primary to-blue-400 opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-500"></span>
            </div>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance">
              <span className="animate-fade-in [animation-delay:300ms]">Transform Your Future with</span>
              <div className="inline-flex flex-wrap justify-center">
                <span className="relative mx-2 animate-float-text [animation-delay:600ms] inline-block">
                  <span className="relative z-10 text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">SKILL</span>
                  <span className="absolute -inset-1 bg-primary/10 blur-sm rounded-lg -z-10 animate-pulse-subtle"></span>
                </span>
                <span className="relative mx-2 animate-float-text [animation-delay:800ms] inline-block">
                  <span className="relative z-10 text-primary bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">GROWTH</span>
                  <span className="absolute -inset-1 bg-primary/10 blur-sm rounded-lg -z-10 animate-pulse-subtle [animation-delay:300ms]"></span>
                </span>
                <span className="relative mx-2 animate-float-text [animation-delay:1000ms] inline-block">
                  <span className="relative z-10">& </span>
                </span>
                <span className="relative mx-2 animate-float-text [animation-delay:1200ms] inline-block">
                  <span className="relative z-10 text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">KNOWLEDGE</span>
                  <span className="absolute -inset-1 bg-primary/10 blur-sm rounded-lg -z-10 animate-pulse-subtle [animation-delay:600ms]"></span>
                </span>
              </div>
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto animate-fade-in [animation-delay:1400ms]">
            Gain essential skills in MS Office, coding, public speaking, and career development 
            through interactive courses designed for Students.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 animate-fade-in [animation-delay:1600ms]">
            <Button size="lg" asChild className="relative overflow-hidden group">
              <Link to="/courses" aria-label="Browse our course catalog" className="relative z-10">
                <span className="relative z-10 flex items-center">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="group hover-scale">
              <Link to="/about" aria-label="Learn more about SGK14" className="flex items-center">
                Learn More
                <span className="w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 absolute bottom-0 left-0"></span>
              </Link>
            </Button>
          </div>

          <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in [animation-delay:1800ms]">
            {/* Partnership with IIT Bombay */}
            <div className="flex items-center gap-3 animate-on-scroll bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10 hover:shadow-lg hover:shadow-primary/5">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-pulse-subtle">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold">IIT Bombay</div>
                <div className="text-xs text-muted-foreground">Certification Partner</div>
              </div>
            </div>
            
            {/* Student Count */}
            <div className="flex items-center gap-3 animate-on-scroll [animation-delay:200ms] bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10 hover:shadow-lg hover:shadow-primary/5">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-pulse-subtle [animation-delay:400ms]">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold">10,000+</div>
                <div className="text-xs text-muted-foreground">Students Enrolled</div>
              </div>
            </div>
            
            {/* Placement Rate */}
            <div className="flex items-center gap-3 animate-on-scroll [animation-delay:400ms] bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10 hover:shadow-lg hover:shadow-primary/5">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-pulse-subtle [animation-delay:800ms]">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold">95%</div>
                <div className="text-xs text-muted-foreground">Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-text {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-text {
          opacity: 0;
          animation: float-text 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
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
        
        .skew-x-15 {
          transform: skewX(15deg);
        }
        
        .animate-on-scroll:nth-child(1) { animation-delay: 0ms; }
        .animate-on-scroll:nth-child(2) { animation-delay: 200ms; }
        .animate-on-scroll:nth-child(3) { animation-delay: 400ms; }
      `}
      </style>
    </section>
  );
};

export default Hero;
