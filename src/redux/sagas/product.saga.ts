import {ActionType} from 'typesafe-actions';

import {getCategoryList, getProductList} from '../../services';
import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  categoryListFailed,
  categoryListRequested,
  categoryListSuccess,
  productListFailed,
  productListRequested,
  productListSuccess,
} from '../silces/product.slice';
import {ICart, ICartItem, IProduct, category} from '../redux.constants';

function* getCategoryListData(
  action: ActionType<typeof categoryListRequested>,
): Generator<any, void, any> {
  //console.log('calling the saga');
  try {
    // API call logic here
    const response: AxiosResponse = yield call(getCategoryList);

    const responseData = response?.data?.data;
    const data: category[] = []; // Create a new array to store the transformed data.
    for (let i = 0; i < responseData.length; i++) {
      const obj: category = {
        id: responseData[i].categoryId,
        name: responseData[i].name,
        // iconName: responseData[i].iconName ?? '', // Replace with the actual icon name property.
        // Add more fields as needed
      };
      data[i] = obj; // Update the original object to include the new properties.
    }
    yield put(categoryListSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(categoryListFailed('Something went wrong'));
  }
}

function* getProductListData(
  action: ActionType<typeof productListRequested>,
): Generator<any, void, any> {
  console.log('calling the saga');
  try {
    // API call logic here
    const response: AxiosResponse = yield call(getProductList, {
      categoryid: action.payload,
    });
    console.log(response.data.data);
    const responseData = response?.data?.data;
    const data: IProduct[] = []; // Create a new array to store the transformed data.
    for (let i = 0; i < responseData.length; i++) {
      const obj: IProduct = {
        productId: responseData[i].productId,
        title: responseData[i].title,
        // dimensions: responseData[i].dimensions,
        unitPrice: responseData[i].unitPrice,
        // description: responseData[i].description,
        categoryId: responseData[i].categoryId,
        // iconName: responseData[i].iconName ?? '', // Replace with the actual icon name property.
        // Add more fields as needed
      };
      data[i] = obj; // Update the original object to include the new properties.
    }
    yield put(productListSuccess(data));
  } catch (error) {
    yield put(productListFailed('Something went wrong'));
  }
}

export function* watchFetchCategoryList() {
  yield takeLatest(categoryListRequested.type, getCategoryListData);
}

export function* watchFetchProductList() {
  yield takeLatest(productListRequested.type, getProductListData);
}
