/*
 * Returns a vnode to be consumed by render()
 */

function element (tag, props, ...children) {
  if (props) {
    // class => className
    // TODO properly omit `class`
    if (props.class) props = { ...props, class: undefined, className: props.class }

    // onClick => onclick
    Object.keys(props).forEach((key) => {
      let m = key.match(/^on([A-Z][a-z]+)$/)
      if (m) props = { ...props, [key]: undefined, [key.toLowerCase()]: props[key] }
    })
  }

  return { tag, props, children }
}

module.exports = element
