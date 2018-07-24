/**
 * @FileDesc: format
 * @Author: Jack
 * @Date: 2018-05-08 22:05:52
 * @Last Modified by: Jack
 * @Last Modified time: 2018-05-19 04:31:25
 */
const addZero = num => (num < 10 ? '0' + num : num)
/**
 * 时间戳 转换为 时间
 * timestamp => 22:22:22
 */
export const time = timestamp => {
  const date = new Date(Number(timestamp))
  const hour = addZero(date.getHours())
  const min = addZero(date.getMinutes())
  const sec = addZero(date.getSeconds())
  return `${hour}:${min}:${sec}`
}
export const date = function (timeYmd, symbol = '-') {
  const newdate = new Date(Number(timeYmd))
  const year = addZero(newdate.getFullYear())
  const month = addZero(newdate.getMonth() + 1)
  const dateTime = addZero(newdate.getDate())
  return `${year}${symbol}${month}${symbol}${dateTime}`
}
