import Link from "next/link";
import React from "react";

export default function InfoServicesDivision() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Royalty Group <span className="text-secondary">Information Services</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 drop-shadow-md">
            Secure IT infrastructure, data management, and specialized technological consulting for modern enterprises.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white flex-grow">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Robust IT Solutions for a Connected World</h2>
          <p className="text-lg text-gray-700 mb-8">
            Royalty Group Information Services provides end-to-end technology solutions. We specialize in building secure, scalable IT infrastructures, managing complex data systems, and offering strategic consulting to help businesses navigate the digital landscape safely and efficiently.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
             <div className="bg-muted p-8 rounded-lg shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary mb-3">IT Infrastructure & Security</h3>
               <p className="text-gray-600">Design, deployment, and management of robust network architectures. We prioritize cybersecurity, ensuring your data is protected against modern threats with enterprise-grade firewalls and monitoring.</p>
             </div>
             <div className="bg-muted p-8 rounded-lg shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary mb-3">Cloud Solutions & Data Management</h3>
               <p className="text-gray-600">Seamless migration and management of cloud-based systems. We provide reliable data storage, backup, and disaster recovery solutions to guarantee business continuity.</p>
             </div>
          </div>
          
          <div className="mt-16">
            <Link href="/contact" className="inline-block px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-md shadow-lg transition-all text-lg">
              Contact Our IT Specialists
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
