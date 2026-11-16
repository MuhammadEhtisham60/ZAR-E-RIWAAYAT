import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.lenis = null;
      lenisRef.current = null;
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  // Whenever user navigates to a new route / page, automatically scroll to the top
  useEffect(() => {
    const handleScrollReset = () => {
      if (location.hash) {
        const elem = document.querySelector(location.hash);
        if (elem) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(elem, { offset: -80 });
          } else {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
      }

      // Scroll immediately to top
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Small tick to ensure layout update before recalculating GSAP triggers
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        ScrollTrigger.refresh();
      }, 50);
    };

    handleScrollReset();
  }, [location.pathname, location.search, location.hash]);

  return <>{children}</>;
}
