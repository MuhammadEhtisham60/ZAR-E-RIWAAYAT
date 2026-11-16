import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { createOrder } from '../store/orderSlice';
import { clearCart } from '../store/cartSlice';
import { formatCurrency } from '../store/currencySlice';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Banknote,
  Building2,
} from 'lucide-react';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { currentRegion, regionData } = useSelector((state) => state.currency);

  // Form states tailored to international regions
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: regionData.defaultCity || '',
    stateOrProvince: '',
    postalCode: '',
    orderNotes: '',
  });

  const [shippingMethod, setShippingMethod] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState(
    currentRegion === 'PK' ? 'cod' : 'card'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#FEFAE0] min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
        <div>
          <h2 className="font-heading text-2xl text-[#283618] mb-4">
            No items in shopping bag to checkout
          </h2>
          <Link
            to="/shop"
            className="bg-[#606C38] text-[#FEFAE0] text-xs font-bold uppercase tracking-widest px-8 py-3"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrderId = `ZR-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      orderId: generatedOrderId,
      trackingNumber: `ZR-${currentRegion}-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customer: {
        ...formData,
        country: regionData.country,
      },
      items: [...cart.items],
      currency: regionData.currency,
      currencySymbol: regionData.symbol,
      subtotalPKR,
      discountPKR: discountAmountPKR,
      giftWrapPKR: giftWrapAmountPKR,
      shippingPKR: shippingAmountPKR,
      totalPKR,
      totalFormatted: formatCurrency(totalPKR, regionData),
      paymentMethod:
        paymentMethod === 'card'
          ? 'International Card Payment (Stripe Ready)'
          : paymentMethod === 'cod'
          ? 'Cash on Delivery (Pakistan Only)'
          : paymentMethod === 'applepay'
          ? 'Apple Pay / Digital Wallet'
          : 'Direct Bank Wire (Meezan / HBL)',
      paymentStatus: paymentMethod === 'cod' ? 'Pending on Delivery' : 'Authorized & Paid',
      currentMilestone: 0,
      estimatedDelivery: '3–6 Business Days via Express Courier',
      carrier: currentRegion === 'PK' ? 'TCS Express Pakistan' : 'DHL Express Worldwide',
      milestones: [
        { title: 'Order Confirmed & Logged in Atelier Ledger', date: 'Just now', done: true },
        { title: 'Master Artisan Leather Cutting & Lasting', date: 'Expected tomorrow', done: false },
        { title: 'Hand Zardozi & Dabka Needlework', date: 'Expected Day 2', done: false },
        { title: 'Master Quality Inspection', date: 'Expected Day 3', done: false },
        { title: 'Dispatched via Air Express Courier', date: 'Expected Day 4', done: false },
        { title: 'Arrived at Destination & Delivered', date: 'Expected in 4–6 Days', done: false },
      ],
    };

    setTimeout(() => {
      dispatch(createOrder(newOrder));
      dispatch(clearCart());
      setIsSubmitting(false);

      // Trigger royal celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#606C38', '#DDA15E', '#BC6C25', '#FEFAE0'],
        });
      } catch (err) {}

      navigate('/order-tracking', { state: { placedOrderId: generatedOrderId } });
    }, 1200);
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-[#283618]/60 uppercase tracking-wider mb-8">
          <Link to="/cart" className="hover:text-[#606C38]">
            Shopping Bag
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#DDA15E]" />
          <span className="text-[#283618] font-semibold">Royal Checkout</span>
        </nav>

        <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#283618] tracking-wide mb-10">
          Royal Checkout & Bespoke Dispatch
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Client Details, Address, Shipping, Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="bg-white/60 border border-[#DDA15E]/30 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#DDA15E]/20 pb-3">
                <h3 className="font-heading text-xl font-semibold text-[#283618]">
                  1. Client Contact Information
                </h3>
                <span className="text-xs text-[#606C38] font-medium">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ayesha"
                    className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Tariq"
                    className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    Email Address (For Royal Tracking) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ayesha.tariq@example.com"
                    className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    Mobile Phone ({regionData.phonePrefix}) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={`${regionData.phonePrefix} 300 1234567`}
                    className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination Address */}
            <div className="bg-white/60 border border-[#DDA15E]/30 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#DDA15E]/20 pb-3">
                <h3 className="font-heading text-xl font-semibold text-[#283618]">
                  2. Shipping Destination ({regionData.flag} {regionData.country})
                </h3>
                <span className="text-xs text-[#606C38] font-medium">Step 2 of 3</span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                  Street Address / House / Villa Number *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. 14 Gulberg III or 42 Kensington Church Street"
                  className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    {currentRegion === 'US'
                      ? 'State *'
                      : currentRegion === 'UK'
                      ? 'County *'
                      : currentRegion === 'AE'
                      ? 'Emirate *'
                      : 'Province *'}
                  </label>
                  <input
                    type="text"
                    name="stateOrProvince"
                    required
                    value={formData.stateOrProvince}
                    onChange={handleInputChange}
                    placeholder={
                      currentRegion === 'AE'
                        ? 'Dubai / Abu Dhabi'
                        : currentRegion === 'PK'
                        ? 'Punjab / Sindh'
                        : 'London / NY'
                    }
                    className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    {currentRegion === 'UK'
                      ? 'Postcode *'
                      : currentRegion === 'US'
                      ? 'ZIP Code *'
                      : 'Postal Code *'}
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 54000 or W8 4PX"
                    className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                  Atelier Delivery Instructions / Gate Code (Optional)
                </label>
                <textarea
                  rows={2}
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="Special instructions for the courier..."
                  className="w-full bg-white border border-[#DDA15E]/40 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Readiness */}
            <div className="bg-white/60 border border-[#DDA15E]/30 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#DDA15E]/20 pb-3">
                <h3 className="font-heading text-xl font-semibold text-[#283618]">
                  3. Payment Method (Secure International Readiness)
                </h3>
                <span className="text-xs text-[#606C38] font-medium">Step 3 of 3</span>
              </div>

              <div className="space-y-3">
                {/* Credit/Debit Card Option */}
                <label
                  className={`flex items-start p-4 border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#606C38] bg-[#606C38]/10 shadow-xs'
                      : 'border-[#DDA15E]/30 bg-white/40 hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 text-[#606C38] focus:ring-0"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#283618] uppercase tracking-wider">
                        International Visa / Mastercard / American Express
                      </span>
                      <div className="flex items-center space-x-1 text-[10px] text-[#283618]/70">
                        <CreditCard className="w-4 h-4 text-[#606C38]" />
                        <span>Stripe Gateway Ready</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#283618]/70 mt-1 font-light">
                      Encrypted end-to-end. Billed in your chosen currency ({regionData.currency}).
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery (Pakistan Only) */}
                {regionData.codAvailable && (
                  <label
                    className={`flex items-start p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#606C38] bg-[#606C38]/10 shadow-xs'
                        : 'border-[#DDA15E]/30 bg-white/40 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-[#606C38] focus:ring-0"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#283618] uppercase tracking-wider">
                          Cash on Delivery (Pakistan Domestic)
                        </span>
                        <Banknote className="w-4 h-4 text-[#BC6C25]" />
                      </div>
                      <p className="text-[11px] text-[#283618]/70 mt-1 font-light">
                        Pay in cash upon physical delivery by TCS Express courier at your doorstep.
                      </p>
                    </div>
                  </label>
                )}

                {/* Direct Bank Wire */}
                <label
                  className={`flex items-start p-4 border cursor-pointer transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-[#606C38] bg-[#606C38]/10 shadow-xs'
                      : 'border-[#DDA15E]/30 bg-white/40 hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="mt-1 text-[#606C38] focus:ring-0"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#283618] uppercase tracking-wider">
                        Direct Royal Atelier Bank Wire
                      </span>
                      <Building2 className="w-4 h-4 text-[#606C38]" />
                    </div>
                    <p className="text-[11px] text-[#283618]/70 mt-1 font-light">
                      Wire transfer directly to our Meezan Bank / Standard Chartered luxury corporate account.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Ledger & Placement */}
          <div className="lg:col-span-5">
            <div className="bg-[#283618] text-[#FEFAE0] border border-[#DDA15E]/40 p-6 shadow-xl space-y-6 sticky top-28">
              <h2 className="font-heading text-xl font-semibold tracking-wide text-[#FEFAE0] border-b border-[#606C38]/50 pb-3">
                Order Review ({cart.items.reduce((s, i) => s + i.quantity, 0)} Items)
              </h2>

              {/* Items summary */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-2 divide-y divide-[#606C38]/30">
                {cart.items.map((item) => (
                  <div key={item.customKey} className="pt-3 first:pt-0 flex gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-cover border border-[#DDA15E]/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-sm font-semibold truncate text-[#FEFAE0]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#FEFAE0]/70">
                        Qty: {item.quantity} • Size: {item.size}
                      </p>
                      {item.embroideryStyle && item.embroideryStyle !== 'none' && (
                        <p className="text-[10px] text-[#DDA15E] truncate">
                          ★ {item.embroideryStyle}
                        </p>
                      )}
                      {item.customMonogram && (
                        <p className="text-[10px] text-[#BC6C25]">
                          Monogram: "{item.customMonogram}"
                        </p>
                      )}
                      <p className="font-mono text-xs text-[#FEFAE0] mt-0.5">
                        {formatCurrency(item.pricePKR * item.quantity, regionData)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ledger Summary */}
              <div className="space-y-2 text-xs text-[#FEFAE0]/80 pt-4 border-t border-[#606C38]/50">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatCurrency(subtotalPKR, regionData)}</span>
                </div>

                {cart.discountPercent > 0 && (
                  <div className="flex justify-between text-[#DDA15E]">
                    <span>Discount ({cart.promoCode})</span>
                    <span className="font-mono">
                      -{formatCurrency(discountAmountPKR, regionData)}
                    </span>
                  </div>
                )}

                {cart.isGiftWrapped && (
                  <div className="flex justify-between text-[#DDA15E]">
                    <span>Heirloom Gift Packaging</span>
                    <span className="font-mono">
                      +{formatCurrency(giftWrapAmountPKR, regionData)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping ({regionData.country})</span>
                  <span className="font-mono">
                    {isFreeShipping ? (
                      <span className="text-[#DDA15E] font-bold">COMPLIMENTARY</span>
                    ) : (
                      formatCurrency(shippingAmountPKR, regionData)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#FEFAE0] pt-3 border-t border-[#606C38]/60">
                  <span className="font-heading">Total Due</span>
                  <span className="font-mono text-xl text-[#DDA15E]">
                    {formatCurrency(totalPKR, regionData)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#606C38] hover:bg-[#DDA15E] hover:text-[#283618] text-[#FEFAE0] py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Logging Royal Order in Ledger...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#DDA15E]" />
                    <span>Authorize & Place Royal Order</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#FEFAE0]/60 space-y-1 text-center pt-2">
                <p>By placing this order you agree to our Bespoke Heirloom Craft Terms.</p>
                <p className="text-[#DDA15E]">
                  Personalization specifications are locked upon submission.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
