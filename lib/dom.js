import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

function createRenderer (el) {
  var tree = h('noscript')
  var rootNode = createElement(tree)
  el.appendChild(rootNode)

  return function render (tree, context) {
    var newTree = toHyper(context, tree)
    var delta = diff(tree, newTree)
    rootNode = patch(rootNode, delta)
    tree = newTree
  }
}

/*
 * Converts an element() to a virtual hyperscript element.
 * https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md
 */

function toHyper (context, el) {
  var bound = toHyper.bind(this, context)
  if (typeof el === 'string') return el
  if (typeof el === 'number') return '' + el
  if (typeof el === 'undefined' || el === null) return
  if (Array.isArray(el)) return el.map(bound)
  if (typeof el !== 'object') throw new Error('wot m8')

  const { tag, props, children } = el
  if (typeof tag === 'object') {
    return bound(tag.render({ props: props, context }))
  }
  return h(tag, props, children.map(bound))
}

module.exports = { createRenderer }
