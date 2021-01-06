import { SET_USER_INFO } from '../action/user'

const userData = {
  userInfo: {
    // 有无用户数据
    hasGetInfo: false,
    // 用户权限信息
    access: []
  }
}

function user (state = userData, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        userInfo: action.payload
      }
    default:
      return state
  }
}

export default user
