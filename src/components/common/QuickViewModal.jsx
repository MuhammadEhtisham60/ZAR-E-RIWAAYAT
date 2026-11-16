import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { X, Sparkles, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { formatCurrency } from '../../store/currencySlice';

export default function QuickViewModal({ product, onClose }) {
  const dispatch = useDispatch();
  const { regionData } = useSelector((state) => state.currency);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(
    product.availableSizes ? product.availableSizes[0] : 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        pricePKR: product.pricePKR,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        material: product.materials ? product.materials[0] : 'Standard',
        embroideryStyle: 'Original Royal Spec',
        quantity,
      })
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#FEFAE0] border border-[#DDA15E]/50 max-w-3xl w-full p-4 sm:p-6 md:p-8 text-[#283618] relative shadow-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 text-[#283618]/60 hover:text-[#283618] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {/* Left: Product Image */}
          <div className="relative aspect-square overflow-hidden bg-[#283618]/5 border border-[#DDA15E]/30">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#283618] text-[#FEFAE0] text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold border border-[#DDA15E]/40">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[#606C38] mb-1">
                {product.subcategory || product.category}
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[#283618] leading-tight">
                {product.title}
              </h2>
              <p className="text-xs text-[#283618]/70 mt-1 mb-3">
                {product.subtitle}
              </p>

              <div className="text-xl font-mono font-semibold text-[#283618] mb-4">
                {formatCurrency(product.pricePKR, regionData)}
              </div>

              <p className="text-xs text-[#283618]/80 leading-relaxed mb-4 border-t border-[#DDA15E]/20 pt-3">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-2">
                    Color: <span className="font-normal text-[#606C38]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColor === c.name
                            ? 'border-[#283618] scale-110 shadow-sm'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.availableSizes && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#283618]">
                      Select Size
                    </label>
                    <Link
                      to="/faqs"
                      onClick={onClose}
                      className="text-[11px] text-[#BC6C25] hover:underline"
                    >
                      Size Guide
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs px-2.5 py-1.5 border transition-all ${
                          selectedSize === s
                            ? 'border-[#606C38] bg-[#606C38] text-[#FEFAE0] font-semibold'
                            : 'border-[#DDA15E]/40 text-[#283618] hover:border-[#606C38]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#283618]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#DDA15E]/50 bg-white/40">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-sm font-semibold hover:bg-black/5"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-sm font-semibold hover:bg-black/5"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-3 border-t border-[#DDA15E]/20">
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="flex-1 bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] py-3 px-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#DDA15E]" />
                      <span>Added to Royal Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#DDA15E]" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => dispatch(toggleWishlist(product))}
                  className="p-3 border border-[#DDA15E]/50 hover:border-[#BC6C25] text-[#283618] transition-colors"
                  title="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? 'fill-[#BC6C25] text-[#BC6C25]' : ''}`}
                  />
                </button>
              </div>

              {/* Full Details & Customization Links */}
              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-[#606C38] hover:underline font-medium"
                >
                  View Full Product Story →
                </Link>

                <Link
                  to="/custom-studio"
                  onClick={onClose}
                  className="text-[#BC6C25] font-semibold flex items-center gap-1 hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Customize in Bespoke Studio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
