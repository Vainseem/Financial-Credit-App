import { request8081 as request } from "./request";

// 获取用户信息 (根据接口文档 8)
export const getUserInfo = (id: number) => {
  return (request as any)({
    url: '/user/get_user_info',
    method: "GET",
    params: { id }
  });
};

// 修改用户信息 (根据接口文档 9)
export const updateUserInfo = (data: any) => {
  return (request as any)({
    url: "/user/update_user_info",
    method: "POST",
    data: data // 直接发送 JSON 数据，如果后端需要 FormData 也可以改回
  });
};

