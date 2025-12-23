import { request8081 as request } from "@/apis/request";

// 手机号登录 (根据接口文档 6)
export const mobileLogin = (mobile: string, password: string, captcha_id: string, captcha: string) => {
  return request({
    url: '/user/mobile_pwd_login',
    method: "GET",
    params: {
      mobile,
      password,
      captcha_id,
      captcha
    }
  });
};

// 邮箱登录 (根据接口文档 7)
export const emailLogin = (email: string, password: string, captcha_id: string, captcha: string) => {
  return request({
    url: '/user/email_pwd_login',
    method: "GET",
    params: {
      email,
      password,
      captcha_id,
      captcha
    }
  });
};

// 发送短信验证码 (根据接口文档 2)
export const sendSms = (mobile: string, type: number = 1) => {
  return request({
    url: "/user/send_sms",
    method: "POST",
    data: {
      mobile,
      type
    }
  });
};

// 发送邮箱验证码 (根据接口文档 3)
export const sendEmail = (email: string, type: number = 1) => {
  return request({
    url: "/user/send_email",
    method: "POST",
    data: {
      email,
      type
    }
  });
};

// 手机号注册 (根据接口文档 4)
export const mobileRegister = (mobile: string, nickname: string, password: string, code: string) => {
  return request({
    url: "/user/mobile_register",
    method: "POST",
    data: {
      mobile,
      nickname,
      password,
      code
    }
  });
};

// 邮箱注册 (根据接口文档 5)
export const emailRegister = (email: string, nickname: string, password: string, code: string) => {
  return request({
    url: "/user/email_register",
    method: "POST",
    data: {
      email,
      nickname,
      password,
      code
    }
  });
};

// 获取图形验证码 (根据接口文档 1)
export const getVerification = async () => {
  return request({
    url: "/base/captcha",
    method: "GET",
  });
};

// 检查 Token (保留原逻辑，但指向 8081)
export const ifHaveToken = (token: string) => {
  return request({
    url: "/user/mobile_pwd_login", // 或者是其他验证 token 的接口，这里暂时保持原样
    method: "GET",
    headers: {
      "x-token": token,
    }
  });
};

