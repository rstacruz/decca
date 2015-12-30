/**
 * Module dependencies.
 */

var now = Date.now || (() => new Date().getTime())

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce (func, wait, immediate) {
  var timeout, args, context, timestamp, result
  if (null == wait) wait = 100

  function later () {
    var last = now() - timestamp

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  function debounced () {
    debounced.calls++
    context = this
    args = arguments
    timestamp = now()
    var callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }

  debounced.calls = 0

  debounced.cancel = () => {
    context = args = null
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    timestamp = now()
  }

  return debounced
}
