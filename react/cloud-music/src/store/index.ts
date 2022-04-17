import { configureStore } from '@reduxjs/toolkit';
import recommendReducer from '../application/Recommend/store/recommendSlice';

const store = configureStore({
  reducer: {
    recommend: recommendReducer
  }
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;