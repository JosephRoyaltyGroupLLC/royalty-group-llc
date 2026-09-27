import Link from "next/link";
import React from "react";

export default function AIDivision() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Royalty Group <span className="text-secondary">AI</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 drop-shadow-md">
            Cutting-edge artificial intelligence solutions and automation systems to drive efficiency and modern growth.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white flex-grow">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Empowering the Future with Intelligent Automation</h2>
          <p className="text-lg text-gray-700 mb-8">
            Royalty Group AI leverages the latest advancements in artificial intelligence and machine learning to optimize operations, enhance decision-making, and create personalized experiences. We integrate smart technology seamlessly into our divisions and offer bespoke solutions for our clients.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
             <div className="bg-muted p-8 rounded-lg shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary mb-3">Process Automation</h3>
               <p className="text-gray-600">Streamline repetitive workflows and administrative tasks using intelligent automation. Reduce human error, lower operational costs, and free up your team to focus on strategic initiatives.</p>
             </div>
             <div className="bg-muted p-8 rounded-lg shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary mb-3">Data & Predictive Analytics</h3>
               <p className="text-gray-600">Transform raw data into actionable insights. Our predictive models help forecast market trends, optimize resource allocation, and drive informed, data-backed business decisions.</p>
             </div>
          </div>
          
          <div className="mt-16">
            <Link href="/contact" className="inline-block px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-md shadow-lg transition-all text-lg">
              Consult with Our AI Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
