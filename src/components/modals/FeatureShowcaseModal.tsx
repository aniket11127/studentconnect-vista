
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Code, MessageCircle, Play, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeatureShowcaseModal = ({ isOpen, onClose }: FeatureShowcaseModalProps) => {
  const [progress, setProgress] = useState(0);

  // Progress animation when modal opens
  useEffect(() => {
    if (isOpen) {
      const progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return prev + 1;
        });
      }, 80); // Complete in 8 seconds

      return () => clearInterval(progressTimer);
    } else {
      setProgress(0);
    }
  }, [isOpen]);

  const features = [
    {
      icon: <Code className="w-6 h-6 text-blue-500" />,
      title: "💻 Code Playground",
      description: "Real-time coding environment (HTML, CSS, JS, Python)",
      gradient: "from-blue-500/10 to-purple-500/10",
      glow: "shadow-blue-500/20"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      title: "🤖 AI Doubt Bot",
      description: "Get instant help with doubts, assignments, and career guidance",
      gradient: "from-green-500/10 to-blue-500/10",
      glow: "shadow-green-500/20"
    },
    {
      icon: <Play className="w-6 h-6 text-purple-500" />,
      title: "🎥 Video Learning Hub",
      description: "Access tutorials, walkthroughs, and recorded expert sessions",
      gradient: "from-purple-500/10 to-pink-500/10",
      glow: "shadow-purple-500/20"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[400px] max-w-[90vw] w-full p-0 bg-white rounded-[18px] shadow-2xl border-0 overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
        style={{
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          borderRadius: '18px',
          animationDuration: '0.5s'
        }}
      >
        {/* Progress indicator */}
        <div className="w-full h-1 bg-gray-200 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 hover:shadow-sm"
          style={{ top: '12px', right: '12px' }}
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>

        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-4 relative">
          <div className="absolute top-2 right-16">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-white mb-2">
              🚀 Get Full Access in Just 1 Step!
            </DialogTitle>
            <p className="text-center text-white/95 text-sm leading-relaxed">
              Thousands of MP Board students are already learning. Join them now!
            </p>
          </DialogHeader>
        </div>

        {/* Motivation message */}
        <div className="px-6 pt-4 pb-2">
          <div className="text-center bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg p-3 border border-orange-200">
            <p className="text-sm font-medium text-orange-800">
              ✨ You're 1 step away from learning! ✨
            </p>
          </div>
        </div>

        {/* Features section with glowing badges */}
        <div className="p-6 pt-3 space-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-3 rounded-xl bg-gradient-to-r ${feature.gradient} border border-gray-100 hover:shadow-lg hover:${feature.glow} transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  {feature.icon}
                  <Lock className="absolute -top-1 -right-1 w-3 h-3 text-gray-400 bg-white rounded-full p-0.5" />
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-sm animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="px-6 pb-6 space-y-3">
          <Button asChild className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transform hover:scale-105 transition-all duration-200">
            <Link to="/signup" onClick={onClose}>
              🎯 Sign Up Free - Join Thousands!
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50 hover:border-primary/50 transition-all duration-200">
            <Link to="/login" onClick={onClose}>
              Already have an account? Login
            </Link>
          </Button>
        </div>

        {/* Bottom accent with animated gradient */}
        <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-pulse"></div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureShowcaseModal;
