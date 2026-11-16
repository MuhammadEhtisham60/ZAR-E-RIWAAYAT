import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';
import { Filter, SlidersHorizontal, Sparkles, ChevronDown } from 'lucide-react';

export default function ShopPage({ initialCategory = 'all', pageTitle = 'All Collections', pageDescription = 'Explore our complete archives of royal Pakistani footwear, wedding chappals, and heirloom bridal shawls.' }) {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || initialCategory;

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedGender !== 'all' && item.gender !== selectedGender && item.gender !== 'unisex') {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.pricePKR - b.pricePKR;
      if (selectedSort === 'price-high') return b.pricePKR - a.pricePKR;
      if (selectedSort === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedGender, selectedSort]);

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Collection Header Banner */}
        <div className="border-b border-[#DDA15E]/30 pb-8 mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#606C38] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>Royal Archives</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#283618] tracking-wide">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#283618]/70 mt-3 font-light leading-relaxed">
            {pageDescription}
          </p>
        </div>

        {/* Filter and Sort Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-[#DDA15E]/20 gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'border-[#606C38] bg-[#606C38] text-[#FEFAE0] font-semibold shadow-xs'
                    : 'border-[#DDA15E]/30 text-[#283618] hover:border-[#606C38]/60 bg-white/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Gender & Sort Controls */}
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Gender filter */}
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-[#283618]/60 uppercase tracking-wider text-[11px]">Filter:</span>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="bg-transparent border border-[#DDA15E]/40 px-2 py-1 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
              >
                <option value="all">All Genders</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-[#283618]/60 uppercase tracking-wider text-[11px]">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-transparent border border-[#DDA15E]/40 px-2 py-1 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
              >
                <option value="featured">Featured Royalty</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count & Product Grid */}
        <div className="mb-4 text-xs text-[#283618]/70">
          Showing <span className="font-semibold text-[#283618]">{filteredProducts.length}</span> handcrafted royal creations
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-[#DDA15E]/30 p-8">
            <h3 className="font-heading text-2xl text-[#283618] mb-2">No creations found</h3>
            <p className="text-xs text-[#283618]/60 max-w-sm mx-auto mb-6">
              Try adjusting your filter selection or commission a bespoke custom design.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedGender('all');
              }}
              className="bg-[#606C38] text-[#FEFAE0] text-xs uppercase tracking-widest px-6 py-2.5 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
