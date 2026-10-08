import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Crown, Users, Building, PenTool, Sparkles, Wrench, BrainCircuit, Network } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center">
        {/* Background image with navy overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/80" /> {/* Primary color overlay */}
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-secondary mb-6 tracking-wide drop-shadow-md">
            BUILDING YOUR FUTURE <br /> WITH INTEGRITY
          </h1>
          <p className="text-xl md:text-3xl text-white mb-12 drop-shadow-sm font-light">
            Trusted partners in real estate, development, and comprehensive property solutions.
          </p>
          <Link 
            href="#overview" 
            className="px-10 py-4 bg-secondary hover:bg-secondary-light text-primary font-bold tracking-wider rounded transition-all text-lg shadow-xl uppercase"
          >
            Discover More
          </Link>
        </div>
      </section>

      {/* Company Overview Section */}
      <section id="overview" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-primary uppercase tracking-wider flex items-center justify-center gap-4">
              <span className="h-0.5 w-16 bg-secondary block"></span>
              Company Overview
              <span className="h-0.5 w-16 bg-secondary block"></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center p-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 text-secondary">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to provide unparalleled real estate, housing, and operational services built on a foundation of integrity, fostering sustainable community development and reliable partnerships.
              </p>
            </div>

            <div className="text-center p-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 text-secondary">
                <Crown size={40} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where high-quality living environments and robust enterprise solutions intersect seamlessly, elevating the standard of living and business operations for all our clients.
              </p>
            </div>

            <div className="text-center p-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 text-secondary">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Integrity, Excellence, and Community. We value transparent communication, uncompromising quality in our service delivery, and a steadfast dedication to the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Divisions Section */}
      <section className="py-24 bg-muted border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-left mb-16">
            <h2 className="text-4xl font-extrabold text-primary mb-4">Our Services</h2>
            <p className="text-2xl text-gray-600 font-light">Elevating Real Estate with Excellence.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 flex flex-col">
              <Building className="text-primary w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">Property<br />Management</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                Comprehensive tenant relations, housing solutions, and long-term asset care.
              </p>
              <Link href="/homes" className="inline-block text-center w-full py-3 bg-secondary text-white font-bold rounded hover:bg-secondary-light transition-colors">
                Learn More
              </Link>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 flex flex-col">
              <Wrench className="text-primary w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">Maintenance<br />& Upkeep</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                Prompt, reliable repair and property maintenance solutions year-round.
              </p>
              <Link href="/maintenance" className="inline-block text-center w-full py-3 bg-secondary text-white font-bold rounded hover:bg-secondary-light transition-colors">
                Learn More
              </Link>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 flex flex-col">
              <Sparkles className="text-primary w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">Professional<br />Cleaning</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                Thorough residential and commercial cleaning services you can trust.
              </p>
              <Link href="/cleaning" className="inline-block text-center w-full py-3 bg-secondary text-white font-bold rounded hover:bg-secondary-light transition-colors">
                Learn More
              </Link>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 flex flex-col">
              <PenTool className="text-primary w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">Contracting<br />Services</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                Expert lite construction and professional renovations tailored to your needs.
              </p>
              <Link href="/contractor-services" className="inline-block text-center w-full py-3 bg-secondary text-white font-bold rounded hover:bg-secondary-light transition-colors">
                Learn More
              </Link>
            </div>

            {/* Service Card 5 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 flex flex-col">
              <BrainCircuit className="text-primary w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">Artificial<br />Intelligence</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                Cutting-edge AI solutions and automation systems to drive efficiency.
              </p>
              <Link href="/ai" className="inline-block text-center w-full py-3 bg-secondary text-white font-bold rounded hover:bg-secondary-light transition-colors">
                Learn More
              </Link>
            </div>

            {/* Service Card 6 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 flex flex-col">
              <Network className="text-primary w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">Information<br />Services</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                Secure IT infrastructure, data management, and tech consulting.
              </p>
              <Link href="/information-services" className="inline-block text-center w-full py-3 bg-secondary text-white font-bold rounded hover:bg-secondary-light transition-colors">
                Learn More
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
