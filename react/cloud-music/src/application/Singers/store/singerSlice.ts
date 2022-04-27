import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '../../../api/request';
import type { Singer } from '../../../api/request';
import type { RootState } from '../../../store';

export interface SingerState {
  singerList: Singer[],
  enterLoading: boolean,
  pullUpLoading: boolean,
  pullDownLoading: boolean,
  pageCount: number
}

const initialState: SingerState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
}

export const getHotSingerList = createAsyncThunk(
  'singers/fetchHotSingerList',
  async(_, { getState }) => {
    (getState() as RootState)
    const resp = await getHotSingerListRequest(0);
    return resp;
  }
);

export const singerSlice = createSlice({
  name: 'singers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHotSingerList.pending, (state) => {
        state.pullDownLoading = true;
      })
      .addCase(getHotSingerList.fulfilled, (state, action) => {
        state.enterLoading = false;
        state.pullDownLoading = false;
        state.singerList = state.singerList.concat(action.payload.artist);
      })
  }
})