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
            A premier multi-faceted enterprise delivering excellence across housing, property services, and advanced technology.
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
                Royalty Group LLC was founded with a clear vision: to build a dynamic, multi-faceted enterprise that provides unparalleled service and value to our community. 
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Operating out of Oceanside, California, we began with a steadfast commitment to providing safe, supportive independent living. Today, we have expanded our expertise into a robust portfolio of specialized divisions encompassing real estate, professional contracting, commercial cleaning, property maintenance, artificial intelligence, and information services.
              </p>
            </div>
            <div className="h-80 bg-gray-200 rounded-xl relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Divisions */}
      <section id="our-divisions" className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Specialized Divisions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Homes</h3>
              <p className="text-gray-600 mb-4">Providing premium, supportive independent living environments and comprehensive housing solutions.</p>
              <Link href="/homes" className="text-secondary font-medium hover:underline">Learn more &rarr;</Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Contracting</h3>
              <p className="text-gray-600 mb-4">Brokering top-tier construction and structural repair services for residential and commercial properties.</p>
              <Link href="/contractor-services" className="text-secondary font-medium hover:underline">Learn more &rarr;</Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Cleaning</h3>
              <p className="text-gray-600 mb-4">Delivering impeccable commercial, residential, and post-construction cleaning services.</p>
              <Link href="/cleaning" className="text-secondary font-medium hover:underline">Learn more &rarr;</Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-3">Royalty Group Maintenance</h3>
              <p className="text-gray-600 mb-4">Ensuring the longevity of properties with preventative and on-demand maintenance solutions.</p>
              <Link href="/maintenance" className="text-secondary font-medium hover:underline">Learn more &rarr;</Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Royalty Group AI</h3>
              <p className="text-gray-600 mb-4">Developing cutting-edge artificial intelligence, predictive analytics, and workflow automation.</p>
              <Link href="/ai" className="text-secondary font-medium hover:underline">Learn more &rarr;</Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-3">Information Services</h3>
              <p className="text-gray-600 mb-4">Implementing secure cloud infrastructure, data management, and enterprise IT strategies.</p>
              <Link href="/information-services" className="text-secondary font-medium hover:underline">Learn more &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1.2 Mission & Values */}
      <section id="mission-values" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-muted p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Excellence</h3>
              <p className="text-gray-600 text-sm">We strive for the highest quality in every service we provide, from structural maintenance to advanced software.</p>
            </div>
            <div className="bg-muted p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Innovation</h3>
              <p className="text-gray-600 text-sm">We continuously evolve our technological and operational capabilities to serve our clients better.</p>
            </div>
            <div className="bg-muted p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Integrity</h3>
              <p className="text-gray-600 text-sm">We conduct all our business divisions with transparency, honesty, and a commitment to doing what is right.</p>
            </div>
            <div className="bg-muted p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Community</h3>
              <p className="text-gray-600 text-sm">Whether housing residents or servicing local businesses, we actively work to uplift the communities we serve.</p>
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
