'use strict'

const stream = require('stream')

/**
 * change stream to string
 *
 * @param {Stream} stream -- stream change to string
 * @param {String} encoding -- encoding of string
 * @returns {Promise<String>}
 */
exports.streamToString = async (stream, encoding) => {
  return (await exports.streamToBuffer(stream)).toString(encoding)
}

/**
 * change stream to buffer
 *
 * @param {Stream} stream -- stream change to buffer
 * @returns {Promise<Buffer>}
 */
exports.streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    let buffers = []

    stream.on('data', (chunk, encoding) => {
      buffers.push(chunk)
    })

    stream.on('end', (chunk) => {
      if (chunk) buffers.push(chunk)

      resolve(Buffer.concat(stream._readableState.encoding
        ? buffers.map(s => Buffer.from(s, stream._readableState.encoding))
        : buffers))
    })

    stream.on('error', reject)
  })
}

/**
 * change string to stream
 *
 * @param {String} str -- string change to stream
 * @param {String} encoding -- encoding of string
 */
exports.stringToStream = (str, encoding) => {
  return exports.bufferToStream(Buffer.from(str, encoding))
}

/**
 * change buffer to stream
 *
 * @param {Buffer} buffer -- buffer change to stream
 */
exports.bufferToStream = (buffer) => {
  let s = new stream.PassThrough()
  s.write(buffer)

  return s
}
