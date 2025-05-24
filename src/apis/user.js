import { request } from "./request";

export const getUserInfo = (id) => {
  return request({
    url: `user/get_user_info?id=${id}`,
    method: "GET",
  });
};

export const updateUserInfo = (data) => {
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("address", data.address);
  formData.append("mobile", data.mobile);
  formData.append("email", data.email);
  formData.append("gender", data.gender);
  formData.append("id_number", data.id_number);
  formData.append("marital_status", data.marital_status);
  formData.append("career", data.career);
  formData.append("emergency_contact", data.emergency_contact);
  formData.append("photo", data.photo);
  formData.append("name", data.name);

  return request({
    url: "/user/update_user_info",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
