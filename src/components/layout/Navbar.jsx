import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  User,
  Compass,
} from 'lucide-react';

export default function Navbar({ onOpenSearch, onOpenCart, onOpenCurrencyModal }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { regionData } = useSelector((state) => state.currency);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Khussa', path: '/collection/khussa' },
    { name: 'Shabri Chappal', path: '/collection/shabri' },
    { name: 'Saraiki Chappal', path: '/collection/saraiki' },
    { name: 'Wedding Shawls', path: '/collection/wedding-shawls' },
    { name: 'Custom Studio', path: '/custom-studio', highlight: true },
    { name: 'Our Story', path: '/our-heritage' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FEFAE0]/95 backdrop-blur-md shadow-md py-2 sm:py-2.5 border-b border-[#DDA15E]/30'
          : 'bg-[#FEFAE0] py-3 sm:py-4 border-b border-[#DDA15E]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Header Row: Mobile Menu Toggle, Brand Logo, Utilities */}
        <div className="flex items-center justify-between gap-2">
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#283618] p-2 -ml-1 rounded-md hover:bg-[#606C38]/10 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left spacer for desktop symmetry */}
          <div className="hidden lg:flex items-center space-x-4 text-xs font-medium tracking-wider text-[#283618]/80">
            <Link
              to="/custom-studio"
              className="inline-flex items-center gap-1.5 text-[#606C38] hover:text-[#283618] uppercase tracking-widest text-[11px] font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>Bespoke Atelier</span>
            </Link>
            <span className="text-[#DDA15E]">|</span>
            <Link to="/order-tracking" className="hover:text-[#606C38] transition-colors">
              Track Royal Order
            </Link>
          </div>

          {/* Center Brand Identity */}
          <div className="text-center flex-1 lg:flex-none px-1">
            <Link to="/" className="inline-block group">
              <h1 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#283618] group-hover:text-[#606C38] transition-colors whitespace-nowrap">
                ZAR-E-RIWAAYAT
              </h1>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] font-sans font-light tracking-[0.24em] sm:tracking-[0.35em] uppercase text-[#BC6C25] -mt-0.5 sm:-mt-1 group-hover:text-[#DDA15E] transition-colors">
                Crafted for Your Royal Moments.
              </p>
            </Link>
          </div>

          {/* Right Action Icons: Search, Wishlist, Account, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-5 text-[#283618]">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 sm:p-2 hover:text-[#606C38] transition-colors"
              title="Search Collection"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Customer Account */}
            <Link
              to="/account"
              className="p-1.5 sm:p-2 hover:text-[#606C38] transition-colors hidden sm:block"
              title="Royal Customer Account"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/account"
              className="p-1.5 sm:p-2 hover:text-[#606C38] transition-colors relative"
              title="Royal Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 bg-[#BC6C25] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-1.5 sm:p-2 hover:text-[#606C38] transition-colors relative flex items-center gap-1.5"
              title="View Shopping Bag"
              aria-label="View Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-[#606C38] text-[#FEFAE0] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalCartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Primary Navigation Bar (Preserved pristine for laptops) */}
        <nav className="hidden lg:block mt-3 border-t border-[#DDA15E]/20 pt-2">
          <ul className="flex items-center justify-center space-x-7 xl:space-x-8 text-xs font-medium uppercase tracking-[0.16em]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`transition-colors py-1 relative ${
                      isActive
                        ? 'text-[#606C38] font-bold border-b-2 border-[#606C38]'
                        : link.highlight
                        ? 'text-[#BC6C25] font-semibold hover:text-[#606C38]'
                        : 'text-[#283618]/85 hover:text-[#606C38]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#FEFAE0] w-[85%] sm:w-80 max-w-sm h-full shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#DDA15E]/30 mb-5">
                <div>
                  <span className="font-heading text-xl font-bold tracking-widest text-[#283618] block">
                    ZAR-E-RIWAAYAT
                  </span>
                  <p className="text-[9px] uppercase tracking-wider text-[#BC6C25]">
                    Crafted for Your Royal Moments
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#283618] hover:bg-[#606C38]/10 rounded"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation items */}
              <ul className="space-y-3 sm:space-y-3.5 text-sm font-medium tracking-wider uppercase">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 px-2.5 rounded transition-colors ${
                          isActive
                            ? 'bg-[#606C38]/15 text-[#606C38] font-bold'
                            : link.highlight
                            ? 'text-[#BC6C25] font-bold flex items-center justify-between'
                            : 'text-[#283618] hover:bg-[#606C38]/10'
                        }`}
                      >
                        <span>{link.name}</span>
                        {link.highlight && (
                          <span className="text-[10px] bg-[#606C38] text-white px-2 py-0.5 rounded uppercase">
                            Bespoke
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-2 border-t border-[#DDA15E]/20">
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-2.5 rounded text-[#283618] hover:bg-[#606C38]/10"
                  >
                    My Royal Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/order-tracking"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-2.5 rounded text-[#283618] hover:bg-[#606C38]/10"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mobile Footer with Currency Switcher */}
            <div className="pt-5 border-t border-[#DDA15E]/30 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCurrencyModal();
                }}
                className="w-full flex items-center justify-between py-2.5 px-3 border border-[#606C38]/40 bg-[#606C38]/10 text-xs text-[#283618] rounded"
              >
                <div className="flex items-center space-x-2">
                  <span>{regionData.flag}</span>
                  <span className="font-semibold">{regionData.country}</span>
                  <span className="text-[#606C38]">({regionData.currency})</span>
                </div>
                <ChevronDown className="w-4 h-4 text-[#606C38]" />
              </button>
              <div className="text-[10px] text-center text-[#283618]/60 uppercase tracking-widest">
                DHL Express Worldwide Delivery
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
