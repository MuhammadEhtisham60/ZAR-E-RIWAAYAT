import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Gift,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  updateQuantity,
  removeFromCart,
  applyPromoCode,
  removePromoCode,
  toggleGiftWrap,
} from '../../store/cartSlice';
import { formatCurrency } from '../../store/currencySlice';

export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { regionData } = useSelector((state) => state.currency);

  const [promoInput, setPromoInput] = useState('');

  if (!isOpen) return null;

  const subtotalPKR = cart.items.reduce(
    (acc, item) => acc + item.pricePKR * item.quantity,
    0
  );

  const discountAmountPKR = Math.round((subtotalPKR * cart.discountPercent) / 100);
  const giftWrapAmountPKR = cart.isGiftWrapped ? cart.giftWrapPricePKR : 0;
  const taxablePKR = Math.max(0, subtotalPKR - discountAmountPKR + giftWrapAmountPKR);

  // Regional shipping calculation
  const isFreeShipping = taxablePKR * regionData.rate >= regionData.freeShippingThreshold;
  const shippingAmountPKR = isFreeShipping
    ? 0
    : Math.round(regionData.expressShipping / regionData.rate);

  const totalPKR = taxablePKR + shippingAmountPKR;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      dispatch(applyPromoCode(promoInput));
    }
  };

  const handleProceedCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const thresholdPKR = Math.round(regionData.freeShippingThreshold / regionData.rate);
  const progressPercent = Math.min(100, Math.round((taxablePKR / thresholdPKR) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="bg-[#FEFAE0] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#DDA15E]/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#DDA15E]/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#606C38]" />
            <h3 className="font-heading text-xl font-semibold tracking-wide text-[#283618]">
              Royal Shopping Bag ({cart.items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#283618]/70 hover:text-[#283618] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#606C38]/10 px-5 py-2.5 border-b border-[#DDA15E]/20 text-xs text-[#283618]">
          <div className="flex justify-between font-medium mb-1.5">
            <span>
              {isFreeShipping
                ? 'Royal Complimentary Express Shipping Unlocked!'
                : `Add ${formatCurrency(
                    thresholdPKR - taxablePKR,
                    regionData
                  )} more for Complimentary Express Shipping`}
            </span>
            <span className="font-mono text-[#606C38]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#283618]/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#606C38] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#283618]/70">
              <ShoppingBag className="w-12 h-12 text-[#DDA15E] mb-3 stroke-1" />
              <p className="font-heading text-xl text-[#283618] font-medium">
                Your royal bag is empty
              </p>
              <p className="text-xs text-[#283618]/60 mt-1 max-w-xs mb-6">
                Discover our handcrafted footwear and bespoke heirloom shawls.
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="bg-[#606C38] text-[#FEFAE0] text-xs font-semibold uppercase tracking-widest px-6 py-2.5 hover:bg-[#283618] transition-colors"
              >
                Explore Collections
              </Link>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.customKey}
                className="flex gap-3.5 pb-4 border-b border-[#DDA15E]/20"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#283618]/5 border border-[#DDA15E]/30 shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-heading text-base font-semibold text-[#283618] truncate pr-2">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => dispatch(removeFromCart(item.customKey))}
                      className="text-[#283618]/40 hover:text-[#BC6C25] p-0.5 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Customization Details */}
                  <div className="text-[11px] text-[#283618]/70 mt-0.5 space-y-0.5">
                    {item.size && <div>Size: <span className="font-medium text-[#283618]">{item.size}</span></div>}
                    {item.color && <div>Color: <span className="font-medium text-[#283618]">{item.color}</span></div>}
                    {item.embroideryStyle && item.embroideryStyle !== 'none' && (
                      <div className="text-[#606C38] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#DDA15E]" />
                        <span>{item.embroideryStyle}</span>
                      </div>
                    )}
                    {item.customMonogram && (
                      <div className="text-[#BC6C25] font-medium">
                        Monogram: "{item.customMonogram}"
                      </div>
                    )}
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-[#DDA15E]/50 bg-white/50">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              customKey: item.customKey,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="px-2 py-0.5 hover:bg-black/5 text-xs font-semibold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              customKey: item.customKey,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="px-2 py-0.5 hover:bg-black/5 text-xs font-semibold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#283618]">
                      {formatCurrency(item.pricePKR * item.quantity, regionData)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Subtotal, Promo, Checkout) */}
        {cart.items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#DDA15E]/30 bg-[#FEFAE0]/90 space-y-3">
            {/* Gift Wrap Toggle */}
            <div className="flex items-center justify-between text-xs py-1 px-2.5 bg-white/40 border border-[#DDA15E]/30 rounded">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cart.isGiftWrapped}
                  onChange={() => dispatch(toggleGiftWrap())}
                  className="rounded text-[#606C38] focus:ring-0"
                />
                <Gift className="w-3.5 h-3.5 text-[#BC6C25]" />
                <span className="text-[#283618] font-medium">
                  Royal Heirloom Velvet Gift Box
                </span>
              </label>
              <span className="font-mono text-[#606C38]">
                +{formatCurrency(cart.giftWrapPricePKR, regionData)}
              </span>
            </div>

            {/* Promo code input */}
            <div>
              {cart.promoCode ? (
                <div className="flex items-center justify-between bg-[#606C38]/15 px-3 py-1.5 border border-[#606C38]/40 text-xs">
                  <span className="font-medium text-[#283618]">
                    {cart.promoCode} (-{cart.discountPercent}%)
                  </span>
                  <button
                    onClick={() => dispatch(removePromoCode())}
                    className="text-[#BC6C25] font-semibold text-[11px] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Promo Code (e.g. ROYAL10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-white/60 border border-[#DDA15E]/40 px-3 py-1.5 text-xs text-[#283618] uppercase tracking-wider focus:outline-none focus:border-[#606C38]"
                  />
                  <button
                    type="submit"
                    className="bg-[#283618] text-[#FEFAE0] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#606C38] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {cart.promoMessage && (
                <p
                  className={`text-[11px] mt-1 ${
                    cart.promoCode ? 'text-[#606C38]' : 'text-red-700'
                  }`}
                >
                  {cart.promoMessage}
                </p>
              )}
            </div>

            {/* Financial Totals */}
            <div className="space-y-1.5 text-xs text-[#283618]/80 pt-1 border-t border-[#DDA15E]/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium">
                  {formatCurrency(subtotalPKR, regionData)}
                </span>
              </div>

              {cart.discountPercent > 0 && (
                <div className="flex justify-between text-[#606C38]">
                  <span>Privilege Discount ({cart.discountPercent}%)</span>
                  <span className="font-mono">
                    -{formatCurrency(discountAmountPKR, regionData)}
                  </span>
                </div>
              )}

              {cart.isGiftWrapped && (
                <div className="flex justify-between text-[#BC6C25]">
                  <span>Royal Gift Packaging</span>
                  <span className="font-mono">
                    +{formatCurrency(giftWrapAmountPKR, regionData)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Express Shipping ({regionData.code})</span>
                <span className="font-mono">
                  {isFreeShipping ? (
                    <span className="text-[#606C38] font-bold">COMPLIMENTARY</span>
                  ) : (
                    formatCurrency(shippingAmountPKR, regionData)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-[#283618] pt-2 border-t border-[#DDA15E]/30">
                <span className="font-heading text-base">Grand Total</span>
                <span className="font-mono text-base text-[#606C38]">
                  {formatCurrency(totalPKR, regionData)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>Proceed to Royal Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
              </button>

              <div className="flex justify-between text-xs">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="text-[#283618] hover:underline font-medium text-center w-full py-1"
                >
                  View Full Cart & Customization Notes →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
