export const baseURLS = {
  devBaseURL: '',
  stageBaseURL: '',
  productionBaseURL: '',
};

export const endPoints = {
  logIn: '',
  productData: '',
  createOrder: '',
  orderList: '',
};

const env = 'devBaseURL';

export const activeURL = baseURLS[env];
