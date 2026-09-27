import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">Privacy Policy</h1>
          <p className="text-xl text-gray-300">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl prose prose-lg prose-primary">
          <p>
            At Royalty Group LLC, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your data across our divisions, including Royalty Group Homes, Contracting, Cleaning, Maintenance, AI, and Information Services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information when you interact with our website or utilize our services:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and physical address provided via contact forms, housing applications, or service requests.</li>
            <li><strong>Financial Information:</strong> Payment details when processing application fees, rent, or contractor service payments.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP addresses, browser types, and pages visited.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to provide and improve our services. Specifically, we use your data to:</p>
          <ul>
            <li>Process housing applications and tenant screening.</li>
            <li>Coordinate and schedule contractor, cleaning, and maintenance services.</li>
            <li>Communicate with you regarding inquiries, updates, and service changes.</li>
            <li>Improve our website functionality and user experience.</li>
            <li>Comply with legal and regulatory requirements.</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>
            Royalty Group LLC does not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers and partners who assist us in operating our business and providing services to you, provided that these parties agree to keep this information confidential.
          </p>
          <p>
            We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>

          <h2>5. Your Consent</h2>
          <p>By using our site, you consent to our website's Privacy Policy.</p>

          <h2>6. Changes to our Privacy Policy</h2>
          <p>
            If we decide to change our privacy policy, we will update the Privacy Policy modification date at the top of this page.
          </p>

          <h2>7. Contacting Us</h2>
          <p>
            If there are any questions regarding this privacy policy, you may contact us using the information below:
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
