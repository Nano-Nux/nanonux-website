"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Detect current locale from path
  // SSR-safe locale detection
  let isMM = false;
  if (typeof window !== 'undefined') {
    isMM = window.location.pathname.startsWith('/mm');
  }
  // Myanmar text for "Myanmar"
  const mmText = "မြန်မာ";

  // Language switch handler
  const handleLangSwitch = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/mm')) {
        window.location.pathname = '/en';
      } else {
        window.location.pathname = '/mm';
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 nav-elev">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="NANO NUX" width={196} height={140} className="h-15 w-auto" />
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#services" className="text-gray-600 hover:text-[#1E3A8A] transition-colors nav-link">
              Services
            </a>
            <a href="#about" className="text-gray-600 hover:text-[#1E3A8A] transition-colors nav-link">
              About
            </a>
            <a
              href="#contact"
              className="px-6 py-2 bg-[#E5B80B] text-white rounded-full hover:bg-[#d4a90a] transition-all hover:scale-105"
            >
              Get Started
            </a>
            <button
              onClick={handleLangSwitch}
              className="ml-6 px-4 py-2 rounded-full border border-gray-400 bg-white font-semibold hover:bg-gray-50 transition-all flex items-center gap-1"
              aria-label="Switch language"
            >
              <span className={isMM ? "text-[#1E3A8A]" : "text-gray-400"}>{mmText}</span>
              <span className="mx-1 text-gray-300">/</span>
              <span className={!isMM ? "text-[#1E3A8A]" : "text-gray-400"}>ENG</span>
            </button>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleLangSwitch}
              className="px-3 py-1 rounded-full border border-gray-400 bg-white font-semibold text-sm mr-2 flex items-center gap-1"
              aria-label="Switch language"
            >
              <span className={isMM ? "text-[#1E3A8A]" : "text-gray-400"}>{mmText}</span>
              <span className="mx-1 text-gray-300">/</span>
              <span className={!isMM ? "text-[#1E3A8A]" : "text-gray-400"}>ENG</span>
            </button>
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md border border-gray-200 bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute right-4 left-4 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="flex flex-col space-y-3">
            <a href="#services" onClick={() => setOpen(false)} className="py-2 text-gray-700">
              Services
            </a>
            <a href="#about" onClick={() => setOpen(false)} className="py-2 text-gray-700">
              About
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="py-2 text-gray-700">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
