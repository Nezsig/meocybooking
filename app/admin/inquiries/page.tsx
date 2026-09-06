'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Mail, Calendar, Wallet, MessageSquare } from 'lucide-react';

interface Inquiry {
  id: string;
  client: string;
  email: string;
  locale: 'EN' | 'IT' | 'FR';
  shootType: string;
  message: string;
  budget: string;
  preferredDate: string;
  received: string;
  isNew: boolean;
}

const types = ['All', 'Product', 'Fashion', 'Restaurant', 'Model'];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 'IN-3104',
      client: 'Orbita Eyewear',
      email: 'hello@orbita.eu',
      locale: 'EN',
      shootType: 'Product',
      message: 'We are launching a 12-piece eyewear capsule in November and need campaign stills plus a short vertical reel for paid social.',
      budget: '€4,000 – €6,000',
      preferredDate: '2026-09-18',
      received: '18 min ago',
      isNew: true,
    },
    {
      id: 'IN-3103',
      client: 'Ristorante Meridiana',
      email: 'direzione@meridiana.it',
      locale: 'IT',
      shootType: 'Restaurant',
      message: 'Nuovo menù dautunno, 14 piatti più gli interni della sala. Preferiamo una mattina infrasettimanale.',
      budget: '€2,000 – €3,000',
      preferredDate: '2026-09-24',
      received: '2 hours ago',
      isNew: true,
    },
    {
      id: 'IN-3102',
      client: 'Maison Livrée',
      email: 'press@maisonlivree.fr',
      locale: 'FR',
      shootType: 'Fashion',
      message: 'Capsule resort à photographier sur le lac de Côme, 16 looks, deux jours de tournage avec une équipe stylisme.',
      budget: '€9,000+',
      preferredDate: '2026-10-02',
      received: 'Yesterday',
      isNew: false,
    },
  ]);

  const [selectedType, setSelectedType] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(inquiries[0] || null);

  const visible = inquiries.filter(i => selectedType === 'All' || i.shootType === selectedType);
  const newCount = inquiries.filter(i => i.isNew).length;

  const resolve = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(visible.find(i => i.id !== id) || null);
    }
  };

  const markRead = (id: string) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, isNew: false } : i));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-semibold text-black">Inquiries</h1>
        <p className="mt-1 text-gray-600">Requests from the booking form in EN, IT and FR</p>
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* List */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">{visible.length} Inquiry{visible.length !== 1 ? 's' : ''}</h2>
            {newCount > 0 && <p className="text-sm text-lime-600 mt-1">{newCount} new</p>}
          </div>

          {visible.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p>No inquiries</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {visible.map(inquiry => (
                <button
                  key={inquiry.id}
                  onClick={() => {
                    setSelectedInquiry(inquiry);
                    markRead(inquiry.id);
                  }}
                  className={`w-full p-4 text-left transition ${
                    selectedInquiry?.id === inquiry.id
                      ? 'bg-lime-50 border-l-2 border-l-lime-400'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {inquiry.isNew && <div className="w-2 h-2 rounded-full bg-lime-400 mt-1 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-black truncate">{inquiry.client}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{inquiry.locale}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-1">{inquiry.message}</p>
                  <p className="text-xs text-gray-500">{inquiry.received}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        {selectedInquiry && (
          <div className="lg:col-span-3 space-y-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{selectedInquiry.id}</p>
                  <h2 className="text-3xl font-bold text-black">{selectedInquiry.client}</h2>
                  <p className="mt-1 text-gray-700 font-medium">{selectedInquiry.email}</p>
                </div>
                <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-xs font-semibold">
                  {selectedInquiry.locale}
                </span>
              </div>

              <blockquote className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-gray-700 leading-relaxed italic mb-6">
                "{selectedInquiry.message}"
              </blockquote>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Wallet className="w-4 h-4 text-gray-600 mt-1" />
                  <div>
                    <p className="text-gray-600 font-medium">Budget</p>
                    <p className="text-black">{selectedInquiry.budget}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-600 mt-1" />
                  <div>
                    <p className="text-gray-600 font-medium">Preferred Date</p>
                    <p className="text-black">{new Date(selectedInquiry.preferredDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-600 mt-1" />
                  <div>
                    <p className="text-gray-600 font-medium">Received</p>
                    <p className="text-black">{selectedInquiry.received}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-lime-50 border border-lime-200 rounded-2xl p-6 flex gap-3">
              <button
                onClick={() => resolve(selectedInquiry.id)}
                className="flex-1 py-3 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Send Quote
              </button>
              <button className="flex-1 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition font-semibold">
                Reply ({selectedInquiry.locale})
              </button>
            </div>

            <button
              onClick={() => resolve(selectedInquiry.id)}
              className="w-full py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition font-semibold flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
