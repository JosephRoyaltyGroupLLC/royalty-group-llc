"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { propertiesData } from "@/lib/propertiesData";
import Link from "next/link";

export default function PropertyMap() {
  const [mounted, setMounted] = useState(false);
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    // Fix Leaflet marker icons on client side
    const customIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    setIcon(customIcon);
    setMounted(true);
  }, []);

  if (!mounted || !icon) {
    return <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">Loading Map...</div>;
  }

  // General center of Oceanside properties
  const center: [number, number] = [33.257, -117.300];

  return (
    <MapContainer center={center} zoom={14} className="h-full w-full absolute inset-0 z-0" style={{ zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {propertiesData.map((prop) => {
        if (prop.lat && prop.lng) {
          return (
            <Marker key={prop.id} position={[prop.lat, prop.lng]} icon={icon}>
              <Popup>
                <div className="text-center p-1">
                  <h3 className="font-bold text-base mb-1">{prop.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{prop.price}</p>
                  <Link href={`/properties/${prop.slug}`} className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-primary-dark transition-colors">
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}
