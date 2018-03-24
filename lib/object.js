'use strict'

const { diff } = require('./array')

/**
 * check if obj is empty
 *
 * @param {Any} obj
 */
exports.isEmpty = (obj) => {
  if (!obj) return true

  let type = Object.prototype.toString.call(obj)
  if (type === '[object String]') return obj.length === 0
  else if (type === '[object Array]') return obj.length === 0
  else if (type === '[object Map]') return obj.size === 0
  else if (type === '[object Set]') return obj.size === 0
  else if (Object.getOwnPropertyNames(obj).length > 0) return false
  else return true
}

/**
 * get something from obj
 *
 * @param {Object} obj -- source obj
 * @param {String|Array} path -- property path
 * @param {Any} def -- default value
 */
exports.get = (obj, path, def) => {
  if (typeof path === 'string') path = path.split(/\s*\.\s*/g)
  if (!Array.isArray(path)) return def
  if (path.length === 0) return def
  if (path.length === 1) return typeof obj[path[0]] === 'undefined' ? def : obj[path[0]]

  return exports.get(obj[path[0]], path.slice(1), def)
}

/**
 * set something to obj
 *
 * @param {Object} obj -- source obj
 * @param {String|Array} path -- property path
 * @param {Any} value -- default value
 */
exports.set = (obj, path, value) => {
  if (typeof path === 'string') path = path.split(/\s*\.\s*/g)
  if (!Array.isArray(path)) return obj
  if (path.length === 0) return obj

  path.slice(1).reduce(
    (obj, key) => (obj[key] = typeof obj[key] === 'object' ? obj[key] : {}),
    obj
  )[path[0]] = value

  return obj
}

/**
 * pick properties for obj
 *
 * @param {Object} obj -- source obj
 * @param {Array} keys -- property names
 */
exports.pick = (obj, keys) => {
  return keys.reduce((res, key) => {
    res[key] = obj[key]
    return res
  }, {})
}

/**
 * omit properties for obj
 *
 * @param {Object} obj -- source obj
 * @param {Array} keys -- property names
 */
exports.omit = (obj, keys) => {
  return exports.pick(obj, diff(Object.keys(obj), keys))
}

/**
 * simple clone obj implementation
 *
 * @param {Object} obj -- source obj
 * @param {Boolean} deep -- deep clone or not
 */
exports.clone = (obj, deep) => {
  if (typeof obj !== 'object') return obj
  if (obj === null) return obj

  if (deep) return JSON.parse(JSON.stringify(obj))
  else return Object.assign({}, obj)
}

/**
 * simple deep clone obj implementation
 *
 * @param {Object} obj -- source obj
 */
exports.deepClone = (obj) => {
  return exports.clone(obj, true)
}
