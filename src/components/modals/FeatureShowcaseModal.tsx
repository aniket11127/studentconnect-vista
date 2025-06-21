
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Code, MessageCircle, Play, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeatureShowcaseModal = ({ isOpen, onClose }: FeatureShowcaseModalProps) => {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-blue-500" />,
      title: "Code Editor Playground",
      description: "Real-time coding environment (HTML, CSS, JS, Python)",
      gradient: "from-blue-500/10 to-purple-500/10"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      title: "AI Mentor Bot",
      description: "Get instant help with doubts, assignments, and career guidance",
      gradient: "from-green-500/10 to-blue-500/10"
    },
    {
      icon: <Play className="w-8 h-8 text-purple-500" />,
      title: "Video Learning Hub",
      description: "Access tutorials, walkthroughs, and recorded expert sessions",
      gradient: "from-purple-500/10 to-pink-500/10"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-w-[90vw] p-0 bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-6 pb-8">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
              🚀 Unlock Your Learning Power with SGK14
            </DialogTitle>
            <p className="text-center text-white/90 text-sm sm:text-base">
              Login or Sign up to access these premium features designed for Class 8–12 students.
            </p>
          </DialogHeader>
        </div>

        {/* Features section */}
        <div className="p-6 space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-4 rounded-xl bg-gradient-to-r ${feature.gradient} border border-gray-100 hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  {feature.icon}
                  <Lock className="absolute -top-1 -right-1 w-4 h-4 text-gray-400 bg-white rounded-full p-0.5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="p-6 pt-2 space-y-3">
          <Button asChild className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
            <Link to="/signup" onClick={onClose}>
              🎯 Sign Up Free
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50">
            <Link to="/login" onClick={onClose}>
              Already have an account? Login
            </Link>
          </Button>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureShowcaseModal;
