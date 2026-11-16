import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function AboutHeritagePage() {
  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 lg:py-20 text-[#283618]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#606C38] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>The Royal Atelier Chronicle</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-[#283618] tracking-wide leading-tight">
            Our Heritage & Lineage
          </h1>
          <div className="w-20 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-6" />
          <p className="text-sm sm:text-base text-[#283618]/75 font-light leading-relaxed">
            Preserving five centuries of Pakistani royal footwear and ceremonial wedding adornment for the world’s most discerning patrons.
          </p>
        </div>

        {/* Feature Editorial Image */}
        <div className="relative aspect-[16/9] overflow-hidden border border-[#DDA15E]/40 mb-16 shadow-2xl">
          <img
            src="/images/hero/hero_khussa_royal.jpg"
            alt="ZAR-E-RIWAAYAT Royal Heritage Khussa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#283618]/80 via-transparent to-transparent flex items-end p-8 text-[#FEFAE0]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-semibold block">
                The Royal Imperial Last
              </span>
              <p className="font-heading text-xl sm:text-2xl font-light italic">
                "Every stitch carries the memory of an emperor's court."
              </p>
            </div>
          </div>
        </div>

        {/* Storytelling Narrative Blocks */}
        <div className="space-y-12 text-sm sm:text-base text-[#283618]/85 font-light leading-relaxed">
          <div className="border-l-2 border-[#606C38] pl-6 py-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[#283618] mb-3">
              The Genesis: From Royal Courts to Modern Haute Couture
            </h2>
            <p className="mb-4">
              During the reign of Emperor Jahangir and Empress Nur Jahan in the 17th century, footwear ceased to be mere utilitarian leather. It transformed into an imperial canvas. Master zardozi embroiderers wove beaten gold wires (zar), pearls, and precious rubies into curved velvet slippers known as the <i>Salim Shahi</i>.
            </p>
            <p>
              Centuries later, that exquisite standard began to disappear beneath mass manufacturing and synthetic substitutes. <b>ZAR-E-RIWAAYAT</b> was founded with a singular, uncompromising purpose: to revive the royal artisan lineages of Lahore, Bahawalpur, and Multan, giving their irreplaceable craft an international haute couture platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="bg-white/60 border border-[#DDA15E]/30 p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#606C38] block">
                Pillar I: True Bespoke Autonomy
              </span>
              <h3 className="font-heading text-xl font-semibold text-[#283618]">
                Made Especially For Your Royal Moments
              </h3>
              <p className="text-xs text-[#283618]/70 leading-relaxed font-light">
                We believe no bride or groom should settle for off-the-rack compromises on their most sacred wedding celebrations. Every pair of Khussas and each wedding shawl is custom dyed and hand-stitched to harmonize flawlessly with your wedding palette.
              </p>
            </div>

            <div className="bg-white/60 border border-[#DDA15E]/30 p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#606C38] block">
                Pillar II: Global Royal Reach
              </span>
              <h3 className="font-heading text-xl font-semibold text-[#283618]">
                Bridging Pakistan to London, New York & Dubai
              </h3>
              <p className="text-xs text-[#283618]/70 leading-relaxed font-light">
                Whether residing in Mayfair, Manhattan, Emirates Hills, or Gulberg, our patrons receive direct door-to-door express delivery with all international duties handled seamlessly by our logistics concierges.
              </p>
            </div>
          </div>

          <div className="border-t border-[#DDA15E]/30 pt-10 text-center">
            <h3 className="font-heading text-2xl sm:text-3xl text-[#283618] mb-4">
              Begin Your Royal Journey
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/custom-studio"
                className="bg-[#606C38] text-[#FEFAE0] text-xs font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-[#283618] transition-colors"
              >
                Launch Custom Studio
              </Link>
              <Link
                to="/craftsmanship"
                className="border border-[#DDA15E] text-[#283618] text-xs font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-black/5 transition-colors"
              >
                Inspect Our Craftsmanship
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
