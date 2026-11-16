import React from 'react';
import { RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ReturnsExchangePage() {
  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 lg:py-20 text-[#283618]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#283618] tracking-wide">
            Returns & Exchange Policy
          </h1>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#283618]/70 font-light">
            Our commitment to your complete royal satisfaction and immaculate fit.
          </p>
        </div>

        <div className="bg-white/70 border border-[#DDA15E]/40 p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[#283618]/85 leading-relaxed font-light shadow-xs">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#283618] mb-3">
              1. Complimentary 14-Day Size Exchanges
            </h2>
            <p>
              We understand that fit is paramount. For all standard catalog footwear, we offer a 14-day exchange window from the date of physical delivery. Items must be tried on indoors on clean carpeted surfaces and returned in their original undamaged presentation box with velvet dust bags intact.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#283618] mb-3">
              2. Bespoke Custom Design Policy
            </h2>
            <p>
              Footwear or wedding shawls created through our <b>Custom Design Studio</b> featuring personalized monogram inscriptions, specific non-standard color dyes, or customized embroidery dimensions are crafted exclusively for you. While personalized items cannot be refunded for change of mind, our master karigars provide complimentary fit adjustments and structural alterations if required.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#283618] mb-3">
              3. How to Initiate an Exchange
            </h2>
            <p className="mb-2">
              To request a size exchange, simply contact our VIP Client Concierge at <b>concierge@zar-e-riwaayat.com</b> or message us on WhatsApp with your Order ID.
            </p>
            <p>
              Our team will dispatch an exchange collection slip and arrange courier pickup directly from your address in the UK, USA, UAE, or Pakistan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
