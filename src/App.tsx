
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Curriculum from "./pages/Curriculum";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CourseDetail from "./pages/CourseDetail";
import VipSessions from "./pages/VipSessions";
import VipSessionDetail from "./pages/VipSessionDetail";
import MyCertificates from "./pages/MyCertificates";
import NotFound from "./pages/NotFound";

// Create a QueryClient instance
const queryClient = new QueryClient();

// ScrollToTop component to ensure page scrolls to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Add structured data for the website
const StructuredData = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Organization structured data
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "SGK14 EdTech",
      "url": "https://sgk14.com",
      "logo": "https://sgk14.com/logo.png",
      "sameAs": [
        "https://facebook.com/sgk14",
        "https://twitter.com/sgk14_edtech",
        "https://instagram.com/sgk14_edtech",
        "https://linkedin.com/company/sgk14-edtech"
      ],
      "description": "SGK14 EdTech provides essential skills in MS Office, coding, public speaking, and career development through interactive courses designed for students."
    };

    // Add organization schema
    const organizationScript = document.createElement('script');
    organizationScript.type = 'application/ld+json';
    organizationScript.text = JSON.stringify(organizationData);
    document.head.appendChild(organizationScript);

    // Add breadcrumb schema based on current path
    if (pathname !== '/') {
      const pathSegments = pathname.split('/').filter(Boolean);
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sgk14.com"
        }
      ];

      pathSegments.forEach((segment, index) => {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          "item": `https://sgk14.com/${pathSegments.slice(0, index + 1).join('/')}`
        });
      });

      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      };

      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.text = JSON.stringify(breadcrumbData);
      document.head.appendChild(breadcrumbScript);
    }

    return () => {
      // Clean up scripts when component unmounts
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [pathname]);

  return null;
};

// Main routing component
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <StructuredData />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/module/:name" element={<CourseDetail />} />
        <Route path="/vip-sessions" element={<VipSessions />} />
        <Route path="/vip-sessions/:id" element={<VipSessionDetail />} />
        <Route path="/certificates" element={<MyCertificates />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

// Main App component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
