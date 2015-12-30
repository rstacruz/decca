import dom from './dom'

function element (tag, attrs, children) {
  return {
    tag: tag,
    attrs: attrs,
    children: Array.prototype.slice.call(arguments, 2)
  }
}

module.exports = { dom, element }
