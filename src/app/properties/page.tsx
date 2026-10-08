import Image from "next/image";
import Link from "next/link";
import { propertiesData } from "@/lib/propertiesData";
import PropertyMapWrapper from "@/components/PropertyMapWrapper";
import { MapPin, Info, ArrowRight } from "lucide-react";

export default function PropertiesPage() {
  const properties = propertiesData;

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/85" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-wide drop-shadow-md uppercase">
            Available <span className="text-secondary">Properties</span>
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-sm font-light leading-relaxed max-w-2xl">
            Explore our beautifully maintained homes in Oceanside. Each property is designed to foster community, safety, and comfort.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full relative z-0 border-b-8 border-secondary">
        <PropertyMapWrapper />
      </section>

      {/* Property Grid */}
      <section className="py-24 px-4 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary uppercase tracking-wider flex items-center justify-center gap-4">
              <span className="h-0.5 w-12 bg-secondary block"></span>
              Current Portfolio
              <span className="h-0.5 w-12 bg-secondary block"></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col">
                <Link href={`/properties/${property.slug}`} className="block h-64 relative overflow-hidden bg-gray-200">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                    style={{ backgroundImage: `url(${property.image})` }}
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-primary text-xs font-bold px-4 py-2 rounded shadow uppercase tracking-wider">
                    {property.type}
                  </div>
                </Link>
                
                <div className="p-8 flex flex-col flex-grow">
                  <Link href={`/properties/${property.slug}`}>
                    <h3 className="text-2xl font-bold text-primary mb-2 hover:text-secondary transition-colors">{property.name}</h3>
                  </Link>
                  <div className="flex items-center text-gray-500 mb-6 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-secondary" />
                    {property.location}
                  </div>
                  
                  <div className="mb-8 flex-grow">
                    <p className="text-primary font-bold border-b border-gray-100 pb-2 mb-4 uppercase tracking-wider text-sm">Amenities</p>
                    <ul className="text-sm text-gray-600 grid grid-cols-2 gap-3">
                      {property.amenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-center font-light">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 flex-shrink-0"></span>
                          <span className="truncate" title={amenity}>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                    <span className="font-bold text-xl text-primary">{property.price}</span>
                    <div className="flex space-x-3">
                      <Link href={`/properties/${property.slug}`} className="p-3 bg-muted text-primary border border-gray-200 rounded hover:bg-gray-200 transition-colors" title="View Details">
                        <Info className="w-5 h-5" />
                      </Link>
                      <Link href={`/apply`} className="px-6 py-3 bg-primary text-white font-bold rounded hover:bg-[#00152e] transition-colors flex items-center gap-2 uppercase tracking-wider text-sm">
                        Inquire
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center bg-white">
        <div className="bg-primary max-w-5xl mx-auto rounded-xl shadow-2xl p-12 border-t-4 border-secondary text-white">
          <h2 className="text-3xl font-extrabold mb-6 uppercase tracking-wider">Don't see what you're looking for?</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto font-light text-lg">
            Our availability changes frequently. Submit a general application or contact our office to be placed on our priority waitlist for upcoming openings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/apply" className="px-10 py-4 bg-secondary text-primary font-bold rounded shadow hover:bg-secondary-light transition-colors uppercase tracking-wider">
              Submit Application
            </Link>
            <Link href="/contact" className="px-10 py-4 bg-transparent text-white border-2 border-white font-bold rounded shadow hover:bg-white hover:text-primary transition-colors uppercase tracking-wider">
              Contact Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
