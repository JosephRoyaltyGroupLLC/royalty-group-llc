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
            Welcome to <span className="text-secondary">Royalty Group Homes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-md">
            Premium independent living for seniors and adults with disabilities in beautiful Oceanside, California.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/properties" 
              className="px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-md shadow-lg transition-all text-lg"
            >
              View Our Homes
            </Link>
            <Link 
              href="/apply" 
              className="px-8 py-4 bg-white hover:bg-gray-100 text-primary font-semibold rounded-md shadow-lg transition-all text-lg"
            >
              Apply for Housing
            </Link>
          </div>
        </div>
      </section>

      {/* Services/Highlights Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Affordable Community Shared Living</h2>
            <p className="text-lg text-gray-700">
              We offer both shared and private rooms designed to provide comfort, safety, and a sense of community. Our properties are fully equipped with modern amenities to ensure a premium living experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Shared Rooms */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-64 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Shared Rooms</h3>
                <p className="text-gray-600 mb-6">
                  Enjoy the company of others in our spacious shared rooms. Perfect for those who thrive in a social environment while maintaining personal comfort and affordability.
                </p>
                <Link href="/housing#shared-rooms" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2">
                  Learn more &rarr;
                </Link>
              </div>
            </div>

            {/* Private Rooms */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-64 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Private Rooms</h3>
                <p className="text-gray-600 mb-6">
                  For residents seeking more independence and privacy, our private rooms offer a personal sanctuary with all the benefits of our supportive community environment.
                </p>
                <Link href="/housing#private-rooms" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2">
                  Learn more &rarr;
                </Link>
              </div>
            </div>

            {/* Contractor Services */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-64 bg-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Contractor Services</h3>
                <p className="text-gray-600 mb-6">
                  We broker professional and reliable contractor services including handyman repairs, commercial cleaning, property maintenance, and lite construction.
                </p>
                <Link href="/contractor-services" className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2">
                  Learn more &rarr;
                </Link>
              </div>
            </div>
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
