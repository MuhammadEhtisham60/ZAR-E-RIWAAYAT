import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
  try {
    const raw = localStorage.getItem('zr_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveWishlist = (items) => {
  try {
    localStorage.setItem('zr_wishlist', JSON.stringify(items));
  } catch (e) {}
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push(product);
      }
      saveWishlist(state.items);
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveWishlist(state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
