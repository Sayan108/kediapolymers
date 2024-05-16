export interface IAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userDetails: IUserDetails | null;
}

export interface IUserDetails {
  userID: string | null;
  accessToken: string | null;
  userName: string;
  fullname: string;
  email?: string;
  phoneNumber?: string;
}

export const IUserDetailsInitialState: IUserDetails = {
  userID: null,
  accessToken: null,
  userName: '',
  fullname: '',
  email: '',
  phoneNumber: '',
};

export const IAuthStateInitialState: IAuthState = {
  isLoading: false,
  isAuthenticated: false,
  userDetails: IUserDetailsInitialState,
};

export interface IApplicationStates {
  homeScreenTab: number;
}

export interface OTPSuccessPayload {
  phoneNumber: string;
}

export interface ICart {
  id: string;
  totalAmount: string;
  items: ICartItem[];
}

export interface ICartItem {
  id: string;
  productName: string;
  productPrice: string;
  count: number;
  totalPrice: string;
}

export interface ICartState {
  currentCategory: string;
  cartList: ICart[];
  currentCart: ICart;
}

export const cartInitialState: ICartState = {
  currentCategory: '',
  cartList: [],
  currentCart: {
    id: '',
    totalAmount: '0',
    items: [],
  },
};
