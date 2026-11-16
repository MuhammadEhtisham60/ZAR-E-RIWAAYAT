import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { toggleWishlist } from '../../store/wishlistSlice';
import { addToCart } from '../../store/cartSlice';
import { formatCurrency } from '../../store/currencySlice';

export default function ProductCard({ product, onQuickView }) {
  const dispatch = useDispatch();
  const { regionData } = useSelector((state) => state.currency);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        pricePKR: product.pricePKR,
        image: product.image,
        size: product.availableSizes ? product.availableSizes[0] : 'Standard',
        color: product.colors ? product.colors[0].name : 'Default',
        material: product.materials ? product.materials[0] : 'Standard',
        embroideryStyle: 'Original Royal Spec',
        quantity: 1,
      })
    );
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <div
      className="group relative bg-[#FEFAE0] flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-square overflow-hidden bg-[#283618]/5 border border-[#DDA15E]/20">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#283618]/90 text-[#FEFAE0] text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold border border-[#DDA15E]/40 backdrop-blur-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FEFAE0]/90 backdrop-blur-xs flex items-center justify-center text-[#283618] hover:text-[#BC6C25] hover:bg-[#FEFAE0] transition-colors shadow-sm"
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-[#BC6C25] text-[#BC6C25]' : ''}`}
          />
        </button>

        {/* Quick Actions Overlay (Desktop hover) */}
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 bg-[#FEFAE0]/95 hover:bg-[#FEFAE0] text-[#283618] text-[11px] font-semibold py-2 px-3 border border-[#DDA15E]/50 flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <Eye className="w-3.5 h-3.5 text-[#606C38]" />
              <span className="uppercase tracking-wider">Quick View</span>
            </button>
          )}

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] text-[11px] font-semibold py-2 px-3 flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span className="uppercase tracking-wider">
              {addedNotice ? 'Added ✓' : 'Add to Bag'}
            </span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#606C38] uppercase tracking-widest font-medium mb-1">
            <span>{product.subcategory || product.category}</span>
            {product.isCustomizable && (
              <span className="inline-flex items-center gap-1 text-[#BC6C25]">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Customizable</span>
              </span>
            )}
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-[#606C38]">
            <h3 className="font-heading text-lg font-medium text-[#283618] tracking-wide leading-snug line-clamp-1 transition-colors">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-[#283618]/65 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-2.5 pt-2 border-t border-[#DDA15E]/15 flex items-center justify-between">
          <span className="font-medium text-sm text-[#283618] font-mono tracking-tight">
            {formatCurrency(product.pricePKR, regionData)}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="text-[11px] uppercase tracking-wider text-[#BC6C25] font-semibold hover:text-[#606C38] transition-colors"
          >
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
}
