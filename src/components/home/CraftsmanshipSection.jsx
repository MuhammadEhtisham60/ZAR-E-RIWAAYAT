import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

const CRAFT_PILLARS = [
  {
    title: 'Imperial Zardozi & Dabka',
    description:
      'Metallic gold and copper bullion wires are coiled and hand-stitched with a single needle, creating dimensional floral relief that never tarnishes.',
  },
  {
    title: 'Mughal Salim Shahi Lasting',
    description:
      'Shaped on solid wooden lasts honed by generational shoemakers in Lahore. Designed with no right or left foot distinction, effortlessly conforming to your foot shape.',
  },
  {
    title: 'Dual-Layer Buffalo Leather Soles',
    description:
      'Vegetable-tanned and sun-dried in the arid breeze of Bahawalpur, providing breathable thermal insulation and decades of structural resilience.',
  },
  {
    title: 'Heirloom Keepsake Packaging',
    description:
      'Every commissioned order is cushioned in crushed velvet travel pouches and presented in an antique gold-embossed presentation box.',
  },
];

export default function CraftsmanshipSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FEFAE0] border-t border-[#DDA15E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-semibold text-[#606C38]">
              <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>Timeless Pakistani Artistry</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#283618] tracking-wide leading-tight">
              Craftsmanship Honored Through Centuries
            </h2>

            <p className="text-sm sm:text-base text-[#283618]/75 font-light leading-relaxed">
              At ZAR-E-RIWAAYAT, luxury is not mass-manufactured. It is born from patient, solitary devotion. Our master karigars (artisans) inherit needlework techniques codified during Emperor Akbar’s court, transmuting raw leather and silk velvet into wearable poetry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {CRAFT_PILLARS.map((pillar, idx) => (
                <div key={idx} className="p-4 bg-white/50 border border-[#DDA15E]/30">
                  <div className="w-6 h-6 rounded-full bg-[#606C38]/20 text-[#606C38] flex items-center justify-center mb-2 text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <h4 className="font-heading text-base font-semibold text-[#283618] mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#283618]/70 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/craftsmanship"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#606C38] hover:text-[#283618] transition-colors"
              >
                <span>Read Full Craftsmanship Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Imagery Gallery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] overflow-hidden border border-[#DDA15E]/30 bg-[#283618]/5">
                <img
                  src="/images/craftsmanship/craft_embroidery_artisan.jpg"
                  alt="Master Karigar Needlework"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 bg-[#606C38] text-[#FEFAE0] text-center">
                <span className="font-heading text-2xl font-bold block text-[#DDA15E]">
                  28+ Hours
                </span>
                <span className="text-[11px] uppercase tracking-wider block font-light">
                  Hand-Needlework per pair
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 bg-[#283618] text-[#FEFAE0] text-center">
                <span className="font-heading text-2xl font-bold block text-[#DDA15E]">
                  100% Pure
                </span>
                <span className="text-[11px] uppercase tracking-wider block font-light">
                  Vegetable Tanned Leather
                </span>
              </div>
              <div className="aspect-[4/5] overflow-hidden border border-[#DDA15E]/30 bg-[#283618]/5">
                <img
                  src="/images/khussa/khussa_cream_gold.jpg"
                  alt="Precision Stitching Detail"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
