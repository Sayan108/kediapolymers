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

    updateCurrentCart: (
      state: ICartState,
      action: PayloadAction<ICartItem>,
    ) => {
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          items: [action.payload, ...state?.currentCart?.items],
        },
      };
    },

    addNewCartInList: (state: ICartState, action: PayloadAction<ICart>) => {
      return {
        ...state,
        cartList: [action.payload, ...state.cartList],
      };
    },

    setCurrentCart: (state: ICartState, action: PayloadAction<ICart>) => {
      const initialCart = {
        id: '',
        totalAmount: '0',
        items: [],
      };
      const newItems = state.cartList.find(
        cart => cart.id === action.payload.id,
      );
      return {
        ...state,
        currentCart: newItems ?? initialCart,
      };
    },

    removeCartItem: (state: ICartState, action: PayloadAction<ICartItem>) => {
      const newItems = state.cartList.filter(
        cart => cart.id !== action.payload.id,
      );
      return {
        ...state,
        cartList: newItems,
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
  addNewCartInList,
  removeCartItem,
  setCurrentCart,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
