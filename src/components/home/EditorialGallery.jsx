import React from 'react';
import { Sparkles, Camera } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    image: '/images/khussa/khussa_olive_embroidered.jpg',
    title: 'The Shahzadi Archival Khussa',
    category: 'Haute Embroidery',
  },
  {
    image: '/images/shawls/shawl_olive_zardozi.jpg',
    title: 'Imperial Doshala Velvet Shawl',
    category: 'Bridal Keepsake',
  },
  {
    image: '/images/khussa/khussa_golden_bridal.jpg',
    title: 'Antique 24K Zari Needlework',
    category: 'Baraat Trousseau',
  },
  {
    image: '/images/shabri/shabri_classic_leather.jpg',
    title: 'Bahawalpur Heritage Shabri',
    category: 'Full-Grain Leather',
  },
  {
    image: '/images/saraiki/saraiki_double_sole_tan.jpg',
    title: 'Flared Multani Winged Sole',
    category: 'Artisan Sandals',
  },
  {
    image: '/images/bridal/bridal_baraat_crimson_gold.jpg',
    title: 'Bespoke Ceremonial Potli Set',
    category: 'Bridal Couture',
  },
];

export default function EditorialGallery() {
  return (
    <section className="py-20 lg:py-28 bg-[#FEFAE0] border-t border-[#DDA15E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#606C38] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>The Atelier Lookbook</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#283618] tracking-wide">
            Editorial Perspectives
          </h2>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#283618]/70 font-light">
            A visual chronicle of historic needlework, authentic hand-buffed hides, and grand Pakistani wedding traditions.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden bg-[#283618]/5 border border-[#DDA15E]/30"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#283618]/90 via-[#283618]/20 to-transparent opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3 text-[#FEFAE0]">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#DDA15E] font-semibold">
                  {item.category}
                </span>
                <span className="font-heading text-[11px] sm:text-xs font-medium leading-tight truncate">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
