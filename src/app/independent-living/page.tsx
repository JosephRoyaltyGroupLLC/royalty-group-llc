import Image from "next/image";
import Link from "next/link";

export default function IndependentLivingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Independent Living Homes
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md">
            Empowering seniors and adults with disabilities to live life to the fullest.
          </p>
        </div>
      </section>

      {/* Program Overview & Eligibility */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div id="program-overview">
              <h2 className="text-3xl font-bold text-primary mb-6 border-b-4 border-secondary inline-block pb-2">Program Overview</h2>
              <p className="text-gray-700 text-lg mb-6">
                Our independent living program is designed for individuals who desire a maintenance-free lifestyle within a supportive community setting. We handle the day-to-day burdens of homeownership so you can focus on what matters most.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Fully furnished shared and private rooms available.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Inclusive utilities, maintenance, and high-speed internet.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Accessible layouts tailored for comfort and safety.</span>
                </li>
              </ul>
            </div>

            <div id="eligibility-requirements" className="bg-muted p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6">Eligibility Requirements</h2>
              <p className="text-gray-600 mb-6">
                We welcome individuals who are capable of managing their own daily living activities but seek the community and convenience of our homes.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-primary">Income Requirement</h4>
                  <p className="text-sm text-gray-600">Must make at least two times the amount of the rent or have SSI/SSDI or other secured income that covers at least the rent and excess of at least $300 a month.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-primary">Independence</h4>
                  <p className="text-sm text-gray-600">Must be able to live independently or arrange for personal care assistance independently.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-primary">Application</h4>
                  <p className="text-sm text-gray-600">Completion of our application process including a brief interview.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.3 Benefits & Amenities */}
      <section id="benefits-amenities" className="py-20 px-4 bg-primary text-white text-center">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-secondary">Benefits & Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-4 bg-white/10 rounded-xl">
              <h4 className="font-bold text-lg">Fully Furnished</h4>
            </div>
            <div className="p-4 bg-white/10 rounded-xl">
              <h4 className="font-bold text-lg">Secure Access</h4>
            </div>
            <div className="p-4 bg-white/10 rounded-xl">
              <h4 className="font-bold text-lg">Included Utilities</h4>
            </div>
            <div className="p-4 bg-white/10 rounded-xl">
              <h4 className="font-bold text-lg">Community Areas</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 2.4 Resident Support Services */}
      <section id="resident-support-services" className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Resident Support Services</h2>
          <p className="text-lg text-gray-700 mb-8">
            While our residents live independently, we offer connections to local support services, weekly housekeeping for common areas, and a dedicated 24/7 maintenance line to ensure our homes run smoothly.
          </p>
        </div>
      </section>

    </div>
  );
}
