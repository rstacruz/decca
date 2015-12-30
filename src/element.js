/*
 * Returns a vnode to be consumed by render()
 */

function element (tag, props, ...children) {
  if (props) {
    if (props.class) props.className = props.class

    Object.keys(props).forEach((key) => {
      let m = key.match(/^on([A-Z][a-z]+)$/)
      if (m) {
        props[key.toLowerCase()] = props[key]
      }
    })
  }

  return { tag, props, children }
}

module.exports = element
