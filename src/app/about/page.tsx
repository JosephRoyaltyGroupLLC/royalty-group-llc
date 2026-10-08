import Image from "next/image";
import Link from "next/link";
import { Target, Lightbulb, Shield, HeartHandshake, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/80" /> 
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary mb-6 tracking-wide drop-shadow-md uppercase">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-sm font-light">
            A premier multi-faceted enterprise delivering excellence across housing, property services, and advanced technology.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section id="company-overview" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 uppercase tracking-wider flex items-center gap-4">
                <span className="h-0.5 w-12 bg-secondary block"></span>
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                <p>
                  Royalty Group LLC was founded with a clear vision: to build a dynamic, multi-faceted enterprise that provides unparalleled service and value to our community. 
                </p>
                <p>
                  Operating out of Oceanside, California, we began with a steadfast commitment to providing safe, supportive independent living. Today, we have expanded our expertise into a robust portfolio of specialized divisions.
                </p>
                <p>
                  From real estate and professional contracting to commercial cleaning, property maintenance, artificial intelligence, and enterprise IT services, we stand as a unified front dedicated to excellence in every vertical.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                alt="Corporate Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="mission-values" className="py-24 px-4 bg-muted border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary uppercase tracking-wider flex items-center justify-center gap-4">
              <span className="h-0.5 w-12 bg-secondary block"></span>
              Core Values
              <span className="h-0.5 w-12 bg-secondary block"></span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">Excellence</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We strive for the highest quality in every service we provide, from structural maintenance to advanced software.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">Innovation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We continuously evolve our technological and operational capabilities to serve our clients better.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">Integrity</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We conduct all our business divisions with transparency, honesty, and a commitment to doing what is right.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">Community</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether housing residents or servicing local businesses, we actively work to uplift the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section id="service-area" className="py-24 px-4 bg-primary text-white text-center">
        <div className="container mx-auto max-w-4xl flex flex-col items-center">
          <MapPin className="w-16 h-16 text-secondary mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-6 uppercase tracking-wider">Service Area</h2>
          <p className="text-xl text-gray-300 mb-10 font-light leading-relaxed">
            Proudly operating out of the Oceanside, CA area and surrounding communities. Our integrated divisions are strategically located to provide residents and clients with unparalleled access to top-tier services.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-10 py-4 bg-secondary text-primary font-bold uppercase tracking-wider rounded shadow hover:bg-secondary-light transition-colors"
          >
            Partner With Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
