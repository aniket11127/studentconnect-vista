
import FeatureCard from '@/components/ui/FeatureCard';
import { 
  MonitorPlay, 
  BookOpen, 
  Users, 
  FileCode, 
  MicVocal, 
  FileEdit, 
  Award,
  Lightbulb 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Courses',
      description: 'Structured learning paths for MS Office, Python, HTML, CSS, and SQL tailored for grades 8-12.'
    },
    {
      icon: MonitorPlay,
      title: 'Interactive Learning',
      description: 'Engage with video lessons, quizzes, and hands-on assignments designed to reinforce concepts.'
    },
    {
      icon: Users,
      title: 'Expert-Led Masterclasses & AI Mentorship',
      description: 'Industry Expert Webinars – Live expert sessions on JEE GATE Engineering exams, Govt exams and preparation, machine AI, Cybersecurity, Leadership, and Career Growth.'
    },
    {
      icon: FileCode,
      title: 'Project-Based Learning',
      description: 'Apply your skills to real-world projects with personalized feedback and guidance.'
    },
    {
      icon: MicVocal,
      title: 'Public Speaking',
      description: 'Develop essential communication skills through structured speaking exercises and presentations.'
    },
    {
      icon: FileEdit,
      title: 'Resume Building',
      description: 'Create impressive resumes and LinkedIn profiles with AI-powered tools and expert tips.'
    },
    {
      icon: Award,
      title: 'Recognized Certification',
      description: 'Earn industry-recognized certificates validated by IIT Bombay and other institutions.'
    },
    {
      icon: Lightbulb,
      title: 'Career Guidance',
      description: 'Receive personalized career counseling and access to job and internship opportunities.'
    },
  ];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Key Features Designed for Your Success
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform offers comprehensive tools and resources tailored specifically 
            for Students to excel in their academic and professional journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={`animate-fade-in delay-${index * 100}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
