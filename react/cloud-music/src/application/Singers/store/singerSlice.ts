import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '../../../api/request';
import type { Singer, SingerResponse } from '../../../api/request';
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

interface SingerPayload {
  category: string,
  alpha: string
}

export const getHotSingerList = createAsyncThunk(
  'singers/fetchHotSingerList',
  async(_, { getState }) => {
    const pageCount = (getState() as RootState).singer.pageCount;
    const resp = await getHotSingerListRequest(pageCount);
    return resp;
  }
);

export const getSingerList = createAsyncThunk<SingerResponse, SingerPayload>(
  'singers/fetchSingerList',
  async({ category, alpha }, { getState }) => {
    const pageCount = (getState() as RootState).singer.pageCount;
    const resp = await getSingerListRequest(category, alpha, pageCount);
    return resp;
  }
)

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
      .addCase(getHotSingerList.rejected, () => {
        console.warn('热门歌手数据加载失败');
      })
      .addCase(getSingerList.pending, (state) => {
        state.pullDownLoading = true;
      })
      .addCase(getSingerList.fulfilled, (state, action) => {
        state.enterLoading = false;
        state.pullDownLoading = false;
        state.singerList = state.singerList.concat(action.payload.artist);
      })
      .addCase(getSingerList.rejected, (state) => {
        console.warn('歌手数据加载失败');
      })
  }
})

export default singerSlice.reducer;