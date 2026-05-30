"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary tracking-tight">
                Royalty Group
                <span className="text-secondary"> LLC</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link href="/about" className="relative group text-sm font-semibold text-gray-700 hover:text-primary transition-colors py-2">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="/independent-living" className="relative group text-sm font-semibold text-gray-700 hover:text-primary transition-colors py-2">
              Independent Living
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="/housing" className="relative group text-sm font-semibold text-gray-700 hover:text-primary transition-colors py-2">
              Housing Options
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="/properties" className="relative group text-sm font-semibold text-gray-700 hover:text-primary transition-colors py-2">
              Properties
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="/contractor-services" className="relative group text-sm font-semibold text-gray-700 hover:text-primary transition-colors py-2">
              Contractor Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="/partner-listings" className="relative group text-sm font-semibold text-gray-700 hover:text-primary transition-colors py-2">
              Partner Listings
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="/contact" className="relative group text-sm font-semibold text-gray-700 hover:text-primary transition-colors py-2">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Link 
              href="/apply" 
              className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-blue-600 px-6 text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Apply for Housing
            </Link>
            <Link 
              href="/login" 
              className="inline-flex h-10 items-center justify-center rounded-full border-2 border-primary px-6 text-sm font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Portal Login
            </Link>
            <Link 
              href="/partner/register" 
              className="inline-flex h-10 items-center justify-center rounded-full border-2 border-secondary px-6 text-sm font-bold text-secondary transition-all duration-300 hover:bg-secondary hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Partner Portal
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
          <div className="md:hidden py-6 border-t border-gray-100 bg-white/95 backdrop-blur-xl animate-in slide-in-from-top-2 shadow-inner">
            <div className="flex flex-col space-y-2">
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-gray-700 hover:text-secondary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors">About Us</Link>
              <Link href="/independent-living" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-gray-700 hover:text-secondary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors">Independent Living</Link>
              <Link href="/housing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-gray-700 hover:text-secondary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors">Housing Options</Link>
              <Link href="/properties" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-gray-700 hover:text-secondary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors">Properties</Link>
              <Link href="/contractor-services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-gray-700 hover:text-secondary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors">Contractor Services</Link>
              <Link href="/partner-listings" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-gray-700 hover:text-secondary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors">Partner Listings</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-gray-700 hover:text-secondary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors">Contact Us</Link>
              
              <div className="border-t border-gray-100 pt-6 mt-4 flex flex-col space-y-4 px-4">
                <Link 
                  href="/apply" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-blue-600 px-6 text-base font-bold text-white shadow-md transition-all active:scale-95"
                >
                  Apply for Housing
                </Link>
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex h-12 items-center justify-center rounded-full border-2 border-primary px-6 text-base font-bold text-primary transition-all active:scale-95 hover:bg-primary hover:text-white"
                >
                  Portal Login
                </Link>
                <Link 
                  href="/partner/register" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex h-12 items-center justify-center rounded-full border-2 border-secondary px-6 text-base font-bold text-secondary transition-all active:scale-95 hover:bg-secondary hover:text-white"
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
