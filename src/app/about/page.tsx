import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">About Us</h1>
          <p className="text-xl text-gray-300">
            Dedicated to providing exceptional independent living experiences in Oceanside, California.
          </p>
        </div>
      </section>

      {/* 1.1 Company Overview */}
      <section id="company-overview" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Company Overview</h2>
              <p className="text-gray-700 text-lg mb-4">
                Royalty Group LLC was founded with a clear vision: to create a safe, supportive, and empowering environment for seniors and adults with disabilities.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Operating out of the beautiful coastal city of Oceanside, California, we specialize in providing both shared and private residential options that foster community while respecting individual privacy.
              </p>
            </div>
            <div className="h-80 bg-gray-200 rounded-xl relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&q=80')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      {/* 1.2 Mission & Values */}
      <section id="mission-values" className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary text-center hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Compassion</h3>
              <p className="text-gray-600">We treat every resident with the dignity, respect, and kindness they deserve, fostering a truly caring community.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary text-center hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Safety</h3>
              <p className="text-gray-600">Providing a secure and stable living environment is our top priority, ensuring peace of mind for residents and their families.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary text-center hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Community</h3>
              <p className="text-gray-600">We believe in the power of shared experiences and actively work to build inclusive, engaging environments for all.</p>
            </div>
          </div>
        </div>
      </section>


      {/* 1.4 Service Area */}
      <section id="service-area" className="py-16 px-4 bg-muted text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Service Area</h2>
          <p className="text-lg text-gray-700 mb-8">
            Proudly serving the Oceanside, CA area and surrounding communities. Our facilities are strategically located to provide residents with easy access to local amenities, parks, and healthcare services.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-3 bg-secondary text-white font-semibold rounded-md shadow hover:bg-secondary-light transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
