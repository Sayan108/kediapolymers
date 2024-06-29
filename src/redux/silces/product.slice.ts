import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IconProps} from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import {
  IProduct,
  IProductState,
  category,
  productInitialState,
} from '../redux.constants';

export const productSLice = createSlice({
  name: 'product',
  initialState: productInitialState,

  reducers: {
    categoryListRequested: (state: IProductState) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    categoryListSuccess: (
      state: IProductState,
      action: PayloadAction<category[]>,
    ) => {
      return {
        ...state,
        isLoading: false,
        categoryList: action.payload,
      };
    },

    categoryListFailed: (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    addNewCategoryRequested: (state: IProductState) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    setCurrentCategory: (
      state: IProductState,
      action: PayloadAction<category>,
    ) => {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },

    addNewCategorySuccess: (
      state: IProductState,
      action: PayloadAction<IProduct>,
    ) => {
      return {
        ...state,
        isLoading: false,
        categoryList: [...state.categoryList, action.payload],
      };
    },

    addNewCategoryFailed: (
      state: IProductState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const {
  categoryListRequested,
  categoryListSuccess,
  categoryListFailed,
  addNewCategoryRequested,
  addNewCategorySuccess,
  addNewCategoryFailed,
  setCurrentCategory,
} = productSLice.actions;

export const productReducer = productSLice.reducer;
