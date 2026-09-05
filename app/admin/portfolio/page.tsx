'use client';

import React, { useState } from 'react';
import { Star, Eye, EyeOff } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  shootType: string;
  frames: number;
  featured: boolean;
  published: boolean;
  locales: string[];
}

const types = ['All', 'Product', 'Fashion', 'Restaurant', 'Model'];

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([
    {
      id: 'PF-21',
      title: 'Aurora – Eau de Matin',
      client: 'Nordio Skincare',
      shootType: 'Product',
      frames: 18,
      featured: true,
      published: true,
      locales: ['EN', 'IT', 'FR'],
    },
    {
      id: 'PF-20',
      title: 'FW26 Lookbook',
      client: 'Verità Atelier',
      shootType: 'Fashion',
      frames: 24,
      featured: true,
      published: true,
      locales: ['EN', 'IT'],
    },
    {
      id: 'PF-19',
      title: 'Autumn Menu',
      client: 'Casa Aurelia',
      shootType: 'Restaurant',
      frames: 16,
      featured: false,
      published: true,
      locales: ['EN', 'IT'],
    },
    {
      id: 'PF-18',
      title: 'Agency Book',
      client: 'Elisa Marchetti',
      shootType: 'Model',
      frames: 12,
      featured: false,
      published: true,
      locales: ['EN'],
    },
  ]);

  const [selectedType, setSelectedType] = useState('All');

  const visible = items.filter(i => selectedType === 'All' || i.shootType === selectedType);
  const featured = items.filter(i => i.featured).length;
  const published = items.filter(i => i.published).length;

  const toggle = (id: string, key: 'featured' | 'published') => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, [key]: !i[key] } : i))
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <h1 className="text-[32px] font-semibold text-black">Work page</h1>
          <p className="mt-1 text-gray-600">Curate what the public portfolio shows</p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-sm text-gray-600">Published</p>
            <p className="text-3xl font-bold text-black">{published}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Featured</p>
            <p className="text-3xl font-bold text-black">{featured}</p>
          </div>
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedType === type
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visible.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            {/* Cover */}
            <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              {item.featured && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-lime-400 text-black text-xs font-semibold rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  Featured
                </div>
              )}
              {!item.published && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full">
                  Draft
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-2">{item.shootType}</p>
                <h3 className="text-lg font-bold text-black line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.client}</p>
              </div>

              <p className="text-xs text-gray-600">{item.frames} frames</p>

              {/* Languages */}
              <div className="flex flex-wrap gap-2">
                {['EN', 'IT', 'FR'].map(lang => (
                  <span
                    key={lang}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.locales.includes(lang)
                        ? 'bg-gray-100 text-black'
                        : 'border border-dashed border-gray-300 text-gray-500'
                    }`}
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {item.locales.length < 3 && (
                <p className="text-xs text-gray-600">Translation pending</p>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-gray-200 flex items-center gap-2">
                <button
                  onClick={() => toggle(item.id, 'featured')}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                >
                  {item.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button
                  onClick={() => toggle(item.id, 'published')}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center gap-1"
                >
                  {item.published ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      Hide
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      Show
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
