export const SET_USER_INFO = 'SET_USER_INFO'

export const REMOVE_USER_INFO = 'REMOVE_USER_INFO'

export function setUserInfo (value) {
  return {
    type: SET_USER_INFO,
    payload: value
  }
}

export function removeUserInfo () {
  return {
    type: REMOVE_USER_INFO
  }
}
