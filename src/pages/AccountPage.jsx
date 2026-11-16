import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { formatCurrency } from '../store/currencySlice';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Clock,
  Sparkles,
  Trash2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function AccountPage() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'profile'

  const orders = useSelector((state) => state.orders.orders);
  const wishlist = useSelector((state) => state.wishlist.items);
  const { regionData } = useSelector((state) => state.currency);

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Welcome Banner */}
        <div className="bg-[#283618] text-[#FEFAE0] border border-[#DDA15E]/40 p-6 sm:p-8 mb-10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-[#606C38] border border-[#DDA15E] flex items-center justify-center font-heading text-2xl font-bold text-[#FEFAE0]">
              ZR
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-semibold block">
                ZAR-E-RIWAAYAT Royal Patron
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#FEFAE0]">
                Her Royal Patron Portal
              </h1>
              <p className="text-xs text-[#FEFAE0]/70 mt-0.5">
                Client ID: ZR-VIP-88194 • Region: {regionData.country} ({regionData.currency})
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#606C38]/40 border border-[#DDA15E]/40 px-3.5 py-1.5 text-xs text-[#DDA15E]">
            <Sparkles className="w-4 h-4" />
            <span>Royal Trousseau Privilege Tier</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#DDA15E]/30 mb-8 space-x-6 text-xs uppercase tracking-widest font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#606C38] text-[#606C38]'
                : 'text-[#283618]/60 hover:text-[#283618]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'border-b-2 border-[#606C38] text-[#606C38]'
                : 'text-[#283618]/60 hover:text-[#283618]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Curated Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-b-2 border-[#606C38] text-[#606C38]'
                : 'text-[#283618]/60 hover:text-[#283618]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Royal Addresses & Profile</span>
          </button>
        </div>

        {/* TAB 1: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white/50 border border-[#DDA15E]/30 p-8">
                <p className="font-heading text-xl text-[#283618] mb-2">No past royal orders</p>
                <Link
                  to="/shop"
                  className="inline-block mt-4 bg-[#606C38] text-[#FEFAE0] text-xs font-semibold uppercase tracking-widest px-6 py-2.5"
                >
                  Explore Collections
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white/70 border border-[#DDA15E]/40 p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DDA15E]/20 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-xl font-bold text-[#283618]">
                          Order #{order.orderId}
                        </span>
                        <span className="bg-[#606C38]/15 text-[#606C38] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          {order.paymentStatus}
                        </span>
                      </div>
                      <span className="text-xs text-[#283618]/60 block mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} Item(s)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-semibold text-[#283618]">
                        {order.totalFormatted}
                      </span>
                      <Link
                        to="/order-tracking"
                        state={{ placedOrderId: order.orderId }}
                        className="bg-[#283618] text-[#FEFAE0] text-xs px-4 py-2 hover:bg-[#606C38] transition-colors uppercase tracking-wider font-semibold"
                      >
                        Track Status →
                      </Link>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="divide-y divide-[#DDA15E]/15">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex gap-4 text-xs">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover border border-[#DDA15E]/30 shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-heading text-sm font-semibold text-[#283618]">
                            {item.title}
                          </h4>
                          <p className="text-[#283618]/70 text-[11px]">
                            Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                          </p>
                          {item.embroideryStyle && (
                            <p className="text-[10px] text-[#606C38]">
                              ★ {item.embroideryStyle}
                            </p>
                          )}
                          {item.customMonogram && (
                            <p className="text-[10px] text-[#BC6C25]">
                              Monogram: "{item.customMonogram}"
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-white/50 border border-[#DDA15E]/30 p-8">
                <Heart className="w-10 h-10 text-[#DDA15E] mx-auto mb-3" />
                <p className="font-heading text-xl text-[#283618] mb-1">Your wishlist is empty</p>
                <p className="text-xs text-[#283618]/60 mb-6">
                  Save pieces you admire while exploring our royal archives.
                </p>
                <Link
                  to="/shop"
                  className="bg-[#606C38] text-[#FEFAE0] text-xs font-semibold uppercase tracking-widest px-6 py-2.5"
                >
                  Explore Collections
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/70 border border-[#DDA15E]/40 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square bg-[#283618]/5 overflow-hidden border border-[#DDA15E]/20 mb-3 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => dispatch(removeFromWishlist(item.id))}
                          className="absolute top-2 right-2 p-1.5 bg-[#FEFAE0] text-[#283618] hover:text-[#BC6C25] rounded-full shadow-xs"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#606C38] font-bold block">
                        {item.subcategory || item.category}
                      </span>
                      <h4 className="font-heading text-base font-semibold text-[#283618] leading-tight">
                        {item.title}
                      </h4>
                      <p className="font-mono text-xs font-semibold text-[#283618] mt-1">
                        {formatCurrency(item.pricePKR, regionData)}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DDA15E]/20 flex gap-2">
                      <button
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: item.id,
                              title: item.title,
                              pricePKR: item.pricePKR,
                              image: item.image,
                              size: item.availableSizes ? item.availableSizes[0] : 'Standard',
                              color: item.colors ? item.colors[0].name : 'Default',
                              material: item.materials ? item.materials[0] : 'Standard',
                              embroideryStyle: 'Original Royal Spec',
                              quantity: 1,
                            })
                          )
                        }
                        className="flex-1 bg-[#606C38] text-[#FEFAE0] py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#283618] transition-colors text-center"
                      >
                        Add to Bag
                      </button>
                      <Link
                        to={`/product/${item.id}`}
                        className="p-2 border border-[#DDA15E]/40 hover:border-[#606C38] text-xs font-semibold flex items-center justify-center text-[#283618]"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROFILE & ADDRESSES */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/70 border border-[#DDA15E]/40 p-6 space-y-4">
              <h3 className="font-heading text-xl font-semibold text-[#283618] border-b border-[#DDA15E]/20 pb-2">
                Primary Residence & Shipping Address
              </h3>
              <div className="text-xs text-[#283618]/80 space-y-1.5 font-light">
                <p className="font-bold text-[#283618] text-sm">Hamza & Ayesha Tariq</p>
                <p>24 Kensington Palace Gardens</p>
                <p>Kensington, London W8 4PX</p>
                <p className="font-medium text-[#606C38]">United Kingdom (Primary Destination)</p>
                <p className="mt-2 text-[#283618]/60">Contact: +44 7700 900123</p>
              </div>
            </div>

            <div className="bg-white/70 border border-[#DDA15E]/40 p-6 space-y-4">
              <h3 className="font-heading text-xl font-semibold text-[#283618] border-b border-[#DDA15E]/20 pb-2">
                Pakistan Family Residence (For Local Delivery)
              </h3>
              <div className="text-xs text-[#283618]/80 space-y-1.5 font-light">
                <p className="font-bold text-[#283618] text-sm">Tariq Family Residence</p>
                <p>18-C/2, M.M. Alam Road, Gulberg III</p>
                <p>Lahore 54000, Punjab</p>
                <p className="font-medium text-[#606C38]">Pakistan (COD Enabled Destination)</p>
                <p className="mt-2 text-[#283618]/60">Contact: +92 300 8441122</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
