import Image from "next/image";
import Link from "next/link";
import { Users, Lock } from "lucide-react";

export default function HousingOptionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/85" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-wide drop-shadow-md uppercase">
            Housing <span className="text-secondary">Options</span>
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-sm font-light leading-relaxed max-w-2xl">
            We provide a variety of living arrangements to suit your preferences and budget.
          </p>
        </div>
      </section>

      {/* Shared Rooms */}
      <section id="shared-rooms" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Users className="w-10 h-10 text-secondary" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary uppercase tracking-wider">Shared Rooms</h2>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                <p>
                  Our shared rooms offer an affordable and highly social living experience. Designed for those who value companionship, these rooms come fully furnished with comfortable beds, ample storage, and designated personal spaces.
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-center font-medium"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span> Cost-effective living option</li>
                  <li className="flex items-center font-medium"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span> Built-in companionship and community</li>
                  <li className="flex items-center font-medium"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span> Shared en-suite or adjacent bathrooms</li>
                </ul>
              </div>
              <div className="mt-10">
                <Link href="/apply" className="inline-block px-8 py-3 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] transition-colors">
                  Apply for a Shared Room
                </Link>
              </div>
            </div>
            <div className="relative h-[450px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80"
                alt="Shared Room"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Private Rooms */}
      <section id="private-rooms" className="py-24 px-4 bg-muted border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1 relative h-[450px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80"
                alt="Private Room"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-6">
                <Lock className="w-10 h-10 text-secondary" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary uppercase tracking-wider">Private Rooms</h2>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                <p>
                  For those seeking independence and privacy, our private rooms provide a personal sanctuary within our larger community. Enjoy your own space while still having access to all communal amenities and activities.
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-center font-medium"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span> Ultimate privacy and independence</li>
                  <li className="flex items-center font-medium"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span> Fully furnished or bring your own</li>
                  <li className="flex items-center font-medium"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span> Private or Jack-and-Jill style bathrooms</li>
                </ul>
              </div>
              <div className="mt-10">
                <Link href="/apply" className="inline-block px-8 py-3 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] transition-colors">
                  Apply for a Private Room
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Properties CTA */}
      <section className="py-24 px-4 bg-primary text-white text-center">
        <div className="container mx-auto max-w-4xl flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-6 uppercase tracking-wider">Available Properties</h2>
          <p className="text-xl text-gray-300 mb-10 font-light leading-relaxed">
            Ready to see where you could be living? Browse our full catalog of currently available properties in the Oceanside area.
          </p>
          <Link 
            href="/properties" 
            className="inline-block px-10 py-4 bg-secondary text-primary font-bold uppercase tracking-wider rounded shadow hover:bg-secondary-light transition-colors"
          >
            View Available Properties
          </Link>
        </div>
      </section>
    </div>
  );
}
