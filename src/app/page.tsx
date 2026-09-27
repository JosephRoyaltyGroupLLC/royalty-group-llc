import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Welcome to <span className="text-secondary">Royalty Group LLC</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-md">
            A premier multi-faceted company dedicated to excellence across housing, contractor services, cleaning, maintenance, AI, and information services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="#divisions" 
              className="px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-md shadow-lg transition-all text-lg"
            >
              Explore Our Divisions
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white hover:bg-gray-100 text-primary font-semibold rounded-md shadow-lg transition-all text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate Divisions Section */}
      <section id="divisions" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Divisions</h2>
            <p className="text-lg text-gray-700">
              Royalty Group LLC operates multiple specialized divisions, each committed to delivering premium quality, unparalleled service, and innovative solutions to our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Division 1: Homes */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Homes</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Premium independent living communities and housing solutions designed for comfort, safety, and a vibrant sense of community.
                </p>
                <Link href="/homes" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  Explore Homes &rarr;
                </Link>
              </div>
            </div>

            {/* Division 2: Contracting */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Contracting</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Expert contractor services, lite construction, and professional renovations tailored to meet the highest industry standards.
                </p>
                <Link href="/contractor-services" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  Explore Contracting &rarr;
                </Link>
              </div>
            </div>

            {/* Division 3: Cleaning */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Cleaning</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Comprehensive residential and commercial cleaning services that ensure a spotless and healthy environment.
                </p>
                <Link href="/cleaning" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  Explore Cleaning &rarr;
                </Link>
              </div>
            </div>

            {/* Division 4: Maintenance */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Maintenance</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Reliable property maintenance and handyman repairs to keep your assets in pristine condition year-round.
                </p>
                <Link href="/maintenance" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  Explore Maintenance &rarr;
                </Link>
              </div>
            </div>

            {/* Division 5: AI */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Royalty Group AI</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Cutting-edge artificial intelligence solutions and automation systems to drive efficiency and modern growth.
                </p>
                <Link href="/ai" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  Explore AI &rarr;
                </Link>
              </div>
            </div>

            {/* Division 6: Information Services */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Information Services</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Secure IT infrastructure, data management, and specialized technological consulting for modern enterprises.
                </p>
                <Link href="/information-services" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  Explore Info Services &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
