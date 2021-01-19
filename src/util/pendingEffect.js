/**
 * 解决 button等组件loading状态
 * @param target {any}
 * @param func {function}
 * @param type {string}
 * @param callback {function?}
 * @returns {function(...[*]): Promise<void>}
 */
// @todo Alpha 功能亦未完善 无法像Vue版一样使用
export function pendingEffect (target, func, type, callback) {
  function setLoading (val) {
    this.setState({
      [type]: val
    }, () => {
      callback && callback()
    })
  }

  return async function (...arg) {
    if (!target.state[type]) {
      setLoading.call(target, true)
      await func.call(target, ...arg)
      setLoading.call(target, false)
    }
  }
}
