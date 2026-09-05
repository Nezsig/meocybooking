'use client';

import { useState, useEffect } from 'react';
import Calendar from './Calendar';

interface BookedDate {
  booking_date: string;
  name: string;
  email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function BookingFormAppleStyle() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: 'silver',
    shootType: 'product',
    location: 'Studio',
    preferredDate: '',
    preferredTime: '10:00',
    specialRequests: '',
  });

  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Fetch booked dates
  useEffect(() => {
    fetch(`${API_URL}/api/booked-dates`)
      .then(res => res.json())
      .then(data => setBookedDates(data.booked_dates || []))
      .catch(err => console.error('Failed to fetch booked dates:', err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, preferredDate: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        package: 'silver',
        shootType: 'product',
        location: 'Studio',
        preferredDate: '',
        preferredTime: '10:00',
        specialRequests: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const packages = {
    basic: { name: 'Basic', price: '€200' },
    silver: { name: 'Silver', price: '€400' },
    gold: { name: 'Gold', price: '€750' },
    platinum: { name: 'Platinum', price: '€1000' },
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
          ✓ Booking submitted! Check your email for confirmation.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Details</h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Package Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Package</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(packages).map(([key, pkg]) => (
              <label
                key={key}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  formData.package === key
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="package"
                  value={key}
                  checked={formData.package === key}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="font-semibold text-gray-900">{pkg.name}</div>
                <div className="text-sm text-gray-600">{pkg.price}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Shoot Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Shoot Details</h3>

          <select
            name="shootType"
            value={formData.shootType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="product">Product</option>
            <option value="fashion">Fashion</option>
            <option value="restaurant">Restaurant</option>
            <option value="model">Model</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Studio, Milan, Your Shop)"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Date & Time */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">When</h3>

          <Calendar
            bookedDates={bookedDates}
            selectedDate={formData.preferredDate}
            onSelectDate={handleDateSelect}
          />

          <div className="flex gap-2">
            <label className="text-sm text-gray-600 flex items-center">
              Preferred Time:
              <input
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="ml-2 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </label>
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Special Requests</h3>
          <textarea
            name="specialRequests"
            placeholder="Any special requests or details?"
            value={formData.specialRequests}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !formData.preferredDate}
          className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Sending...' : 'Request Booking'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          We'll confirm your booking within 24 hours. You'll receive a confirmation email immediately.
        </p>
      </form>
    </div>
  );
}
