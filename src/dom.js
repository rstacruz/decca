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
    const model = { props: { ...props, children }, context, dispatch }
    const el = component.render(model)

    // Inject a virtual-dom lifecycle hook
    if (!el.props) el.props = {}
    el.props['deku-hook'] = new Hook(component, model)

    return convert(el)
  }
}

module.exports = { createRenderer }

/*
 * Life cycle hook; called by virtual-dom
 */

function Hook (component, model) {
  this.component = component
  this.model = model
}

Hook.prototype.hook = function (domEl, prop, previous) {
  if (this.component.onCreate && !previous) {
    domEl._dekuId = getId()
    this.component.onCreate({ ...this.model, path: domEl._dekuId })
  }
  if (this.component.onUpdate && previous) {
    // absorb the id
    this.component.onUpdate({ ...this.model, path: domEl._dekuId })
  }
}

Hook.prototype.unhook = function (domEl, prop, previous) {
  if (this.component.onRemove) {
    this.component.onRemove({ ...this.model, path: domEl._dekuId })
  }
}
