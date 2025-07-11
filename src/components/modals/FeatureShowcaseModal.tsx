
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
  const features = [
    {
      icon: <Code className="w-5 h-5 text-blue-500" />,
      title: "💻 Code Playground",
      description: "Real-time coding environment (HTML, CSS, JS, Python)",
      gradient: "from-blue-500/10 to-purple-500/10",
      glow: "shadow-blue-500/20"
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-green-500" />,
      title: "🤖 AI Doubt Bot",
      description: "Get instant help with doubts, assignments, and career guidance",
      gradient: "from-green-500/10 to-blue-500/10",
      glow: "shadow-green-500/20"
    },
    {
      icon: <Play className="w-5 h-5 text-purple-500" />,
      title: "🎥 Video Learning Hub",
      description: "Access tutorials, walkthroughs, and recorded expert sessions",
      gradient: "from-purple-500/10 to-pink-500/10",
      glow: "shadow-purple-500/20"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
      <DialogContent 
        className="sm:max-w-[450px] max-w-[95vw] w-full max-h-[90vh] overflow-y-auto p-0 bg-white border-0 shadow-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mobile:top-auto mobile:bottom-4 mobile:translate-y-0 mobile:left-1/2 mobile:-translate-x-1/2 animate-fade-in z-50"
        style={{
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)',
          animationDelay: '0.3s',
          animationFillMode: 'both'
        }}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Close button positioned outside header */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 p-2 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
        >
          <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>

        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-5 relative overflow-hidden">
          <div className="absolute top-3 right-6">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-white mb-2">
              🚀 Get Full Access in Just 1 Step!
            </DialogTitle>
            <p className="text-center text-white/95 text-sm leading-relaxed">
              Thousands of MP Board students are already learning.
            </p>
          </DialogHeader>
        </div>

        {/* Content with reduced padding */}
        <div className="px-6 py-5 space-y-4">
          {/* Features section with glowing badges */}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-3 rounded-xl bg-gradient-to-r ${feature.gradient} border border-gray-100 hover:shadow-lg hover:${feature.glow} transition-all duration-300`}
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

          {/* CTA Buttons */}
          <div className="space-y-3 pt-2">
            <Button asChild className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transform hover:scale-105 transition-all duration-200">
              <Link to="/signup" onClick={onClose}>
                🎯 Sign Up Free - Join Thousands!
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-11 text-sm font-medium border-2 hover:bg-gray-50 hover:border-primary/50 transition-all duration-200">
              <Link to="/login" onClick={onClose}>
                Already have an account? Login
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureShowcaseModal;
