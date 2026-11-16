import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HeritageStorySection() {
  return (
    <section className="py-20 lg:py-28 bg-[#283618] text-[#FEFAE0] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#DDA15E] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Soul of ZAR-E-RIWAAYAT</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-8">
          "Where Ancient Imperial Splendor Meets Contemporary International Poise."
        </h2>

        <div className="w-20 h-0.5 bg-[#DDA15E]/60 mx-auto mb-8" />

        <div className="space-y-6 text-sm sm:text-base text-[#FEFAE0]/85 font-light leading-relaxed max-w-3xl mx-auto text-left sm:text-center">
          <p>
            The name <b>ZAR-E-RIWAAYAT</b> marries <i>Zar</i>—the golden bullion filaments of royal Mughal attire—with <i>Riwaayat</i>—the timeless cultural traditions preserved through generations of Pakistani artisans.
          </p>
          <p>
            Founded to bridge ancestral South Asian luxury with the world’s most discerning bridal wardrobes, our atelier produces limited seasonal editions alongside bespoke private commissions for patrons across the United Kingdom, United States, UAE, and Pakistan.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/our-heritage"
            className="inline-flex items-center gap-2 bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] text-xs uppercase tracking-[0.2em] font-bold py-3.5 px-7 transition-all duration-300"
          >
            <span>Explore Our Full Heritage Story</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
