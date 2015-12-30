// import assign from 'object-assign'

function element (tag, props, children) {
  if (props && props.class) {
    props.className = props.class
    // props = assign({}, props, { className: props.class })
  }

  // todo: onClick -> onclick
  return {
    tag: tag,
    props: props,
    children: Array.prototype.slice.call(arguments, 2)
  }
}

module.exports = element
