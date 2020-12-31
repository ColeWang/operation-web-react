export function hasOneOf (target, arr) {
  return target.some((item) => {
    return arr.indexOf(item) > -1
  })
}

/**
 * 判断元素存在数组中
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
