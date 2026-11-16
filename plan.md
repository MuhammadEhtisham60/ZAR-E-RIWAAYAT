# ZAR-E-RIWAAYAT – Implementation Plan & Architecture
**Brand Tagline: Crafted for Your Royal Moments.**

---

## 1. Executive Vision & Creative Direction
ZAR-E-RIWAAYAT is an international high-luxury Pakistani fashion house specializing in royal handcrafted footwear (Khussa, Shabri Chappals, Saraiki Chappals, Bridal & Groom wedding footwear) and bespoke heirloom wedding shawls. 
The site caters to high-net-worth customers across the United Kingdom, United States, UAE (Dubai), and Pakistan.

The aesthetic blends minimalist high-fashion editorial layouts (inspired by Net-a-Porter, Farfetch, and Hermès) with opulent South Asian craftsmanship:
- **Palette**: Cornsilk surfaces (`#FEFAE0`), deep Black Forest typography & accents (`#283618`), warm Olive Leaf brand highlights (`#606C38`), glowing Sunlit Clay details (`#DDA15E`), and rich Copperwood badges (`#BC6C25`).
- **Typography**: Editorial Cormorant Garamond for regal headings and Manrope for razor-sharp body text, forms, and product metadata.
- **Interactions**: Ultra-smooth scrolling via Lenis, cinematic GSAP & ScrollTrigger reveals, dynamic currency & country switcher (GBP, USD, AED, PKR), comprehensive custom design studio with real-time preview, full cart/checkout/tracking flows.

---

## 2. Design System & CSS Variables
Defined in `src/index.css`:
```css
:root {
  --olive-leaf: #606C38;
  --black-forest: #283618;
  --cornsilk: #FEFAE0;
  --sunlit-clay: #DDA15E;
  --copperwood: #BC6C25;
  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 3. Product Catalog & Image Strategy
Organized under `src/assets/images/`:
- `hero/`: High-resolution cinematic editorial photography
- `khussa/`: Royal bridal, velvet, dabka embroidery, antique gold, olive green, groom khussa
- `shabri/`: Traditional Multani & Bahawalpuri Shabri leather chappals
- `saraiki/`: Hand-stitched Saraiki double-soled genuine leather sandals
- `bridal/`: Exquisite Baraat, Walima, and Mehndi bridal sets
- `shawls/`: Kashmiri tilla embroidery, velvet dabka, organza wedding shawls
- `studio/`: Materials, embroidery swatches, sole options, customization swatches

---

## 4. Redux Toolkit Architecture
- `currencySlice.js`:
  - Active Region: UK (£ GBP), USA ($ USD), UAE (AED د.إ), Pakistan (PKR Rs.)
  - Real-world dynamic exchange rates and shipping formulas
- `cartSlice.js`:
  - Cart items with customization metadata (size, color, material, embroidery style, sole, monogram/custom instructions, reference image)
  - Promo code discounts, gift packaging option, tax and shipping calculations
- `wishlistSlice.js`:
  - Instant wishlist toggling, local storage persistence
- `customizationSlice.js`:
  - Multi-step configurator state with live price calculation and interactive visual mockups
- `orderSlice.js`:
  - Order creation, persistent order history, simulated live order tracking with realistic milestone statuses

---

## 5. Required 22 Website Pages
1. `/` – **Home** (Cinematic hero, brand heritage, collections, bestsellers, custom studio teaser, craftsmanship, editorial gallery, reviews, newsletter)
2. `/shop` – **Shop All** (Complete catalog with multi-facet filters: category, gender, color, material, price range, sorting)
3. `/collection/khussa` – **Khussa Collection**
4. `/collection/shabri` – **Shabri Chappal Collection**
5. `/collection/saraiki` – **Saraiki Chappal Collection**
6. `/collection/bridal` – **Bridal Collection**
7. `/collection/mehndi` – **Mehndi Collection**
8. `/collection/wedding-shawls` – **Wedding Shawls Collection**
9. `/custom-studio` – **Custom Design Studio** (Interactive step-by-step 3D/visual configurator for footwear & shawls)
10. `/product/:id` – **Product Detail Page** (High-res gallery, zoom, size chart, customization trigger, craftsmanship notes, reviews, related products)
11. `/our-heritage` – **About Our Heritage** (Royal Mughal origins, artisan lineage, Pakistani cultural revival)
12. `/craftsmanship` – **Our Craftsmanship** (Hand-cutting, zardozi embroidery, dabka work, vegetable-tanned leather, heirloom finishing)
13. `/contact` – **Contact Us** (Concierge booking, VIP inquiry form, boutique WhatsApp, studio addresses)
14. `/faqs` – **FAQs** (Sizing guide, international delivery, customization lead times, care guide)
15. `/shipping-delivery` – **Shipping & Delivery** (Country-specific DHL Express timelines, customs, free threshold)
16. `/returns-exchange` – **Returns & Exchange Policy** (Bespoke policy, 14-day exchange, international guidelines)
17. `/privacy-policy` – **Privacy Policy** (GDPR compliant international privacy statement)
18. `/terms-conditions` – **Terms & Conditions** (Luxury purchase contract terms)
19. `/cart` – **Shopping Cart** (Full customization breakdown, country tax, gift wrap, promo codes)
20. `/checkout` – **Checkout** (International multi-step checkout: UK/US/UAE/PK forms, payment options, COD in PK)
21. `/account` – **Customer Account** (Profile, address book, royal reward status, past orders)
22. `/order-tracking` – **Order Tracking** (Real-time timeline tracker by Order ID & Email)

---

## 6. Execution Milestones
- **Step 1**: Install core dependencies (React Router, Redux Toolkit, GSAP, Lenis, Lucide, Tailwind CSS)
- **Step 2**: Generate bespoke royal imagery using Gemini AI Image Generation (hero shots, khussa collection, shabri, saraiki, bridal, shawls, craftsmanship textures)
- **Step 3**: Configure styling, Google Fonts (`Cormorant Garamond` + `Manrope`), Tailwind theme variables
- **Step 4**: Build Redux state stores (Cart, Currency/Region, Wishlist, Customization, Orders)
- **Step 5**: Develop core layout components (Announcement Bar, Luxury Header with Currency Selector & Mobile Menu, Footer, Custom Modals)
- **Step 6**: Develop the Interactive Custom Design Studio
- **Step 7**: Build all 22 pages with GSAP micro-animations & smooth Lenis scrolling
- **Step 8**: Thorough end-to-end verification (currency switching, custom product cart integration, responsive layouts across breakpoints)
