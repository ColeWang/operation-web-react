// inline status
export const MAIN_INLINE_STATUS = 'MAIN_INLINE_STATUS'

// submenu open keys
export const MAIN_OPEN_KEYS = 'MAIN_OPEN_KEYS'

export function setInlineStatus (value) {
  return {
    type: MAIN_INLINE_STATUS,
    payload: value
  }
}

export function setOpenKeys (value) {
  return {
    type: MAIN_OPEN_KEYS,
    payload: value
  }
}
