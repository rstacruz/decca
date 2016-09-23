/**
 * @module decca/string
 */

import getId from './id'

/**
 * Renders an element into a string without using the DOM.
 *
 * @param {Element} el The Element to render
 * @param {*=} context The context to be passed onto components
 * @returns {string} the rendered HTML string
 */

function render (el, context) {
  if (typeof el === 'string') return el
  if (typeof el === 'number') return '' + el
  if (Array.isArray(el)) return el.map((_el) => render(_el, context))
  if (typeof el === 'undefined' || el === null) return ''

  const { tag, props, children } = el

  if (typeof tag === 'string') {
    const open = '<' + tag + toProps(props) + '>'
    const close = '</' + tag + '>'
    return open +
      (children || []).map((_el) => render(_el, context)).join('') +
      close
  }

  if (typeof tag === 'object') {
    if (!tag.render) throw new Error('component has no render()')
    return render(
      tag.render({ props: { ...props, children }, path: getId(), context }),
      context)
  }

  if (typeof tag === 'function') {
    // Pure components
    return render(
      tag({ props: { ...props, children }, path: getId(), context }),
      context)
  }
}

/*
 * { class: 'foo', id: 'box' } => ' class="foo" id="box"'
 */

function toProps (props) {
  if (!props) return ''
  var result = []

  Object.keys(props).forEach((attr) => {
    if (/^on[A-Za-z]/.test(attr)) return
    const val = props[attr]
    if (typeof val === 'undefined' || val === null) return
    result.push(`${attr}=${JSON.stringify(val)}`)
  })

  return result.length ? ' ' + result.join(' ') : ''
}

module.exports = { render }
