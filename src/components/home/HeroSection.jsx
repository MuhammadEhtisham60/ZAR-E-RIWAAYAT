import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Award, ChevronLeft, ChevronRight, Crown } from 'lucide-react';

const SLIDE_DURATION = 5500; // 5.5 seconds per slide for smooth auto-advance

const slides = [
  {
    id: 1,
    image: '/images/hero/hero_khussa_royal.jpg',
    alt: 'ZAR-E-RIWAAYAT Royal Pakistani Handcrafted Khussa Haute Couture',
    badgeIcon: Sparkles,
    badgeText: 'Royal Pakistani Heritage Haute Couture',
    titleLine1: 'Tradition,',
    titleHighlight: 'Reimagined',
    titleLine2: 'in Every Step.',
    description:
      'Discover handcrafted Pakistani footwear and royal accessories, thoughtfully created for your most memorable moments. Delivered across the UK, USA, UAE & worldwide.',
    primaryBtn: {
      text: 'Explore Collection',
      link: '/shop',
    },
    secondaryBtn: {
      text: 'Customize Your Pair',
      link: '/custom-studio',
      hasIcon: true,
    },
    zoomClass: 'animate-ken-burns-in',
  },
  {
    id: 2,
    image: '/images/shabri/shabri_classic_leather.jpg',
    alt: 'Authentic Pakistani Mens Shabri & Saraiki Leather Chappal',
    badgeIcon: ShieldCheck,
    badgeText: "Men's Heritage Chappal Collection",
    titleLine1: 'Authentic Shabri &',
    titleHighlight: 'Saraiki Chappal,',
    titleLine2: 'Sculpted in Pure Leather.',
    description:
      'Bahawalpur & Multani double-sole mastery. Heavy hand-skived vegetable-tanned leather, waxed artisan stitching, and iconic flared silhouette crafted for commanding presence.',
    primaryBtn: {
      text: "Shop Men's Chappal",
      link: '/collection/shabri',
    },
    secondaryBtn: {
      text: 'Saraiki Collection',
      link: '/collection/saraiki',
      hasIcon: false,
    },
    zoomClass: 'animate-ken-burns-out',
  },
  {
    id: 3,
    image: '/images/khussa/khussa_mens_traditional.jpg',
    alt: 'Traditional Mens Ceremonial Khussa and Royal Groom Footwear',
    badgeIcon: Crown,
    badgeText: "Men's Royal Ceremonial Khussa",
    titleLine1: 'Aristocratic Polish,',
    titleHighlight: 'Handcrafted',
    titleLine2: 'for Royal Occasions.',
    description:
      'Classic curved upturned nokh, hand-punched piping, and rich vegetable-tanned leather tailored to pair effortlessly with Sherwanis, Kurta-Pajamas, and grand festivities.',
    primaryBtn: {
      text: "Explore Men's Khussa",
      link: '/collection/khussa',
    },
    secondaryBtn: {
      text: 'Bespoke Atelier',
      link: '/custom-studio',
      hasIcon: true,
    },
    zoomClass: 'animate-ken-burns-pulse',
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Continuous smooth auto-slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide, currentIndex]);

  // Touch swipe support for mobile & tablet
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = slides[currentIndex];
  const BadgeIcon = currentSlide.badgeIcon;

  return (
    <section
      className="relative bg-[#283618] overflow-hidden text-[#FEFAE0] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Showcase Slider"
    >
      <div className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-[92vh] flex items-center">
        {/* Layered Background Slides with Smooth 1200ms Crossfade & Continuous Gentle Ken Burns Zoom */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none -z-10'
              }`}
              aria-hidden={!isActive}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={`w-full h-full object-cover object-center ${
                    isActive ? slide.zoomClass : 'scale-100'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                {/* Luxury Royal Gradients for pristine contrast & readability across all screen sizes */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#283618]/95 via-[#283618]/75 to-[#283618]/30 sm:to-[#283618]/25 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#283618] via-transparent to-[#283618]/50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#283618_95%)] opacity-40 pointer-events-none" />
              </div>
            </div>
          );
        })}

        {/* Content Container with Smooth Animation on Slide Change */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:py-20 lg:py-28 z-10 w-full">
          <div
            key={currentSlide.id}
            className="max-w-2xl pr-12 sm:pr-0 transition-all duration-700 ease-out transform translate-y-0 opacity-100 animate-fadeIn"
          >
            {/* Royal Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-[#606C38]/50 backdrop-blur-md border border-[#DDA15E]/50 rounded-full text-[#FEFAE0] text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] font-medium mb-3 sm:mb-6 shadow-sm">
              <BadgeIcon className="w-3.5 h-3.5 text-[#DDA15E] animate-pulse shrink-0" />
              <span className="truncate">{currentSlide.badgeText}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal tracking-wide text-[#FEFAE0] leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6 drop-shadow-md">
              {currentSlide.titleLine1} <br />
              <span className="italic font-light text-[#DDA15E]">
                {currentSlide.titleHighlight}
              </span>{' '}
              {currentSlide.titleLine2}
            </h1>

            {/* Supporting Text (Hidden on mobile per request, visible on tablet and laptop) */}
            <p className="hidden sm:block text-sm sm:text-base lg:text-lg text-[#FEFAE0]/90 font-light leading-relaxed mb-6 sm:mb-8 max-w-xl drop-shadow-sm">
              {currentSlide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none mt-2 sm:mt-0">
              <Link
                to={currentSlide.primaryBtn.link}
                className="bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] text-xs uppercase tracking-[0.2em] font-bold py-3.5 sm:py-4 px-6 sm:px-8 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group border border-[#606C38] hover:border-[#DDA15E]"
              >
                <span>{currentSlide.primaryBtn.text}</span>
                <ArrowRight className="w-4 h-4 text-[#DDA15E] group-hover:text-[#283618] group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to={currentSlide.secondaryBtn.link}
                className="bg-transparent hover:bg-[#FEFAE0]/10 text-[#FEFAE0] border border-[#DDA15E] text-xs uppercase tracking-[0.2em] font-semibold py-3.5 sm:py-4 px-6 sm:px-8 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-xs"
              >
                {currentSlide.secondaryBtn.hasIcon && (
                  <Sparkles className="w-4 h-4 text-[#DDA15E]" />
                )}
                <span>{currentSlide.secondaryBtn.text}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 sm:gap-3 z-20">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#283618]/60 hover:bg-[#DDA15E] text-[#FEFAE0] hover:text-[#283618] border border-[#DDA15E]/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#283618]/60 hover:bg-[#DDA15E] text-[#FEFAE0] hover:text-[#283618] border border-[#DDA15E]/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Interactive Slide Progress Indicators */}
        <div className="absolute bottom-6 sm:bottom-20 left-4 sm:left-6 lg:left-8 z-20 flex items-center gap-2 sm:gap-3">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group flex items-center gap-1.5 sm:gap-2 cursor-pointer focus:outline-none"
              >
                <span
                  className={`text-[11px] sm:text-xs font-mono transition-colors duration-300 ${
                    isActive ? 'text-[#DDA15E] font-semibold' : 'text-[#FEFAE0]/50 group-hover:text-[#FEFAE0]'
                  }`}
                >
                  0{idx + 1}
                </span>
                <div className="relative w-8 sm:w-16 h-1 bg-[#FEFAE0]/25 rounded-full overflow-hidden">
                  {isActive ? (
                    <div
                      key={`progress-${currentIndex}`}
                      className="h-full bg-[#DDA15E] rounded-full animate-slide-progress"
                    />
                  ) : (
                    <div className="w-0 group-hover:w-full h-full bg-[#FEFAE0]/50 transition-all duration-300 rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Floating Trust Pills at bottom (Pristine on desktop/tablet-landscape, unobtrusive on mobile) */}
        <div className="absolute bottom-6 inset-x-0 hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center justify-between text-xs text-[#FEFAE0]/80 border-t border-[#DDA15E]/20 pt-4 backdrop-blur-xs">
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
