'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, BarChart3, BookOpen, FileText, Settings, Inbox, Image, Wallet, Sparkles } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken && pathname !== '/admin') {
      router.push('/admin');
    } else if (adminToken) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400"></div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin') {
    return null;
  }

  if (pathname === '/admin') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
    { href: '/admin/bookings', label: 'Bookings', icon: BookOpen },
    { href: '/admin/deliverables', label: 'Deliverables', icon: Image },
    { href: '/admin/portfolio', label: 'Portfolio', icon: Sparkles },
    { href: '/admin/financials', label: 'Financials', icon: Wallet },
    { href: '/admin/documents', label: 'Documents', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-white text-gray-900">
      {/* Sidebar - Dark Floating Panel */}
      <div className="fixed left-0 top-0 w-72 h-screen bg-gradient-to-b from-gray-700/90 via-gray-600/85 to-gray-700/90 p-6 flex flex-col shadow-2xl z-50 backdrop-blur-md" style={{boxShadow: '20px 0 40px rgba(0,0,0,0.15)'}}>
        {/* Logo Section */}
        <div className="mb-12 pt-2">
          <h1 className="text-3xl font-bold text-white/95 tracking-tight">MEOCY</h1>
          <p className="text-gray-400/80 text-xs font-medium tracking-widest mt-2 uppercase">Studio</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1 overflow-y-auto pr-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-lime-400/15 text-lime-200 font-medium border border-lime-400/20 shadow-xl shadow-lime-400/15 backdrop-blur-sm'
                    : 'text-gray-300/80 hover:text-gray-100 hover:bg-white/6 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 transition flex-shrink-0 ${isActive ? 'text-lime-300' : 'text-gray-400 group-hover:text-gray-300'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300/70 hover:text-red-300 hover:bg-red-500/8 border border-transparent hover:border-red-400/15 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-72 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
