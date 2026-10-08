import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, HeartHandshake, Banknote, Coffee, Home, Users } from "lucide-react";

export default function IndependentLivingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/85" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-wide drop-shadow-md uppercase">
            Independent <span className="text-secondary">Living Homes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow-sm font-light leading-relaxed">
            Empowering seniors and adults with disabilities to live life to the fullest.
          </p>
        </div>
      </section>

      {/* Program Overview & Eligibility */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div id="program-overview">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 uppercase tracking-wider flex items-center gap-4">
                <span className="h-0.5 w-12 bg-secondary block"></span>
                Program Overview
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light mb-8">
                <p>
                  Our independent living program is designed for individuals who desire a maintenance-free lifestyle within a supportive community setting. We handle the day-to-day burdens of homeownership so you can focus on what matters most.
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Fully furnished shared and private rooms available.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Inclusive utilities, maintenance, and high-speed internet.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Accessible layouts tailored for comfort and safety.</span>
                </li>
              </ul>
            </div>

            <div id="eligibility-requirements" className="bg-muted p-10 rounded-xl shadow-lg border-t-4 border-primary">
              <h2 className="text-2xl font-extrabold text-primary mb-6 uppercase tracking-wider">Eligibility Requirements</h2>
              <p className="text-gray-600 mb-8 font-light leading-relaxed">
                We welcome individuals who are capable of managing their own daily living activities but seek the community and convenience of our homes.
              </p>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4">
                  <Banknote className="w-8 h-8 text-secondary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase tracking-wide text-sm">Income Requirement</h4>
                    <p className="text-sm text-gray-600 font-light">Must make at least two times the amount of the rent or have SSI/SSDI or other secured income that covers at least the rent and excess of at least $300 a month.</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4">
                  <HeartHandshake className="w-8 h-8 text-secondary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase tracking-wide text-sm">Independence</h4>
                    <p className="text-sm text-gray-600 font-light">Must be able to live independently or arrange for personal care assistance independently.</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4">
                  <Home className="w-8 h-8 text-secondary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase tracking-wide text-sm">Application</h4>
                    <p className="text-sm text-gray-600 font-light">Completion of our application process including a brief interview.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Amenities */}
      <section id="benefits-amenities" className="py-24 px-4 bg-primary text-white text-center">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary uppercase tracking-wider flex items-center justify-center gap-4">
              <span className="h-0.5 w-12 bg-secondary block"></span>
              Benefits & Amenities
              <span className="h-0.5 w-12 bg-secondary block"></span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-8 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
              <Coffee className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-bold text-lg uppercase tracking-wide">Fully Furnished</h4>
            </div>
            <div className="p-8 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
              <ShieldCheck className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-bold text-lg uppercase tracking-wide">Secure Access</h4>
            </div>
            <div className="p-8 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
              <Banknote className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-bold text-lg uppercase tracking-wide">Included Utilities</h4>
            </div>
            <div className="p-8 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-bold text-lg uppercase tracking-wide">Community Areas</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Resident Support Services */}
      <section id="resident-support-services" className="py-24 px-4 bg-muted border-t border-gray-100 text-center">
        <div className="container mx-auto max-w-4xl">
          <HeartHandshake className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-8 uppercase tracking-wider">Resident Support Services</h2>
          <p className="text-xl text-gray-600 mb-10 font-light leading-relaxed">
            While our residents live independently, we offer connections to local support services, weekly housekeeping for common areas, and a dedicated 24/7 maintenance line to ensure our homes run smoothly.
          </p>
          <Link 
            href="/apply" 
            className="inline-block px-10 py-4 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>

    </div>
  );
}
