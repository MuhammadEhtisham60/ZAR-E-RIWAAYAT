import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, ShieldCheck, Award } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Vegetable Tanning & Leather Selection',
    description:
      'We select only full-grain buffalo and cowhide sourced from historic ethical tanneries in Punjab. The hides are vegetable-tanned over 45 days using acacia bark (kikar) extracts, creating leather that breathes naturally and emits the rich, authentic aroma of traditional footwear.',
    image: '/images/shabri/shabri_classic_leather.jpg',
  },
  {
    step: '02',
    title: 'Wooden Last Sculpting (The Salim Shahi Silhouette)',
    description:
      'Master last-makers shape dense shisham hardwood blocks by hand. Unlike modern mass-produced asymmetrical shoes, the traditional Khussa is sculpted symmetrically. It is designed to gently mold to the foot’s unique contours over the first three wearings.',
    image: '/images/khussa/khussa_forest_green.jpg',
  },
  {
    step: '03',
    title: 'Imperial Needlework: Dabka, Salma & Zardozi',
    description:
      'Using an ancient brass aari needle, karigars hand-stitch coiled spring wires (dabka), metallic cords (tilla), and Japanese micro-cutdana onto pure silk velvet stretched over wooden karchob frames. A single pair requires up to 36 hours of solitary embroidery.',
    image: '/images/craftsmanship/craft_embroidery_artisan.jpg',
  },
  {
    step: '04',
    title: 'Dual-Layer Sole Stitching & Arch Ergonomics',
    description:
      'The upper is joined to the sole with heavy waxed linen threads using double-needle saddle stitching. An invisible high-density memory arch cushion lined with supple goatskin is placed inside to provide all-day wedding support.',
    image: '/images/saraiki/saraiki_double_sole_tan.jpg',
  },
];

export default function CraftsmanshipPage() {
  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 lg:py-20 text-[#283618]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#606C38] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>The Master Karigar Dossier</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-[#283618] tracking-wide leading-tight">
            Our Craftsmanship
          </h1>
          <div className="w-20 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-6" />
          <p className="text-sm sm:text-base text-[#283618]/75 font-light leading-relaxed">
            Where time slows down. An intimate look into the patient, generational hands behind each pair of ZAR-E-RIWAAYAT royal footwear.
          </p>
        </div>

        {/* Craftsmanship Steps */}
        <div className="space-y-16">
          {STEPS.map((item, idx) => (
            <div
              key={item.step}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <span className="font-mono text-3xl font-bold text-[#DDA15E] block">
                  {item.step}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[#283618] leading-tight">
                  {item.title}
                </h3>
                <div className="w-12 h-0.5 bg-[#606C38]" />
                <p className="text-xs sm:text-sm text-[#283618]/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="aspect-[4/3] bg-[#283618]/5 border border-[#DDA15E]/40 overflow-hidden shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="mt-20 bg-[#283618] text-[#FEFAE0] border border-[#DDA15E]/40 p-8 sm:p-12 text-center shadow-xl">
          <Award className="w-12 h-12 text-[#DDA15E] mx-auto mb-4" />
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[#FEFAE0] mb-4">
            The ZAR-E-RIWAAYAT Quality Pledge
          </h2>
          <p className="text-xs sm:text-sm text-[#FEFAE0]/80 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            Zero synthetic leathers. Zero machine-stamped cardboard soles. Only genuine vegetable-tanned hides, authentic metallic embroidery wires, and heirloom-standard construction built to last for generations.
          </p>
          <Link
            to="/custom-studio"
            className="inline-block bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 transition-colors"
          >
            Commission a Custom Pair Now
          </Link>
        </div>
      </div>
    </div>
  );
}
