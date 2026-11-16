import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCTS } from '../data/products';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { formatCurrency } from '../store/currencySlice';
import ProductCard from '../components/common/ProductCard';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Star,
  ChevronRight,
  Share2,
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const { regionData } = useSelector((state) => state.currency);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(
    product.availableSizes ? product.availableSizes[0] : 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
    if (product.availableSizes) setSelectedSize(product.availableSizes[0]);
    if (product.colors) setSelectedColor(product.colors[0].name);
    window.scrollTo(0, 0);
  }, [product]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        pricePKR: product.pricePKR,
        image: activeImage,
        size: selectedSize,
        color: selectedColor,
        material: product.materials ? product.materials[0] : 'Standard',
        embroideryStyle: 'Original Atelier Spec',
        quantity,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        pricePKR: product.pricePKR,
        image: activeImage,
        size: selectedSize,
        color: selectedColor,
        material: product.materials ? product.materials[0] : 'Standard',
        embroideryStyle: 'Original Atelier Spec',
        quantity,
      })
    );
    navigate('/checkout');
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-[#283618]/60 uppercase tracking-wider mb-8">
          <Link to="/" className="hover:text-[#606C38]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#DDA15E]" />
          <Link to="/shop" className="hover:text-[#606C38]">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#DDA15E]" />
          <span className="text-[#283618] font-semibold truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
              {(product.gallery || [product.image]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 md:w-20 md:h-20 border overflow-hidden transition-all ${
                    activeImage === img
                      ? 'border-[#283618] ring-1 ring-[#283618] shadow-sm'
                      : 'border-[#DDA15E]/40 hover:border-[#606C38]'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 aspect-square bg-[#283618]/5 border border-[#DDA15E]/30 relative overflow-hidden group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#283618] text-[#FEFAE0] text-[10px] uppercase tracking-widest px-3 py-1 font-semibold border border-[#DDA15E]/50">
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details & Purchasing */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#606C38] mb-1.5">
                <span>{product.subcategory || product.category}</span>
                <div className="flex items-center gap-1 text-[#BC6C25]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-[#283618]/50">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#283618] leading-tight mb-2">
                {product.title}
              </h1>

              <p className="text-xs text-[#283618]/70 mb-4 font-light">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="text-2xl font-mono font-semibold text-[#283618] mb-6 pb-4 border-b border-[#DDA15E]/30">
                {formatCurrency(product.pricePKR, regionData)}
                <span className="text-[11px] font-sans font-light text-[#283618]/60 ml-2">
                  (Duties & Taxes Pre-Calculated for {regionData.code})
                </span>
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#283618]">
                      Color: <span className="text-[#606C38] font-normal">{selectedColor}</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2.5">
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

              {/* Size Selector */}
              {product.availableSizes && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#283618]">
                      Select Size
                    </label>
                    <Link
                      to="/faqs"
                      className="text-[11px] text-[#BC6C25] hover:underline"
                    >
                      Fitting & Last Guide
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {product.availableSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs py-2 px-2 border text-center transition-all ${
                          selectedSize === s
                            ? 'border-[#606C38] bg-[#606C38] text-[#FEFAE0] font-bold shadow-xs'
                            : 'border-[#DDA15E]/40 text-[#283618] hover:border-[#606C38] bg-white/40'
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
                <div className="flex items-center border border-[#DDA15E]/50 bg-white/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-semibold hover:bg-black/5"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-semibold hover:bg-black/5"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-[#DDA15E]" />
                        <span>Added to Royal Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#DDA15E]" />
                        <span>Add to Royal Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    className="p-3.5 border border-[#DDA15E]/50 hover:border-[#BC6C25] text-[#283618] transition-colors bg-white/40"
                    title="Add to Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? 'fill-[#BC6C25] text-[#BC6C25]' : ''
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#283618] hover:bg-[#606C38] text-[#FEFAE0] py-3.5 px-6 text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
                >
                  Buy Now With Express Checkout
                </button>
              </div>

              {/* Custom Studio Teaser Banner */}
              <div className="p-4 bg-[#606C38]/10 border border-[#606C38]/30 mb-6 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#BC6C25] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-[#283618] block">
                    Custom Wedding Trousseau Option
                  </span>
                  <span className="text-[#283618]/70 block mt-0.5">
                    Order this design in custom wedding colors, personalized embroidery, or specific arch soles.
                  </span>
                  <Link
                    to="/custom-studio"
                    className="text-[#BC6C25] font-semibold hover:underline inline-block mt-1 uppercase tracking-wider text-[11px]"
                  >
                    Open Custom Design Studio →
                  </Link>
                </div>
              </div>

              {/* Delivery Guarantee Notes */}
              <div className="space-y-2 text-xs text-[#283618]/75 border-t border-[#DDA15E]/20 pt-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#606C38]" />
                  <span>
                    Estimated Delivery to {regionData.country}: <b>{regionData.estimatedDays}</b>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#606C38]" />
                  <span>Delivered in signature velvet-lined heirloom presentation box</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#606C38]" />
                  <span>Complimentary size exchange within 14 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Craftsmanship, Reviews */}
        <div className="mt-16 pt-10 border-t border-[#DDA15E]/30">
          <div className="flex border-b border-[#DDA15E]/30 space-x-8 mb-8 text-xs uppercase tracking-widest font-semibold">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 transition-colors ${
                activeTab === 'details'
                  ? 'border-b-2 border-[#606C38] text-[#606C38]'
                  : 'text-[#283618]/60 hover:text-[#283618]'
              }`}
            >
              Artisan Story & Materials
            </button>
            <button
              onClick={() => setActiveTab('craft')}
              className={`pb-3 transition-colors ${
                activeTab === 'craft'
                  ? 'border-b-2 border-[#606C38] text-[#606C38]'
                  : 'text-[#283618]/60 hover:text-[#283618]'
              }`}
            >
              Sole Construction & Fit
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-[#606C38] text-[#606C38]'
                  : 'text-[#283618]/60 hover:text-[#283618]'
              }`}
            >
              Client Impressions ({product.reviewsCount})
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#283618]/80 leading-relaxed font-light">
              <div>
                <h4 className="font-heading text-lg font-semibold text-[#283618] mb-3">
                  Design Narrative
                </h4>
                <p className="mb-4">{product.description}</p>
                <h5 className="font-semibold uppercase tracking-wider text-[#283618] mb-2">
                  Authentic Materials
                </h5>
                <ul className="list-disc pl-4 space-y-1">
                  {product.materials.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading text-lg font-semibold text-[#283618] mb-3">
                  Karigar Craftsmanship
                </h4>
                <ul className="space-y-2">
                  {product.craftsmanshipDetails.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#DDA15E] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'craft' && (
            <div className="max-w-2xl text-xs text-[#283618]/80 space-y-4 font-light leading-relaxed">
              <h4 className="font-heading text-lg font-semibold text-[#283618]">
                Traditional Pakistani Khussa Sizing Philosophy
              </h4>
              <p>
                Authentic Pakistani royal Khussa footwear is crafted on wooden lasts without initial distinction between left and right foot. When first worn, the footwear should feel gently snug. Within 2 to 3 wearings, the pure vegetable-tanned buffalo sole warms to body temperature and molds to your individual foot contour.
              </p>
              <p>
                For our international patrons in the UK, USA, and UAE, we have integrated a concealed hypoallergenic arch cushion inside the sole to deliver modern orthopedic poise alongside imperial aesthetics.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-2xl">
              <div className="p-4 bg-white/50 border border-[#DDA15E]/30 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#283618]">Lady Eleanor S. (London, UK)</span>
                  <div className="flex text-[#BC6C25]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[#283618]/70 italic">
                  "Exquisite needlework that is truly museum-worthy. Wore these for my brother's wedding celebrations and received endless compliments. The leather softens delightfully."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#DDA15E]/30">
            <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[#283618] mb-8 text-center">
              Coordinating Royal Ensembles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
