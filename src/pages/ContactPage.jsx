import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bespoke Bridal Commission',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-12 lg:py-20 text-[#283618]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#606C38] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>VIP Client Services</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#283618] tracking-wide">
            Contact the Atelier
          </h1>
          <div className="w-16 h-0.5 bg-[#DDA15E] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#283618]/70 font-light leading-relaxed">
            Whether inquiring about bespoke bridal footwear commissions, international DHL delivery times, or private fittings in London, Dubai, or Lahore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white/70 border border-[#DDA15E]/40 p-6 sm:p-8 shadow-sm">
            <h3 className="font-heading text-2xl font-semibold text-[#283618] mb-2">
              Send an Atelier Inquiry
            </h3>
            <p className="text-xs text-[#283618]/70 mb-6 font-light">
              Our royal client concierge responds within 12 hours across UK, US, UAE, and Pakistan time zones.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#606C38]/15 border border-[#606C38]/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#606C38] mx-auto" />
                <h4 className="font-heading text-xl font-semibold text-[#283618]">
                  Inquiry Received with Honor
                </h4>
                <p className="text-xs text-[#283618]/70 max-w-md mx-auto">
                  Thank you, <b>{formData.name}</b>. A senior atelier concierge has been assigned to your request and will contact you via {formData.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ayesha Tariq"
                      className="w-full bg-white border border-[#DDA15E]/50 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ayesha@example.com"
                      className="w-full bg-white border border-[#DDA15E]/50 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                      Phone Number (with Country Code)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7700 900123 / +92 300 1234567"
                      className="w-full bg-white border border-[#DDA15E]/50 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                      Nature of Inquiry
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-white border border-[#DDA15E]/50 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                    >
                      <option value="Bespoke Bridal Commission">Bespoke Bridal Commission</option>
                      <option value="Sizing & Arch Fitting Advice">Sizing & Arch Fitting Advice</option>
                      <option value="Custom Shawl Embroidery">Custom Shawl Embroidery</option>
                      <option value="Existing Order Tracking">Existing Order Tracking</option>
                      <option value="Private Studio Fitting Appointment">Private Studio Fitting Appointment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    Your Message / Specific Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention your wedding date, trousseau colors, or specific sizing questions..."
                    className="w-full bg-white border border-[#DDA15E]/50 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <span>Submit Royal Atelier Inquiry</span>
                  <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: International Salons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#283618] text-[#FEFAE0] border border-[#DDA15E]/40 p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#DDA15E] font-semibold">
                <MessageSquare className="w-4 h-4" />
                <span>Instant VIP WhatsApp</span>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-[#FEFAE0]">
                Direct Concierge Access
              </h3>
              <p className="text-xs text-[#FEFAE0]/80 font-light leading-relaxed">
                Connect directly with our master karigar liaison for live fabric swatch matching, video consultations, or expedited wedding delivery requests.
              </p>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] text-xs font-bold uppercase tracking-wider py-3 px-6 transition-colors"
              >
                <span>Chat via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Atelier Locations */}
            <div className="bg-white/70 border border-[#DDA15E]/30 p-6 space-y-5 text-xs">
              <h4 className="font-heading text-lg font-semibold text-[#283618]">
                Atelier Salons & Global Concierges
              </h4>

              <div className="space-y-1">
                <span className="font-bold text-[#606C38] block uppercase tracking-wider">
                  Lahore Master Atelier (Pakistan)
                </span>
                <p className="text-[#283618]/70">
                  18-C/2, M.M. Alam Road, Gulberg III, Lahore, Pakistan
                </p>
                <p className="text-[#283618]/60">Tel: +92 42 3578 9900</p>
              </div>

              <div className="space-y-1 border-t border-[#DDA15E]/20 pt-3">
                <span className="font-bold text-[#606C38] block uppercase tracking-wider">
                  London Liaison Salon (United Kingdom)
                </span>
                <p className="text-[#283618]/70">
                  42 Old Bond Street, Mayfair, London W1S 4LZ, UK
                </p>
                <p className="text-[#283618]/60">Tel: +44 20 7946 0192</p>
              </div>

              <div className="space-y-1 border-t border-[#DDA15E]/20 pt-3">
                <span className="font-bold text-[#606C38] block uppercase tracking-wider">
                  Dubai Private Client Suite (UAE)
                </span>
                <p className="text-[#283618]/70">
                  Fashion Avenue, Downtown Dubai, United Arab Emirates
                </p>
                <p className="text-[#283618]/60">Tel: +971 4 362 7500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
