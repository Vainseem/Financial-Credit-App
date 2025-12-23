import { request8082 as request } from "@/apis/request";

/**
 * 提交贷款申请 (根据用户要求使用 FormData)
 */
export const submitLoanApplication = (
  id: any,
  form: any,
  interestRate: any,
  totalRepayAmount: any,
  monthPay: any
) => {
  const formData = new FormData();
  formData.append("borrower_id", id);
  formData.append("loan_amount", form.loanAmount);
  formData.append("pay_month", form.loanTerm);
  formData.append("interest_rate", interestRate);
  formData.append("total_repay_amount", Math.ceil(totalRepayAmount).toString());
  formData.append("month_pay", Math.ceil(monthPay).toString());

  return request({
    method: "POST",
    url: "/user/submit_loan_application",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 获取我的贷款订单 (根据接口文档 8082 - 1)
export const getLoanOrder = (id: number) => {
  return request({
    url: '/user/get_my_loan_order',
    method: 'GET',
    params: { id }
  })
}

// 查看所有贷款申请 (根据接口文档 8082 - 3)
export const viewLoanApplication = (id: number) => {
  return request({
    url: "/user/view loan application",
    method: "GET",
    params: { id }
  });
};

// 取消贷款申请 (根据接口文档 8082 - 4)
export const cancelLoanApplication = (borrower_id: number, loan_id: number) => {
  return request({
    url: "/user/cancel_loan_application",
    method: "POST",
    data: {
      borrower_id,
      loan_id
    }
  });
};
