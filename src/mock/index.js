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

//AI对话
const replies = {
  '你是谁': '您好，我是您的智能贷款助手，专为解答您的贷款相关问题而设计。无论是贷款申请、额度评估、还款流程等问题，我都可以为您提供快速准确的帮助。',

  '介绍一下我们的贷款系统': '我们的贷款系统采用人工智能技术与大数据风控引擎，致力于为用户提供全流程线上贷款服务。从额度评估、资料审核、放款到账、到期还款全程无需线下操作，方便快捷，放款速度最快可达5分钟。',

  '我应该如何申请贷款': '申请贷款非常简单。您只需在首页点击“借款”按钮，根据提示填写基本身份信息、职业收入情况以及银行卡等资料。提交后系统会立即进行信用评估，评估通过后贷款金额将直接打入您的绑定账户，整个过程平均耗时不超过10分钟。'
}


Mock.mock('/api/chat', 'post', (options) => {
  const { question } = JSON.parse(options.body)
  const normalized = question.trim()
  const answer = replies[normalized] || '很抱歉，我暂时无法理解您的问题。您可以换一种方式描述。'
  return { answer }
})
