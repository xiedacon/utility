'use strict'

/**
 * try-wrapper
 *
 * @param {Function} fn -- 可能报错的函数
 * @param {Object} context -- 执行上下文
 * @param {Function} errorHandler -- 错误处理
 */
exports.try = (fn, context, errorHandler) => {
  if (!(fn instanceof Function)) return

  try {
    return fn.apply(context, Array.from(arguments).slice(2))
  } catch (err) {
    if (errorHandler) errorHandler(err)
    else throw err
  }
}

/**
 * do nothing
 */
exports.noop = () => { }

/**
 * call function only once
 *
 * @param {Function} fn -- function called only once
 */
exports.once = (fn) => {
  let done = false

  return function (...args) {
    if (done) return
    done = true

    fn.apply(this, args)
  }
}
