/**
 * @FileDesc: sort 排序
 * @Author: Jack
 * @Date: 2018-05-08 22:05:52
 * @Last Modified by: Jack
 * @Last Modified time: 2018-05-08 23:32:00
 */
/**
 * date
 */
export const sortBy = (name, type = true) => {
  return (prev, next) => {
    const valPrev = prev[name]
    const valNext = next[name]
    const rev = type ? 1 : -1

    if (valPrev < valNext) {
      return -1 * rev
    }
    if (valPrev > valNext) {
      return 1 * rev
    }
    return 0
  }
}
