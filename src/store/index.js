import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currencySlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import customizationReducer from './customizationSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    customization: customizationReducer,
    orders: orderReducer,
  },
});

export default store;
