import { MAIN_INLINE_STATUS } from '../action/mainAction'

const mainData = {
  inlineStatus: false
}

function mainReducer (state = mainData, action) {
  if (action.type === MAIN_INLINE_STATUS) {
    return {
      inlineStatus: action.payload
    }
  }
  return state
}

export default mainReducer
