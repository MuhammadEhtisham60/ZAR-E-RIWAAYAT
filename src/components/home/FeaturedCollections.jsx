import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'khussa',
    title: 'Pakistani Khussa',
    subtitle: 'Imperial Zardozi & Mughal Dabka Needlework',
    image: '/images/khussa/khussa_olive_embroidered.jpg',
    path: '/collection/khussa',
    tag: 'Signature Heritage',
    span: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    id: 'bridal',
    title: 'Bridal Collection',
    subtitle: 'Golden Trousseau & Ceremonial Potli Sets',
    image: '/images/bridal/bridal_baraat_crimson_gold.jpg',
    path: '/collection/bridal',
    tag: 'Haute Bridal',
    span: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'shawls',
    title: 'Wedding Shawls',
    subtitle: 'Royal Doshala Velvet & Heavy Tilla Borders',
    image: '/images/shawls/shawl_olive_zardozi.jpg',
    path: '/collection/wedding-shawls',
    tag: 'Heirloom Keepsake',
    span: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'shabri',
    title: 'Shabri Chappal',
    subtitle: 'Bahawalpur Thick-Sole Handcrafted Leather',
    image: '/images/shabri/shabri_classic_leather.jpg',
    path: '/collection/shabri',
    tag: 'Artisan Sandals',
    span: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'saraiki',
    title: 'Saraiki Collection',
    subtitle: 'Iconic Flared Sole & Multani Leather Art',
    image: '/images/saraiki/saraiki_double_sole_tan.jpg',
    path: '/collection/saraiki',
    tag: 'Cultural Masterpiece',
    span: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#FEFAE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#606C38] mb-2.5 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>Curated Heritage Portfolios</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-normal text-[#283618] tracking-wide">
            Featured Collections
          </h2>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-3 sm:mt-4 mb-3 sm:mb-4" />
          <p className="text-xs sm:text-sm text-[#283618]/70 font-light leading-relaxed px-2">
            Each collection represents centuries of regional craft mastery, from the royal courts of Bahawalpur to the bustling lanes of Old Lahore.
          </p>
        </div>

        {/* Collections Editorial Grid (Responsive for Mobile, Tablet, and Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={col.path}
              className={`group relative overflow-hidden bg-[#283618] border border-[#DDA15E]/30 min-h-[280px] sm:min-h-[320px] md:min-h-[380px] flex flex-col justify-end p-5 sm:p-7 lg:p-8 transition-transform duration-500 hover:shadow-2xl ${col.span}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#283618]/95 via-[#283618]/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              {/* Card Tag */}
              <div className="relative z-10 mb-auto">
                <span className="inline-block bg-[#FEFAE0]/90 text-[#283618] text-[9px] sm:text-[10px] uppercase tracking-widest px-2.5 py-1 font-bold border border-[#DDA15E]/50">
                  {col.tag}
                </span>
              </div>

              {/* Title & Link */}
              <div className="relative z-10 text-[#FEFAE0]">
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-medium tracking-wide leading-tight group-hover:text-[#DDA15E] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-[#FEFAE0]/80 mt-1 mb-3 sm:mb-4 font-light line-clamp-2">
                  {col.subtitle}
                </p>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#DDA15E] group-hover:text-[#FEFAE0] transition-colors">
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
