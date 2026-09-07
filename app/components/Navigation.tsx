'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
  { code: 'fr', label: 'FR' },
];

export default function Navigation() {
  const [currentLang, setCurrentLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get language preference from localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('preferredLanguage') : null;
    if (stored && languages.find(l => l.code === stored)) {
      setCurrentLang(stored);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang: langCode } }));
  };

  const navLinks = [
    { href: '#about', label: 'Work' },
    { href: '#packages', label: 'How it works' },
    { href: '#equipment', label: 'Equipment' },
    { href: '#estimate', label: 'Estimate' },
    { href: '#packages', label: 'Packages' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo - Reduced size */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
            <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm hidden sm:inline">MEOCY</span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side - Language selector and CTA */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            {mounted && (
              <div className="hidden sm:flex gap-2 border-l border-gray-200 pl-4">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`text-xs font-medium transition-colors px-2 py-1 rounded cursor-pointer ${
                      currentLang === lang.code
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title={`Switch to ${lang.label}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}

            {/* Book Now Button */}
            <a
              href="#booking"
              className="text-xs font-semibold px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
