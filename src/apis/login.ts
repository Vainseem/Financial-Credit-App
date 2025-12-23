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

// 发送短信验证码 (根据用户要求使用 FormData)
export const sendSms = (mobile: string, type: string = "1") => {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("type", type);
  return request({
    url: "/user/send_sms",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 发送邮箱验证码 (根据接口文档 3，同步改为使用 FormData)
export const sendEmail = (email: string, type: string = "1") => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("type", type);
  return request({
    url: "/user/send_email",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 手机号注册 (根据用户要求使用 FormData)
export const mobileRegister = (phone: string, nickname: string, password: string, code: string) => {
  const formData = new FormData();
  formData.append("mobile", phone);
  formData.append("nickname", nickname);
  formData.append("password", password);
  formData.append("code", code);
  return request({
    url: "/user/mobile_register",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 邮箱注册 (根据用户要求使用 FormData)
export const emailRegister = (email: string, nickname: string, password: string, code: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("nickname", nickname);
  formData.append("password", password);
  formData.append("code", code);
  return request({
    url: "/user/email_register",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 获取图形验证码 (根据接口文档 1)
export const getVerification = async () => {
  return request({
    url: "/base/captcha",
    method: "GET",
  });
};

// 检查 Token (指向 8081)
export const ifHaveToken = (token: string) => {
  return request({
    url: "/user/mobile_pwd_login",
    method: "GET",
    headers: {
      "x-token": token,
    }
  });
};
