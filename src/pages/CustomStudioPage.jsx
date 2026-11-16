import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Check,
  ShoppingBag,
  Upload,
  ArrowRight,
  ArrowLeft,
  Info,
  ShieldCheck,
  Palette,
  Layers,
  Scissors,
  Bookmark,
} from 'lucide-react';
import { addToCart } from '../store/cartSlice';
import { formatCurrency } from '../store/currencySlice';

const FOOTWEAR_COLORS = [
  { name: 'Olive Leaf', hex: '#606C38', desc: 'Signature Atelier Olive Green' },
  { name: 'Black Forest', hex: '#283618', desc: 'Deep Royal Imperial Green' },
  { name: 'Cornsilk Cream', hex: '#FEFAE0', desc: 'Warm Ivory Champagne' },
  { name: 'Sunlit Clay', hex: '#DDA15E', desc: 'Warm Earth & Ochre Gold' },
  { name: 'Copperwood', hex: '#BC6C25', desc: 'Burnished Bronze Terracotta' },
];

const FOOTWEAR_MATERIALS = [
  {
    id: 'velvet',
    name: 'Imperial Silk Velvet',
    desc: 'Dense, soft pile with deep light-absorbing luster. Ideal for heavy zardozi.',
    priceOffset: 0,
    previewImg: '/images/khussa/khussa_olive_embroidered.jpg',
  },
  {
    id: 'calfskin',
    name: 'Italian-Buffed Calfskin Leather',
    desc: 'Buttery full-grain aniline leather that patinates with elegance.',
    priceOffset: 2500,
    previewImg: '/images/khussa/khussa_forest_green.jpg',
  },
  {
    id: 'rawsilk',
    name: 'Pure Banarasi Raw Silk',
    desc: 'Textured natural slub silk with antique golden sheen.',
    priceOffset: 1200,
    previewImg: '/images/khussa/khussa_cream_gold.jpg',
  },
  {
    id: 'suede',
    name: 'Saddle Suede Leather',
    desc: 'Supple matte suede, ideal for heritage Shabri & Saraiki sandals.',
    priceOffset: 1800,
    previewImg: '/images/shabri/shabri_olive_stitched.jpg',
  },
];

const FOOTWEAR_EMBROIDERY = [
  {
    id: 'dabka',
    name: 'Mughal Dabka & Zardozi',
    desc: 'Hand-coiled antique gold spring wire stitched in high-relief floral patterns.',
    priceOffset: 3000,
  },
  {
    id: 'tilla',
    name: 'Antique Gold Tilla Filigree',
    desc: 'Fine metallic cord embroidery with delicate scalloped outlines.',
    priceOffset: 2000,
  },
  {
    id: 'cutdana',
    name: 'Royal Bridal Cutdana & Seed Pearls',
    desc: 'Glistening Japanese crystal bugle beads and micro Basra-style pearls.',
    priceOffset: 4500,
  },
  {
    id: 'minimal',
    name: 'Architectural Geometric Jali',
    desc: 'Understated geometric openwork thread embroidery for modern formal wear.',
    priceOffset: 1000,
  },
];

const FOOTWEAR_PATTERNS = [
  { id: 'mor', name: 'Peacock & Royal Vine (Mor-o-Gul)', desc: 'Imperial court motif symbolizing grace.' },
  { id: 'ambi', name: 'Mughal Paisley (Ambi Kalka)', desc: 'Classic teardrop droplet motif with crown flourish.' },
  { id: 'jali', name: 'Sheesh Mahal Lattice', desc: 'Intricate architectural stone trellis geometry.' },
  { id: 'medallion', name: 'Coronation Star Medallion', desc: 'Central focal rosette on the vamp.' },
];

const FOOTWEAR_SOLES = [
  { id: 'buffalo', name: 'Dual-Layer Vegetable Buffalo Sole', desc: 'Natural leather with traditional slip-resistant scoring.' },
  { id: 'arch', name: 'Ergonomic Memory Arch Cushion Sole', desc: 'Triple-padded goatskin interior for 12+ hour wedding poise.' },
  { id: 'flared', name: 'Saraiki Flared Extended Wing Sole', desc: 'Iconic wide-welted hand-stitched protective edge.' },
];

const SIZES_FOOTWEAR = [
  'EU 36 / UK 3', 'EU 37 / UK 4', 'EU 38 / UK 5', 'EU 39 / UK 6',
  'EU 40 / UK 7', 'EU 41 / UK 8', 'EU 42 / UK 9', 'EU 43 / UK 10',
  'EU 44 / UK 11', 'EU 45 / UK 12'
];

// Shawl Options
const SHAWL_FABRICS = [
  { id: 'pashmina', name: 'Pure Kashmiri Pashmina Silk', desc: 'Ultra-fine natural warmth with featherlight drape.', priceOffset: 5000 },
  { id: 'velvet', name: 'Royal Micro-Silk Velvet', desc: 'Heavyweight ceremonial velvet with rich drape.', priceOffset: 0 },
  { id: 'tissue', name: 'Organza Tissue Brocade', desc: 'Sheer translucent gold shimmer for summer celebrations.', priceOffset: -2000 },
];

const SHAWL_BORDERS = [
  { id: 'border4', name: '4-Inch Scalloped Zardozi Border', desc: 'Dense metallic coilwork on all four perimeters.', priceOffset: 4000 },
  { id: 'jaal', name: 'All-Over Royal Jaal Lattice', desc: 'Continuous floral trellis running through the entire shawl field.', priceOffset: 8500 },
  { id: 'corners', name: 'Imperial Kalgi Corner Medallions', desc: 'Subtle border with oversized royal crests on 4 corners.', priceOffset: 2500 },
];

const SHAWL_SIZES = [
  'Royal Standard (2.75m x 1.25m)',
  'Grand Imperial (3.0m x 1.4m)',
  'Petite Wedding Stole (2.25m x 1.0m)',
];

export default function CustomStudioPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { regionData } = useSelector((state) => state.currency);

  const [activeTab, setActiveTab] = useState('footwear'); // 'footwear' | 'shawl'
  const [step, setStep] = useState(1); // 1: Silhouette & Material, 2: Palette & Style, 3: Personalization & Specs

  // Footwear custom state
  const [fwSize, setFwSize] = useState('EU 40 / UK 7');
  const [fwColor, setFwColor] = useState(FOOTWEAR_COLORS[0]);
  const [fwMaterial, setFwMaterial] = useState(FOOTWEAR_MATERIALS[0]);
  const [fwEmbroidery, setFwEmbroidery] = useState(FOOTWEAR_EMBROIDERY[0]);
  const [fwPattern, setFwPattern] = useState(FOOTWEAR_PATTERNS[0]);
  const [fwSole, setFwSole] = useState(FOOTWEAR_SOLES[0]);
  const [fwMonogram, setFwMonogram] = useState('');
  const [fwNotes, setFwNotes] = useState('');
  const [fwImageFileName, setFwImageFileName] = useState('');

  // Shawl custom state
  const [shFabric, setShFabric] = useState(SHAWL_FABRICS[1]);
  const [shColor, setShColor] = useState(FOOTWEAR_COLORS[1]);
  const [shBorder, setShBorder] = useState(SHAWL_BORDERS[0]);
  const [shSize, setShSize] = useState(SHAWL_SIZES[0]);
  const [shMonogram, setShMonogram] = useState('');
  const [shNotes, setShNotes] = useState('');
  const [shImageFileName, setShImageFileName] = useState('');

  // Price calculations
  const fwBasePKR = 17500;
  const fwTotalPKR =
    fwBasePKR +
    fwMaterial.priceOffset +
    fwEmbroidery.priceOffset +
    (fwMonogram.trim() ? 1500 : 0);

  const shBasePKR = 36000;
  const shTotalPKR =
    shBasePKR +
    shFabric.priceOffset +
    shBorder.priceOffset +
    (shMonogram.trim() ? 2000 : 0);

  const currentTotalPKR = activeTab === 'footwear' ? fwTotalPKR : shTotalPKR;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (activeTab === 'footwear') {
        setFwImageFileName(file.name);
      } else {
        setShImageFileName(file.name);
      }
    }
  };

  const handleAddCustomToCart = () => {
    if (activeTab === 'footwear') {
      dispatch(
        addToCart({
          id: `custom-fw-${Date.now()}`,
          title: `Bespoke Handcrafted Khussa (${fwColor.name})`,
          pricePKR: fwTotalPKR,
          image: fwMaterial.previewImg || '/images/khussa/khussa_custom_bridal.jpg',
          size: fwSize,
          color: fwColor.name,
          material: fwMaterial.name,
          embroideryStyle: `${fwEmbroidery.name} • ${fwPattern.name}`,
          sole: fwSole.name,
          customMonogram: fwMonogram.trim() || undefined,
          customNotes: fwNotes.trim() || undefined,
          referenceImage: fwImageFileName || undefined,
          quantity: 1,
        })
      );
    } else {
      dispatch(
        addToCart({
          id: `custom-sh-${Date.now()}`,
          title: `Bespoke Heirloom Wedding Shawl (${shColor.name})`,
          pricePKR: shTotalPKR,
          image: '/images/shawls/shawl_olive_zardozi.jpg',
          size: shSize,
          color: shColor.name,
          material: shFabric.name,
          embroideryStyle: shBorder.name,
          customMonogram: shMonogram.trim() || undefined,
          customNotes: shNotes.trim() || undefined,
          referenceImage: shImageFileName || undefined,
          quantity: 1,
        })
      );
    }
    navigate('/cart');
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#606C38]/15 border border-[#DDA15E]/40 rounded-full text-xs uppercase tracking-[0.25em] font-semibold text-[#606C38] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>Interactive Bespoke Atelier</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#283618] tracking-wide">
            The Custom Design Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#283618]/75 mt-2 font-light max-w-xl mx-auto">
            Design your pair or wedding shawl with complete creative freedom. Every bespoke creation is crafted individually to your specifications.
          </p>

          {/* Tab Switcher: Footwear vs Shawl */}
          <div className="mt-8 inline-flex p-1 bg-white/70 border border-[#DDA15E]/40 shadow-sm">
            <button
              onClick={() => {
                setActiveTab('footwear');
                setStep(1);
              }}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'footwear'
                  ? 'bg-[#606C38] text-[#FEFAE0] shadow-sm'
                  : 'text-[#283618] hover:text-[#606C38]'
              }`}
            >
              Custom Footwear
            </button>
            <button
              onClick={() => {
                setActiveTab('shawl');
                setStep(1);
              }}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'shawl'
                  ? 'bg-[#606C38] text-[#FEFAE0] shadow-sm'
                  : 'text-[#283618] hover:text-[#606C38]'
              }`}
            >
              Custom Wedding Shawl
            </button>
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#283618]/70 relative">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 transition-colors ${
                step >= 1 ? 'text-[#606C38] font-bold' : ''
              }`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[11px]">
                1
              </span>
              <span>Silhouette & Base</span>
            </button>
            <div className="flex-1 h-0.5 bg-[#DDA15E]/30 mx-4" />
            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-1.5 transition-colors ${
                step >= 2 ? 'text-[#606C38] font-bold' : ''
              }`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[11px]">
                2
              </span>
              <span>Needlework & Palette</span>
            </button>
            <div className="flex-1 h-0.5 bg-[#DDA15E]/30 mx-4" />
            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-1.5 transition-colors ${
                step >= 3 ? 'text-[#606C38] font-bold' : ''
              }`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[11px]">
                3
              </span>
              <span>Monogram & Review</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Configurator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (Sticky Preview & Summary) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-[#283618] text-[#FEFAE0] border border-[#DDA15E]/50 p-6 shadow-xl relative overflow-hidden">
              <div className="aspect-square relative bg-black/20 border border-[#DDA15E]/30 overflow-hidden mb-5">
                <img
                  src={
                    activeTab === 'footwear'
                      ? fwMaterial.previewImg || '/images/khussa/khussa_custom_bridal.jpg'
                      : '/images/shawls/shawl_olive_zardozi.jpg'
                  }
                  alt="Custom Preview"
                  className="w-full h-full object-cover transition-all duration-700"
                />

                {/* Color swatch floating badge */}
                <div className="absolute top-3 left-3 bg-[#283618]/90 text-[#FEFAE0] text-[10px] uppercase tracking-wider px-2.5 py-1 flex items-center gap-2 border border-[#DDA15E]/40">
                  <span
                    className="w-3 h-3 rounded-full border border-white"
                    style={{ backgroundColor: activeTab === 'footwear' ? fwColor.hex : shColor.hex }}
                  />
                  <span>{activeTab === 'footwear' ? fwColor.name : shColor.name}</span>
                </div>

                {/* Monogram Live Preview if present */}
                {(activeTab === 'footwear' ? fwMonogram : shMonogram) && (
                  <div className="absolute bottom-3 right-3 bg-[#FEFAE0] text-[#283618] px-3 py-1.5 text-xs font-heading italic shadow-lg border border-[#DDA15E]">
                    Monogram: "{activeTab === 'footwear' ? fwMonogram : shMonogram}"
                  </div>
                )}
              </div>

              {/* Live Spec Summary */}
              <div className="space-y-2 text-xs border-t border-[#606C38]/40 pt-4 text-[#FEFAE0]/80">
                <div className="flex justify-between">
                  <span className="text-[#FEFAE0]/60">Product:</span>
                  <span className="font-semibold text-[#FEFAE0]">
                    {activeTab === 'footwear' ? 'Bespoke Royal Khussa' : 'Heirloom Wedding Shawl'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FEFAE0]/60">Size / Cut:</span>
                  <span className="font-medium">{activeTab === 'footwear' ? fwSize : shSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FEFAE0]/60">Material:</span>
                  <span className="font-medium">
                    {activeTab === 'footwear' ? fwMaterial.name : shFabric.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FEFAE0]/60">Needlework:</span>
                  <span className="font-medium">
                    {activeTab === 'footwear' ? fwEmbroidery.name : shBorder.name}
                  </span>
                </div>
                {activeTab === 'footwear' && (
                  <div className="flex justify-between">
                    <span className="text-[#FEFAE0]/60">Sole Arch:</span>
                    <span className="font-medium">{fwSole.name}</span>
                  </div>
                )}
              </div>

              {/* Price & Lead Time */}
              <div className="mt-5 pt-4 border-t border-[#DDA15E]/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#DDA15E] block">
                    Bespoke Commission Price
                  </span>
                  <span className="font-mono text-xl font-bold text-[#FEFAE0]">
                    {formatCurrency(currentTotalPKR, regionData)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#FEFAE0]/70">
                  <span className="block text-[#DDA15E]">Est. Handcrafting:</span>
                  <span>7–12 Business Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Interactive Selectors per Step) */}
          <div className="lg:col-span-7 bg-white/70 border border-[#DDA15E]/30 p-6 sm:p-8 shadow-sm">
            {/* STEP 1: SILHOUETTE & BASE MATERIAL */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#283618] mb-1">
                    Step 1: Choose Your Base & Sizing
                  </h3>
                  <p className="text-xs text-[#283618]/70">
                    Select your sizing and luxury foundational material.
                  </p>
                </div>

                {/* Sizing */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-3">
                    {activeTab === 'footwear' ? 'Select Footwear Size' : 'Select Shawl Dimensions'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(activeTab === 'footwear' ? SIZES_FOOTWEAR : SHAWL_SIZES).map((sz) => {
                      const isSel = (activeTab === 'footwear' ? fwSize : shSize) === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => (activeTab === 'footwear' ? setFwSize(sz) : setShSize(sz))}
                          className={`p-3 text-xs border text-center transition-all ${
                            isSel
                              ? 'border-[#606C38] bg-[#606C38] text-[#FEFAE0] font-bold shadow-sm'
                              : 'border-[#DDA15E]/40 text-[#283618] hover:border-[#606C38]'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Material Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-3">
                    {activeTab === 'footwear' ? 'Select Upper Material' : 'Select Shawl Fabric'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(activeTab === 'footwear' ? FOOTWEAR_MATERIALS : SHAWL_FABRICS).map((mat) => {
                      const isSel =
                        (activeTab === 'footwear' ? fwMaterial.id : shFabric.id) === mat.id;
                      return (
                        <button
                          key={mat.id}
                          type="button"
                          onClick={() =>
                            activeTab === 'footwear' ? setFwMaterial(mat) : setShFabric(mat)
                          }
                          className={`p-4 border text-left transition-all ${
                            isSel
                              ? 'border-[#606C38] bg-[#606C38]/10 ring-1 ring-[#606C38]'
                              : 'border-[#DDA15E]/30 bg-white/40 hover:border-[#606C38]/60'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-heading text-base font-semibold text-[#283618]">
                              {mat.name}
                            </span>
                            {isSel && <Check className="w-4 h-4 text-[#606C38]" />}
                          </div>
                          <p className="text-xs text-[#283618]/70 leading-relaxed font-light">
                            {mat.desc}
                          </p>
                          {mat.priceOffset !== 0 && (
                            <span className="text-[11px] font-mono text-[#606C38] font-semibold mt-2 inline-block">
                              {mat.priceOffset > 0 ? '+' : ''}
                              {formatCurrency(mat.priceOffset, regionData)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footwear Sole option */}
                {activeTab === 'footwear' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-3">
                      Select Sole Construction & Arch Comfort
                    </label>
                    <div className="space-y-2.5">
                      {FOOTWEAR_SOLES.map((sol) => {
                        const isSel = fwSole.id === sol.id;
                        return (
                          <button
                            key={sol.id}
                            type="button"
                            onClick={() => setFwSole(sol)}
                            className={`w-full p-3.5 border text-left transition-all flex items-start justify-between ${
                              isSel
                                ? 'border-[#606C38] bg-[#606C38]/10'
                                : 'border-[#DDA15E]/30 bg-white/40 hover:border-[#606C38]/50'
                            }`}
                          >
                            <div>
                              <span className="font-medium text-xs text-[#283618] block">
                                {sol.name}
                              </span>
                              <span className="text-[11px] text-[#283618]/70 block mt-0.5">
                                {sol.desc}
                              </span>
                            </div>
                            {isSel && <Check className="w-4 h-4 text-[#606C38] shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step Navigation */}
                <div className="pt-6 border-t border-[#DDA15E]/30 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] text-xs font-bold uppercase tracking-widest px-8 py-3.5 flex items-center gap-2 transition-colors shadow-md"
                  >
                    <span>Proceed to Needlework & Palette</span>
                    <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PALETTE & NEEDLEWORK STYLE */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#283618] mb-1">
                    Step 2: Brand Color Palette & Royal Needlework
                  </h3>
                  <p className="text-xs text-[#283618]/70">
                    Select from our official Pakistani royal color palette and master zardozi embroidery styles.
                  </p>
                </div>

                {/* Official Brand Color Swatches */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-3">
                    Official Brand Color Selection
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {FOOTWEAR_COLORS.map((c) => {
                      const isSel =
                        (activeTab === 'footwear' ? fwColor.name : shColor.name) === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() =>
                            activeTab === 'footwear' ? setFwColor(c) : setShColor(c)
                          }
                          className={`p-3 border text-left flex items-center gap-3 transition-all ${
                            isSel
                              ? 'border-[#283618] bg-white shadow-sm ring-1 ring-[#283618]'
                              : 'border-[#DDA15E]/30 bg-white/40 hover:border-[#606C38]'
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full shrink-0 border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-[#283618] block truncate">
                              {c.name}
                            </span>
                            <span className="text-[10px] text-[#283618]/60 block truncate">
                              {c.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Embroidery Style Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-3">
                    {activeTab === 'footwear' ? 'Select Zardozi Embroidery Style' : 'Select Border Embroidery Design'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(activeTab === 'footwear' ? FOOTWEAR_EMBROIDERY : SHAWL_BORDERS).map((emb) => {
                      const isSel =
                        (activeTab === 'footwear' ? fwEmbroidery.id : shBorder.id) === emb.id;
                      return (
                        <button
                          key={emb.id}
                          type="button"
                          onClick={() =>
                            activeTab === 'footwear' ? setFwEmbroidery(emb) : setShBorder(emb)
                          }
                          className={`p-4 border text-left transition-all ${
                            isSel
                              ? 'border-[#606C38] bg-[#606C38]/10 ring-1 ring-[#606C38]'
                              : 'border-[#DDA15E]/30 bg-white/40 hover:border-[#606C38]/50'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-heading text-base font-semibold text-[#283618]">
                              {emb.name}
                            </span>
                            {isSel && <Check className="w-4 h-4 text-[#606C38]" />}
                          </div>
                          <p className="text-xs text-[#283618]/70 leading-relaxed font-light">
                            {emb.desc}
                          </p>
                          <span className="text-[11px] font-mono text-[#606C38] font-semibold mt-2 inline-block">
                            +{formatCurrency(emb.priceOffset, regionData)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pattern selection for footwear */}
                {activeTab === 'footwear' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-3">
                      Select Decorative Motif Pattern
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {FOOTWEAR_PATTERNS.map((pat) => {
                        const isSel = fwPattern.id === pat.id;
                        return (
                          <button
                            key={pat.id}
                            type="button"
                            onClick={() => setFwPattern(pat)}
                            className={`p-3 border text-left transition-all ${
                              isSel
                                ? 'border-[#606C38] bg-[#606C38]/10'
                                : 'border-[#DDA15E]/30 bg-white/40 hover:border-[#606C38]/40'
                            }`}
                          >
                            <span className="font-medium text-xs text-[#283618] block">
                              {pat.name}
                            </span>
                            <span className="text-[11px] text-[#283618]/65 block mt-0.5">
                              {pat.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step Navigation */}
                <div className="pt-6 border-t border-[#DDA15E]/30 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-[#DDA15E]/50 text-[#283618] text-xs font-semibold uppercase tracking-widest px-6 py-3 flex items-center gap-2 hover:bg-black/5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] text-xs font-bold uppercase tracking-widest px-8 py-3.5 flex items-center gap-2 transition-colors shadow-md"
                  >
                    <span>Proceed to Monogram & Review</span>
                    <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MONOGRAM & REFERENCE UPLOAD */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#283618] mb-1">
                    Step 3: Personalization, Monogram & Review
                  </h3>
                  <p className="text-xs text-[#283618]/70">
                    Add heirloom wedding dates, initials, upload your bridal outfit swatch, and commission your piece.
                  </p>
                </div>

                {/* Monogram Input */}
                <div className="bg-white/60 p-4 border border-[#DDA15E]/40">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    Gold-Stitched Monogram / Initials (+{formatCurrency(activeTab === 'footwear' ? 1500 : 2000, regionData)})
                  </label>
                  <p className="text-[11px] text-[#283618]/60 mb-2">
                    E.g., "Z & A", "H.T 2026", or your wedding date. Stitched inside the arch lining or corner medallion.
                  </p>
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="Enter initials or date (Optional)"
                    value={activeTab === 'footwear' ? fwMonogram : shMonogram}
                    onChange={(e) =>
                      activeTab === 'footwear'
                        ? setFwMonogram(e.target.value)
                        : setShMonogram(e.target.value)
                    }
                    className="w-full bg-white border border-[#DDA15E]/50 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>

                {/* Reference Image Upload */}
                <div className="bg-white/60 p-4 border border-[#DDA15E]/40">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    Upload Reference Image or Bridal Swatch (Optional)
                  </label>
                  <p className="text-[11px] text-[#283618]/60 mb-3">
                    Upload your wedding lehenga, sherwani, or specific embroidery reference. Our karigars will inspect it prior to crafting.
                  </p>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#DDA15E]/60 bg-white/40 hover:bg-white cursor-pointer transition-colors">
                    <Upload className="w-6 h-6 text-[#606C38] mb-2" />
                    <span className="text-xs font-semibold text-[#283618]">
                      {(activeTab === 'footwear' ? fwImageFileName : shImageFileName) ||
                        'Click to upload photo swatch (PNG, JPG, max 10MB)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Custom Design Notes */}
                <div className="bg-white/60 p-4 border border-[#DDA15E]/40">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283618] mb-1">
                    Special Atelier Instructions / Custom Requests
                  </label>
                  <p className="text-[11px] text-[#283618]/60 mb-2">
                    Mention wider toe box, special heel height preference, or specific color matching notes.
                  </p>
                  <textarea
                    rows={3}
                    placeholder="Provide any additional tailoring requirements..."
                    value={activeTab === 'footwear' ? fwNotes : shNotes}
                    onChange={(e) =>
                      activeTab === 'footwear'
                        ? setFwNotes(e.target.value)
                        : setShNotes(e.target.value)
                    }
                    className="w-full bg-white border border-[#DDA15E]/50 p-2.5 text-xs text-[#283618] focus:outline-none focus:border-[#606C38]"
                  />
                </div>

                {/* Final Review & Add To Bag */}
                <div className="pt-6 border-t border-[#DDA15E]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="border border-[#DDA15E]/50 text-[#283618] text-xs font-semibold uppercase tracking-widest px-6 py-3 flex items-center gap-2 hover:bg-black/5 transition-colors w-full sm:w-auto justify-center"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleAddCustomToCart}
                    className="bg-[#606C38] hover:bg-[#283618] text-[#FEFAE0] text-xs font-bold uppercase tracking-widest px-8 py-4 flex items-center gap-3 transition-colors shadow-lg w-full sm:w-auto justify-center"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#DDA15E]" />
                    <span>Add Customized Piece to Royal Bag</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
