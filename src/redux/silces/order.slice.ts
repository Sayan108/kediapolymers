import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {orderInitialState, IOrderState} from '../redux.constants';

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

    addNewOrderInList: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        orderList: [action.payload, ...state.orderList],
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
export const {setCurrentOrder, addNewOrderInList, removeFromOrderList} =
  orderSlice.actions;

export const orderReducer = orderSlice.reducer;
