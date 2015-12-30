import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import assign from 'object-assign'

function createRenderer (el, dispatch) {
  var tree = h('noscript')
  var rootNode = createElement(tree)
  el.appendChild(rootNode)

  return function render (tree, context) {
    var newTree = toHyper(context, dispatch, tree)
    var delta = diff(tree, newTree)
    rootNode = patch(rootNode, delta)
    tree = newTree
  }
}

/*
 * Converts an element() to a virtual hyperscript element.
 * https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md
 */

function toHyper (context, dispatch, el) {
  var bound = toHyper.bind(this, context, dispatch)
  if (typeof el === 'string') return el
  if (typeof el === 'number') return '' + el
  if (typeof el === 'undefined' || el === null) return
  if (Array.isArray(el)) return el.map(bound)
  if (typeof el !== 'object') throw new Error('wot m8')

  const { tag, props, children } = el
  if (typeof tag === 'object') {
    const model = { props, context, dispatch }
    const el = tag.render(model)
    if (!el.props) el.props = {}
    el.props['deku-hook'] = new Hook(tag, model)
    return bound(el)
  }
  return h(tag, props, children.map(bound))
}

module.exports = { createRenderer }

function Hook (component, model) {
  this.component = component
  this.model = model
}

Hook.prototype.hook = function (domEl) {
  if (this.component.onUpdate) {
    this.component.onUpdate(this.model)
  }
}

Hook.prototype.unhook = function () {
  // not working
  if (this.component.onRemove) {
    this.component.onRemove(this.model)
  }
}
