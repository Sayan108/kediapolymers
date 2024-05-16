import {authReducer} from './auth.silce';

import {combineReducers} from '@reduxjs/toolkit';
import {applicationReducer} from './application.slice';
import {cartReducer} from './cart.slice';

export const rootReducer = combineReducers({
  cart: cartReducer,
});
