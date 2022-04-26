import { axiosInstance } from './config';

interface CategoryMeta {
  type: number,
  area: number,
}

const categoryMap = new Map<string, CategoryMeta>([
  ['1001', { type: 1, area: 7 }],
  ['1002', { type: 2, area: 7 }],
  ['1003', { type: 3, area: 7 }],
  ['2001', { type: 1, area: 96 }],
  ['2002', { type: 2, area: 96 }],
  ['2003', { type: 3, area: 96 }],
  ['6001', { type: 1, area: 8 }],
  ['6002', { type: 2, area: 8 }],
  ['6003', { type: 3, area: 8 }],
  ['7001', { type: 1, area: 16 }],
  ['7002', { type: 2, area: 16 }],
  ['7003', { type: 3, area: 16 }],
  ['4001', { type: 1, area: 0 }],
  ['4002', { type: 2, area: 0 }],
  ['4003', { type: 3, area: 0 }],
 ]);

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

export interface Singer {
  albumSize: number,
  alias: string[],
  briefDesc: string,
  followed: boolean,
  id: number,
  img1v1Id: number,
  img1v1Id_str: string,
  musicSize: number,
  name: string,
  picId: number,
  picId_str: string,
  picUrl: string,
  topicPerson: number,
  trans: string,
  showPrivateMsg?: boolean | null,
  isSubed?: boolean | null,
  accountId?: number | null,
  transNames?: string | null,
  mvSize?: number | null,
  publishTime?: string | null,
  identifyTag?: string | null,
  alg?: string | null,
  fansCount?: number | null,
}

export interface SingerResponse {
  artist: Singer[]
}

export const getBannerRequest = () => {
  return axiosInstance.get<any, BannerResponse>('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get<any, RecommendResponse>('/personalized');
}

export const getHotSingerListRequest = (pageOffset: number) => {
  return axiosInstance.get<any, SingerResponse>(`/top/artists?offset=${pageOffset}`);
}

export const getSingerListRequest = (category: string, alpha: string, pageOffset: number) => {
  const {type = -1 , area = -1} = categoryMap.get(category) ?? {};
  return axiosInstance.get<any, SingerResponse>(`/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${pageOffset}`)
}