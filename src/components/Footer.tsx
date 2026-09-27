import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-secondary">
              Royalty Group LLC
            </h3>
            <p className="text-sm text-gray-300">
              A premier multi-faceted company dedicated to excellence across housing, contractor services, cleaning, maintenance, AI, and information services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-600 pb-2">Our Divisions</h4>
            <ul className="space-y-2">
              <li><Link href="/homes" className="text-sm text-gray-300 hover:text-secondary transition-colors">Royalty Group Homes</Link></li>
              <li><Link href="/contractor-services" className="text-sm text-gray-300 hover:text-secondary transition-colors">Contracting Services</Link></li>
              <li><Link href="/cleaning" className="text-sm text-gray-300 hover:text-secondary transition-colors">Cleaning Services</Link></li>
              <li><Link href="/maintenance" className="text-sm text-gray-300 hover:text-secondary transition-colors">Maintenance</Link></li>
              <li><Link href="/ai" className="text-sm text-gray-300 hover:text-secondary transition-colors">Artificial Intelligence</Link></li>
              <li><Link href="/information-services" className="text-sm text-gray-300 hover:text-secondary transition-colors">Information Services</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-600 pb-2">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/apply" className="text-sm text-gray-300 hover:text-secondary transition-colors">Apply for Housing</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link href="/portal" className="text-sm text-gray-300 hover:text-secondary transition-colors">Resident Portal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-600 pb-2">Contact Info</h4>
            <address className="not-italic text-sm text-gray-300 space-y-2">
              <p>Oceanside, CA</p>
              <p>Email: info@royaltygroupllc.net</p>
              <p>Phone: (760) 248-8331</p>
              <p>Joseph Surgeon: (760) 330-7447</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Royalty Group LLC. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
