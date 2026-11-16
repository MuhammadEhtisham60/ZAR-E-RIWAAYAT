import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegion } from '../../store/currencySlice';
import { Globe, ChevronDown, Sparkles } from 'lucide-react';

const ANNOUNCEMENTS = [
  'Royal Heritage Craftsmanship – Handcrafted in Pakistan, Delivered Worldwide',
  'Complimentary DHL Express Worldwide on orders above regional thresholds',
  'Custom Design Studio – Personalize your Khussa & Wedding Shawls with master artisans',
  'Cash on Delivery available across Pakistan | Secure international card payments for UK, US & UAE',
];

export default function AnnouncementBar({ onOpenCurrencyModal }) {
  const [index, setIndex] = useState(0);
  const { currentRegion, regionData } = useSelector((state) => state.currency);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#283618] text-[#FEFAE0] text-[11px] sm:text-xs py-1.5 sm:py-2 px-2.5 sm:px-4 border-b border-[#606C38]/40 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Royal Trust indicator */}
        <div className="hidden lg:flex items-center space-x-2 text-[#DDA15E] shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="tracking-widest uppercase text-[10px] font-medium">Bespoke Royal Atelier</span>
        </div>

        {/* Center: Rotating announcements */}
        <div className="flex-1 text-center truncate px-1 font-medium tracking-wide min-w-0">
          <span className="transition-opacity duration-500 inline-block text-[10px] sm:text-xs truncate max-w-full">
            {ANNOUNCEMENTS[index]}
          </span>
        </div>

        {/* Right: Currency / Country Selector Trigger */}
        <div className="flex items-center text-xs shrink-0">
          <button
            onClick={onOpenCurrencyModal}
            className="flex items-center space-x-1 hover:text-[#DDA15E] transition-colors py-0.5 px-1.5 sm:px-2 rounded border border-[#606C38]/40 hover:border-[#DDA15E] text-[10px] sm:text-xs cursor-pointer"
            aria-label="Select Country and Currency"
          >
            <span>{regionData.flag}</span>
            <span className="font-semibold">{regionData.currency}</span>
            <ChevronDown className="w-3 h-3 text-[#DDA15E]" />
          </button>
        </div>
      </div>
    </div>
  );
}
