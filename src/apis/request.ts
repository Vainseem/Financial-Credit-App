import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core';
import axios from 'axios';

// 基础 URL 定义
export const BASE_URL_8081 = 'http://49.233.37.218:8021/u/v1/'; // 用户、基础接口
export const BASE_URL_8082 = 'http://49.233.37.218:8022/l/v1/'; // 贷款接口
export const BASE_URL_8023 = 'http://49.233.37.218:8023/p/v1/'; // 还款接口
export const BASE_URL_8024 = 'http://49.233.37.218:8024/m/v1/'; // 管理员接口

const isNative = Capacitor.isNativePlatform();

// 创建一个统一的请求处理器
const createRequest = (baseURL: string) => {
    // 1. Web 端逻辑：使用 axios，方便在浏览器 F12 网络面板查看请求
    if (!isNative) {
        return axios.create({
            baseURL,
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // 2. 原生端逻辑：使用 CapacitorHttp，绕过 CORS 和 HTTP 限制
    return async (config: any) => {
        const url = config.url.startsWith('http') ? config.url : baseURL + (config.url.startsWith('/') ? config.url.substring(1) : config.url);

        let finalData = config.data;
        let finalHeaders = { ...config.headers };

        // CapacitorHttp 不识别 FormData 对象，需要手动转换为普通对象
        if (finalData instanceof FormData) {
            const obj: any = {};
            finalData.forEach((value, key) => {
                obj[key] = value;
            });
            finalData = obj;

            // 在原生环境下，如果是 FormData 转换来的普通对象，Content-Type 设为 urlencoded 兼容性更好
            if (!finalHeaders['Content-Type'] || finalHeaders['Content-Type'] === 'multipart/form-data') {
                finalHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }

        try {
            const response: HttpResponse = await CapacitorHttp.request({
                url: url,
                method: (config.method || 'GET').toUpperCase(),
                headers: {
                    'Content-Type': 'application/json',
                    ...finalHeaders,
                },
                params: config.params || {},
                data: finalData,
                connectTimeout: 10000,
                readTimeout: 10000,
            });

            return {
                data: response.data,
                status: response.status,
                headers: response.headers,
                config: config
            };
        } catch (error) {
            console.error('Native Request Error:', error);
            throw error;
        }
    };
};

// 创建不同端口的请求实例
export const request8081: any = createRequest(BASE_URL_8081);
export const request8082: any = createRequest(BASE_URL_8082);
export const request8023: any = createRequest(BASE_URL_8023);
export const request8024: any = createRequest(BASE_URL_8024);

// 默认导出（兼容旧代码）
export const request = request8081;
