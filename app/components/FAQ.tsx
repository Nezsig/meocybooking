'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What's included in your packages?",
    answer: "Each package includes professional photography, editing, and digital delivery. Basic covers studio shoots with 15 edited photos. Silver adds 4 hours on-location with 40 photos and 1 video. Gold includes 6 hours, 2 locations, and 75 photos. Platinum offers 8 hours, 100 photos, and 10 videos."
  },
  {
    question: "How long until photos are ready?",
    answer: "Standard delivery is 10 business days. This includes professional color grading, retouching, and optimization for web and print. We prioritize quality over speed to ensure every image meets our premium standards."
  },
  {
    question: "Do you offer rush delivery?",
    answer: "Yes! Rush delivery is available for urgent projects. Express delivery (3-5 business days) adds 25% to your package price. Same-day delivery for select packages is available at premium rates. Contact us for details."
  },
  {
    question: "Do you offer editing and retouching?",
    answer: "Absolutely. All packages include professional editing and retouching. This covers color correction, background cleanup, product enhancement, and skin retouching for models. Custom retouching requests beyond standard editing can be arranged separately."
  },
  {
    question: "What if we're not satisfied with the photos?",
    answer: "Your satisfaction is our priority. We offer one round of revisions with every package. If you need significant changes to the shoot direction, we can reschedule at a discounted rate. We always deliver premium quality, but want to ensure you're 100% happy."
  },
  {
    question: "Can we request specific equipment or lenses?",
    answer: "Yes! We work with you to select the perfect setup for your shoot. Our studio features Sony A6700 cameras, variety of professional lenses, studio lighting (Godox), and stabilization gear. During your consultation, we discuss technical preferences to match your vision."
  },
  {
    question: "Do you offer outdoor location shoots?",
    answer: "Yes, we offer on-location photography at your venue or anywhere in Milan. This includes our travel time and on-site setup. Locations can be your shop, restaurant, event space, or scenic outdoor areas. Travel outside Milan incurs additional fees."
  },
  {
    question: "Can we provide reference images or mood boards?",
    answer: "Highly encouraged! Reference images help us understand your vision and style preferences. Bring mood boards, inspiration photos, or style guides to your consultation. This ensures we capture exactly what you're looking for."
  }
];

export default function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                    expanded === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expanded === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Have other questions? We're here to help.
          </p>
          <a
            href="mailto:hello@meocy.com"
            className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
