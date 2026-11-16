import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 lg:py-20 text-[#283618]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#283618] tracking-wide">
            Privacy Policy
          </h1>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#283618]/70 font-light">
            International Client Confidentiality & Data Protection (GDPR Compliant).
          </p>
        </div>

        <div className="bg-white/70 border border-[#DDA15E]/40 p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-[#283618]/85 leading-relaxed font-light shadow-xs">
          <p>
            At <b>ZAR-E-RIWAAYAT</b>, we hold the privacy and confidentiality of our esteemed international patrons in the highest regard. This statement outlines our strict adherence to international data privacy standards across the United Kingdom, United States, UAE, and Pakistan.
          </p>

          <h2 className="font-heading text-xl font-semibold text-[#283618] pt-2">
            1. Information Collection & Usage
          </h2>
          <p>
            We collect personal information solely to fulfill your bespoke orders, coordinate international DHL courier logistics, and provide dedicated concierge styling. This includes your name, delivery address, contact telephone, sizing preferences, and any uploaded reference swatches.
          </p>

          <h2 className="font-heading text-xl font-semibold text-[#283618] pt-2">
            2. Payment Security
          </h2>
          <p>
            Payment transactions are processed through encrypted 256-bit SSL connections via PCI-DSS compliant international payment processors. ZAR-E-RIWAAYAT never stores or retains raw credit or debit card numbers on our local servers.
          </p>

          <h2 className="font-heading text-xl font-semibold text-[#283618] pt-2">
            3. Client Discretion & Third Parties
          </h2>
          <p>
            We will never sell, lease, or monetize client personal data. Information is shared only with verified logistics partners (such as DHL Express Worldwide and TCS Pakistan) strictly for delivery execution.
          </p>
        </div>
      </div>
    </div>
  );
}
