import React from 'react';
import { PricingCard } from '../components/pricing/PricingCard';

const plans = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Basic profile',
      'Browse co-founders',
      'Limited messages',
      'Community access'
    ]
  },
  {
    name: 'Pro',
    price: 29,
    popular: true,
    features: [
      'Everything in Free',
      'Unlimited messages',
      'Advanced search filters',
      'Startup tools',
      'Priority support'
    ]
  },
  {
    name: 'Enterprise',
    price: 99,
    features: [
      'Everything in Pro',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Team collaboration'
    ]
  }
];

export function Pricing() {
  return (
    <div className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the perfect plan for your journey to find the ideal co-founder.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}