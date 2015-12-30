import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

// element(tag, attrs, children...)
// <div> ('div', null)
// <div a={b}> ('div', { a: b, ... })

// var tree = h(...)
// var rootNode = createElement(tree)
// document.body.appendChild(rootNode)

// var delta = diff(tree, newTree)
// rootNode = patch(rootNode, delta)
// tree = new tree
function createRenderer (el) {
  var tree = h('noscript')
  var rootNode = createElement(tree)
  el.appendChild(rootNode)

  return function render (tree) {
    var newTree = toHyper(tree)
    var delta = diff(tree, newTree)
    rootNode = patch(rootNode, delta)
    tree = newTree
  }
}

/*
 * Converts an element() to a virtual hyperscript element.
 * https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md
 */

function toHyper (el) {
  if (typeof el === 'string') return el
  if (typeof el === 'number') return '' + el
  if (typeof el === 'undefined' || el === null) return
  if (Array.isArray(el)) return el.map(toHyper)
  if (typeof el !== 'object') throw new Error('wot m8')

  const { tag, attrs, children } = el
  if (typeof tag === 'object') {
    return toHyper(tag.render({ props: attrs }))
  }
  return h(tag, attrs, children.map(toHyper))
}

module.exports = { createRenderer }
