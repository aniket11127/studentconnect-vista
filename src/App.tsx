
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './components/ui/theme-provider';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Curriculum from './pages/Curriculum';
import ModuleDetail from './pages/ModuleDetail';
import VipSessions from './pages/VipSessions';
import VipSessionDetail from './pages/VipSessionDetail';
import MyCertificates from './pages/MyCertificates';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sgk14-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/module/:moduleSlug" element={<ModuleDetail />} />
            <Route path="/vip-sessions" element={<VipSessions />} />
            <Route path="/vip-sessions/:sessionId" element={<VipSessionDetail />} />
            <Route path="/certificates" element={
              <ProtectedRoute>
                <MyCertificates />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
