import request from '@/common/request'

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
