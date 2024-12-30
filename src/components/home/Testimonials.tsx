import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Technical Co-Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Found my technical co-founder within 2 weeks. The matching algorithm is incredible!',
    company: 'TechStart AI'
  },
  {
    name: 'Michael Chen',
    role: 'Business Co-Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    content: 'The verification process ensures you connect with serious founders. Met my co-founder here!',
    company: 'GrowthBase'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Co-Founder',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    content: 'Amazing platform for finding co-founders. The skill matching feature saved us so much time.',
    company: 'MarketPro'
  }
];

export function Testimonials() {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">What Founders Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">{testimonial.content}</p>
            <div className="flex items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}