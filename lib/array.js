'use strict'

exports.diff = (source, ...arrs) => {
  if (!Array.isArray(source)) return source

  return diff.apply(null, [source].concat(arrs))
}

function diff (source, ...arrs) {
  if (source.length === 0) return source
  if (arrs.length === 0) return source

  return diff.apply(null, [arrs.pop().reduce((res, val) => {
    let i = res.indexOf(val)

    return i < 0 ? res : res.slice(0, i).concat(res.slice(i + 1))
  }, source)].concat(arrs))
}
