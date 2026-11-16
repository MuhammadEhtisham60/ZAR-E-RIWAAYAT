import { createSlice } from '@reduxjs/toolkit';

export const REGIONS = {
  PK: {
    code: 'PK',
    country: 'Pakistan',
    currency: 'PKR',
    symbol: 'Rs. ',
    rate: 1,
    flag: '🇵🇰',
    phonePrefix: '+92',
    defaultCity: 'Lahore',
    expressShipping: 450,
    freeShippingThreshold: 12000,
    estimatedDays: '2–4 Business Days (TCS Express)',
    codAvailable: true,
  },
  UK: {
    code: 'UK',
    country: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    rate: 0.0028,
    flag: '🇬🇧',
    phonePrefix: '+44',
    defaultCity: 'London',
    expressShipping: 18,
    freeShippingThreshold: 150,
    estimatedDays: '3–5 Business Days (DHL Express)',
    codAvailable: false,
  },
  US: {
    code: 'US',
    country: 'United States',
    currency: 'USD',
    symbol: '$',
    rate: 0.0036,
    flag: '🇺🇸',
    phonePrefix: '+1',
    defaultCity: 'New York',
    expressShipping: 24,
    freeShippingThreshold: 200,
    estimatedDays: '3–6 Business Days (DHL Express)',
    codAvailable: false,
  },
  AE: {
    code: 'AE',
    country: 'United Arab Emirates',
    currency: 'AED',
    symbol: 'AED ',
    rate: 0.0132,
    flag: '🇦🇪',
    phonePrefix: '+971',
    defaultCity: 'Dubai',
    expressShipping: 50,
    freeShippingThreshold: 450,
    estimatedDays: '2–4 Business Days (DHL Express)',
    codAvailable: false,
  },
};

const savedRegion = localStorage.getItem('zr_region');
const initialRegion = (savedRegion && REGIONS[savedRegion]) ? savedRegion : 'PK';

const initialState = {
  currentRegion: initialRegion,
  regionData: REGIONS[initialRegion],
  allRegions: REGIONS,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      const code = action.payload;
      if (REGIONS[code]) {
        state.currentRegion = code;
        state.regionData = REGIONS[code];
        try {
          localStorage.setItem('zr_region', code);
        } catch (e) {
          // localStorage fallback
        }
      }
    },
  },
});

export const { setRegion } = currencySlice.actions;

// Helper to convert and format prices
export const formatCurrency = (pkrAmount, regionData) => {
  if (!regionData) return `Rs. ${pkrAmount.toLocaleString()}`;
  const converted = Math.round(pkrAmount * regionData.rate);
  if (regionData.currency === 'PKR') {
    return `Rs. ${pkrAmount.toLocaleString()}`;
  }
  return `${regionData.symbol}${converted.toLocaleString()}`;
};

export default currencySlice.reducer;
