/*
 * Returns a vnode to be consumed by render()
 */

function element (tag, props, ...children) {
  return { tag, props, children }
}

module.exports = element
