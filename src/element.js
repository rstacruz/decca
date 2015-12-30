// import assign from 'object-assign'

function element (tag, props, ...children) {
  if (props && props.class) {
    props.className = props.class
    // props = assign({}, props, { className: props.class })
  }

  // todo: onClick -> onclick
  return { tag, props, children }
}

module.exports = element
