import {ActionType} from 'typesafe-actions';

import {getCategoryList} from '../../services';
import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  categoryListFailed,
  categoryListRequested,
  categoryListSuccess,
} from '../silces/product.slice';
import {category} from '../redux.constants';

function* getCategoryListData(
  action: ActionType<typeof categoryListRequested>,
): Generator<any, void, any> {
  console.log('calling the saga');
  try {
    // API call logic here
    const response: AxiosResponse = yield call(getCategoryList);
    console.log(response.data.data);
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
    yield put(categoryListFailed(error?.toString()));
  }
}

export function* watchFetchCategoryList() {
  yield takeLatest(categoryListRequested.type, getCategoryListData);
}
