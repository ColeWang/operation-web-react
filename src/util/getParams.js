/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export function getParams (url) {
  const keyValueArr = url.split('?')[1].split('&')
  const paramObj = {}
  keyValueArr.forEach((item) => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}
