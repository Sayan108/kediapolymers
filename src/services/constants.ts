export const baseURLS = {
  devBaseURL: 'https://kediapolymner-backend.onrender.com/api/kediapolymer',
  stageBaseURL: '',
  productionBaseURL: '',
};

export const endPoints = {
  logIn: '/user/login',
  categoryList: '/category',
  productData: '',
  createOrder: '',
  orderList: '',
};

const env = 'devBaseURL';

export const activeURL = baseURLS[env];
