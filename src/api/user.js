import request from '@/common/request'

// login
export function login (data) {
  return new Promise((resolve, reject) => {
    request.post('/api/login', data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 用户信息
export function queryUserInfo () {
  return new Promise((resolve, reject) => {
    request.get('/api/getUserInfo')
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
