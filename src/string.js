import getId from './id'

function render (el, context) {
  if (typeof el === 'string') return el
  if (typeof el === 'number') return '' + el
  if (Array.isArray(el)) return el.map(render)
  if (typeof el === 'undefined' || el === null) return ''

  const { tag, props, children } = el

  if (typeof tag === 'string') {
    const open = '<' + tag + toProps(props) + '>'
    const close = '</' + tag + '>'
    return open + (children || []).map(render) + close
  }

  if (typeof tag === 'object') {
    if (!tag.render) throw new Error('component has no render()')
    return render(
      tag.render({ props: { ...props, children }, path: getId(), context }),
      context)
  }
}

/*
 * { className: 'foo', id: 'box' } => ' class="foo" id="box"'
 */

function toProps (props) {
  if (!props) return ''
  var result = []

  Object.keys(props).forEach((attr) => {
    if (attr === 'class') return
    if (/^on[A-Za-z]/.test(attr)) return

    const val = props[attr]
    if (typeof val === 'undefined' || val === null) return

    if (attr === 'className') attr = 'class'

    result.push(`${ attr }=${ JSON.stringify(val) }`)
  })
  return result.length ? ' ' + result.join(' ') : ''
}

module.exports = { render }
