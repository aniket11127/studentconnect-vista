
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './components/ui/theme-provider';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavbarWithAI from './components/layout/NavbarWithAI';
import Footer from './components/layout/Footer';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Curriculum from './pages/Curriculum';
import ModuleDetail from './pages/ModuleDetail';
import MyCertificates from './pages/MyCertificates';
import AIChat from './pages/AIChat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import CodingPlayground from './pages/CodingPlayground';
import EditorPage from './pages/EditorPage';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import HelpCenter from './pages/HelpCenter';
import Community from './pages/Community';
import Certification from './pages/Certification';
import ResumeBuilder from './pages/ResumeBuilder';
import CareerGuidance from './pages/CareerGuidance';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sgk14-theme">
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <NavbarWithAI />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/module/:moduleSlug" element={<ModuleDetail />} />
                <Route path="/certificates" element={
                  <ProtectedRoute>
                    <MyCertificates />
                  </ProtectedRoute>
                } />
                <Route path="/ai-chat" element={<AIChat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/coding-playground" element={<CodingPlayground />} />
                <Route path="/editor" element={<EditorPage />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/community" element={<Community />} />
                <Route path="/certification" element={<Certification />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/career" element={<CareerGuidance />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
