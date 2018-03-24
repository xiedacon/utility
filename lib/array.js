'use strict'

/**
 * get difference items in source array
 *
 * @param {Array} source -- source array
 * @param {Array<Array>} arrs -- omit arrays
 */
exports.diff = (source, ...arrs) => {
  if (!Array.isArray(source)) return source
  if (source.length === 0) return source
  if (arrs.length === 0) return source

  return Array.from(new Set(arrs.reduce((total, arr) => total.concat(arr)))).reduce((res, val) => {
    let i = res.indexOf(val)

    return i < 0 ? res : res.slice(0, i).concat(res.slice(i + 1))
  }, source)
}
