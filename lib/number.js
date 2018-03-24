'use strict'

/**
 * 生成一个在 begin 和 end 之间的随机数
 *
 * @param {Number} begin -- 从..
 * @param {Number} end -- 到..
 */
exports.random = (begin = 0, end = 1) => {
  return Math.random() * (end - begin) + begin
}
