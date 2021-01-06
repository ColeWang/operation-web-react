export const SET_USER_INFO = 'SET_USER_INFO'

export function setUserInfo (value) {
  return {
    type: SET_USER_INFO,
    payload: value
  }
}
