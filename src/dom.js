import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import getId from './id'

/*
 * Creates a renderer function. Rteurns a function `render(vnode, [context])`
 * where `vnode` is the output of `element()`.
 */

function createRenderer (rootEl, dispatch) {
  var tree = h('noscript')
  var rootNode = createElement(tree)
  rootEl.appendChild(rootNode)

  return function render (el, context) {
    var newTree = toHyper(context, dispatch)(el)
    var delta = diff(tree, newTree)
    rootNode = patch(rootNode, delta)
    tree = newTree
  }
}

/*
 * Converts a vnode (`element()` output) to a virtual hyperscript element.
 * This is curried to keep the `context` and `dispatch` alive recursively.
 * https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md
 */

function toHyper (context, dispatch) {
  return function convert (el) {
    if (typeof el === 'string') return el
    if (typeof el === 'number') return '' + el
    if (typeof el === 'undefined' || el === null) return
    if (Array.isArray(el)) return el.map(convert)
    if (typeof el !== 'object') throw new Error('wot m8')

    const { tag, props, children } = el

    // Defer to Widget if it's a component
    if (typeof tag === 'object') {
      return new Widget(
        { component: tag, props, children },
        { context, dispatch },
        convert)
    }

    return h(tag, props, children.map(convert))
  }
}

/*
 * A widget that represents a component.
 * We need to do this to hook lifecycle hooks properly.
 */

function Widget ({ component, props, children }, model, convert) {
  this.component = component
  this.props = props || {}
  this.children = children
  this.convert = convert
  this.model = { props: { ...this.props, children }, ...model }
}

Widget.prototype.type = 'Widget'

/*
 * On widget creation, do the virtual-dom createElement() dance
 */

Widget.prototype.init = function () {
  const id = getId()

  // Trigger
  this.trigger('onCreate', { _dekuId: id })

  // Create the virtual-dom tree
  const el = this.component.render(this.model)
  this.tree = this.convert(el) // virtual-dom vnode
  this.rootNode = createElement(this.tree) // DOM element

  // Export
  this.rootNode._dekuId = id
  return this.rootNode
}

/*
 * On update, diff with the previous (also a Widget)
 */

Widget.prototype.update = function (previous, domNode) {
  this.trigger('onUpdate', domNode)

  // Re-render the component
  const el = this.component.render(this.model)
  this.tree = this.convert(el)

  // Patch the DOM nodne
  var delta = diff(previous.tree, this.tree)
  this.rootNode = patch(previous.rootNode, delta)
}

/*
 * On destroy, trigger the onRemove hook
 */

Widget.prototype.destroy = function (domNode) {
  this.trigger('onRemove', domNode)
}

/*
 * Trigger a Component lifecycle event
 */

Widget.prototype.trigger = function (hook, domNode) {
  if (this.component[hook]) {
    this.component[hook](
      { ...this.model, path: domNode._dekuId })
  }
}

module.exports = { createRenderer }
