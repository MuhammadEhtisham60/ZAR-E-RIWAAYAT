import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCollections from '../components/home/FeaturedCollections';
import BestSellersSection from '../components/home/BestSellersSection';
import CustomStudioTeaser from '../components/home/CustomStudioTeaser';
import CraftsmanshipSection from '../components/home/CraftsmanshipSection';
import HeritageStorySection from '../components/home/HeritageStorySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import EditorialGallery from '../components/home/EditorialGallery';

export default function HomePage() {
  return (
    <main className="bg-[#FEFAE0]">
      <HeroSection />
      <FeaturedCollections />
      <BestSellersSection />
      <CustomStudioTeaser />
      <CraftsmanshipSection />
      <HeritageStorySection />
      <TestimonialsSection />
      <EditorialGallery />
    </main>
  );
}
