'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  preferred_date: string;
  package_type: string;
  status: string;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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

          // Calculate stats
          const total = bookingsList.length;
          const pending = bookingsList.filter((b: Booking) => b.status === 'pending').length;
          const confirmed = bookingsList.filter((b: Booking) => b.status === 'confirmed').length;

          setStats({
            total,
            pending,
            confirmed,
            revenue: total * 500, // Average booking value
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

  const statCards = [
    { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'lime' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'yellow' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'green' },
    { label: 'Est. Revenue', value: `€${stats.revenue}`, icon: TrendingUp, color: 'blue' },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your booking overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          const colorClass = {
            lime: 'from-lime-400/20 to-lime-400/5 border-lime-400/30 text-lime-400',
            yellow: 'from-yellow-400/20 to-yellow-400/5 border-yellow-400/30 text-yellow-400',
            green: 'from-green-400/20 to-green-400/5 border-green-400/30 text-green-400',
            blue: 'from-blue-400/20 to-blue-400/5 border-blue-400/30 text-blue-400',
          }[card.color];

          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${colorClass} border rounded-xl p-6 flex items-start justify-between`}
            >
              <div>
                <p className="text-gray-400 text-sm mb-2">{card.label}</p>
                <p className="text-3xl font-bold text-white">{card.value}</p>
              </div>
              <Icon className="w-8 h-8 opacity-50" />
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Bookings</h2>

        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No bookings yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Package</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(booking => (
                  <tr key={booking.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">{booking.name}</p>
                        <p className="text-gray-500 text-xs">{booking.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(booking.preferred_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{booking.package_type}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-yellow-900/30 text-yellow-400'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={`/admin/bookings?id=${booking.id}`}
                        className="text-lime-400 hover:text-lime-300 text-sm"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <a
          href="/admin/bookings"
          className="block mt-6 text-center text-lime-400 hover:text-lime-300 text-sm font-medium"
        >
          View all bookings →
        </a>
      </div>
    </div>
  );
}
