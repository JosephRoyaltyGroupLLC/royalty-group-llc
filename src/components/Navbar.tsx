"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDivisionsOpen, setIsDivisionsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="Royalty Group LLC Logo" 
                width={350} 
                height={100} 
                className="h-24 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-10 items-center">
            <Link href="/about" className="text-base font-bold text-primary hover:text-secondary transition-colors whitespace-nowrap">
              About Us
            </Link>
            
            {/* Divisions Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setIsDivisionsOpen(!isDivisionsOpen)}
                className="flex items-center gap-1 text-base font-bold text-primary hover:text-secondary transition-colors whitespace-nowrap"
              >
                Services
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isDivisionsOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {isDivisionsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDivisionsOpen(false)}></div>
                  <div className="absolute top-full mt-4 w-64 rounded bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border-t-4 border-secondary">
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

            <Link href="/contact" className="text-base font-bold text-primary hover:text-secondary transition-colors whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="inline-flex h-11 items-center justify-center rounded border border-primary px-6 text-sm font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-white uppercase tracking-wider"
            >
              Login
            </Link>
            <Link 
              href="/partner/register" 
              className="inline-flex h-11 items-center justify-center rounded bg-secondary px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary-light uppercase tracking-wider"
            >
              Partner Portal
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary rounded-md"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-primary hover:text-secondary px-2 py-1">About Us</Link>
              
              <div className="flex flex-col space-y-2 mt-2 mb-2 bg-gray-50 p-3 rounded border-l-4 border-secondary">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Services</span>
                <Link href="/homes" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-primary hover:text-secondary pl-2 py-1">Property Management & Homes</Link>
                <Link href="/contractor-services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-primary hover:text-secondary pl-2 py-1">Contracting Services</Link>
                <Link href="/cleaning" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-primary hover:text-secondary pl-2 py-1">Professional Cleaning</Link>
                <Link href="/maintenance" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-primary hover:text-secondary pl-2 py-1">Maintenance & Upkeep</Link>
                <Link href="/ai" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-primary hover:text-secondary pl-2 py-1">Artificial Intelligence</Link>
                <Link href="/information-services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-primary hover:text-secondary pl-2 py-1">Information Services</Link>
              </div>

              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-primary hover:text-secondary px-2 py-1">Contact</Link>
              
              <div className="border-t border-gray-100 pt-4 flex flex-col space-y-3 px-2">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex h-11 items-center justify-center rounded border border-primary px-6 text-sm font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-white uppercase tracking-wider"
                >
                  Login
                </Link>
                <Link 
                  href="/partner/register" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex h-11 items-center justify-center rounded bg-secondary px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary-light uppercase tracking-wider"
                >
                  Partner Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
