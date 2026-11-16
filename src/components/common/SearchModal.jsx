import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { formatCurrency } from '../../store/currencySlice';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { regionData } = useSelector((state) => state.currency);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col p-4 sm:p-6 md:p-12 animate-fade-in">
      <div
        className="max-w-4xl w-full mx-auto bg-[#FEFAE0] border border-[#DDA15E]/50 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 sm:p-6 border-b border-[#DDA15E]/30 flex items-center gap-3">
          <Search className="w-6 h-6 text-[#606C38] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, khussa, velvet, dabka, wedding shawls..."
            className="flex-1 bg-transparent text-lg sm:text-xl font-heading text-[#283618] placeholder-[#283618]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase text-[#BC6C25] hover:underline"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#283618]/70 hover:text-[#283618] transition-colors ml-2"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Quick Filter */}
        <div className="px-6 py-3 bg-[#606C38]/10 border-b border-[#DDA15E]/20 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#283618]/70 shrink-0">
            Popular:
          </span>
          {CATEGORIES.slice(1).map((cat) => (
            <Link
              key={cat.id}
              to={cat.path}
              onClick={onClose}
              className="px-2.5 py-1 bg-white/60 hover:bg-[#606C38] hover:text-[#FEFAE0] text-[#283618] border border-[#DDA15E]/30 rounded text-[11px] uppercase tracking-wider shrink-0 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-[#283618]/70">
              <Sparkles className="w-8 h-8 text-[#DDA15E] mx-auto mb-2" />
              <p className="font-heading text-lg text-[#283618]">
                Type to search the royal archives
              </p>
              <p className="text-xs text-[#283618]/60 mt-1">
                Explore handcrafted footwear, bridal pieces, and customized wedding accessories.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-[#283618]/70">
              <p className="font-heading text-xl text-[#283618]">
                No royal items found for "{query}"
              </p>
              <p className="text-xs text-[#283618]/60 mt-1 mb-4">
                Looking for a bespoke creation? Commission a customized piece in our studio.
              </p>
              <Link
                to="/custom-studio"
                onClick={onClose}
                className="inline-block bg-[#606C38] text-[#FEFAE0] text-xs uppercase tracking-widest px-5 py-2 font-semibold hover:bg-[#283618] transition-colors"
              >
                Launch Custom Studio
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  onClick={onClose}
                  className="flex gap-3 p-2.5 border border-[#DDA15E]/30 hover:border-[#606C38] bg-white/40 hover:bg-white transition-all group"
                >
                  <div className="w-16 h-16 bg-[#283618]/5 overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#606C38] font-semibold block">
                      {item.subcategory || item.category}
                    </span>
                    <h4 className="font-heading text-sm font-semibold text-[#283618] truncate group-hover:text-[#606C38] transition-colors">
                      {item.title}
                    </h4>
                    <span className="font-mono text-xs text-[#283618] font-medium block mt-1">
                      {formatCurrency(item.pricePKR, regionData)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
