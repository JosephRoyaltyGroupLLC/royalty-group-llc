import Link from "next/link";
import React from "react";

export default function HomesDivision() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Royalty Group <span className="text-secondary">Homes</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 drop-shadow-md">
            Premium independent living for seniors and adults with disabilities in beautiful Oceanside, California.
          </p>
        </div>
      </section>

      {/* Navigation Hub */}
      <section className="py-20 bg-muted flex-grow">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/independent-living" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-secondary group">
              <h2 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">Independent Living</h2>
              <p className="text-gray-600">Discover our supportive and vibrant independent living communities designed for comfort and safety.</p>
            </Link>
            
            <Link href="/housing" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-secondary group">
              <h2 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">Housing Options</h2>
              <p className="text-gray-600">Explore our flexible shared and private room options tailored to fit various budgets and lifestyles.</p>
            </Link>
            
            <Link href="/properties" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-secondary group">
              <h2 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">Available Properties</h2>
              <p className="text-gray-600">View our current portfolio of premium homes and find the perfect location for you or your loved one.</p>
            </Link>

            <Link href="/partner-listings" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-secondary group">
              <h2 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">Partner Listings</h2>
              <p className="text-gray-600">View available properties provided by our network of trusted community partners.</p>
            </Link>

            <Link href="/apply" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-primary group">
              <h2 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary transition-colors">Apply Now</h2>
              <p className="text-gray-600">Ready to join our community? Start your secure online application process today.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-secondary">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Submit your application today through our secure online portal and take the first step towards your new home.
          </p>
          <Link 
            href="/login" 
            className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-md shadow-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Create Your Profile to Apply
          </Link>
        </div>
      </section>
    </div>
  );
}
