import { createSlice } from '@reduxjs/toolkit';

import { AppDispatch as Dispatch } from './index';

import DATA from './data';
import { Product, Sale } from './types';

const initialState = {
  product: {} as Product,
  sortedSales: [] as Sale[],
  isLoading: false,
  errors: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = {} as Product;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = [];
    },
    setSortedSales: (state, action) => {
      state.sortedSales = action.payload;
    },
    sortSales: (state, action) => {
      const { sortField, order } = action.payload;
      state.sortedSales = state.sortedSales.sort((a, b) => {
        switch (sortField) {
          case 'weekEnding':
            return order === 'asc'
              ? new Date(a.weekEnding).getTime() -
                  new Date(b.weekEnding).getTime()
              : new Date(b.weekEnding).getTime() -
                  new Date(a.weekEnding).getTime();
          case 'retailSales':
            return order === 'asc'
              ? a.retailSales - b.retailSales
              : b.retailSales - a.retailSales;
          case 'wholesaleSales':
            return order === 'asc'
              ? a.wholesaleSales - b.wholesaleSales
              : b.wholesaleSales - a.wholesaleSales;
          case 'unitsSold':
            return order === 'asc'
              ? a.unitsSold - b.unitsSold
              : b.unitsSold - a.unitsSold;
          case 'retailerMargin':
            return order === 'asc'
              ? a.retailerMargin - b.retailerMargin
              : b.retailerMargin - a.retailerMargin;
          default:
            return 0;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProduct,
  clearProduct,
  setIsLoading,
  setErrors,
  clearErrors,
  setSortedSales,
  sortSales,
} = productSlice.actions;

// --------------------------------------------------------

export const getProduct = () => async (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(setProduct(DATA[0]));
    dispatch(setSortedSales(DATA[0].sales));
    return true;
  }, 500);
};

// --------------------------------------------------------

export default productSlice.reducer;
