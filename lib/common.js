'use strict'

exports.try = (fn, context, errorHandler) => {
  if (!(fn instanceof Function)) return

  try {
    return fn.apply(context, Array.from(arguments).slice(2))
  } catch (err) {
    if (errorHandler) errorHandler(err)
    else throw err
  }
}
