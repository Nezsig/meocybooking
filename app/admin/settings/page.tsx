'use client';

import React, { useState } from 'react';
import { Save, AlertCircle, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    studioName: 'MEOCY Studio',
    studioEmail: 'studio@meocy.com',
    studioPhone: '+39 02 4412 0091',
    studioLocation: 'Via Tortona 27, Milan',
    bookingNotifications: true,
    autoConfirm: false,
    maxDailyBookings: 5,
  });

  const [saved, setSaved] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-semibold text-black">Settings</h1>
        <p className="mt-1 text-gray-600">Studio profile, booking rules, languages and security</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-white text-xs">✓</div>
          Settings saved successfully
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Studio Profile */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-black mb-6">Studio Profile</h2>
            <p className="text-sm text-gray-600 mb-6">Shown on contracts, invoices and client galleries</p>
          </div>

          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <div className="w-16 h-16 rounded-2xl bg-lime-400 flex items-center justify-center text-2xl font-bold text-black">
              MS
            </div>
            <div>
              <p className="font-semibold text-black">MEOCY Studio</p>
              <p className="text-sm text-gray-600">Owner • Admin access</p>
            </div>
            <button className="ml-auto px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
              Change logo
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Studio Name</label>
              <input
                type="text"
                name="studioName"
                value={settings.studioName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="studioEmail"
                value={settings.studioEmail}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="studioPhone"
                value={settings.studioPhone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="studioLocation"
                value={settings.studioLocation}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium">
              Discard
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-lime-400 text-black rounded-lg hover:bg-lime-300 transition font-semibold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Languages & Rules */}
        <div className="space-y-5">
          {/* Languages */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <h3 className="text-lg font-semibold text-black mb-4">Languages</h3>
            <p className="text-sm text-gray-600 mb-4">Content coverage across the public site</p>

            <div className="space-y-3">
              {[
                { code: 'EN', label: 'English', coverage: 100 },
                { code: 'IT', label: 'Italiano', coverage: 92 },
                { code: 'FR', label: 'Français', coverage: 64 }
              ].map(lang => (
                <div key={lang.code}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-black">{lang.label}</span>
                    <span className="text-gray-600">{lang.coverage}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full transition-all ${lang.coverage === 100 ? 'bg-lime-400' : 'bg-black'}`}
                      style={{ width: `${lang.coverage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Rules */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <h3 className="text-lg font-semibold text-black mb-4">Booking Rules</h3>

            <div className="space-y-4 text-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="bookingNotifications"
                  checked={settings.bookingNotifications}
                  onChange={handleChange}
                  className="w-5 h-5 accent-lime-400 cursor-pointer"
                />
                <span className="text-gray-700 font-medium">Email notifications</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="autoConfirm"
                  checked={settings.autoConfirm}
                  onChange={handleChange}
                  className="w-5 h-5 accent-lime-400 cursor-pointer"
                />
                <span className="text-gray-700 font-medium">Auto-confirm bookings</span>
              </label>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Max daily bookings</label>
                <input
                  type="number"
                  name="maxDailyBookings"
                  value={settings.maxDailyBookings}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <h2 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Security
        </h2>

        <div className="space-y-4">
          {showPassword ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPassword(false);
                    setNewPassword('');
                  }}
                  className="flex-1 px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition"
                >
                  Save Password
                </button>
                <button
                  onClick={() => {
                    setShowPassword(false);
                    setNewPassword('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPassword(true)}
              className="w-full px-4 py-2.5 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
            >
              Change Admin Password
            </button>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Keep your password secure</p>
              <p>Never share your admin credentials with others</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
