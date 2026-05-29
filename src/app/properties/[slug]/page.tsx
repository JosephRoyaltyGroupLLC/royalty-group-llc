import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { propertiesData } from '@/lib/propertiesData';
import { notFound } from 'next/navigation';

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
    <div className="flex flex-col min-h-screen bg-muted pb-20">
      {/* Header */}
      <section className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/properties" className="text-secondary hover:text-white inline-flex items-center text-sm font-semibold mb-6 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Properties
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{property.name}</h1>
          <div className="flex items-center text-gray-300">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {property.location}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Images & Description) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Property Gallery</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className={`relative rounded-lg overflow-hidden bg-gray-200 ${idx === 0 ? "sm:col-span-2 h-72 sm:h-96" : "h-48"}`}>
                    {/* Using standard img tag for simplicity with unknown external image dimensions */}
                    <img 
                      src={img} 
                      alt={`${property.name} - Photo ${idx + 1}`} 
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">About This Home</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

          </div>

          {/* Sidebar (Details & Action) */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-secondary sticky top-8">
              <h3 className="text-2xl font-bold text-primary mb-2">{property.price}</h3>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold mb-6">
                {property.type}
              </span>
              
              <div className="mb-6">
                <p className="text-primary font-semibold border-b border-gray-100 pb-2 mb-3">Amenities Included</p>
                <ul className="text-sm text-gray-600 space-y-3">
                  {property.amenities.map((amenity, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                <Link href="/apply" className="w-full text-center px-4 py-3 bg-primary text-white font-bold rounded hover:bg-primary-dark transition-colors shadow">
                  Apply for this Home
                </Link>
                <Link href="/contact" className="w-full text-center px-4 py-3 bg-white text-primary border-2 border-primary font-bold rounded hover:bg-gray-50 transition-colors">
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
