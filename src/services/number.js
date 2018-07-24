/**
 * @FileDesc: 数值计算
 * @Author: Jack
 * @Date: 2018-05-15 16:34:23
 * @Last Modified by: Jack
 * @Last Modified time: 2018-05-30 12:00:15
 */
import Big from 'big.js'

export function newBig (x) {
  if (typeof x === 'number') {
    return new Big(x)
  } else if (typeof x === 'string') {
    return new Big(Number(x))
  } else {
    return new Big(0)
  }
}

/**
 * type: 1 四舍五入
 * type: 0 末尾舍去
 */
export const round = (x, n, type = 1) => {
  x = newBig(x)
  return x.round(n, type)
}

/**
 * 四舍五入，末尾补零
 */
export const toFixed = (x, n) => {
  x = newBig(x)
  return x.toFixed(n)
}

/**
 * x
 */
export const times = (x, y) => {
  x = newBig(x)
  const r = x.times(y)
  return r
}

/**
 * +
 */
export const plus = (x, y) => {
  x = newBig(x)
  const r = x.plus(y)
  return r
}

/**
 * -
 */
export const minus = (x, y) => {
  x = newBig(x)
  const r = x.minus(y)
  return r
}
