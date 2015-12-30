/*
 * Fixes props for virtual-dom's consumption
 */

module.exports = function fixProps (props) {
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

  return props
}

