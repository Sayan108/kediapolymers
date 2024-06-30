import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {orderInitialState, IOrderState, IOrder} from '../redux.constants';
import {act} from 'react';

// Redux Toolkit slice
export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,

  reducers: {
    setCurrentOrder: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        currentOrder: action.payload,
      };
    },
    addNewOrderInIListRequested: (
      state: IOrderState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    addNewOrderInListSuccess: (
      state: IOrderState,
      action: PayloadAction<IOrder>,
    ) => {
      return {
        ...state,
        isLoading: false,
        orderList: [...state.orderList, action.payload],
      };
    },

    addNewOrderInListFailed: (
      state: IOrderState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: false,
        errormessege: action.payload,
      };
    },

    addNewOrderInList: (state: IOrderState, action: PayloadAction<any>) => {
      const newOBJ: IOrder = {
        ...action.payload,
        orderDate: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
      return {
        ...state,
        orderList: [action.payload, ...state.orderList],
      };
    },
    clearOrder: (state: IOrderState) => {
      return {
        ...orderInitialState,
      };
    },

    removeFromOrderList: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        orderList: state.orderList.filter(
          (order: any) => order.id !== action.payload.id,
        ),
      };
    },
  },
});
export const {
  setCurrentOrder,
  addNewOrderInList,
  removeFromOrderList,
  clearOrder,
  addNewOrderInIListRequested,
  addNewOrderInListSuccess,
  addNewOrderInListFailed,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
