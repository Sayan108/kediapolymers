import {ActionType} from 'typesafe-actions';

import {createOrder} from '../../services';
import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

import {
  addNewOrderInIListRequested,
  addNewOrderInListFailed,
} from '../silces/order.slice';
import {Alert} from 'react-native';

function* addNewOrder(
  action: ActionType<typeof addNewOrderInIListRequested>,
): Generator<any, void, any> {
  try {
    const response: AxiosResponse = yield call(createOrder, action.payload);

    const responseData = response?.data?.data;
    console.log(responseData, 'response');
  } catch (error) {
    console.error(error);
    yield put(addNewOrderInListFailed('Something went wrong'));
    Alert.alert('Something went wrong');
  }
}

export function* watchAddNewOrder() {
  yield takeLatest(addNewOrderInIListRequested.type, addNewOrder);
}
