import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Palette, Scissors, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CustomStudioTeaser() {
  return (
    <section className="py-20 lg:py-28 bg-[#283618] text-[#FEFAE0] relative overflow-hidden">
      {/* Background Subtle Pattern & Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#606C38]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DDA15E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Studio Mockup & Swatches */}
          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#DDA15E]/40 bg-[#FEFAE0]/5 p-4 sm:p-6 backdrop-blur-sm shadow-2xl">
              <div className="aspect-square overflow-hidden relative border border-[#DDA15E]/30 bg-black/20">
                <img
                  src="/images/khussa/khussa_custom_bridal.jpg"
                  alt="Custom Design Studio Preview"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Studio Tag */}
                <div className="absolute top-4 left-4 bg-[#283618]/90 text-[#FEFAE0] text-[10px] uppercase tracking-widest px-3 py-1 font-semibold border border-[#DDA15E]/50">
                  Interactive Configurator
                </div>

                {/* Floating Monogram Specimen */}
                <div className="absolute bottom-4 right-4 bg-[#FEFAE0] text-[#283618] p-3 shadow-xl border border-[#DDA15E] text-xs max-w-[200px]">
                  <div className="text-[9px] uppercase tracking-widest text-[#606C38] font-bold">
                    Heirloom Personalization
                  </div>
                  <div className="font-heading text-sm font-semibold italic mt-0.5">
                    "Z & A • 18.11.2026"
                  </div>
                  <div className="text-[10px] text-[#283618]/70 mt-1">
                    Hand-stitched inside arch
                  </div>
                </div>
              </div>

              {/* Swatch Bar Preview */}
              <div className="mt-4 pt-4 border-t border-[#DDA15E]/20 flex items-center justify-between text-xs">
                <span className="text-[#FEFAE0]/70 uppercase tracking-wider text-[11px]">
                  Available Royal Palette:
                </span>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#606C38] border border-[#FEFAE0]/40" title="Olive Leaf" />
                  <span className="w-5 h-5 rounded-full bg-[#283618] border border-[#FEFAE0]/40" title="Black Forest" />
                  <span className="w-5 h-5 rounded-full bg-[#FEFAE0] border border-[#283618]" title="Cornsilk" />
                  <span className="w-5 h-5 rounded-full bg-[#DDA15E] border border-[#FEFAE0]/40" title="Sunlit Clay" />
                  <span className="w-5 h-5 rounded-full bg-[#BC6C25] border border-[#FEFAE0]/40" title="Copperwood" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Process Steps */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#606C38]/40 border border-[#DDA15E]/40 rounded-full text-[#DDA15E] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Brand Distinction</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#FEFAE0] tracking-wide leading-tight">
              The Bespoke Design Studio
            </h2>

            <p className="text-sm sm:text-base text-[#FEFAE0]/80 font-light leading-relaxed">
              No two royal weddings are alike. Our Custom Design Studio empowers you to commission one-of-a-kind footwear and bridal shawls, tailored exactly to your wedding trousseau colors, preferred needlework motifs, and ergonomic sizing.
            </p>

            {/* Step Features */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#606C38]/30 border border-[#DDA15E]/40 flex items-center justify-center text-[#DDA15E] shrink-0 mt-0.5">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-medium text-[#FEFAE0]">
                    1. Fabric, Leather & Palette Selection
                  </h4>
                  <p className="text-xs text-[#FEFAE0]/70 leading-relaxed">
                    Select from raw silk brocades, Italian-buffed calfskins, and pure Kashmiri pashmina velvets in our 5 official heritage colors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#606C38]/30 border border-[#DDA15E]/40 flex items-center justify-center text-[#DDA15E] shrink-0 mt-0.5">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-medium text-[#FEFAE0]">
                    2. Historic Needlework & Border Design
                  </h4>
                  <p className="text-xs text-[#FEFAE0]/70 leading-relaxed">
                    Choose intricate Mughal dabka, antique tilla filigree, floral jaal, or personalized wedding date monograms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#606C38]/30 border border-[#DDA15E]/40 flex items-center justify-center text-[#DDA15E] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-medium text-[#FEFAE0]">
                    3. Artisan Consultation & Express Global Dispatch
                  </h4>
                  <p className="text-xs text-[#FEFAE0]/70 leading-relaxed">
                    Upload your dress swatches for exact color matching. Handcrafted in 7–12 days and shipped via DHL Express.
                  </p>
                </div>
              </div>
            </div>

            {/* Launch Studio CTA */}
            <div className="pt-4">
              <Link
                to="/custom-studio"
                className="inline-flex items-center gap-3 bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 transition-all duration-300 shadow-xl"
              >
                <span>Enter Custom Studio Now</span>
                <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
