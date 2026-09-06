'use client';

import React from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Zap } from 'lucide-react';

const revenueData = [
  { month: 'Mar', revenue: 21400, cost: 7800 },
  { month: 'Apr', revenue: 26800, cost: 9100 },
  { month: 'May', revenue: 24200, cost: 8600 },
  { month: 'Jun', revenue: 31900, cost: 10400 },
  { month: 'Jul', revenue: 35600, cost: 11800 },
  { month: 'Aug', revenue: 38200, cost: 12100 },
  { month: 'Sep', revenue: 42750, cost: 13400 },
];

const packages = [
  { name: 'Product Essential', type: 'Product', price: 1850, booked: 34, share: 22 },
  { name: 'Fashion Editorial', type: 'Fashion', price: 5600, booked: 19, share: 38 },
  { name: 'Restaurant Full Menu', type: 'Restaurant', price: 3400, booked: 22, share: 26 },
  { name: 'Model Portfolio', type: 'Model', price: 950, booked: 41, share: 14 },
];

const transactions = [
  { id: 'TX-9082', client: 'Casa Aurelia', date: '2026-09-01', amount: 1020, method: 'Bank transfer', status: 'Paid' },
  { id: 'TX-9081', client: 'Verità Atelier', date: '2026-08-30', amount: 5600, method: 'Card', status: 'Paid' },
  { id: 'TX-9080', client: 'Maison Livrée', date: '2026-08-28', amount: 2940, method: 'Bank transfer', status: 'Paid' },
  { id: 'TX-9079', client: 'Nordio Skincare', date: '2026-08-26', amount: 1295, method: 'Card', status: 'Pending' },
  { id: 'TX-9078', client: 'Trattoria Bosco', date: '2026-08-22', amount: 1120, method: 'Cash', status: 'Pending' },
];

export default function FinancialsPage() {
  const collected = transactions.filter(t => t.status === 'Paid').reduce((sum, t) => sum + t.amount, 0);
  const pending = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-semibold text-black">Financials</h1>
        <p className="mt-1 text-gray-600">Revenue, packages and outstanding invoices</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <p className="text-sm text-gray-600 mb-2">Collected This Quarter</p>
          <p className="text-4xl font-bold text-black">€{(collected / 1000).toFixed(1)}k</p>
          <p className="text-xs text-gray-600 mt-2">€{(pending / 1000).toFixed(1)}k pending</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <p className="text-sm text-gray-600 mb-2">This Month</p>
          <p className="text-4xl font-bold text-black">€{(revenueData[revenueData.length - 1].revenue / 1000).toFixed(1)}k</p>
          <p className="text-xs text-gray-600 mt-2">+{((revenueData[revenueData.length - 1].revenue - revenueData[revenueData.length - 2].revenue) / revenueData[revenueData.length - 2].revenue * 100).toFixed(1)}% vs last month</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <p className="text-sm text-gray-600 mb-2">Profit Margin</p>
          <p className="text-4xl font-bold text-black">68%</p>
          <p className="text-xs text-gray-600 mt-2">Average across all packages</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-black mb-6">Revenue vs Production Cost</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e5e5', background: '#fff' }}
              />
              <Bar dataKey="revenue" fill="#000" radius={[8, 8, 0, 0]} />
              <Bar dataKey="cost" fill="#d6fb3d" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Mix */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <h3 className="text-lg font-semibold text-black mb-6">Revenue Mix</h3>
          <div className="space-y-4">
            {packages.map(pkg => (
              <div key={pkg.name}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-black">{pkg.type}</span>
                  <span className="text-gray-600">{pkg.share}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pkg.share >= 35 ? 'bg-lime-400' : 'bg-black'}`}
                    style={{ width: `${pkg.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <h2 className="text-lg font-semibold text-black mb-6">Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map(pkg => {
            const lead = pkg.share >= 35;
            return (
              <div
                key={pkg.name}
                className={`rounded-2xl p-6 ${lead ? 'bg-black text-white' : 'bg-white border border-gray-200'}`}
              >
                {lead && (
                  <span className="inline-flex px-2.5 py-1 bg-lime-400 text-black text-xs font-semibold rounded-full mb-3">
                    Top revenue
                  </span>
                )}
                <p className={`text-xs uppercase font-semibold tracking-wider mb-2 ${lead ? 'text-white/70' : 'text-gray-600'}`}>
                  {pkg.type}
                </p>
                <h3 className={`text-lg font-semibold mb-3 ${lead ? 'text-white' : 'text-black'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-3xl font-bold mb-4 ${lead ? 'text-white' : 'text-black'}`}>
                  €{pkg.price.toLocaleString()}
                </p>
                <p className={`text-sm mb-4 ${lead ? 'text-white/70' : 'text-gray-600'}`}>
                  {pkg.booked} booked this year
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Transactions
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-8 py-4 text-xs font-semibold text-gray-600 uppercase">Reference</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Client</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Method</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase text-right">Amount</th>
                <th className="px-8 py-4 text-xs font-semibold text-gray-600 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50 transition">
                  <td className="px-8 py-4 font-medium text-black">{tx.id}</td>
                  <td className="px-6 py-4 text-gray-700">{tx.client}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{tx.method}</td>
                  <td className="px-6 py-4 text-right font-medium text-black">
                    €{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-4 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'Paid'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
