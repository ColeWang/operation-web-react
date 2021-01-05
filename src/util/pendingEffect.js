/**
 * 解决 button等组件loading状态
 */

// @todo 实验 慎用
export function pendingEffect (target, func) {
  function setLoading (val) {
    this.setState({
      loading: val
    })
  }

  const baseHandler = {
    construct () {
      throw new TypeError('Does not support the new ()')
    },
    apply (trapTarget, thisArg, argumentList) {
      const loading = target.state.loading
      if (loading === false || loading === true) {
        if (!loading) {
          void async function () {
            setLoading.call(target, true)
            await Reflect.apply(trapTarget, thisArg, argumentList)
            setLoading.call(target, false)
          }()
        }
      } else {
        throw new TypeError('Expected a state.loading')
      }

    }
  }
  return new Proxy(func, baseHandler)
}
