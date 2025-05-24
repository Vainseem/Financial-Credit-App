import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// 定义请求配置
const config: AxiosRequestConfig = {
    // baseURL: 'https://dahkalfalaf.asia/api1/u/v1/',
    baseURL: 'https://www.demo.com/',
    timeout: 5000,
};

// 创建 Axios 实例
export const request: AxiosInstance = axios.create(config);