'use client';

import React, { useEffect, useState } from 'react';
import { Search, Calendar, Mail, Phone, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

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
const statuses = ['pending', 'confirmed', 'completed'];
const statusFlow = { pending: 'confirmed', confirmed: 'completed', completed: 'completed' };

function StatusPill({ status }: { status: string }) {
  const tones: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    confirmed: 'bg-green-50 text-green-700 border border-green-200',
    completed: 'bg-blue-50 text-blue-700 border border-blue-200',
    cancelled: 'bg-red-50 text-red-700 border border-red-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tones[status] || tones.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bookings`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data.data || []);
          if ((data.data || []).length > 0) {
            setSelectedBooking((data.data || [])[0]);
          }
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
          b.email.toLowerCase().includes(search.toLowerCase()) ||
          b.shoot_type.toLowerCase().includes(search.toLowerCase())
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
        const updated = bookings.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b));
        setBookings(updated);
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const advanceStatus = async (bookingId: string, currentStatus: string) => {
    const nextStatus = statusFlow[currentStatus as keyof typeof statusFlow] || currentStatus;
    if (nextStatus !== currentStatus) {
      await handleStatusChange(bookingId, nextStatus);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Search */}
      <div className="space-y-4">
        <div>
          <h1 className="text-[32px] font-semibold text-black">Bookings</h1>
          <p className="mt-1 text-gray-600">Every shoot from inquiry to delivery</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or shoot type..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              statusFilter === 'all'
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Status
          </button>
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                statusFilter === status
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bookings List */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">{filteredBookings.length} Booking{filteredBookings.length !== 1 ? 's' : ''}</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No bookings found</div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredBookings.map(booking => (
                <button
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className={`w-full p-4 text-left transition ${
                    selectedBooking?.id === booking.id
                      ? 'bg-lime-50 border-l-2 border-l-lime-400'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-black truncate">{booking.name}</p>
                      <p className="text-sm text-gray-600 truncate">{booking.email}</p>
                    </div>
                    <StatusPill status={booking.status} />
                  </div>
                  <p className="text-xs text-gray-500">{new Date(booking.preferred_date).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Booking Details */}
        {selectedBooking && (
          <div className="lg:col-span-7 space-y-5">
            {/* Main Detail Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{selectedBooking.id}</p>
                  <h2 className="text-3xl font-bold text-black">{selectedBooking.name}</h2>
                  <p className="mt-2 text-gray-700">{selectedBooking.shoot_type} • {selectedBooking.package_type}</p>
                </div>
                <StatusPill status={selectedBooking.status} />
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-gray-600 mt-1" />
                  <div>
                    <p className="text-gray-600 font-medium">Date & Time</p>
                    <p className="text-black">{new Date(selectedBooking.preferred_date).toLocaleDateString()} • {selectedBooking.preferred_time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-600 mt-1" />
                  <div>
                    <p className="text-gray-600 font-medium">Phone</p>
                    <p className="text-black">{selectedBooking.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-600 mt-1" />
                  <div>
                    <p className="text-gray-600 font-medium">Email</p>
                    <a href={`mailto:${selectedBooking.email}`} className="text-lime-600 hover:text-lime-700 font-medium">
                      {selectedBooking.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-gray-600 mt-1" />
                  <div>
                    <p className="text-gray-600 font-medium">Location</p>
                    <p className="text-black">{selectedBooking.location}</p>
                  </div>
                </div>

                {selectedBooking.special_requests && (
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-gray-600 font-medium mb-2">Special Requests</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedBooking.special_requests}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-black text-white rounded-2xl p-8">
              <p className="text-sm text-white/70 mb-2">Current Status</p>
              <p className="text-2xl font-bold mb-6">{selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</p>

              <button
                onClick={() => advanceStatus(selectedBooking.id, selectedBooking.status)}
                disabled={selectedBooking.status === 'completed'}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                  selectedBooking.status === 'completed'
                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                    : 'bg-lime-400 text-black hover:bg-lime-300'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
                {selectedBooking.status === 'completed'
                  ? 'Booking Complete'
                  : `Move to ${statusFlow[selectedBooking.status as keyof typeof statusFlow]?.charAt(0).toUpperCase() + statusFlow[selectedBooking.status as keyof typeof statusFlow]?.slice(1)}`}
              </button>

              <p className="text-xs text-white/60 mt-4">
                Booked on {new Date(selectedBooking.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
