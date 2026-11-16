import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Mail,
  ArrowRight,
  Globe,
  CheckCircle2,
} from 'lucide-react';

export default function Footer({ onOpenCurrencyModal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { regionData } = useSelector((state) => state.currency);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#283618] text-[#FEFAE0] border-t-2 border-[#DDA15E]/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#606C38]/40 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#606C38]/30 flex items-center justify-center text-[#DDA15E] mb-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg font-semibold tracking-wide text-[#FEFAE0]">
              Heirloom Craftsmanship
            </h4>
            <p className="text-xs text-[#FEFAE0]/70 leading-relaxed">
              Every Khussa, sandal, and shawl is hand-embroidered by generational artisans in Punjab and Sindh.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#606C38]/30 flex items-center justify-center text-[#DDA15E] mb-1">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg font-semibold tracking-wide text-[#FEFAE0]">
              Express Royal Delivery
            </h4>
            <p className="text-xs text-[#FEFAE0]/70 leading-relaxed">
              Direct door-to-door express dispatch via DHL Express to the UK, USA, UAE, and TCS across Pakistan.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#606C38]/30 flex items-center justify-center text-[#DDA15E] mb-1">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg font-semibold tracking-wide text-[#FEFAE0]">
              Bespoke Fit Guarantee
            </h4>
            <p className="text-xs text-[#FEFAE0]/70 leading-relaxed">
              Our footwear is naturally lasted to soften and contour to your unique foot dimensions over time.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#606C38]/30 flex items-center justify-center text-[#DDA15E] mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg font-semibold tracking-wide text-[#FEFAE0]">
              Authentic Heritage
            </h4>
            <p className="text-xs text-[#FEFAE0]/70 leading-relaxed">
              Genuine vegetable-tanned leather, authentic metallic dabka, and pure Kashmiri pashmina silks.
            </p>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-[#606C38]/40">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="font-heading text-3xl font-light tracking-[0.25em] text-[#FEFAE0] uppercase">
                ZAR-E-RIWAAYAT
              </h2>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#DDA15E]">
                Crafted for Your Royal Moments.
              </p>
            </Link>
            <p className="text-xs text-[#FEFAE0]/80 leading-relaxed max-w-sm">
              ZAR-E-RIWAAYAT is an international Pakistani luxury fashion house. We preserve the royal Mughal and Punjabi artisan traditions through bespoke handcrafted bridal footwear, heritage Shabri and Saraiki chappals, and hand-woven wedding shawls.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-widest text-[#DDA15E] font-medium mb-2">
                Join the Royal Circle
              </h5>
              <p className="text-[11px] text-[#FEFAE0]/70 mb-3">
                Receive private previews of new bridal collections and enjoy 10% off your first royal bespoke order.
              </p>

              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs text-[#DDA15E] bg-[#606C38]/30 p-2.5 rounded border border-[#DDA15E]/40">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the Royal Circle. Use code <b>ROYAL10</b> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/10 border border-[#DDA15E]/40 px-3 py-2 text-xs text-[#FEFAE0] placeholder-[#FEFAE0]/50 focus:outline-none focus:border-[#DDA15E]"
                  />
                  <button
                    type="submit"
                    className="bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Collections */}
          <div>
            <h4 className="font-heading text-lg font-semibold tracking-wider text-[#DDA15E] mb-4">
              Royal Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#FEFAE0]/80">
              <li>
                <Link to="/collection/khussa" className="hover:text-[#DDA15E] transition-colors">
                  Pakistani Khussa
                </Link>
              </li>
              <li>
                <Link to="/collection/shabri" className="hover:text-[#DDA15E] transition-colors">
                  Bahawalpur Shabri Chappals
                </Link>
              </li>
              <li>
                <Link to="/collection/saraiki" className="hover:text-[#DDA15E] transition-colors">
                  Multani Saraiki Chappals
                </Link>
              </li>
              <li>
                <Link to="/collection/bridal" className="hover:text-[#DDA15E] transition-colors">
                  Bridal Footwear & Potlis
                </Link>
              </li>
              <li>
                <Link to="/collection/mehndi" className="hover:text-[#DDA15E] transition-colors">
                  Mehndi Festive Special
                </Link>
              </li>
              <li>
                <Link to="/collection/wedding-shawls" className="hover:text-[#DDA15E] transition-colors">
                  Heirloom Wedding Shawls
                </Link>
              </li>
              <li>
                <Link to="/custom-studio" className="text-[#DDA15E] font-medium hover:underline">
                  Custom Design Studio →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Brand Heritage */}
          <div>
            <h4 className="font-heading text-lg font-semibold tracking-wider text-[#DDA15E] mb-4">
              The Atelier
            </h4>
            <ul className="space-y-2 text-xs text-[#FEFAE0]/80">
              <li>
                <Link to="/our-heritage" className="hover:text-[#DDA15E] transition-colors">
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/craftsmanship" className="hover:text-[#DDA15E] transition-colors">
                  Our Master Artisans
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#DDA15E] transition-colors">
                  Size & Fitting Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#DDA15E] transition-colors">
                  VIP Concierge & Studio Visits
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="hover:text-[#DDA15E] transition-colors">
                  Track Your Royal Order
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#DDA15E] transition-colors">
                  Customer Account Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold tracking-wider text-[#DDA15E] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-[#FEFAE0]/80">
              <li>
                <Link to="/shipping-delivery" className="hover:text-[#DDA15E] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns-exchange" className="hover:text-[#DDA15E] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#DDA15E] transition-colors">
                  Privacy Policy (GDPR)
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#DDA15E] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#DDA15E] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Region selector, Payment readiness & copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#FEFAE0]/70 gap-4">
          <div className="flex items-center space-x-3">
            <span>© {new Date().getFullYear()} ZAR-E-RIWAAYAT. All Rights Reserved.</span>
            <span className="hidden sm:inline">|</span>
            <button
              onClick={onOpenCurrencyModal}
              className="inline-flex items-center gap-1.5 text-[#DDA15E] hover:underline"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Delivering to {regionData.country} ({regionData.currency})</span>
            </button>
          </div>

          {/* Accepted Payment badges */}
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#FEFAE0]/60">
            <span className="px-2 py-0.5 border border-white/20 rounded">Visa</span>
            <span className="px-2 py-0.5 border border-white/20 rounded">Mastercard</span>
            <span className="px-2 py-0.5 border border-white/20 rounded">Amex</span>
            <span className="px-2 py-0.5 border border-white/20 rounded">Apple Pay</span>
            {regionData.codAvailable && (
              <span className="px-2 py-0.5 border border-[#DDA15E] text-[#DDA15E] rounded font-semibold">
                Cash On Delivery (PK)
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
