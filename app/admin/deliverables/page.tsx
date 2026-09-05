'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle, Clock, Play, Zap } from 'lucide-react';

interface Deliverable {
  id: string;
  bookingId: string;
  client: string;
  title: string;
  kind: 'Stills' | 'Film' | 'Lookbook';
  assets: number;
  size: string;
  progress: number;
  status: 'Selecting' | 'Retouching' | 'Client review' | 'Delivered';
  updated: string;
}

const tabs = ['In production', 'Delivered'];

export default function DeliverablesPage() {
  const [tab, setTab] = useState<'In production' | 'Delivered'>('In production');

  const [deliverables] = useState<Deliverable[]>([
    {
      id: 'DL-118',
      bookingId: 'MC-2041',
      client: 'Casa Aurelia',
      title: 'Autumn menu – 18 dishes',
      kind: 'Stills',
      assets: 640,
      size: '28.4 GB',
      progress: 34,
      status: 'Selecting',
      updated: '2 hours ago',
    },
    {
      id: 'DL-117',
      bookingId: 'MC-2040',
      client: 'Verità Atelier',
      title: 'FW26 lookbook – hero set',
      kind: 'Stills',
      assets: 412,
      size: '19.1 GB',
      progress: 78,
      status: 'Retouching',
      updated: 'Yesterday',
    },
    {
      id: 'DL-116',
      bookingId: 'MC-2040',
      client: 'Verità Atelier',
      title: 'FW26 campaign cutdown • 30s',
      kind: 'Film',
      assets: 5,
      size: '24.7 GB',
      progress: 52,
      status: 'Retouching',
      updated: 'Yesterday',
    },
    {
      id: 'DL-115',
      bookingId: 'MC-2039',
      client: 'Nordio Skincare',
      title: 'Serum launch – 6 SKUs',
      kind: 'Stills',
      assets: 214,
      size: '8.6 GB',
      progress: 91,
      status: 'Client review',
      updated: '3 days ago',
    },
    {
      id: 'DL-114',
      bookingId: 'MC-2038',
      client: 'Elisa Marchetti',
      title: 'Agency portfolio – 4 looks',
      kind: 'Stills',
      assets: 96,
      size: '4.2 GB',
      progress: 100,
      status: 'Delivered',
      updated: '1 week ago',
    },
  ]);

  const visible = deliverables.filter(d =>
    tab === 'Delivered' ? d.status === 'Delivered' : d.status !== 'Delivered'
  );
  const lead = visible[0];
  const rest = visible.slice(1);

  const statusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Client review':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Retouching':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'Selecting':
        return 'bg-gray-100 text-gray-700 border border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'Client review':
        return <Zap className="w-4 h-4" />;
      case 'Retouching':
        return <Play className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold text-black">Deliverables</h1>
          <p className="mt-1 text-gray-600">Stills, films and lookbooks in post-production</p>
        </div>
        <div className="flex gap-2">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t as 'In production' | 'Delivered')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                tab === t
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Gallery */}
      {lead && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-64 lg:h-auto">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <Play className="w-12 h-12 text-white/30" />
            </div>
          </div>
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  {lead.client} • {lead.bookingId}
                </p>
                <h2 className="text-3xl font-bold text-black">{lead.title}</h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap ${statusColor(lead.status)}`}>
                {statusIcon(lead.status)}
                {lead.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Frames</p>
                <p className="text-2xl font-bold text-black">{lead.assets.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Storage</p>
                <p className="text-2xl font-bold text-black">{lead.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Updated</p>
                <p className="text-2xl font-bold text-black">{lead.updated}</p>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600">Completion</p>
                <p className="text-sm font-semibold text-black">{lead.progress}%</p>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden mb-6">
                <div
                  className="h-full bg-black rounded-full transition-all duration-300"
                  style={{ width: `${lead.progress}%` }}
                />
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition">
                  Open Editor
                </button>
                <button className="flex-1 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-semibold">
                  Share Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rest.map(d => (
          <div key={d.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <Play className="w-10 h-10 text-white/20" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">{d.kind}</p>
                  <h3 className="text-lg font-bold text-black mt-1 line-clamp-2">{d.title}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{d.client}</p>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span>{d.assets.toLocaleString()} frames</span>
                <span>{d.size}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{ width: `${d.progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-black w-8 text-right">{d.progress}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${statusColor(d.status)}`}>
                  {statusIcon(d.status)}
                  {d.status}
                </span>
                <p className="text-xs text-gray-500">{d.updated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm">
          <Upload className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-semibold text-gray-700 mb-1">No deliverables yet</p>
          <p className="text-gray-600">Galleries appear once a shoot moves into post-production</p>
        </div>
      )}
    </div>
  );
}
