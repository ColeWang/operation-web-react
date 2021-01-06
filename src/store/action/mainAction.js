// inline status
export const MAIN_INLINE_STATUS = 'MAIN_INLINE_STATUS'

export function setInlineStatus (value) {
  return {
    type: MAIN_INLINE_STATUS,
    payload: value
  }
}
