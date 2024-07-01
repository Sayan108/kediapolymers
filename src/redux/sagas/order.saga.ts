import {ActionType} from 'typesafe-actions';

import {createOrder, getOrderDetails, getOrderList} from '../../services';
import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

import {
  addNewOrderInIListRequested,
  addNewOrderInListFailed,
  addNewOrderInListSuccess,
  getOrdersListRequested,
} from '../silces/order.slice';
import {Alert} from 'react-native';
import {IOrder} from '../redux.constants';

function* addNewOrder(
  action: ActionType<typeof addNewOrderInIListRequested>,
): Generator<any, void, any> {
  try {
    const response: AxiosResponse = yield call(createOrder, action.payload);

    const responseData = response?.data?.data;
    const orderDetails: AxiosResponse = yield call(getOrderDetails, {
      orderId: responseData?.orderId,
    });

    const newData = orderDetails?.data?.data;

    Alert.alert('Order added successfully');
    // const obj :IOrder = {id};
    //  yield put(addNewOrderInListSuccess(obj));
    // dispatch(addNewOrderInList(currentCart));
    // dispatch(setCurrentOrder(currentCart));
    // dispatch(removeCartItem(currentCart));
    // dispatch(clearCurrentCart(cartInitialState.currentCart));
    console.log(JSON.stringify(action.payload, newData), 'responseeeee');
  } catch (error) {
    console.error(error);
    yield put(addNewOrderInListFailed('Something went wrong'));
    Alert.alert('Something went wrong');
  }
}

function* getAllOrderList(
  action: ActionType<typeof getOrdersListRequested>,
): Generator<any, void, any> {
  try {
    const response: AxiosResponse = yield call(getOrderList);
    console.log(response?.data?.data);
  } catch (error) {
    console.error(error);

    Alert.alert('Something went wrong');
  }
}

export function* watchAddNewOrder() {
  yield takeLatest(addNewOrderInIListRequested.type, addNewOrder);
}

export function* watchGetOrderList() {
  yield takeLatest(getOrdersListRequested.type, getAllOrderList);
}
