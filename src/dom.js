import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import debounce from 'simpler-debounce'
import buildPass from './build'

/*
 * Creates a renderer function. Returns a function `render(vnode, [context])`
 * where `vnode` is the output of `element()`.
 */

function createRenderer (rootEl, dispatch) {
  var tree, rootNode // virtual-dom states
  var last // last render()

  return render

  /*
   * Renders an element `el` (output of `element()`) with the given `context`
   */

  function render (el, context) {
    last = [ el, context ]
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

module.exports = { createRenderer }
