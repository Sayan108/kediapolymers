import {endPoints} from './constants';
import {authClient, baseClient} from './services.clients';

export const login = (payload: any) => {
  return authClient.post(endPoints.logIn, payload);
};

export const getCategoryList = () => {
  return baseClient.get(endPoints.categoryList);
};

export const getProductList = (params: any) => {
  return baseClient.get(endPoints.productList, {params});
};

export const createOrder = (payload: any) => {
  return baseClient.post(endPoints.createOrder, payload);
};

export const addProduct = (payload: any) => {
  return baseClient.post(endPoints.addProduct, payload);
};

export const getAllDealers = (params: any) => {
  return baseClient.get(endPoints.userList, {params});
};

export const getOrderList = (params?: any) => {
  return baseClient.get(endPoints.orderList, {params});
};

export const getOrderDetails = (params: any) => {
  return baseClient.get(endPoints.orderDetails, {params});
};
