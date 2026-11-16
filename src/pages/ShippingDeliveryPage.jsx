import React from 'react';
import { Truck, ShieldCheck, Globe, CheckCircle2, Plane } from 'lucide-react';

export default function ShippingDeliveryPage() {
  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 lg:py-20 text-[#283618]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#283618] tracking-wide">
            International Shipping & Delivery
          </h1>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#283618]/70 font-light">
            Direct door-to-door express delivery with DHL Express to the UK, USA, UAE, and TCS across Pakistan.
          </p>
        </div>

        {/* Region Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* UK */}
          <div className="bg-white/70 border border-[#DDA15E]/40 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🇬🇧</span>
              <span className="text-xs font-mono font-bold text-[#606C38]">GBP (£)</span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-[#283618]">
              United Kingdom
            </h3>
            <div className="text-xs text-[#283618]/80 space-y-1 font-light">
              <p><b>Carrier:</b> DHL Express Air Transit</p>
              <p><b>Timeline:</b> 3–5 Business Days</p>
              <p><b>Standard Rate:</b> £18 (Free on orders over £150)</p>
              <p className="text-[#606C38] font-medium">Duties & VAT Pre-Calculated</p>
            </div>
          </div>

          {/* USA */}
          <div className="bg-white/70 border border-[#DDA15E]/40 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-xs font-mono font-bold text-[#606C38]">USD ($)</span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-[#283618]">
              United States
            </h3>
            <div className="text-xs text-[#283618]/80 space-y-1 font-light">
              <p><b>Carrier:</b> DHL Express Worldwide</p>
              <p><b>Timeline:</b> 3–6 Business Days</p>
              <p><b>Standard Rate:</b> $24 (Free on orders over $200)</p>
              <p className="text-[#606C38] font-medium">No customs delays</p>
            </div>
          </div>

          {/* UAE */}
          <div className="bg-white/70 border border-[#DDA15E]/40 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🇦🇪</span>
              <span className="text-xs font-mono font-bold text-[#606C38]">AED (د.إ)</span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-[#283618]">
              United Arab Emirates
            </h3>
            <div className="text-xs text-[#283618]/80 space-y-1 font-light">
              <p><b>Carrier:</b> DHL Express Air (Dubai & Abu Dhabi)</p>
              <p><b>Timeline:</b> 2–4 Business Days</p>
              <p><b>Standard Rate:</b> AED 50 (Free on orders over AED 450)</p>
              <p className="text-[#606C38] font-medium">Direct home delivery</p>
            </div>
          </div>

          {/* Pakistan */}
          <div className="bg-white/70 border border-[#DDA15E]/40 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🇵🇰</span>
              <span className="text-xs font-mono font-bold text-[#606C38]">PKR (Rs.)</span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-[#283618]">
              Pakistan Domestic
            </h3>
            <div className="text-xs text-[#283618]/80 space-y-1 font-light">
              <p><b>Carrier:</b> TCS Express Overnight / Air</p>
              <p><b>Timeline:</b> 2–4 Business Days</p>
              <p><b>Standard Rate:</b> Rs. 450 (Free over Rs. 12,000)</p>
              <p className="text-[#BC6C25] font-semibold">Cash on Delivery Available</p>
            </div>
          </div>
        </div>

        {/* Packaging details */}
        <div className="bg-white/60 border border-[#DDA15E]/30 p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#283618]/80 leading-relaxed font-light">
          <h3 className="font-heading text-2xl font-semibold text-[#283618]">
            Packaging & Transit Security
          </h3>
          <p>
            Every parcel is cushioned in protective moisture-barrier outer cartons to guarantee that your footwear and bridal shawls arrive in immaculate royal condition regardless of climate or distance.
          </p>
        </div>
      </div>
    </div>
  );
}
