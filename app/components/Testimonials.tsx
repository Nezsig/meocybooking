'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sofia Rossi',
    company: 'Sustainable Fashion Brand',
    quote: 'MEOCY transformed our product photography. The images helped us increase online sales by 40%. Their professionalism and attention to detail are exceptional.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'Marco Benedetti',
    company: 'Michelin-Star Restaurant',
    quote: 'Our food photography is now what drives customers through the door. Every dish looks appetizing and professional. Worth every euro.',
    rating: 5,
    avatar: '👨‍🍳'
  },
  {
    name: 'Lucia Moretti',
    company: 'E-commerce Manager',
    quote: 'The team was responsive, flexible, and delivered stunning product shots. Our conversion rate improved significantly after switching to MEOCY photos.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'Alessandro Conti',
    company: 'Model & Talent Agency',
    quote: 'Professional, creative, and fast turnaround. They captured my portfolio beautifully. Highly recommend for anyone needing headshots or portfolio work.',
    rating: 5,
    avatar: '👨'
  },
  {
    name: 'Emma Santoro',
    company: 'Interior Design Startup',
    quote: 'Great quality photos at fair prices. They understood our brand aesthetic immediately and delivered exactly what we needed. Will work with them again.',
    rating: 4,
    avatar: '👩‍🎨'
  }
];

export default function Testimonials() {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Creative Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our clients say about their experience working with MEOCY Studio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Rating */}
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="text-3xl flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-900">150+</p>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">4.9★</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">5 Yrs</p>
            <p className="text-gray-600">Studio Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">100%</p>
            <p className="text-gray-600">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
