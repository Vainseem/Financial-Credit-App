import Mock from 'mockjs'

Mock.setup({
  timeout: '20-60'
})
Mock.mock("https://www.demo.com/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body)
  if (username === 'admin' && password === 'admin123') {
    return {
      code: 200,
      message: "登陆成功",
      data: {
        username: "admin",
        token: "MockTokenAdmin123"
      }
    }
  } else if (username === 'manager' && password === 'manager123') {
    return {
      code: 200,
      message: "登陆成功",
      data: {
        username: "manager",
        token: "MockTokenManager123"
      }
    }
  } else if (username === 'user' && password === 'user123') {
    return {
      code: 200,
      message: "登陆成功",
      data: {
        nickname: '小满',
        username: "user",
        token: "MockTokenUser123"
      }
    }
  } else {
    return {
      code: 401,
      message: "账号或密码错误",
      data: null
    }
  }

})
//贷款订单
Mock.mock("https://www.demo.com/getLoanOrder", "get", () => {
  return {
    code: 200,
    message: "获取成功",
    data: [
      {
        LoanId: 1,
        LoanAmount: 3000,
        PayMonth: 1,
        CreatAt: '2025-03-12'
      },
      {
        LoanId: 2,
        LoanAmount: 2500,
        PayMonth: 1,
        CreatAt: '2025-04-12'
      },
      {
        LoanId: 3,
        LoanAmount: 6000,
        PayMonth: 5,
        CreatAt: '2025-04-20'
      },
      {
        LoanId: 4,
        LoanAmount: 300000,
        PayMonth: 5,
        CreatAt: '2025-05-12'
      },
      {
        LoanId: 5,
        LoanAmount: 1000,
        PayMonth: 1,
        CreatAt: '2025-05-12'
      },
      {
        LoanId: 6,
        LoanAmount: 6666,
        PayMonth: 1,
        CreatAt: '2025-05-12'
      },
      {
        LoanId: 7,
        LoanAmount: 200,
        PayMonth: 1,
        CreatAt: '2025-05-12'
      },
    ]
  }
})