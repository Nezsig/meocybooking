'use client';

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Calendar, Clock, CheckCircle, TrendingUp } from 'lucide-react';

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

const revenueData = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 2200 },
  { month: 'Mar', revenue: 2800 },
  { month: 'Apr', revenue: 3200 },
  { month: 'May', revenue: 2900 },
  { month: 'Jun', revenue: 3500 },
  { month: 'Jul', revenue: 4100 },
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

  const upcomingBookings = bookings.filter(b => b.status !== 'completed').slice(0, 4);
  const nextBooking = bookings.filter(b => b.status !== 'completed')[0];

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-black">Good morning, MEOCY</h1>
          <p className="text-gray-600 mt-1">Saturday, 5 September · 3 shoots this week</p>
        </div>
        <button className="px-5 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition">
          + New booking
        </button>
      </div>

      {/* Revenue Chart - Main Feature */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-gray-600 text-sm font-medium">Revenue booked · September</p>
            <h2 className="text-6xl font-bold text-black mt-3">€{(stats.revenue / 1000).toFixed(1)}K</h2>
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 bg-lime-400 text-black px-3 py-1.5 rounded-full text-sm font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                13.9%
              </span>
              <span className="text-gray-600 text-sm">vs. August</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 text-right">
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">Shoots this month</p>
              <p className="text-3xl font-bold text-black">{stats.confirmed}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">Total bookings</p>
              <p className="text-3xl font-bold text-black">{stats.total}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">Outstanding</p>
              <p className="text-3xl font-bold text-black">€2.1K</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48 -mx-8 -mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d6fb3d" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#d6fb3d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#d1d5db" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff' }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#000000"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Next Booking + Upcoming Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Booking - Featured Card */}
        {nextBooking && (
          <div className="lg:col-span-1 bg-black text-white rounded-2xl p-8 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            <p className="text-white/60 text-sm font-medium">Next on the calendar</p>
            <h3 className="text-2xl font-bold mt-4 mb-1">{nextBooking.name}</h3>
            <p className="text-white/70 text-sm mb-6">{nextBooking.package_type}</p>

            <div className="space-y-3 text-sm mb-8 flex-1">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-lime-400" />
                <span>{new Date(nextBooking.preferred_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · 4:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-lime-400" />
                <span>Studio A, Via Tortona</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-white/60 text-xs mb-2">Balance due</p>
              <p className="text-2xl font-bold mb-4">€1,200</p>
              <a
                href="/admin/bookings"
                className="block w-full py-3 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition text-center text-sm"
              >
                Open brief
              </a>
            </div>
          </div>
        )}

        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black">Upcoming bookings</h2>
            <a href="/admin/bookings" className="text-gray-600 hover:text-black text-sm font-medium">View all</a>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : upcomingBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No upcoming bookings</div>
          ) : (
            <div className="space-y-4 divide-y divide-gray-200">
              {upcomingBookings.map(booking => (
                <div key={booking.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                      {new Date(booking.preferred_date).getDate()}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black">{booking.name}</p>
                      <p className="text-sm text-gray-600">{booking.package_type} · {booking.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-black">€1,200</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-lime-100 text-lime-700'
                        : booking.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-black text-white'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'completed' ? 'Completed' : 'Inquiry'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid - 4 Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.total, icon: TrendingUp, color: 'bg-blue-50' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-yellow-50' },
          { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'bg-green-50' },
          { label: 'Est. Revenue', value: `€${(stats.revenue / 1000).toFixed(1)}K`, icon: ArrowUpRight, color: 'bg-lime-50' },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`${card.color} border border-gray-200 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}>
              <Icon className="w-5 h-5 text-gray-700 mb-3" />
              <p className="text-gray-600 text-xs font-medium mb-2">{card.label}</p>
              <p className="text-2xl font-bold text-black">{card.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
