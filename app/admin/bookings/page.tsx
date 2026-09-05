'use client';

import React, { useEffect, useState } from 'react';
import { Search, Calendar, Mail, Phone, FileText } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  package_type: string;
  shoot_type: string;
  location: string;
  preferred_time: string;
  special_requests: string;
  status: string;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bookings`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (search) {
      filtered = filtered.filter(
        b =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, search, statusFilter]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setBookings(bookings.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b)));
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-black mb-2">Bookings</h1>
        <p className="text-gray-600">Manage all photography bookings</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Table */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-black mb-6">
            {filteredBookings.length} Booking{filteredBookings.length !== 1 ? 's' : ''}
          </h2>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No bookings found</div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredBookings.map(booking => (
                <button
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className={`w-full p-4 rounded-lg text-left transition border ${
                    selectedBooking?.id === booking.id
                      ? 'bg-lime-100 border-lime-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold">{booking.name}</p>
                      <p className="text-gray-600 text-sm">{booking.email}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(booking.preferred_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Booking Details */}
        {selectedBooking && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit shadow-sm">
            <h2 className="text-xl font-bold text-black mb-6">Details</h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1 font-medium">Name</p>
                <p className="text-gray-900 font-semibold">{selectedBooking.name}</p>
              </div>

              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2 font-medium">
                  <Mail className="w-4 h-4" /> Email
                </p>
                <a href={`mailto:${selectedBooking.email}`} className="text-lime-600 hover:text-lime-700 font-medium">
                  {selectedBooking.email}
                </a>
              </div>

              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4" /> Phone
                </p>
                <p className="text-gray-900">{selectedBooking.phone}</p>
              </div>

              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4" /> Date & Time
                </p>
                <p className="text-gray-900">
                  {new Date(selectedBooking.preferred_date).toLocaleDateString()} at{' '}
                  {selectedBooking.preferred_time}
                </p>
              </div>

              <div>
                <p className="text-gray-600 mb-1 font-medium">Package</p>
                <p className="text-gray-900 capitalize">{selectedBooking.package_type}</p>
              </div>

              <div>
                <p className="text-gray-600 mb-1 font-medium">Shoot Type</p>
                <p className="text-gray-900 capitalize">{selectedBooking.shoot_type}</p>
              </div>

              <div>
                <p className="text-gray-600 mb-1 font-medium">Location</p>
                <p className="text-gray-900">{selectedBooking.location}</p>
              </div>

              {selectedBooking.special_requests && (
                <div>
                  <p className="text-gray-600 mb-1 flex items-center gap-2 font-medium">
                    <FileText className="w-4 h-4" /> Special Requests
                  </p>
                  <p className="text-gray-900 text-sm">{selectedBooking.special_requests}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-3 font-medium">Status</p>
                <select
                  value={selectedBooking.status}
                  onChange={e => handleStatusChange(selectedBooking.id, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <p className="text-gray-500 text-xs pt-4">
                Booked on {new Date(selectedBooking.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
