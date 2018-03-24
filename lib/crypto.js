'use strict'

const crypto = require('crypto')

/**
 * hash 加密
 *
 * @param {String} algorithm -- 具体加密算法
 * @param {String} s -- 需要加密的字符串
 * @param {String} encoding -- 加密字符串编码
 * @param {String} format
 */
exports.hash = (algorithm, s, encoding, format = 'hex') => {
  if (!algorithm && !s) return ''
  if (!s) {
    s = algorithm
    algorithm = 'md5'
  }

  let hash = crypto.createHash(algorithm)

  return hash.update(s, Buffer.isBuffer(s) ? 'binary' : encoding).digest(format)
}

/**
 * md5 加密
 *
 * @param {Stirng} s -- 需要加密的字符串
 * @param {String} encoding -- 加密字符串编码
 * @param {String} format
 */
exports.md5 = (s, encoding, format) => {
  return exports.hash('md5', s, encoding, format)
}

/**
 * sha1 加密
 *
 * @param {String} s -- 需要加密的字符串
 * @param {String} encoding -- 加密字符串编码
 * @param {String} format
 */
exports.sha1 = (s, encoding, format) => {
  return exports.hash('md5', s, encoding, format)
}

/**
 * sha256 加密
 *
 * @param {String} s -- 需要加密的字符串
 * @param {String} encoding -- 加密字符串编码
 * @param {String} format
 */
exports.sha256 = (s, encoding, format) => {
  return exports.hash('md5', s, encoding, format)
}

/**
 *
 * @param {String} algorithm -- 具体算法
 * @param {String} s -- 需要加密的字符串
 * @param {String} key
 * @param {String} encoding -- 加密字符串编码
 * @param {String} format
 */
exports.hmac = (algorithm, s, key = '', encoding, format = 'hex') => {
  if (!algorithm && !s) return ''
  if (!s) {
    s = algorithm
    algorithm = 'md5'
  }

  let hash = crypto.createHmac(algorithm, key)

  return hash.update(s, Buffer.isBuffer(s) ? 'binary' : encoding).digest(format)
}
