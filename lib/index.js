import dom from './dom'
import assign from 'object-assign'

function element (tag, props, children) {
  if (props && props.class) {
    props = assign({}, props, { className: props.class })
  }
  return {
    tag: tag,
    props: props,
    children: Array.prototype.slice.call(arguments, 2)
  }
}

module.exports = { dom, element }
