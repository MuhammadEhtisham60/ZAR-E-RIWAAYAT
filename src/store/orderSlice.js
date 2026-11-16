import { createSlice } from '@reduxjs/toolkit';

const initialSampleOrders = [
  {
    orderId: 'ZR-89241',
    trackingNumber: 'ZR-PK-89241',
    createdAt: '2026-11-14T14:30:00Z',
    customer: {
      firstName: 'Hamza',
      lastName: 'Tariq',
      email: 'hamza.tariq@example.co.uk',
      phone: '+44 7700 900123',
      address: '24 Kensington Palace Gardens',
      city: 'London',
      country: 'United Kingdom',
      postalCode: 'W8 4PX',
    },
    items: [
      {
        id: 'kh-01',
        title: 'Mughal Dabka Khussa – Olive Leaf Edition',
        size: 'EU 42 / UK 8',
        color: 'Olive Leaf (#606C38)',
        material: 'Royal Silk Velvet',
        embroideryStyle: 'Mughal Dabka & Zardozi',
        pricePKR: 18500,
        quantity: 1,
        image: '/images/khussa/khussa_olive_embroidered.jpg',
      },
      {
        id: 'sh-01',
        title: 'Royal Heirloom Kashmiri Shawl – Zardozi Velvet Border',
        size: 'Standard Royal (2.75m x 1.25m)',
        color: 'Deep Forest Green (#283618)',
        material: 'Pure Pashmina Silk',
        embroideryStyle: 'Antique Gold Tilla Filigree',
        pricePKR: 38000,
        quantity: 1,
        image: '/images/shawls/shawl_olive_zardozi.jpg',
      },
    ],
    currency: 'GBP',
    currencySymbol: '£',
    subtotalPKR: 56500,
    shippingPKR: 6400,
    discountPKR: 5650,
    totalPKR: 57250,
    totalFormatted: '£160.30',
    paymentMethod: 'International Visa / Mastercard (Stripe Ready)',
    paymentStatus: 'Paid',
    currentMilestone: 3, // 0: Placed, 1: Handcrafting, 2: Zardozi Work, 3: Quality Passed, 4: Dispatched DHL, 5: Delivered
    estimatedDelivery: 'November 20, 2026',
    carrier: 'DHL Express Worldwide',
    milestones: [
      { title: 'Order Confirmed & Logged', date: 'Nov 14, 2026', done: true },
      { title: 'Master Artisan Leather Cutting & Lasting', date: 'Nov 15, 2026', done: true },
      { title: 'Hand Zardozi & Dabka Needlework', date: 'Nov 15, 2026', done: true },
      { title: 'Master Royal Quality Inspection', date: 'Nov 16, 2026', done: true },
      { title: 'Dispatched via DHL Express (Airway Bill #ZR-994102)', date: 'Expected Nov 17, 2026', done: false },
      { title: 'Arrived at Destination & Delivered', date: 'Expected Nov 20, 2026', done: false },
    ],
  },
];

const loadOrders = () => {
  try {
    const raw = localStorage.getItem('zr_orders');
    return raw ? JSON.parse(raw) : initialSampleOrders;
  } catch (e) {
    return initialSampleOrders;
  }
};

const saveOrders = (orders) => {
  try {
    localStorage.setItem('zr_orders', JSON.stringify(orders));
  } catch (e) {}
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: loadOrders(),
    currentTrackedOrder: null,
    trackingError: null,
  },
  reducers: {
    createOrder: (state, action) => {
      const order = action.payload;
      state.orders.unshift(order);
      saveOrders(state.orders);
    },
    trackOrderById: (state, action) => {
      const { query } = action.payload;
      const clean = (query || '').trim().toUpperCase();
      const match = state.orders.find(
        (o) =>
          o.orderId.toUpperCase() === clean ||
          o.trackingNumber.toUpperCase() === clean ||
          o.customer.email.toLowerCase() === query.trim().toLowerCase()
      );
      if (match) {
        state.currentTrackedOrder = match;
        state.trackingError = null;
      } else {
        state.currentTrackedOrder = null;
        state.trackingError = `No royal order found matching "${query}". Please check your Order ID (e.g., ZR-89241) or email address.`;
      }
    },
    clearTrackedOrder: (state) => {
      state.currentTrackedOrder = null;
      state.trackingError = null;
    },
  },
});

export const { createOrder, trackOrderById, clearTrackedOrder } = orderSlice.actions;
export default orderSlice.reducer;
