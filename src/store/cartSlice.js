import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const raw = localStorage.getItem('zr_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const PROMO_CODES = {
  ROYAL10: { discountPercent: 10, description: 'Royal Welcome 10% Off' },
  RIWAAYAT15: { discountPercent: 15, description: 'VIP Riwaayat 15% Off' },
  BRIDAL20: { discountPercent: 20, description: 'Royal Bridal Trousseau 20% Off' },
};

const initialState = {
  items: loadCart(),
  promoCode: null,
  discountPercent: 0,
  promoMessage: '',
  isGiftWrapped: false,
  giftWrapPricePKR: 1500,
};

const saveCart = (items) => {
  try {
    localStorage.setItem('zr_cart', JSON.stringify(items));
  } catch (e) {}
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      // Match by id AND unique customization specs
      const customKey = `${newItem.id}_${newItem.size || 'std'}_${newItem.color || 'def'}_${newItem.material || 'std'}_${newItem.embroideryStyle || 'none'}`;
      const existingIndex = state.items.findIndex(
        (item) => item.customKey === customKey
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          ...newItem,
          customKey,
          quantity: newItem.quantity || 1,
        });
      }
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { customKey, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.customKey !== customKey);
      } else {
        const item = state.items.find((item) => item.customKey === customKey);
        if (item) item.quantity = quantity;
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      const customKey = action.payload;
      state.items = state.items.filter((item) => item.customKey !== customKey);
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.discountPercent = 0;
      state.promoMessage = '';
      state.isGiftWrapped = false;
      saveCart([]);
    },
    applyPromoCode: (state, action) => {
      const code = (action.payload || '').trim().toUpperCase();
      if (PROMO_CODES[code]) {
        state.promoCode = code;
        state.discountPercent = PROMO_CODES[code].discountPercent;
        state.promoMessage = `${PROMO_CODES[code].description} applied!`;
      } else {
        state.promoCode = null;
        state.discountPercent = 0;
        state.promoMessage = 'Invalid or expired promotional code';
      }
    },
    removePromoCode: (state) => {
      state.promoCode = null;
      state.discountPercent = 0;
      state.promoMessage = '';
    },
    toggleGiftWrap: (state) => {
      state.isGiftWrapped = !state.isGiftWrapped;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyPromoCode,
  removePromoCode,
  toggleGiftWrap,
} = cartSlice.actions;

export default cartSlice.reducer;
