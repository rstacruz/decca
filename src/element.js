/*
 * Returns a vnode to be consumed by render()
 */

function element (tag, props, ...children) {
  if (props && props.class) {
    props.className = props.class
  }

  return { tag, props, children }
}

module.exports = element
