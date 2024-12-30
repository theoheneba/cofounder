import React from 'react';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingPlan {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className={`relative rounded-2xl bg-white p-8 shadow-xl ${
      plan.popular ? 'ring-2 ring-indigo-600 scale-105' : ''
    }`}>
      {plan.popular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white">
            <Star className="w-4 h-4 mr-1" /> Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <div className="mt-4 flex items-baseline justify-center">
          <span className="text-5xl font-bold">${plan.price}</span>
          <span className="text-gray-500 ml-1">/month</span>
        </div>

        <ul className="mt-8 space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-3" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/login"
          className={`mt-8 block w-full py-3 px-6 rounded-lg text-center font-medium ${
            plan.popular
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
          }`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}