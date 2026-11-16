import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/layout/SmoothScroll';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Modals & Drawers
import CurrencySelectorModal from './components/common/CurrencySelectorModal';
import SearchModal from './components/common/SearchModal';
import CartDrawer from './components/common/CartDrawer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CollectionPage from './pages/collections/CollectionPage';
import CustomStudioPage from './pages/CustomStudioPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutHeritagePage from './pages/AboutHeritagePage';
import CraftsmanshipPage from './pages/CraftsmanshipPage';
import ContactPage from './pages/ContactPage';
import FAQsPage from './pages/FAQsPage';
import ShippingDeliveryPage from './pages/ShippingDeliveryPage';
import ReturnsExchangePage from './pages/ReturnsExchangePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import OrderTrackingPage from './pages/OrderTrackingPage';

export default function App() {
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen bg-[#FEFAE0] text-[#283618] selection:bg-[#DDA15E]/30 selection:text-[#283618]">
        {/* Top Announcement Bar */}
        <AnnouncementBar onOpenCurrencyModal={() => setCurrencyModalOpen(true)} />

        {/* Global Navigation Bar */}
        <Navbar
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenCart={() => setCartDrawerOpen(true)}
          onOpenCurrencyModal={() => setCurrencyModalOpen(true)}
        />

        {/* Main Routes Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            
            {/* 6 Individual Collection Pages */}
            <Route path="/collection/khussa" element={<CollectionPage collectionKey="khussa" />} />
            <Route path="/collection/shabri" element={<CollectionPage collectionKey="shabri" />} />
            <Route path="/collection/saraiki" element={<CollectionPage collectionKey="saraiki" />} />
            <Route path="/collection/bridal" element={<CollectionPage collectionKey="bridal" />} />
            <Route path="/collection/mehndi" element={<CollectionPage collectionKey="mehndi" />} />
            <Route path="/collection/wedding-shawls" element={<CollectionPage collectionKey="wedding-shawls" />} />
            
            {/* Custom Studio */}
            <Route path="/custom-studio" element={<CustomStudioPage />} />
            
            {/* Product Details */}
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
            {/* Heritage & Atelier */}
            <Route path="/our-heritage" element={<AboutHeritagePage />} />
            <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Client Services & Policies */}
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/shipping-delivery" element={<ShippingDeliveryPage />} />
            <Route path="/returns-exchange" element={<ReturnsExchangePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            
            {/* Commerce Flow */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/order-tracking" element={<OrderTrackingPage />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer onOpenCurrencyModal={() => setCurrencyModalOpen(true)} />

        {/* Global Modals & Drawers */}
        <CurrencySelectorModal
          isOpen={currencyModalOpen}
          onClose={() => setCurrencyModalOpen(false)}
        />
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />
        <CartDrawer
          isOpen={cartDrawerOpen}
          onClose={() => setCartDrawerOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}
