import React from 'react';

export default function TermsConditionsPage() {
  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 lg:py-20 text-[#283618]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#283618] tracking-wide">
            Terms & Conditions
          </h1>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#283618]/70 font-light">
            Luxury Purchase Agreement & Royal Atelier Protocols.
          </p>
        </div>

        <div className="bg-white/70 border border-[#DDA15E]/40 p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-[#283618]/85 leading-relaxed font-light shadow-xs">
          <p>
            Welcome to the digital atelier of <b>ZAR-E-RIWAAYAT</b>. By acquiring or commissioning items through this platform, you enter into a binding agreement governed by the terms set forth herein.
          </p>

          <h2 className="font-heading text-xl font-semibold text-[#283618] pt-2">
            1. Handcrafted Variations
          </h2>
          <p>
            Each piece produced by ZAR-E-RIWAAYAT is handcrafted by traditional artisans without robotic stamping. Subtle nuances in embroidery stitch tension, organic leather patina, and natural vegetable dyes are authentic hallmarks of artisanal luxury rather than imperfections.
          </p>

          <h2 className="font-heading text-xl font-semibold text-[#283618] pt-2">
            2. Bespoke Commission Acceptance
          </h2>
          <p>
            When submitting an order through the Custom Design Studio, customization specifications (such as size, color dye, embroidery motif, and personalized monogram text) become final upon entry into our master artisan production queue.
          </p>

          <h2 className="font-heading text-xl font-semibold text-[#283618] pt-2">
            3. Intellectual Property
          </h2>
          <p>
            All typographic layouts, brand heraldry, photography, custom designs, and storytelling dossiers are the exclusive property of ZAR-E-RIWAAYAT. Unauthorized reproduction or commercial emulation is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
