export const baseURLS = {
  devBaseURL: 'https://kediapolymner-backend.onrender.com/api/kediapolymer',
  stageBaseURL: '',
  productionBaseURL: '',
};

export const endPoints = {
  logIn: '/user/login',
  categoryList: '/category',
  productList: '/product/productList',
  addProduct: '/product',
  createOrder: '/order',
  orderList: '',
};

const env = 'devBaseURL';

export const activeURL = baseURLS[env];
