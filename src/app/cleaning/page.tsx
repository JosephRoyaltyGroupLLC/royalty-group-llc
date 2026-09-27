import Link from "next/link";
import React from "react";

export default function CleaningDivision() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Royalty Group <span className="text-secondary">Cleaning</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 drop-shadow-md">
            Comprehensive residential and commercial cleaning services that ensure a spotless and healthy environment.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white flex-grow">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Pristine Environments, Professional Standards</h2>
          <p className="text-lg text-gray-700 mb-8">
            At Royalty Group Cleaning, we understand that a clean environment is essential for productivity, health, and well-being. Our dedicated team of cleaning professionals utilizes eco-friendly products and state-of-the-art equipment to deliver impeccable results.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
             <div className="bg-muted p-8 rounded-lg shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary mb-3">Commercial Cleaning</h3>
               <p className="text-gray-600">Tailored cleaning solutions for offices, retail spaces, and corporate environments. We work around your schedule to ensure minimal disruption to your business operations.</p>
             </div>
             <div className="bg-muted p-8 rounded-lg shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary mb-3">Residential Deep Cleaning</h3>
               <p className="text-gray-600">Thorough and detail-oriented cleaning for homes and residential properties. From move-in/move-out cleaning to routine maintenance, we keep your home immaculate.</p>
             </div>
          </div>
          
          <div className="mt-16">
            <Link href="/contact" className="inline-block px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-md shadow-lg transition-all text-lg">
              Request a Cleaning Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
