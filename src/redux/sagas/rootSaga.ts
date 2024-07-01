import {all} from 'redux-saga/effects';
import {
  watchAddProduct,
  watchFetchCategoryList,
  watchFetchProductList,
} from './product.saga';
import {watchAddNewOrder, watchGetOrderList} from './order.saga';

export default function* rootSaga() {
  yield all([
    watchFetchCategoryList(),
    watchFetchProductList(),
    watchAddNewOrder(),
    watchAddProduct(),
    watchGetOrderList(),
  ]);
}
