import React from 'react';
import { Shield, Target, MessageSquare, Users, Rocket, Zap } from 'lucide-react';
import { FeatureCard } from '../components/features/FeatureCard';
import { StepCard } from '../components/features/StepCard';

const features = [
  {
    icon: Shield,
    title: 'Verified Profiles',
    description: 'Every co-founder is verified through our comprehensive verification process.'
  },
  {
    icon: Target,
    title: 'Smart Matching',
    description: 'Our AI-powered algorithm matches you with co-founders based on skills, experience, and goals.'
  },
  {
    icon: MessageSquare,
    title: 'Secure Communication',
    description: 'Built-in messaging system with video calls and file sharing capabilities.'
  },
  {
    icon: Users,
    title: 'Active Community',
    description: 'Join a thriving community of 10,000+ entrepreneurs and founders.'
  },
  {
    icon: Rocket,
    title: 'Startup Tools',
    description: 'Access to essential tools and resources to help your startup grow.'
  },
  {
    icon: Zap,
    title: 'Quick Connections',
    description: 'Connect with potential co-founders in days, not months.'
  }
];

const steps = [
  {
    step: '01',
    title: 'Create Your Profile',
    description: 'Sign up and create your detailed founder profile highlighting your skills, experience, and what you\'re looking for in a co-founder.'
  },
  {
    step: '02',
    title: 'Get Matched',
    description: 'Our AI-powered algorithm will suggest potential co-founders based on your profile, preferences, and startup goals.'
  },
  {
    step: '03',
    title: 'Connect & Collaborate',
    description: 'Use our secure messaging system to connect with matches, schedule video calls, and start building your startup together.'
  }
];

export function LearnMore() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Find the Right Co-Founder
          </h1>
          <p className="text-xl text-gray-600">
            Our platform provides all the tools and features you need to find, connect, and collaborate with the perfect co-founder for your startup.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <StepCard
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-indigo-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Co-Founder?</h2>
          <p className="text-xl mb-8">Join thousands of founders who found their perfect match.</p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}