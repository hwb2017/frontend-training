import { RootObject } from '@/model/rootObject'
import { UserInfoModel, Users } from '@/model/userModel'
import { LoginModel } from '@/model/loginModel'
import { RequestParams, ContentType, AxiosRequestConfig } from 'axios'
import request from '@/utils/request'

declare module 'axios' {
  enum ContentType {
    form = 'application/x-www-form-urlencoded',
    json = 'application/json; charset=utf-8',
    multipart = 'multipart/form-data'
  }
  interface RequestParams {
    [index: string]: string
  }
}

export const loginRequest = (userInfo: RequestParams) => {
  const requestConfig: AxiosRequestConfig = {
    url: 'user/login',
    method: 'POST',
    headers: {
      'content-type': ContentType.json
    },
    data: userInfo
  }
  return request<RootObject<LoginModel>>(requestConfig)
}

export const userInfoRequest = () => {
  const requestConfig: AxiosRequestConfig = {
    url: 'user/userInfo',
    method: 'GET',
    headers: {
      'content-type': ContentType.form
    }
  }
  return request<RootObject<UserInfoModel>>(requestConfig)
}

export const getUsers = (user: any) => {
  const requestConfig: AxiosRequestConfig = {
    url: 'user/getUsers',
    method: 'GET',
    headers: {
      'content-type': ContentType.form
    },
    params: user
  }
  return request<RootObject<Users>>(requestConfig)
}
