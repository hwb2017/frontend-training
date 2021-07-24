import store from '@/store'
import networkConfig from '@/config/default/net.config'
import axios, { AxiosRequestConfig } from 'axios'

const request = async <T>(requestConfig: AxiosRequestConfig) => {
  requestConfig.baseURL = networkConfig.host
  requestConfig.headers = {
    token: (store as any).state.user.token ?? ''
  }
  const client = axios.create()
  return client.request<T>(requestConfig)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      } else {
        return Promise.reject(res.data)
      }
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export default request
