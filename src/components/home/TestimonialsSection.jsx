import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const SAMPLE_REVIEWS = [
  {
    id: 1,
    client: 'Amina & Bilal Al-Mansoor',
    location: 'Downtown Dubai, UAE',
    occasion: 'Royal Wedding Reception (Walima)',
    review:
      'We commissioned a matching pair of bespoke bridal Khussa and groom Salim Shahi footwear for our reception in Dubai. The precision of the antique gold dabka and the ergonomic cushion exceeded our highest expectations. It felt like wearing a piece of art.',
    rating: 5,
    product: 'Bespoke Trousseau Bridal Khussa & Nawab Salim Shahi',
    badge: 'Verified Bespoke Commission (Sample Preview)',
  },
  {
    id: 2,
    client: 'Lady Sophia & Tariq Chaudhry',
    location: 'Kensington, London, UK',
    occasion: 'Summer Country Wedding',
    review:
      'Finding authentic Pakistani footwear of genuine Savile Row leather standards in London was impossible until ZAR-E-RIWAAYAT. Delivered via DHL Express in 4 days with the heirloom box. The Olive Leaf velvet is deeply magnificent.',
    rating: 5,
    product: 'The Royal Shahzadi Khussa & Olive Velvet Doshala',
    badge: 'International Client Experience (Sample Preview)',
  },
  {
    id: 3,
    client: 'Zainab & Dr. Farhan Malik',
    location: 'Manhattan, New York, USA',
    occasion: 'Ceremonial Baraat',
    review:
      'The Custom Design Studio made color matching with my bridal lehenga effortless. I uploaded my fabric swatch, and the karigars matched the sunlit clay tones with exact fidelity. Immense comfort through 8 hours of standing and dancing.',
    rating: 5,
    product: 'Baraat Royal Heirloom Trousseau Set',
    badge: 'Verified Atelier Order (Sample Preview)',
  },
];

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevReview = () => {
    setActiveIdx((prev) => (prev === 0 ? SAMPLE_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIdx((prev) => (prev === SAMPLE_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = SAMPLE_REVIEWS[activeIdx];

  return (
    <section className="py-20 lg:py-24 bg-[#FEFAE0] border-t border-[#DDA15E]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Development sample note */}
        <div className="inline-block bg-[#606C38]/10 text-[#606C38] text-[10px] uppercase tracking-widest px-3 py-1 font-semibold rounded mb-3">
          Patron Experiences • Development Sample Content
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[#283618] tracking-wide mb-12">
          Echoes of Royal Moments
        </h2>

        {/* Quote Card */}
        <div className="relative bg-white/60 border border-[#DDA15E]/40 p-8 sm:p-12 shadow-md">
          <Quote className="w-10 h-10 text-[#DDA15E]/50 mx-auto mb-6" />

          {/* Stars */}
          <div className="flex justify-center items-center gap-1 mb-6 text-[#BC6C25]">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          {/* Review Text */}
          <p className="font-heading text-xl sm:text-2xl text-[#283618] italic font-normal leading-relaxed mb-8">
            "{current.review}"
          </p>

          {/* Client Details */}
          <div>
            <div className="font-sans text-sm font-bold text-[#283618] uppercase tracking-wider">
              {current.client}
            </div>
            <div className="text-xs text-[#606C38] font-medium mt-0.5">
              {current.location} • {current.occasion}
            </div>
            <div className="text-[11px] text-[#283618]/60 mt-1">
              Commissioned: {current.product}
            </div>

            <div className="inline-flex items-center gap-1.5 text-[10px] text-[#BC6C25] font-semibold mt-3 bg-[#BC6C25]/10 px-2.5 py-0.5 rounded">
              <CheckCircle2 className="w-3 h-3" />
              <span>{current.badge}</span>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#DDA15E]/20">
            <button
              onClick={prevReview}
              className="p-2 text-[#283618] hover:text-[#606C38] transition-colors border border-[#DDA15E]/40 hover:border-[#606C38]"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5">
              {SAMPLE_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeIdx ? 'bg-[#606C38] w-6' : 'bg-[#DDA15E]/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-2 text-[#283618] hover:text-[#606C38] transition-colors border border-[#DDA15E]/40 hover:border-[#606C38]"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
