import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';

import productReducer from './product';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
