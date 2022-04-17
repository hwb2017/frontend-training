import { axiosInstance } from './config';

export interface Banner {
  imageUrl: string
}

interface BannerResponse {
  banners: Banner[]
}

export interface Recommend {
  id: number,
  picUrl: string,
  playCount: number,
  name: string,
}

interface RecommendResponse {
  result: Recommend[]
}

export const getBannerRequest = () => {
  return axiosInstance.get<BannerResponse, BannerResponse>('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get<RecommendResponse, RecommendResponse>('/personalized');
}