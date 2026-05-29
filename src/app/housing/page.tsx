import Image from "next/image";
import Link from "next/link";

export default function HousingOptionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">Housing Options</h1>
          <p className="text-xl text-gray-300">
            We provide a variety of living arrangements to suit your preferences and budget.
          </p>
        </div>
      </section>

      {/* 3.1 Shared Rooms */}
      <section id="shared-rooms" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Shared Rooms</h2>
              <p className="text-gray-700 text-lg mb-4">
                Our shared rooms offer an affordable and highly social living experience. Designed for those who value companionship, these rooms come fully furnished with comfortable beds, ample storage, and designated personal spaces.
              </p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Cost-effective living option</li>
                <li>• Built-in companionship and community</li>
                <li>• Shared en-suite or adjacent bathrooms</li>
              </ul>
              <Link href="/apply" className="text-secondary font-bold hover:underline">Apply for a Shared Room &rarr;</Link>
            </div>
            <div className="h-80 bg-gray-200 rounded-xl relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      {/* 3.2 Private Rooms */}
      <section id="private-rooms" className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1 h-80 bg-gray-200 rounded-xl relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80')] bg-cover bg-center" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-primary mb-6">Private Rooms</h2>
              <p className="text-gray-700 text-lg mb-4">
                For those seeking independence and privacy, our private rooms provide a personal sanctuary within our larger community. Enjoy your own space while still having access to all communal amenities and activities.
              </p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Ultimate privacy and independence</li>
                <li>• Fully furnished or bring your own</li>
                <li>• Private or Jack-and-Jill style bathrooms</li>
              </ul>
              <Link href="/apply" className="text-secondary font-bold hover:underline">Apply for a Private Room &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3.3 Available Properties */}
      <section id="available-properties" className="py-16 px-4 bg-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Available Properties</h2>
          <p className="text-lg text-gray-700 mb-8">
            Ready to see where you could be living? Browse our full catalog of currently available properties in the Oceanside area.
          </p>
          <Link 
            href="/properties" 
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-md shadow hover:bg-primary-dark transition-colors"
          >
            View Available Properties
          </Link>
        </div>
      </section>
    </div>
  );
}
