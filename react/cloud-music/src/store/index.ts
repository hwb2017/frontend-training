import { configureStore } from '@reduxjs/toolkit';
import recommendReducer from '../application/Recommend/store/recommendSlice';
import singerReducer from '../application/Singers/store/singerSlice';

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singer: singerReducer
  }
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;