import Link from "next/link";
import { Wrench, CheckCircle2, PhoneCall } from "lucide-react";

export default function MaintenanceDivision() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/85" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12">
          <Wrench className="w-16 h-16 text-secondary mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-wide drop-shadow-md uppercase">
            Maintenance <br /><span className="text-secondary">& Upkeep</span>
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-sm font-light leading-relaxed">
            Reliable property maintenance and handyman repairs to keep your assets in pristine condition year-round.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 uppercase tracking-wider flex items-center gap-4">
                <span className="h-0.5 w-12 bg-secondary block"></span>
                Our Expertise
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                <p>
                  Royalty Group Maintenance provides comprehensive upkeep solutions for properties of all sizes. Our skilled technicians are equipped to handle everything from preventative maintenance to emergency repairs.
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-secondary w-6 h-6" /> Preventative Property Maintenance</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-secondary w-6 h-6" /> Handyman & Minor Repairs</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-secondary w-6 h-6" /> Landscaping & Exterior Upkeep</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-secondary w-6 h-6" /> 24/7 Emergency Service Dispatch</li>
                </ul>
              </div>
            </div>
            <div className="bg-muted p-10 rounded-xl shadow-lg border-t-4 border-primary text-center">
              <PhoneCall className="w-12 h-12 text-secondary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 uppercase">Submit a Work Order</h3>
              <p className="text-gray-600 mb-8 font-light">
                Are you a resident or partner needing maintenance? Submit a work order securely through our portal.
              </p>
              <Link href="/login" className="inline-block w-full py-4 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] transition-colors">
                Resident Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
