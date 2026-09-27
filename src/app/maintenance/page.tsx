import Link from "next/link";
import React from "react";

export default function MaintenanceDivision() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Royalty Group <span className="text-secondary">Maintenance</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 drop-shadow-md">
            Reliable property maintenance and handyman repairs to keep your assets in pristine condition year-round.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white flex-grow">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Preserving Your Assets, Protecting Your Investment</h2>
          <p className="text-lg text-gray-700 mb-8">
            Royalty Group Maintenance provides comprehensive facilities management and repair services. Whether it's routine preventative maintenance or emergency repairs, our skilled technicians ensure your property remains safe, functional, and aesthetically pleasing.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
             <div className="bg-muted p-8 rounded-lg shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary mb-3">Preventative Maintenance</h3>
               <p className="text-gray-600">Proactive inspection and servicing of building systems (HVAC, plumbing, electrical) to prevent costly breakdowns and extend the lifespan of your property infrastructure.</p>
             </div>
             <div className="bg-muted p-8 rounded-lg shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary mb-3">On-Demand Repairs</h3>
               <p className="text-gray-600">Responsive handyman services for immediate repair needs. From drywall patching to fixture replacement, we handle the day-to-day wear and tear efficiently.</p>
             </div>
          </div>
          
          <div className="mt-16">
            <Link href="/contact" className="inline-block px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-md shadow-lg transition-all text-lg">
              Schedule Maintenance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
