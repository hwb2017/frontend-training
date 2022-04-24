import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';
import { RootState } from '../../../store';
import type { Banner, Recommend } from '../../../api/request';

export interface RecommendState {
  bannerList: Banner[],
  recommendList: Recommend[],
  bannerStatus: 'idle' | 'loading' | 'successed' | 'failed',
  recommendStatus: 'idle' | 'loading' | 'successed' | 'failed',
}

const initialState: RecommendState = {
  bannerList: [],
  recommendList: [],
  bannerStatus: 'idle',
  recommendStatus: 'idle'
}

export const getBannerList = createAsyncThunk(
  'recommend/fetchBannerList',
  async() => {
    const resp = await getBannerRequest();
    return resp.banners;
  }
)

export const getRecommendList = createAsyncThunk(
  'recommend/fetchRecommendList',
  async() => {
    const resp = await getRecommendListRequest();
    return resp.result;
  }
)

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannerList.pending, (state) => {
        state.bannerStatus = 'loading';
      })
      .addCase(getBannerList.fulfilled, (state, action) => {
        state.bannerStatus = 'successed';
        state.bannerList = action.payload;
      })
      .addCase(getBannerList.rejected, (state) => {
        state.bannerStatus = 'failed';
      })
      .addCase(getRecommendList.pending, (state) => {
        state.recommendStatus = 'loading';
      })
      .addCase(getRecommendList.fulfilled, (state, action) => {
        state.recommendStatus = 'successed';
        state.recommendList = action.payload;
      })
      .addCase(getRecommendList.rejected, (state) => {
        state.recommendStatus = 'failed';
      })
  }
})

export default recommendSlice.reducer;

export const selectBannerList = (state: RootState) => state.recommend.bannerList;
export const selectRecommendList = (state: RootState) => state.recommend.recommendList;
export const selectRecommendStatus = (state: RootState) => state.recommend.recommendStatus;