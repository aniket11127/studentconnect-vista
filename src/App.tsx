
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProtectedEnrolledRoute from './components/auth/ProtectedEnrolledRoute';
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
import Profile from './pages/Profile';
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
import Dashboard from './pages/Dashboard';
import Enroll from './pages/Enroll';
import './App.css';

function App() {
  return (
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <NavbarWithAI />
            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/module/:moduleSlug" element={<ModuleDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/community" element={<Community />} />
                <Route path="/certification" element={<Certification />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/career" element={<CareerGuidance />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Enrollment onboarding - must be authenticated but not enrolled */}
                <Route path="/enroll" element={
                  <ProtectedRoute>
                    <Enroll />
                  </ProtectedRoute>
                } />
                {/* Profile page - authenticated users only */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                {/* Student Portal (auth + enrolled only) */}
                <Route path="/dashboard" element={
                  <ProtectedEnrolledRoute>
                    <Dashboard />
                  </ProtectedEnrolledRoute>
                } />
                <Route path="/certificates" element={
                  <ProtectedEnrolledRoute>
                    <MyCertificates />
                  </ProtectedEnrolledRoute>
                } />
                <Route path="/ai-chat" element={
                  <ProtectedEnrolledRoute>
                    <AIChat />
                  </ProtectedEnrolledRoute>
                } />
                <Route path="/editor" element={
                  <ProtectedEnrolledRoute>
                    <EditorPage />
                  </ProtectedEnrolledRoute>
                } />
                <Route path="/coding-playground" element={
                  <ProtectedEnrolledRoute>
                    <CodingPlayground />
                  </ProtectedEnrolledRoute>
                } />
                <Route path="/videos" element={
                  <ProtectedEnrolledRoute>
                    {/* TODO: Implement Videos page */}
                    <div className="pt-24">Videos Page Coming Soon</div>
                  </ProtectedEnrolledRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
  );
}

export default App;
