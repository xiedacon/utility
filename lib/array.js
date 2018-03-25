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

/**
 * sort array
 *
 * @param {Array} arr -- array will be sort
 * @param {String} key -- key to sort array, optional
 */
exports.sort = (arr, key) => {
  if (!Array.isArray(arr)) return arr
  if (arr.length < 2) return arr

  if (!key) {
    key = Symbol('sort')
    return sort(arr.map(o => ({ [key]: o })), key).map(o => o[key])
  } else return sort(arr, key)
}

function sort (arr, key) {
  let len = Math.max.apply(Math, arr.map(o => (o[key] || '').toString().split(/\./)[0].length))

  let map = arr.reduce((map, obj) => {
    let val = (obj[key] || '').toString()
    val = Array(len - val.split(/\./)[0].length).fill('0').concat(val).join('');

    (map[val] = map[val] || []).push(obj)

    return map
  }, {})

  return Object.keys(map).sort().reduce((res, key) => res.concat(map[key]), [])
}
