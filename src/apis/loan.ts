import { request } from "@/apis/request";
// const request = axios.create({
//   baseURL: "https://dahkalfalaf.asia/api2/l/v1/",
//   timeout: 5000,
// });

// export const getLoanOrder = (params: object) => {
//   return request.get("/user/get_my_loan_order", { params });
// };

export const getLoanOrder = () => {
  return request({
    url: '/getLoanOrder',
    method: 'get'
  })
}
//@ts-ignore
export const submitLoanApplication = (id, form, interestRate, totalRepayAmount, monthPay) => {
  let formData = new FormData();
  formData.append("borrower_id", id);
  formData.append("loan_amount", form.loanAmount);
  formData.append("pay_month", form.loanTerm);
  formData.append("interest_rate", interestRate);
  //@ts-ignore
  formData.append("total_repay_amount", Math.ceil(totalRepayAmount));
  //@ts-ignore
  formData.append("month_pay", Math.ceil(monthPay));
  return request({
    method: "POST",
    url: "/user/submit_loan_application",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
