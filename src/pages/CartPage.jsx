import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Gift,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  updateQuantity,
  removeFromCart,
  applyPromoCode,
  removePromoCode,
  toggleGiftWrap,
} from '../store/cartSlice';
import { formatCurrency } from '../store/currencySlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { regionData } = useSelector((state) => state.currency);
  const [promoInput, setPromoInput] = useState('');

  const subtotalPKR = cart.items.reduce(
    (acc, item) => acc + item.pricePKR * item.quantity,
    0
  );

  const discountAmountPKR = Math.round((subtotalPKR * cart.discountPercent) / 100);
  const giftWrapAmountPKR = cart.isGiftWrapped ? cart.giftWrapPricePKR : 0;
  const taxablePKR = Math.max(0, subtotalPKR - discountAmountPKR + giftWrapAmountPKR);

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

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#FEFAE0] min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#606C38]/10 text-[#606C38] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl font-normal text-[#283618] mb-2">
            Your Royal Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#283618]/70 mb-8 font-light">
            You have not yet added any handcrafted footwear or wedding shawls to your shopping bag.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="bg-[#606C38] text-[#FEFAE0] text-xs font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-[#283618] transition-colors"
            >
              Explore Collections
            </Link>
            <Link
              to="/custom-studio"
              className="border border-[#DDA15E] text-[#283618] text-xs font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-black/5 transition-colors"
            >
              Launch Custom Studio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#283618] tracking-wide mb-8">
          Royal Shopping Bag & Customization Review
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white/60 border border-[#DDA15E]/30 p-4 sm:p-6 shadow-xs">
              <div className="divide-y divide-[#DDA15E]/20">
                {cart.items.map((item) => (
                  <div key={item.customKey} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5">
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#283618]/5 border border-[#DDA15E]/30 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-heading text-xl font-semibold text-[#283618]">
                            {item.title}
                          </h3>
                          <div className="text-xs text-[#283618]/70 mt-1 space-y-0.5 font-light">
                            {item.size && (
                              <div>
                                Sizing: <span className="font-semibold text-[#283618]">{item.size}</span>
                              </div>
                            )}
                            {item.color && (
                              <div>
                                Color: <span className="font-semibold text-[#283618]">{item.color}</span>
                              </div>
                            )}
                            {item.material && (
                              <div>
                                Material: <span className="font-semibold text-[#283618]">{item.material}</span>
                              </div>
                            )}
                            {item.embroideryStyle && item.embroideryStyle !== 'none' && (
                              <div className="text-[#606C38] flex items-center gap-1 font-medium">
                                <Sparkles className="w-3 h-3 text-[#DDA15E]" />
                                <span>{item.embroideryStyle}</span>
                              </div>
                            )}
                            {item.sole && (
                              <div>
                                Sole Arch: <span className="font-semibold text-[#283618]">{item.sole}</span>
                              </div>
                            )}
                            {item.customMonogram && (
                              <div className="text-[#BC6C25] font-semibold">
                                Monogram Inscription: "{item.customMonogram}"
                              </div>
                            )}
                            {item.customNotes && (
                              <div className="text-[11px] italic text-[#283618]/60">
                                Atelier Notes: {item.customNotes}
                              </div>
                            )}
                            {item.referenceImage && (
                              <div className="text-[11px] text-[#606C38]">
                                Reference Swatch: {item.referenceImage}
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => dispatch(removeFromCart(item.customKey))}
                          className="text-[#283618]/40 hover:text-[#BC6C25] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#DDA15E]/15">
                        <div className="flex items-center border border-[#DDA15E]/50 bg-white">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  customKey: item.customKey,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                            className="px-2.5 py-1 text-xs font-semibold hover:bg-black/5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono font-medium">
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
                            className="px-2.5 py-1 text-xs font-semibold hover:bg-black/5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-[#283618]/60 uppercase block">
                            Item Total
                          </span>
                          <span className="font-mono text-sm font-bold text-[#283618]">
                            {formatCurrency(item.pricePKR * item.quantity, regionData)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift Wrap Card */}
            <div className="bg-white/60 border border-[#DDA15E]/30 p-4 sm:p-5 flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cart.isGiftWrapped}
                  onChange={() => dispatch(toggleGiftWrap())}
                  className="rounded text-[#606C38] focus:ring-0 w-4 h-4"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider text-[#283618]">
                    <Gift className="w-4 h-4 text-[#BC6C25]" />
                    <span>Royal Heirloom Velvet Presentation Box</span>
                  </div>
                  <p className="text-[11px] text-[#283618]/70 mt-0.5">
                    Includes gold-stamped hard case, scented lavender pouch, and personalized calligraphy greeting note.
                  </p>
                </div>
              </label>
              <span className="font-mono text-xs font-semibold text-[#606C38]">
                +{formatCurrency(cart.giftWrapPricePKR, regionData)}
              </span>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#283618] text-[#FEFAE0] border border-[#DDA15E]/40 p-6 shadow-xl space-y-5 sticky top-28">
              <h2 className="font-heading text-xl font-semibold tracking-wide text-[#FEFAE0] border-b border-[#606C38]/50 pb-3">
                Order Summary
              </h2>

              {/* Promo code */}
              <div>
                {cart.promoCode ? (
                  <div className="flex items-center justify-between bg-[#606C38]/30 px-3 py-2 border border-[#DDA15E]/40 text-xs">
                    <span className="font-semibold text-[#DDA15E]">
                      {cart.promoCode} (-{cart.discountPercent}%)
                    </span>
                    <button
                      onClick={() => dispatch(removePromoCode())}
                      className="text-[#FEFAE0] hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (ROYAL10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-white/10 border border-[#DDA15E]/40 px-3 py-2 text-xs text-[#FEFAE0] placeholder-[#FEFAE0]/50 uppercase tracking-wider focus:outline-none focus:border-[#DDA15E]"
                    />
                    <button
                      type="submit"
                      className="bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {cart.promoMessage && (
                  <p className="text-[11px] text-[#DDA15E] mt-1.5">
                    {cart.promoMessage}
                  </p>
                )}
              </div>

              {/* Figures */}
              <div className="space-y-2.5 text-xs text-[#FEFAE0]/80 pt-2 border-t border-[#606C38]/40">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono font-medium text-[#FEFAE0]">
                    {formatCurrency(subtotalPKR, regionData)}
                  </span>
                </div>

                {cart.discountPercent > 0 && (
                  <div className="flex justify-between text-[#DDA15E]">
                    <span>Privilege Discount ({cart.discountPercent}%)</span>
                    <span className="font-mono">
                      -{formatCurrency(discountAmountPKR, regionData)}
                    </span>
                  </div>
                )}

                {cart.isGiftWrapped && (
                  <div className="flex justify-between text-[#DDA15E]">
                    <span>Royal Gift Packaging</span>
                    <span className="font-mono">
                      +{formatCurrency(giftWrapAmountPKR, regionData)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Delivery to {regionData.country}</span>
                  <span className="font-mono">
                    {isFreeShipping ? (
                      <span className="text-[#DDA15E] font-semibold">COMPLIMENTARY</span>
                    ) : (
                      formatCurrency(shippingAmountPKR, regionData)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#FEFAE0] pt-3 border-t border-[#606C38]/50">
                  <span className="font-heading">Grand Total</span>
                  <span className="font-mono text-lg text-[#DDA15E]">
                    {formatCurrency(totalPKR, regionData)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <span>Proceed to Royal Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
                </button>
              </div>

              <div className="text-[11px] text-[#FEFAE0]/60 space-y-1.5 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DDA15E]" />
                  <span>Secure 256-Bit SSL Encrypted Transaction</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DDA15E]" />
                  <span>Customization specs preserved in permanent order ledger</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
