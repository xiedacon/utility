'use strict'

/**
 * get string width
 *
 * https://github.com/sindresorhus/string-width
 *
 * @param {String} s -- string to get width
 */
exports.width = (s) => {
  if (typeof s !== 'string') return 0

  let width = 0
  for (let i = 0; i < s.length; i++) {
    let code = s.codePointAt(i)

    if (
      (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) ||
      (code >= 0x300 && code <= 0x36F)
    ) continue

    if (code > 0xFFFF) i++

    width += isFullwidthCodePoint(code) ? 2 : 1
  }

  return width
}

function isFullwidthCodePoint (x) {
  if (
    x >= 0x1100 && (
      x <= 0x115F ||  // Hangul Jamo
      x === 0x2329 || // LEFT-POINTING ANGLE BRACKET
      x === 0x232A || // RIGHT-POINTING ANGLE BRACKET
      // CJK Radicals Supplement .. Enclosed CJK Letters and Months
      (x >= 0x2E80 && x <= 0x3247 && x !== 0x303F) ||
      // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
      (x >= 0x3250 && x <= 0x4DBF) ||
      // CJK Unified Ideographs .. Yi Radicals
      (x >= 0x4E00 && x <= 0xA4C6) ||
      // Hangul Jamo Extended-A
      (x >= 0xA960 && x <= 0xA97C) ||
      // Hangul Syllables
      (x >= 0xAC00 && x <= 0xD7A3) ||
      // CJK Compatibility Ideographs
      (x >= 0xF900 && x <= 0xFAFF) ||
      // Vertical Forms
      (x >= 0xFE10 && x <= 0xFE19) ||
      // CJK Compatibility Forms .. Small Form Variants
      (x >= 0xFE30 && x <= 0xFE6B) ||
      // Halfwidth and Fullwidth Forms
      (x >= 0xFF01 && x <= 0xFF60) ||
      (x >= 0xFFE0 && x <= 0xFFE6) ||
      // Kana Supplement
      (x >= 0x1B000 && x <= 0x1B001) ||
      // Enclosed Ideographic Supplement
      (x >= 0x1F200 && x <= 0x1F251) ||
      // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
      (x >= 0x20000 && x <= 0x3FFFD)
    )
  ) {
    return true
  }

  return false
}
