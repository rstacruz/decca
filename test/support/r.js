/*
 * Helper
 */

import { dom } from '../../src'

module.exports = function r (...args) {
  const div = document.createElement('div')
  const render = dom.createRenderer(div)
  render(...args)
  return { div, render }
}
