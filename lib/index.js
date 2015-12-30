import dom from './dom'
import assign from 'object-assign'

function element (tag, attrs, children) {
  if (attrs && attrs.class) {
    attrs = assign({}, attrs, { className: attrs.class })
  }
  return {
    tag: tag,
    attrs: attrs,
    children: Array.prototype.slice.call(arguments, 2)
  }
}

module.exports = { dom, element }
