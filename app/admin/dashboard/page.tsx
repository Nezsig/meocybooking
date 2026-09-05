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
        <h1 className="text-4xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your booking overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          const colorClass = {
            lime: 'from-lime-50 to-lime-100/50 border-lime-200 text-lime-700',
            yellow: 'from-yellow-50 to-yellow-100/50 border-yellow-200 text-yellow-700',
            green: 'from-green-50 to-green-100/50 border-green-200 text-green-700',
            blue: 'from-blue-50 to-blue-100/50 border-blue-200 text-blue-700',
          }[card.color];

          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${colorClass} border rounded-xl p-6 flex items-start justify-between shadow-sm`}
            >
              <div>
                <p className="text-gray-700 text-sm mb-2 font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <Icon className="w-8 h-8 opacity-40" />
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-black mb-6">Recent Bookings</h2>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No bookings yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Package</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(booking => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-gray-900 font-medium">{booking.name}</p>
                        <p className="text-gray-500 text-xs">{booking.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(booking.preferred_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-700 capitalize">{booking.package_type}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                    <td className="py-3 px-4">
                      <a
                        href={`/admin/bookings?id=${booking.id}`}
                        className="text-lime-600 hover:text-lime-700 font-medium text-sm"
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
          className="block mt-6 text-center text-lime-600 hover:text-lime-700 text-sm font-semibold"
        >
          View all bookings →
        </a>
      </div>
    </div>
  );
}
