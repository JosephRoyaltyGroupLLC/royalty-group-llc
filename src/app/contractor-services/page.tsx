import Image from "next/image";
import Link from "next/link";

export default function ContractorServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">Contractor Services</h1>
          <p className="text-xl text-gray-300">
            Royalty Group LLC is proud to be a trusted service provider broker for high-quality contractor services.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
            Beyond our independent living homes, we connect our clients with a network of vetted, reliable, and professional contractors. Whether you need a quick repair or ongoing property maintenance, we broker the best talent in Oceanside to get the job done right.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 7.1 Handyman Repairs */}
            <div id="handyman" className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Handyman Repairs</h3>
              <p className="text-gray-600">Quick, efficient, and professional repairs for your home or business. From fixing leaky faucets to patching drywall, our network handles it all.</p>
            </div>

            {/* 7.2 Commercial Cleaning */}
            <div id="cleaning" className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Commercial Cleaning</h3>
              <p className="text-gray-600">Maintain a spotless and hygienic environment. We provide top-tier cleaning services for offices, commercial spaces, and multi-unit residences.</p>
            </div>

            {/* 7.3 Property Maintenance */}
            <div id="maintenance" className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Property Maintenance</h3>
              <p className="text-gray-600">Keep your properties in pristine condition with regular, scheduled maintenance. We ensure landscaping, HVAC, and exterior upkeep are consistently managed.</p>
            </div>

            {/* 7.4 Property Repairs */}
            <div id="repairs" className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Property Repairs</h3>
              <p className="text-gray-600">We broker major repair services to address structural, plumbing, and electrical issues, ensuring the longevity and safety of your buildings.</p>
            </div>

            {/* 7.5 Lite Construction */}
            <div id="construction" className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Lite Construction</h3>
              <p className="text-gray-600">Planning a remodel or minor addition? Our network includes licensed professionals ready to handle lite construction projects from concept to completion.</p>
            </div>
            
            {/* CTA Card */}
            <div className="bg-primary text-white p-8 rounded-xl shadow-md flex flex-col justify-center text-center">
              <h3 className="text-xl font-bold mb-4 text-secondary">Need a Contractor?</h3>
              <p className="text-sm text-gray-300 mb-6">Contact our brokerage team to get matched with the right professional for your specific needs.</p>
              <Link href="/contact" className="inline-block px-6 py-2 bg-secondary text-white font-medium rounded-md hover:bg-secondary-light transition-colors">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
