import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  ICart,
  ICartItem,
  ICartState,
  cartInitialState,
} from '../redux.constants';

// Redux Toolkit slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,

  reducers: {
    updateCurrentCategory: (
      state: ICartState,
      action: PayloadAction<string>,
    ) => {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },

    updateCurrentCart: (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          items: [action.payload.newItem, ...state.currentCart.items],
        },
      };
    },

    setCurrentCart: (state: ICartState, action: PayloadAction<ICart>) => {
      return {
        ...state,
        currentCart: action.payload,
      };
    },

    removeCartItem: (state: ICartState, action: PayloadAction<ICartItem>) => {
      const newItems = state.currentCart.items.filter(
        cart => cart.id !== action.payload.id,
      );
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          items: newItems,
        },
      };
    },

    clearCart: (state: ICartState) => {
      return {
        ...cartInitialState,
      };
    },
  },
});
export const {
  updateCurrentCart,
  updateCurrentCategory,

  removeCartItem,
  setCurrentCart,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
