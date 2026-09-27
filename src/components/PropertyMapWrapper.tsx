"use client";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), { ssr: false });

export default function PropertyMapWrapper() {
  return <PropertyMap />;
}
