import React from "react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">Terms of Service</h1>
          <p className="text-xl text-gray-300">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl prose prose-lg prose-primary">
          <p>
            Welcome to Royalty Group LLC. By accessing our website and utilizing the services provided by any of our divisions—including Royalty Group Homes, Contracting, Cleaning, Maintenance, AI, and Information Services—you agree to be bound by the following Terms of Service. Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By using this website, you signify your agreement to these Terms of Service. If you do not agree to these terms, please do not use our site or our services. We reserve the right, at our discretion, to update or revise these terms at any time. Please check these terms periodically for changes.
          </p>

          <h2>2. Services Provided</h2>
          <p>
            Royalty Group LLC operates as a multi-faceted enterprise. The specific terms governing the provision of independent living housing, contractor brokering, cleaning services, maintenance, AI software, and IT services may be subject to separate, division-specific agreements and contracts provided at the time of service initiation.
          </p>

          <h2>3. User Conduct</h2>
          <p>You agree to use our website and services only for lawful purposes. You agree not to take any action that might compromise the security of the site, render the site inaccessible to others, or otherwise cause damage to the site or its content.</p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content included on this site, such as text, graphics, logos, button icons, images, and software, is the property of Royalty Group LLC or its content suppliers and is protected by United States and international copyright laws.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The materials on Royalty Group LLC's website are provided "as is". Royalty Group LLC makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Royalty Group LLC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Royalty Group LLC's website, even if Royalty Group LLC or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            Any claim relating to Royalty Group LLC's website shall be governed by the laws of the State of California without regard to its conflict of law provisions.
          </p>

          <h2>8. Contact Information</h2>
          <p>
            If you have any questions regarding these Terms of Service, please contact us at:
          </p>
          <p>
            <strong>Royalty Group LLC</strong><br />
            Oceanside, CA<br />
            Email: info@royaltygroupllc.net<br />
            Phone: (760) 248-8331
          </p>

          <div className="mt-12 text-center">
            <Link href="/" className="text-secondary font-medium hover:underline">
              &larr; Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
