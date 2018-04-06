'use strict'

exports.promisify = (fn) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.apply(this, args.slice(0, fn.length - 1).concat((err, data) => {
        if (err) reject(err)
        else resolve(data)
      }))
    })
  }
}

exports.promisifyAll = (obj, filter) => {
  if (!(filter instanceof Function)) filter = defaultFilter

  return Object.setPrototypeOf(Object.keys(obj).reduce((res, key) => {
    if (filter(obj, key)) {
      res[key] = exports.promisify(obj[key])
    }

    return res
  }, {}), obj)
}

function defaultFilter (obj, key) {
  return obj[key] instanceof Function &&
    key.charAt(0) !== '_' &&
    key !== 'constructor'
}
