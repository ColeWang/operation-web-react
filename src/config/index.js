// 默认首页
export const homePath = '/home'

// token过期时间 默认一天
export const cookieExpires = 1

// 环境变量
const evn = {
  'development': {
    baseURL: '',
  },
  'alpha': {
    baseURL: '',
  },
  'production': {
    baseURL: '',
  }
}

const REACT_APP_ENV = process.env.REACT_APP_ENV

export function baseURL () {
  return evn[REACT_APP_ENV].baseURL
}
