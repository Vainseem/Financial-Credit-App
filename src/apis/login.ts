import { request } from "@/apis/request";

export const userLogin = (username: string, password: string) => {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export const sendEmail = (email: string) => {
  const formData = new FormData();
  formData.append("email", email); // 设置 mobile 字段
  formData.append("type", "1"); // 设置 type 字段
  return request({
    url: "/user/send_email",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    data: formData,
  });
};

export const sendSms = (phone: string) => {
  const formData = new FormData();
  formData.append("phone", phone); // 设置 mobile 字段
  formData.append("type", "1"); // 设置 type 字段
  return request({
    url: "/user/send_sms",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    data: formData,
  });
};

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

export const mobileRegister = (phone: string, nickname: string, password: string, code: string) => {
  const formData = new FormData();
  formData.append("phone", phone);
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

export const ifHaveToken = (token: string) => {
  return request({
    url: "/user/mobile_pwd_login",
    method: "GET",
    headers: {
      "x-token": token,
    },
    params: {
      key: "value",
    },
  });
};

export const getVerification = async () => {
  return request({
    url: "/base/captcha",
    method: "GET",
  });
};

export const emailLogin = (email: string, password: string, captcha_id: string, captcha: string) => {
  return request({
    url: `/user/email_pwd_login?email=${email}&password=${password}&captcha_id=${captcha_id}&captcha=${captcha}`,
    method: "GET",
  });
};

export const mobileLogin = (mobile: string, password: string, captcha_id: string, captcha: string) => {
  return request({
    url: `/user/mobile_pwd_login?mobile=${mobile}&password=${password}&captcha_id=${captcha_id}&captcha=${captcha}`,
    method: "GET",
  });
};

