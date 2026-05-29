import Image from "next/image";
import Link from "next/link";
import { propertiesData } from "@/lib/propertiesData";

export default function PropertiesPage() {
  const properties = propertiesData;

  return (
    <div className="flex flex-col min-h-screen bg-muted pb-20">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">Properties</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Explore our beautifully maintained homes in Oceanside. Each property is designed to foster community, safety, and comfort.
          </p>
        </div>
      </section>

      {/* Property Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-primary mb-8 border-b pb-2">Available Properties</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow group">
                <Link href={`/properties/${property.slug}`} className="block h-56 relative overflow-hidden bg-gray-200">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: `url(${property.image})` }}
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {property.type}
                  </div>
                </Link>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">Property Details</h3>
                  <Link href={`/properties/${property.slug}`}>
                    <h4 className="text-xl font-bold text-gray-800 mb-2 hover:text-secondary transition-colors">{property.name}</h4>
                  </Link>
                  <div className="flex items-center text-gray-500 mb-4 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {property.location}
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-primary font-semibold border-b border-gray-100 pb-2 mb-2">Amenities</p>
                    <ul className="text-sm text-gray-600 grid grid-cols-2 gap-2">
                      {property.amenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-bold text-gray-800">{property.price}</span>
                    <div className="space-x-2">
                      <Link href={`/properties/${property.slug}`} className="px-4 py-2 bg-gray-100 text-primary border border-gray-300 text-sm font-medium rounded hover:bg-gray-200 transition-colors">
                        View
                      </Link>
                      <Link href={`/apply`} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors">
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
      <section className="mt-12 px-4 text-center">
        <div className="bg-white max-w-4xl mx-auto rounded-2xl shadow-xl p-10 border border-gray-100">
          <h2 className="text-3xl font-bold text-primary mb-4">Don't see what you're looking for?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our availability changes frequently. Submit a general application or contact our office to be placed on our priority waitlist for upcoming openings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/apply" className="px-8 py-3 bg-secondary text-white font-bold rounded-md shadow hover:bg-secondary-light transition-colors">
              Submit Application
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-white text-primary border-2 border-primary font-bold rounded-md shadow hover:bg-gray-50 transition-colors">
              Contact Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
