import Mock from 'mockjs'

//延时500-1000毫秒请求到数据
Mock.setup({
  timeout: '500-1000'
})

function createReturnedData (data) {
  return {
    actionResult: '1',
    data: data,
    message: ''
  }
}

// login
Mock.mock('/api/login', 'post', () => {
  const data = {
    token: '123456'
  }
  return createReturnedData(data)
})
