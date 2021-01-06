import { MAIN_INLINE_STATUS, MAIN_OPEN_KEYS } from '../action/mainAction'

const mainData = {
  inlineStatus: false,
  openKeys: []
}

function mainReducer (state = mainData, action) {
  switch (action.type) {
    case MAIN_INLINE_STATUS:
      return {
        ...state,
        inlineStatus: action.payload
      }
    case MAIN_OPEN_KEYS:
      return {
        ...state,
        openKeys: action.payload
      }
    default:
      return state
  }
}

export default mainReducer
