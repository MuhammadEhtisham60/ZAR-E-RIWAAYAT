import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import gsap from 'gsap';

export default function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(
        badgeRef.current?.children || [],
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, delay: 0.5, ease: 'back.out(1.4)' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative bg-[#283618] overflow-hidden text-[#FEFAE0]">
      {/* Background Hero Image with luxury radial vignette & color overlay */}
      <div className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero_khussa_royal.jpg"
            alt="ZAR-E-RIWAAYAT Royal Pakistani Handcrafted Khussa"
            className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000"
          />
          {/* Gradients to ensure pristine typography legibility while highlighting footwear */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#283618]/90 via-[#283618]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#283618] via-transparent to-[#283618]/40" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-10">
          <div className="max-w-2xl" ref={textRef}>
            {/* Royal Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#606C38]/40 backdrop-blur-md border border-[#DDA15E]/50 rounded-full text-[#FEFAE0] text-xs uppercase tracking-[0.25em] font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>Royal Pakistani Heritage Haute Couture</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-[#FEFAE0] leading-[1.08] mb-6">
              Tradition, <br />
              <span className="italic font-light text-[#DDA15E]">Reimagined</span> in Every Step.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#FEFAE0]/85 font-light leading-relaxed mb-8 max-w-xl">
              Discover handcrafted Pakistani footwear and wedding accessories, thoughtfully created for your most memorable moments. Delivered across the United Kingdom, United States, UAE & Pakistan.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/shop"
                className="bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-[#DDA15E] group-hover:text-[#283618] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/custom-studio"
                className="bg-transparent hover:bg-[#FEFAE0]/10 text-[#FEFAE0] border border-[#DDA15E] text-xs uppercase tracking-[0.2em] font-semibold py-4 px-8 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-xs"
              >
                <Sparkles className="w-4 h-4 text-[#DDA15E]" />
                <span>Customize Your Pair</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Trust Pills at bottom */}
        <div
          ref={badgeRef}
          className="absolute bottom-6 inset-x-0 hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        >
          <div className="flex items-center justify-between text-xs text-[#FEFAE0]/75 border-t border-[#DDA15E]/20 pt-4 backdrop-blur-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#DDA15E] animate-pulse" />
              <span>Authentic Pakistani Karigar Craft</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>100% Full-Grain Vegetable Tanned Leathers</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>DHL Express to UK, USA, Dubai & Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
