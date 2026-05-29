"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
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
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              About Us
            </Link>
            <Link href="/independent-living" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Independent Living
            </Link>
            <Link href="/housing" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Housing Options
            </Link>
            <Link href="/properties" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Properties
            </Link>
            <Link href="/contractor-services" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Contractor Services
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/apply" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-secondary-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
            >
              Apply for Housing
            </Link>
            <Link 
              href="/login" 
              className="inline-flex h-10 items-center justify-center rounded-md border border-primary px-6 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Portal Login
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
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-foreground hover:text-secondary px-2 py-1">About Us</Link>
              <Link href="/independent-living" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-foreground hover:text-secondary px-2 py-1">Independent Living</Link>
              <Link href="/housing" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-foreground hover:text-secondary px-2 py-1">Housing Options</Link>
              <Link href="/properties" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-foreground hover:text-secondary px-2 py-1">Properties</Link>
              <Link href="/contractor-services" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-foreground hover:text-secondary px-2 py-1">Contractor Services</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-foreground hover:text-secondary px-2 py-1">Contact Us</Link>
              
              <div className="border-t border-gray-100 pt-4 flex flex-col space-y-3 px-2">
                <Link 
                  href="/apply" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex h-10 items-center justify-center rounded-md bg-secondary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-secondary-light"
                >
                  Apply for Housing
                </Link>
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex h-10 items-center justify-center rounded-md border border-primary px-6 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
                >
                  Portal Login
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
