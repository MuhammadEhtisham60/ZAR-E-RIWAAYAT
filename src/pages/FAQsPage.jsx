import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How does sizing work for Pakistani traditional Khussas?',
    a: 'Authentic Pakistani Khussas are handcrafted symmetrically without an initial left or right shoe. When you first slip into your pair, they should feel pleasantly snug. As you walk, the vegetable-tanned buffalo sole absorbs natural body warmth and permanently molds to the unique contours of your feet within 2 to 3 wearings. We recommend ordering your standard EU/UK shoe size.',
  },
  {
    q: 'Do you ship to the United Kingdom, USA, UAE, and Pakistan?',
    a: 'Yes. We provide direct express delivery to all four destinations. Orders to the UK, USA, and UAE are dispatched via DHL Express Worldwide (3–6 business days). Orders within Pakistan are dispatched via TCS Express (2–4 business days). All customs duties are pre-calculated for international shipments.',
  },
  {
    q: 'How long does a customized pair or wedding shawl take to create?',
    a: 'Because our custom designs involve solitary needlework by master artisans, standard custom orders require 7 to 12 business days for crafting, followed by express transit. If you need expedited crafting for an impending wedding, please contact our VIP Concierge via WhatsApp for priority scheduling.',
  },
  {
    q: 'Can I match the embroidery color with my wedding dress swatch?',
    a: 'Absolutely. In our Custom Design Studio, you can upload a high-resolution photograph of your bridal lehenga, sherwani, or fabric swatch. Our color master will blend dyed silk threads and select corresponding dabka tones (antique gold, champagne, rose gold, or copperwood) to match with precision.',
  },
  {
    q: 'What is your policy on size exchanges for handcrafted footwear?',
    a: 'We offer complimentary 14-day size exchanges on unworn footwear from our standard catalog. If your Khussa does not fit comfortably after trying it indoors on a soft surface, we will gladly arrange an exchange pair.',
  },
  {
    q: 'How should I care for and store my velvet and zardozi Khussas?',
    a: 'Store your Khussas in the complimentary velvet dust bags provided in your heirloom box. Keep them in a cool, dry place away from direct dampness. To clean velvet, use a soft bristle dry brush in gentle strokes. Avoid spraying perfumes directly onto the metallic zardozi embroidery.',
  },
];

export default function FAQsPage() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 lg:py-20 text-[#283618]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#606C38] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>Client Guidance & Atelier Knowledge</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#283618] tracking-wide">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#283618]/70 font-light">
            Answers regarding our royal sizing philosophy, custom bridal lead times, and international shipping to UK, USA, UAE & Pakistan.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/70 border border-[#DDA15E]/40 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-heading text-lg sm:text-xl font-medium text-[#283618]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#606C38] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#283618]/80 leading-relaxed font-light border-t border-[#DDA15E]/20 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
