import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { propertiesData } from '@/lib/propertiesData';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft, CheckCircle2, Home } from 'lucide-react';

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  // In Next.js 15+, params is a Promise that must be awaited
  const resolvedParams = await params;
  
  const property = propertiesData.find((p) => p.slug === resolvedParams.slug);

  if (!property) {
    notFound();
  }

  // Read all images from the property's folder in public/
  const imagesDir = path.join(process.cwd(), 'public', 'properties', 'House Photos', resolvedParams.slug);
  let images: string[] = [];

  try {
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      images = files
        .filter((f) => f.match(/\.(jpg|jpeg|png|webp)$/i))
        // Important: URL encode the spaces in 'House Photos' for the src path
        .map((f) => `/properties/House%20Photos/${resolvedParams.slug}/${encodeURIComponent(f)}`);
    }
  } catch (e) {
    console.error("Error reading image directory", e);
  }

  // Fallback if the folder is empty
  if (images.length === 0) {
    images = [property.image];
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-4 border-b-8 border-secondary">
        <div className="container mx-auto max-w-7xl">
          <Link href="/properties" className="text-secondary hover:text-white inline-flex items-center text-sm font-bold uppercase tracking-wider mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 uppercase tracking-wide">{property.name}</h1>
          <div className="flex items-center text-gray-300 font-light text-lg">
            <MapPin className="w-5 h-5 mr-2 text-secondary" />
            {property.location}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Images & Description) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 border-t-4 border-t-primary">
              <h2 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider flex items-center gap-3">
                <Home className="w-6 h-6 text-secondary" /> Gallery
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className={`relative rounded-lg overflow-hidden bg-gray-200 shadow-inner border border-gray-100 ${idx === 0 ? "sm:col-span-2 h-80 sm:h-[500px]" : "h-56"}`}>
                    <img 
                      src={img} 
                      alt={`${property.name} - Photo ${idx + 1}`} 
                      className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 border-t-4 border-t-secondary">
              <h2 className="text-2xl font-extrabold text-primary mb-6 uppercase tracking-wider">About This Home</h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {property.description}
              </p>
            </div>

          </div>

          {/* Sidebar (Details & Action) */}
          <div className="space-y-8">
            <div className="bg-muted rounded-xl shadow-xl p-8 border-t-4 border-secondary sticky top-8">
              <h3 className="text-4xl font-extrabold text-primary mb-4">{property.price}</h3>
              <span className="inline-block px-4 py-2 bg-primary text-secondary rounded text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                {property.type}
              </span>
              
              <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-primary font-bold border-b border-gray-100 pb-3 mb-4 uppercase tracking-wider text-sm">Amenities Included</p>
                <ul className="text-sm text-gray-600 space-y-4">
                  {property.amenities.map((amenity, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                      <span className="font-light leading-snug">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <Link href="/apply" className="w-full text-center px-6 py-4 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] transition-colors">
                  Apply for this Home
                </Link>
                <Link href="/contact" className="w-full text-center px-6 py-4 bg-transparent text-primary border-2 border-primary font-bold uppercase tracking-wider rounded shadow hover:bg-primary hover:text-white transition-colors">
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
