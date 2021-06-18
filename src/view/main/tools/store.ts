import { configureStore } from '@reduxjs/toolkit';
import { sliceOfCurrentPage } from './slices';


export const store = configureStore({
  reducer: {
    current: sliceOfCurrentPage.reducer
  }
});


export interface StoreState {
  current: number,

}