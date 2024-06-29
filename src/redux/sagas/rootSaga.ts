import {all} from 'redux-saga/effects';
import {watchFetchCategoryList, watchFetchProductList} from './product.saga';

export default function* rootSaga() {
  yield all([watchFetchCategoryList(), watchFetchProductList()]);
}
