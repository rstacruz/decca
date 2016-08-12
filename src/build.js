import h from 'virtual-dom/h'
import fixProps from './fix_props'
import Widget from './widget'

module.exports = buildPass

/*
 * A rendering pass.
 * This closure is responsible for:
 *
 * - keeping aware of `context` to be passed down to Components
 *
 *     build = buildPass(...)
 *     build(el)               // render a component/node
 */

function buildPass (context, dispatch) {
  /*
   * Builds from a vnode (`element()` output) to a virtual hyperscript element.
   * The `context` and `dispatch` is passed down recursively.
   * https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md
   */

  return function build (el) {
    if (typeof el === 'string') return el
    if (typeof el === 'number') return '' + el
    if (typeof el === 'undefined' || el === null) return
    if (Array.isArray(el)) return el.map(build)

    const { tag, props, children } = el

    if (typeof tag === 'object') {
      // Defer to Widget if it's a component
      if (!tag.render) throw new Error('no render() in component')
      return new Widget(
        { component: tag, props, children },
        { context, dispatch },
        build)
    } else if (typeof tag === 'function') {
      // Dumb components
      return new Widget(
        { component: { render: tag }, props, children },
        { context, dispatch },
        build)
    }

    return h(tag, fixProps(props), children.map(build))
  }
}
