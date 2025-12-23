import { request8023 as request } from "@/apis/request";

/**
 * 提交还款信息
 * payload: { borrower_id, loan_id, current_month, payment, time }
 */
export const payMyLoanOrder = (data: {
  borrower_id: number;
  loan_id: number;
  current_month: number;
  payment: number;
  time: string;
}) => {
  return request({
    url: "/user/pay_my_loan_order",
    method: "POST",
    data,
  });
};

// 获取我的还款记录 (根据接口文档 8023 - 2)
export const getMyPayRecords = (borrower_id: number, loan_id: number) => {
  return request({
    url: "/user/get_my_pay_records",
    method: "GET",
    params: {
      borrower_id,
      loan_id
    }
  });
};
