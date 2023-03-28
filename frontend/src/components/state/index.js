import { createSlice } from "@reduxjs/toolkit";
import { set } from 'lodash';

const initialState = {
    //when the app starts, the cart will not be open
  isCartOpen: JSON.parse(localStorage.getItem('isCartOpen')) || false,
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  items: [],
  currency: 'krw',
  project: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },

    //[currentstate of the cart, what ever item we are passing into the action we are updating the cart]
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.order !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
      localStorage.setItem('isCartOpen', JSON.stringify(state.isCartOpen));
    },
  },
});

export const {
  setItems,
  setCurrency,
  setProject,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;