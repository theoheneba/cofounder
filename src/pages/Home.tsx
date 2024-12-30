import React from 'react';
import { Link } from 'react-router-dom';
import { StatsSection } from '../components/home/StatsSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { Testimonials } from '../components/home/Testimonials';
import { FeaturedIn } from '../components/home/FeaturedIn';
import { ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect Co-Founder Match
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with verified founders and build your startup together. Join 10,000+ entrepreneurs who found their co-founders through our platform.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              to="/browse"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Find Co-Founders
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Create Profile
            </Link>
          </div>
        </div>

        <FeaturedIn />
        <StatsSection />
        <HowItWorks />
        <Testimonials />
      </div>
    </div>
  );
}