import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../common/ProductCard';
import QuickViewModal from '../common/QuickViewModal';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BestSellersSection() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Curated royal best sellers
  const bestSellers = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="py-20 lg:py-24 bg-[#FEFAE0] border-t border-[#DDA15E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#606C38] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>Patron Favorites Across London, Dubai & Lahore</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#283618] tracking-wide">
              Bespoke Best Sellers
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#BC6C25] hover:text-[#606C38] mt-4 md:mt-0 transition-colors"
          >
            <span>View All Creations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
