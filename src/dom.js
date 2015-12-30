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
  return convert
  
  function convert (el) {
    if (typeof el === 'string') return el
    if (typeof el === 'number') return '' + el
    if (typeof el === 'undefined' || el === null) return
    if (Array.isArray(el)) return el.map(convert)
    if (typeof el !== 'object') throw new Error('wot m8')

    const { tag, props, children } = el

    if (typeof tag === 'object') return convertComponent(tag, props, children)
    return h(tag, props, children.map(convert))
  }

  // Render a component
  function convertComponent (component, props = {}, children) {
    return new Widget(component, props, children, { context, dispatch }, convert)
  }
}

/*
 * A widget that represents a component.
 * We need to do this to hook lifecycle hooks properly.
 */

function Widget (component, props, children, model, convert) {
  this.component = component
  this.props = props || {}
  this.children = children
  this.convert = convert
  this.model = { props: { ...this.props, children }, ...model }
}

Widget.prototype.type = 'Widget'

Widget.prototype.init = function () {
  const id = getId()
  this.model.path = id

  if (this.component.onCreate) {
    this.component.onCreate(this.model)
  }

  const el = this.component.render(this.model)
  this.tree = this.convert(el) // virtual-dom vnode
  this.rootNode = createElement(this.tree) // DOM element
  this.rootNode._dekuId = id
  return this.rootNode
}

Widget.prototype.update = function (previous, domNode) {
  this.model.path = domNode._dekuId
  if (this.component.onUpdate) {
    this.component.onUpdate(this.model)
  }
  const el = this.component.render(this.model)
  this.tree = this.convert(el)

  var delta = diff(previous.tree, this.tree)
  this.rootNode = patch(previous.rootNode, delta)
}

Widget.prototype.destroy = function (domNode) {
  this.model.path = domNode._dekuId
  if (this.component.onRemove) {
    this.component.onRemove(this.model)
  }
}

module.exports = { createRenderer }
