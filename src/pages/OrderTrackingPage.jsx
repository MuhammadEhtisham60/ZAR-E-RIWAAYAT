import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { trackOrderById, clearTrackedOrder } from '../store/orderSlice';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

export default function OrderTrackingPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentTrackedOrder, trackingError, orders } = useSelector((state) => state.orders);

  const [query, setQuery] = useState('');

  // If redirected from checkout with placedOrderId
  useEffect(() => {
    if (location.state?.placedOrderId) {
      setQuery(location.state.placedOrderId);
      dispatch(trackOrderById({ query: location.state.placedOrderId }));
    } else if (orders.length > 0 && !currentTrackedOrder) {
      // Auto-load default sample order ZR-89241 for quick demonstration
      dispatch(trackOrderById({ query: orders[0].orderId }));
      setQuery(orders[0].orderId);
    }
  }, [location.state, dispatch]);

  const handleTrack = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(trackOrderById({ query }));
    }
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#606C38] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>Royal Atelier Dispatch</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#283618] tracking-wide">
            Track Your Royal Order
          </h1>
          <p className="text-xs sm:text-sm text-[#283618]/70 mt-2 font-light">
            Monitor the artisan handcrafting, embroidery, and international DHL Express transit of your bespoke commission.
          </p>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleTrack} className="bg-white/70 border border-[#DDA15E]/40 p-4 sm:p-6 shadow-sm mb-10">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-2">
            Enter Royal Order ID or Registered Client Email
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. ZR-89241 or your email address"
                className="w-full bg-white border border-[#DDA15E]/50 px-4 py-3 text-xs sm:text-sm text-[#283618] uppercase tracking-wider focus:outline-none focus:border-[#606C38]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] px-6 sm:px-8 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
            >
              <Search className="w-4 h-4 text-[#DDA15E]" />
              <span>Track</span>
            </button>
          </div>
          <p className="text-[11px] text-[#283618]/60 mt-2">
            Try sample order ID: <button type="button" onClick={() => { setQuery('ZR-89241'); dispatch(trackOrderById({ query: 'ZR-89241' })); }} className="text-[#606C38] font-bold underline">ZR-89241</button>
          </p>
        </form>

        {/* Error Notice */}
        {trackingError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 mb-8">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{trackingError}</span>
          </div>
        )}

        {/* Tracked Order Details Card */}
        {currentTrackedOrder && (
          <div className="bg-white/80 border border-[#DDA15E]/40 shadow-md p-6 sm:p-8 space-y-8 animate-fade-in">
            {/* Order Header Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DDA15E]/30 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#606C38] font-bold block">
                  Royal Commission Reference
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#283618]">
                  Order #{currentTrackedOrder.orderId}
                </h2>
                <span className="text-xs text-[#283618]/70 block mt-0.5">
                  Waybill #{currentTrackedOrder.trackingNumber} • Carrier: {currentTrackedOrder.carrier}
                </span>
              </div>

              <div className="sm:text-right">
                <span className="inline-block bg-[#606C38]/15 text-[#606C38] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#606C38]/30">
                  {currentTrackedOrder.paymentStatus}
                </span>
                <span className="text-xs text-[#283618]/70 block mt-1">
                  Est. Delivery: <b>{currentTrackedOrder.estimatedDelivery}</b>
                </span>
              </div>
            </div>

            {/* Visual Milestones Progress */}
            <div>
              <h3 className="font-heading text-lg font-semibold text-[#283618] mb-6">
                Artisan Journey & Fulfillment Timeline
              </h3>
              <div className="space-y-6">
                {currentTrackedOrder.milestones.map((ms, idx) => (
                  <div key={idx} className="flex items-start gap-4 relative">
                    {/* Circle icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        ms.done
                          ? 'bg-[#606C38] text-[#FEFAE0]'
                          : 'bg-[#FEFAE0] border-2 border-[#DDA15E] text-[#283618]/40'
                      }`}
                    >
                      {ms.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    {/* Connecting line */}
                    {idx < currentTrackedOrder.milestones.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-7 w-0.5 h-8 -ml-[1px] ${
                          ms.done ? 'bg-[#606C38]' : 'bg-[#DDA15E]/40'
                        }`}
                      />
                    )}

                    {/* Milestone Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider ${
                            ms.done ? 'text-[#283618]' : 'text-[#283618]/50'
                          }`}
                        >
                          {ms.title}
                        </span>
                        <span className="text-[11px] text-[#606C38] font-mono">
                          {ms.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Breakdown with Custom Details */}
            <div className="border-t border-[#DDA15E]/30 pt-6">
              <h3 className="font-heading text-lg font-semibold text-[#283618] mb-4">
                Commissioned Items & Personalization Specs
              </h3>
              <div className="divide-y divide-[#DDA15E]/20">
                {currentTrackedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex gap-4 text-xs">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover border border-[#DDA15E]/30 shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-heading text-base font-semibold text-[#283618]">
                        {item.title}
                      </h4>
                      <p className="text-[#283618]/70 mt-0.5">
                        Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                      </p>
                      {item.embroideryStyle && (
                        <p className="text-[#606C38] font-medium mt-0.5">
                          Needlework: {item.embroideryStyle}
                        </p>
                      )}
                      {item.customMonogram && (
                        <p className="text-[#BC6C25] font-semibold mt-0.5">
                          Gold Monogram: "{item.customMonogram}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Address & Concierge support */}
            <div className="border-t border-[#DDA15E]/30 pt-6 flex flex-col sm:flex-row justify-between text-xs text-[#283618]/80 gap-6">
              <div>
                <span className="font-semibold uppercase tracking-wider text-[#283618] block mb-1">
                  Destination Address
                </span>
                <p>
                  {currentTrackedOrder.customer.firstName} {currentTrackedOrder.customer.lastName}
                </p>
                <p>{currentTrackedOrder.customer.address}</p>
                <p>
                  {currentTrackedOrder.customer.city}, {currentTrackedOrder.customer.stateOrProvince} {currentTrackedOrder.customer.postalCode}
                </p>
                <p className="font-bold text-[#606C38] mt-1">
                  {currentTrackedOrder.customer.country}
                </p>
              </div>

              <div className="sm:text-right">
                <span className="font-semibold uppercase tracking-wider text-[#283618] block mb-1">
                  VIP Atelier Concierge
                </span>
                <p className="text-[#283618]/70">
                  Questions regarding your delivery or bespoke alterations?
                </p>
                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-[#606C38] font-bold hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact WhatsApp VIP Concierge</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
