'use client';

import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    studioName: 'MEOCY Studio',
    studioEmail: 'hello@meocy.com',
    studioPhone: '+39 379 105 1000',
    studioLocation: 'Milan, Italy',
    adminPassword: '••••••••',
    bookingNotifications: true,
    autoConfirm: false,
    maxDailyBookings: 5,
  });

  const [saved, setSaved] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    // Save settings (in real app, send to backend)
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage admin panel and studio information</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-4 text-sm text-green-300">
          ✓ Settings saved successfully
        </div>
      )}

      {/* Studio Information */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-white">Studio Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Studio Name</label>
          <input
            type="text"
            name="studioName"
            value={settings.studioName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="studioEmail"
            value={settings.studioEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            name="studioPhone"
            value={settings.studioPhone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
          <input
            type="text"
            name="studioLocation"
            value={settings.studioLocation}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>
      </div>

      {/* Booking Settings */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-white">Booking Settings</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="bookingNotifications"
            checked={settings.bookingNotifications}
            onChange={handleChange}
            className="w-5 h-5 rounded"
          />
          <span className="text-gray-300">Email notifications for new bookings</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="autoConfirm"
            checked={settings.autoConfirm}
            onChange={handleChange}
            className="w-5 h-5 rounded"
          />
          <span className="text-gray-300">Auto-confirm bookings</span>
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Max daily bookings</label>
          <input
            type="number"
            name="maxDailyBookings"
            value={settings.maxDailyBookings}
            onChange={handleChange}
            min="1"
            max="20"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>
      </div>

      {/* Security */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-white">Security</h2>

        {!showPasswordChange ? (
          <button
            onClick={() => setShowPasswordChange(true)}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-900/20 rounded-lg transition border border-red-700/30"
          >
            Change Admin Password
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="password"
              placeholder="New password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Save password
                  setShowPasswordChange(false);
                  setAdminPassword('');
                }}
                className="flex-1 px-4 py-2 bg-lime-400 text-black font-medium rounded-lg hover:bg-lime-300 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowPasswordChange(false);
                  setAdminPassword('');
                }}
                className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3 text-sm text-blue-300">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          Keep your password secure. Never share it with others.
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition"
      >
        <Save className="w-5 h-5" />
        Save Settings
      </button>
    </div>
  );
}
