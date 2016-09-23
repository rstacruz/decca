/**
 * @module decca/dom
 */

import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import buildPass from './build'

/**
 * Creates a renderer function that will update the given `rootEl` DOM Node if
 * called.
 *
 * @param {DOMNode} el The DOM element to mount to
 * @param {function=} dispatch The dispatch function to the store
 * @return {render} a renderer function; see [render](#render)
 */

function createRenderer (rootEl, dispatch) {
  var tree, rootNode // virtual-dom states
  return render

  /*
   * Renders an element `el` (output of `element()`) with the given `context`
   */

  function render (el, context) {
    var build = buildPass(context, dispatch)
    update(build, el) // Update DOM
  }

  /*
   * Internal: Updates the DOM tree with the given element `el`.
   * Either builds the initial tree, or makes a patch on the existing tree.
   */

  function update (build, el) {
    if (!tree) {
      // Build initial tree
      tree = build(el)
      rootNode = createElement(tree)
      rootEl.innerHTML = ''
      rootEl.appendChild(rootNode)
    } else {
      // Build diff
      var newTree = build(el)
      var delta = diff(tree, newTree)
      rootNode = patch(rootNode, delta)
      tree = newTree
    }
  }
}

/*
 * Export
 */

module.exports = { createRenderer }

/**
 * A renderer function returned by [createRenderer()](#createrenderer).
 *
 * @callback render
 * @param {Element} element Virtual element to render; given by [element()](#element)
 * @param {*=} context The context to be passed onto the components as `context`
 */
