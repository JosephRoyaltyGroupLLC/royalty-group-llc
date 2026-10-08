"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDivisionsOpen, setIsDivisionsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#122b46] shadow-xl h-24 flex items-center">
      {/* Slanted White Background for Logo */}
      <div 
        className="absolute left-0 top-0 h-full w-[280px] md:w-[380px] bg-white z-10"
        style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)" }}
      >
        <Link href="/" className="flex h-full items-center justify-center pl-4 pr-12 md:pr-16">
          <Image 
            src="/logo.png" 
            alt="Royalty Group LLC Logo" 
            width={220} 
            height={90} 
            className="h-16 md:h-[4.5rem] w-auto object-contain"
            priority
          />
        </Link>
      </div>

      <div className="container mx-auto px-4 sm:px-6 flex justify-end items-center h-full relative z-20">
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8 items-center text-white mr-6 xl:mr-8">
          <Link href="/" className={`text-[15px] font-medium pb-1 border-b-2 transition-colors ${pathname === '/' ? 'border-secondary text-white' : 'border-transparent hover:text-gray-300'}`}>
            Home
          </Link>
          <Link href="/about" className={`text-[15px] font-medium pb-1 border-b-2 transition-colors ${pathname === '/about' ? 'border-secondary text-white' : 'border-transparent hover:text-gray-300'}`}>
            About
          </Link>
          
          {/* Services Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => setIsDivisionsOpen(!isDivisionsOpen)}
              className={`flex items-center gap-1 text-[15px] font-medium pb-1 border-b-2 transition-colors ${['/homes', '/contractor-services', '/cleaning', '/maintenance', '/ai', '/information-services'].includes(pathname) ? 'border-secondary text-white' : 'border-transparent hover:text-gray-300'}`}
            >
              Services
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isDivisionsOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>

            {isDivisionsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDivisionsOpen(false)}></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[280px] rounded bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border-t-4 border-secondary">
                  <div className="py-2 relative z-50">
                    <Link href="/homes" onClick={() => setIsDivisionsOpen(false)} className="block px-5 py-3 text-sm font-semibold text-primary hover:bg-gray-50 hover:text-secondary border-b border-gray-100">
                      Property Management & Homes
                    </Link>
                    <Link href="/contractor-services" onClick={() => setIsDivisionsOpen(false)} className="block px-5 py-3 text-sm font-semibold text-primary hover:bg-gray-50 hover:text-secondary border-b border-gray-100">
                      Contracting Services
                    </Link>
                    <Link href="/cleaning" onClick={() => setIsDivisionsOpen(false)} className="block px-5 py-3 text-sm font-semibold text-primary hover:bg-gray-50 hover:text-secondary border-b border-gray-100">
                      Professional Cleaning
                    </Link>
                    <Link href="/maintenance" onClick={() => setIsDivisionsOpen(false)} className="block px-5 py-3 text-sm font-semibold text-primary hover:bg-gray-50 hover:text-secondary border-b border-gray-100">
                      Maintenance & Upkeep
                    </Link>
                    <Link href="/ai" onClick={() => setIsDivisionsOpen(false)} className="block px-5 py-3 text-sm font-semibold text-primary hover:bg-gray-50 hover:text-secondary border-b border-gray-100">
                      Artificial Intelligence
                    </Link>
                    <Link href="/information-services" onClick={() => setIsDivisionsOpen(false)} className="block px-5 py-3 text-sm font-semibold text-primary hover:bg-gray-50 hover:text-secondary">
                      Information Services
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          <Link href="/properties" className={`text-[15px] font-medium pb-1 border-b-2 transition-colors ${pathname === '/properties' ? 'border-secondary text-white' : 'border-transparent hover:text-gray-300'}`}>
            Portfolio
          </Link>
          <Link href="/news" className={`text-[15px] font-medium pb-1 border-b-2 transition-colors ${pathname === '/news' ? 'border-secondary text-white' : 'border-transparent hover:text-gray-300'}`}>
            News
          </Link>
        </nav>

        {/* CTA & Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link 
            href="/contact" 
            className="inline-flex h-11 items-center justify-center rounded bg-[#c5a059] px-6 text-[15px] font-semibold text-[#002147] shadow-md transition-all hover:bg-[#d4b26a]"
          >
            Contact Us
          </Link>
          <Link 
            href="/login" 
            className="inline-flex h-11 items-center justify-center rounded border border-white/20 bg-white/5 px-6 text-[15px] font-medium text-white shadow-sm transition-all hover:bg-white/10"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden ml-auto">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary rounded-md"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-[#0d2238] lg:hidden py-4 border-t border-white/10 animate-in slide-in-from-top-2 shadow-2xl z-40">
          <div className="flex flex-col space-y-4 px-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-secondary px-2 py-1">Home</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-secondary px-2 py-1">About Us</Link>
            
            <div className="flex flex-col space-y-2 mt-2 mb-2 bg-white/5 p-4 rounded border-l-4 border-secondary">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Services</span>
              <Link href="/homes" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white hover:text-secondary pl-2 py-1">Property Management & Homes</Link>
              <Link href="/contractor-services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white hover:text-secondary pl-2 py-1">Contracting Services</Link>
              <Link href="/cleaning" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white hover:text-secondary pl-2 py-1">Professional Cleaning</Link>
              <Link href="/maintenance" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white hover:text-secondary pl-2 py-1">Maintenance & Upkeep</Link>
              <Link href="/ai" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white hover:text-secondary pl-2 py-1">Artificial Intelligence</Link>
              <Link href="/information-services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white hover:text-secondary pl-2 py-1">Information Services</Link>
            </div>

            <Link href="/properties" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-secondary px-2 py-1">Portfolio</Link>
            <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-secondary px-2 py-1">News</Link>
            
            <div className="border-t border-white/10 pt-6 pb-2 flex flex-col space-y-4 px-2">
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex h-12 items-center justify-center rounded bg-[#c5a059] px-6 text-[15px] font-semibold text-[#002147] shadow-md transition-all hover:bg-[#d4b26a]"
              >
                Contact Us
              </Link>
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex h-12 items-center justify-center rounded border border-white/30 bg-white/5 px-6 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/10"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
