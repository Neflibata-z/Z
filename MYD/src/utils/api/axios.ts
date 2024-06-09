import axios, { InternalAxiosRequestConfig , AxiosInstance, AxiosResponse } from 'axios';
import {ElMessage} from 'element-plus';
const service: AxiosInstance = axios.create({
 baseURL: '/api',
 timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
  // 在发送请求之前做些什么
  ElMessage.error('请求拦截器');
  return config;
  },
  (error: any) => {
  // 处理请求错误
  return Promise.reject(error);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
  // 对响应数据做点什么
  ElMessage.error('响应拦截器');
  return response;
  },
  (error: any) => {
  // 处理响应错误
  return Promise.reject(error);
  },
);
export async function post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
  //  console.log(url);
  const response = await service.post(url, data);
  //console.log(url)
    return response.data;
}


export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await service.get<ApiResult<T>>(url, { params });
  return response.data;
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await service.put<ApiResult<T>>(url, data);
  return response.data;
}
export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await service.delete<ApiResult<T>>(url, { params });
  return response.data;
}

export default service;