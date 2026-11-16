import { createSlice } from '@reduxjs/toolkit';

const initialFootwearCustom = {
  type: 'footwear',
  productName: 'Royal Custom Khussa',
  basePricePKR: 16500,
  size: 'EU 40 / UK 7 / US 8',
  color: 'Olive Leaf (#606C38)',
  colorHex: '#606C38',
  material: 'Royal Silk Velvet',
  embroideryStyle: 'Mughal Dabka & Zardozi',
  pattern: 'Peacock & Royal Vine (Mor-o-Gul)',
  sole: 'Dual-Layer Vegetable Tanned Buffalo Leather',
  customMonogram: '',
  notes: '',
  referenceImage: null,
};

const initialShawlCustom = {
  type: 'shawl',
  productName: 'Heirloom Custom Wedding Shawl',
  basePricePKR: 32000,
  fabric: 'Pure Kashmiri Pashmina Wool',
  color: 'Deep Forest Green (#283618)',
  colorHex: '#283618',
  embroideryStyle: 'Antique Gold Tilla Filigree Border',
  borderDesign: 'Royal Floral Jaal with Scalloped Edge',
  dimensions: 'Standard Royal (2.75m x 1.25m)',
  customMonogram: '',
  notes: '',
  referenceImage: null,
};

const customizationSlice = createSlice({
  name: 'customization',
  initialState: {
    activeCategory: 'footwear', // 'footwear' | 'shawl'
    footwear: initialFootwearCustom,
    shawl: initialShawlCustom,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    updateFootwearCustom: (state, action) => {
      state.footwear = { ...state.footwear, ...action.payload };
    },
    updateShawlCustom: (state, action) => {
      state.shawl = { ...state.shawl, ...action.payload };
    },
    resetCustomization: (state, action) => {
      if (action.payload === 'footwear') {
        state.footwear = initialFootwearCustom;
      } else if (action.payload === 'shawl') {
        state.shawl = initialShawlCustom;
      } else {
        state.footwear = initialFootwearCustom;
        state.shawl = initialShawlCustom;
      }
    },
  },
});

export const {
  setActiveCategory,
  updateFootwearCustom,
  updateShawlCustom,
  resetCustomization,
} = customizationSlice.actions;

export default customizationSlice.reducer;
