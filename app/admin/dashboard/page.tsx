'use client';

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowRightIcon, Calendar, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  package_type: string;
  status: string;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Mock revenue data
const revenueData = [
  { month: 'Jan', revenue: 2400, cost: 900 },
  { month: 'Feb', revenue: 2200, cost: 850 },
  { month: 'Mar', revenue: 2800, cost: 950 },
  { month: 'Apr', revenue: 3200, cost: 1100 },
  { month: 'May', revenue: 2900, cost: 1000 },
  { month: 'Jun', revenue: 3500, cost: 1200 },
  { month: 'Jul', revenue: 4100, cost: 1400 },
];

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bookings`);
        if (response.ok) {
          const data = await response.json();
          const bookingsList = data.data || [];
          setBookings(bookingsList);

          const total = bookingsList.length;
          const pending = bookingsList.filter((b: Booking) => b.status === 'pending').length;
          const confirmed = bookingsList.filter((b: Booking) => b.status === 'confirmed').length;

          setStats({
            total,
            pending,
            confirmed,
            revenue: total * 500,
          });
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const recentBookings = bookings.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-black">Good morning, Studio</h1>
        <p className="text-gray-600 mt-1">Here's your booking overview and revenue performance</p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Revenue chart - featured card */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue This Month</p>
              <h2 className="text-5xl font-bold text-black mt-2">€{(stats.revenue / 1000).toFixed(1)}K</h2>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 bg-lime-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                  <ArrowUpRight className="w-3 h-3" />
                  13.9%
                </span>
                <span className="text-gray-600 text-sm">vs. last month</span>
              </div>
            </div>
            <div className="text-right">
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs text-gray-600">Active Shoots</dt>
                  <dd className="text-2xl font-bold text-black">{stats.confirmed}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-600">Total Bookings</dt>
                  <dd className="text-2xl font-bold text-black">{stats.total}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 -mx-4 -mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d6fb3d" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d6fb3d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#d1d5db" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000000"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next booking card */}
        <div className="col-span-12 lg:col-span-4 bg-black text-white rounded-2xl p-8 shadow-sm flex flex-col">
          <p className="text-white/60 text-sm">Next Booking</p>
          {recentBookings.length > 0 ? (
            <>
              <h3 className="text-2xl font-bold mt-3 mb-1">{recentBookings[0].name}</h3>
              <p className="text-white/70 text-sm mb-6">{recentBookings[0].package_type} package</p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-lime-400" />
                  <span>{new Date(recentBookings[0].preferred_date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="mb-4">
                  <span className="text-white/60 text-xs">Amount</span>
                  <p className="text-2xl font-bold">€{recentBookings[0].phone ? '1,200' : '0'}</p>
                </div>
                <a
                  href="/admin/bookings"
                  className="inline-flex items-center justify-center w-full h-11 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition"
                >
                  View Details
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </a>
              </div>
            </>
          ) : (
            <p className="text-white/60 mt-8">No bookings yet</p>
          )}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'lime' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'yellow' },
          { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'green' },
          { label: 'Est. Revenue', value: `€${(stats.revenue / 1000).toFixed(1)}K`, icon: TrendingUp, color: 'blue' },
        ].map((card, idx) => {
          const Icon = card.icon;
          const colorClass = {
            lime: 'bg-lime-50 border-lime-200',
            yellow: 'bg-yellow-50 border-yellow-200',
            green: 'bg-green-50 border-green-200',
            blue: 'bg-blue-50 border-blue-200',
          }[card.color];

          return (
            <div key={idx} className={`${colorClass} border rounded-xl p-5`}>
              <Icon className="w-5 h-5 text-gray-700 mb-3" />
              <p className="text-gray-600 text-xs font-medium mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-black">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent bookings table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">Recent Bookings</h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No bookings yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  <th className="px-8 py-4 text-left">Client</th>
                  <th className="px-4 py-4 text-left">Date</th>
                  <th className="px-4 py-4 text-left">Package</th>
                  <th className="px-4 py-4 text-left">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition">
                    <td className="px-8 py-4">
                      <div>
                        <p className="font-medium text-black">{booking.name}</p>
                        <p className="text-xs text-gray-600">{booking.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {new Date(booking.preferred_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 py-4 text-gray-700 capitalize">{booking.package_type}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <a
                        href={`/admin/bookings`}
                        className="text-lime-600 hover:text-lime-700 font-medium text-sm"
                      >
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
