import Link from "next/link";
import { Home, Key, MapPin, Building, ShieldCheck } from "lucide-react";

export default function HomesDivision() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/85" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12">
          <Home className="w-16 h-16 text-secondary mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-wide drop-shadow-md uppercase">
            Property Management <br /><span className="text-secondary">& Homes</span>
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-sm font-light leading-relaxed">
            Premium housing, tenant relations, and supportive living communities tailored to your lifestyle.
          </p>
        </div>
      </section>

      {/* Navigation Hub */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary uppercase tracking-wider flex items-center justify-center gap-4">
              <span className="h-0.5 w-12 bg-secondary block"></span>
              Explore Options
              <span className="h-0.5 w-12 bg-secondary block"></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/independent-living" className="block bg-muted rounded-xl shadow hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 border-t-4 border-t-secondary group">
              <ShieldCheck className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wide">Independent Living</h2>
              <p className="text-gray-600 font-light leading-relaxed">Supportive and vibrant independent living communities designed for comfort, safety, and community engagement.</p>
            </Link>
            
            <Link href="/housing" className="block bg-muted rounded-xl shadow hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 border-t-4 border-t-primary group">
              <Building className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wide">Housing Options</h2>
              <p className="text-gray-600 font-light leading-relaxed">Flexible shared and private room options tailored to fit various budgets, locations, and personal lifestyles.</p>
            </Link>
            
            <Link href="/properties" className="block bg-muted rounded-xl shadow hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 border-t-4 border-t-secondary group">
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wide">Available Properties</h2>
              <p className="text-gray-600 font-light leading-relaxed">View our current portfolio of premium homes and find the perfect location for you or your loved one.</p>
            </Link>

            <Link href="/partner-listings" className="block bg-muted rounded-xl shadow hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 border-t-4 border-t-primary group">
              <Key className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wide">Partner Listings</h2>
              <p className="text-gray-600 font-light leading-relaxed">View available properties provided by our extensive network of trusted real estate and community partners.</p>
            </Link>

            <Link href="/apply" className="block bg-primary rounded-xl shadow hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-t-secondary group lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">Apply For Housing</h2>
              <p className="text-gray-300 font-light leading-relaxed mb-6">Ready to join our community? Start your secure online application process today to reserve your spot.</p>
              <span className="inline-block px-8 py-3 bg-secondary text-primary font-bold uppercase tracking-wider rounded shadow-md group-hover:bg-secondary-light transition-colors">Start Application &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-muted border-t border-gray-100 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-extrabold mb-6 text-primary uppercase tracking-wider">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-10 font-light">
            Whether you are a tenant looking for a new home or an owner needing property management, we are here to help.
          </p>
          <Link 
            href="/login" 
            className="inline-block px-10 py-4 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow-lg hover:bg-[#00152e] transition-colors"
          >
            Create Your Profile
          </Link>
        </div>
      </section>
    </div>
  );
}
