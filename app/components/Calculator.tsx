'use client';

import React, { useState } from 'react';

interface ShootType {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

const shootTypes: ShootType[] = [
  { id: 'product', name: 'Product Photography', basePrice: 200, description: 'E-commerce & catalog' },
  { id: 'fashion', name: 'Fashion Photography', basePrice: 210, description: 'Clothing & accessories' },
  { id: 'restaurant', name: 'Food & Restaurant', basePrice: 220, description: 'Menu & ambiance' },
  { id: 'model', name: 'Model & Talent', basePrice: 230, description: 'Portraits & headshots' },
];

interface Addon {
  id: string;
  name: string;
  price: number;
}

const addons: Addon[] = [
  { id: 'rush', name: 'Rush Delivery (3-5 days)', price: 50 },
  { id: 'location', name: 'Second Location', price: 75 },
  { id: 'video', name: 'Video Package', price: 100 },
  { id: 'retouching', name: 'Premium Retouching', price: 150 },
];

export default function PricingCalculator() {
  const [selectedShoot, setSelectedShoot] = useState<string>('product');
  const [imageCount, setImageCount] = useState<number>(20);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const basePrice = shootTypes.find(s => s.id === selectedShoot)?.basePrice || 200;
  const addonPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return sum + (addon?.price || 0);
  }, 0);

  const totalPrice = basePrice + addonPrice;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  return (
    <section id="estimate" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Price Calculator
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Options */}
            <div className="space-y-6">
              {/* Shoot Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Type of Shoot
                </h3>
                <div className="space-y-2">
                  {shootTypes.map(shoot => (
                    <label key={shoot.id} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="shootType"
                        value={shoot.id}
                        checked={selectedShoot === shoot.id}
                        onChange={e => setSelectedShoot(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{shoot.name}</p>
                        <p className="text-sm text-gray-600">{shoot.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Image Count */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Estimated Photos: {imageCount}
                </h3>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={imageCount}
                  onChange={e => setImageCount(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">10 — 100 photos</p>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add-ons
                </h3>
                <div className="space-y-2">
                  {addons.map(addon => (
                    <label key={addon.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{addon.name}</span>
                      <span className="ml-auto text-gray-600 text-sm">+€{addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Price Summary */}
            <div className="flex flex-col justify-between">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Base Package</p>
                  <p className="text-2xl font-bold text-gray-900">€{basePrice}</p>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 text-sm">Add-ons</p>
                    <p className="text-2xl font-bold text-gray-900">€{addonPrice}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-600 text-sm mb-2">Total Price</p>
                  <p className="text-5xl font-bold text-gray-900">€{totalPrice}</p>
                  <p className="text-xs text-gray-500 mt-2">Prices exclude VAT</p>
                </div>
              </div>

              <button className="mt-6 w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                Get Quote
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>Tip:</strong> Prices shown are estimates. Contact us for a personalized quote based on your specific needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
