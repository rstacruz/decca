import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import debounce from './debounce'
import buildPass from './pass'

/*
 * Creates a renderer function. Returns a function `render(vnode, [context])`
 * where `vnode` is the output of `element()`.
 *
 * Internally, it manages the state (exported via `render.states`).
 */

function createRenderer (rootEl, dispatch) {
  var states = {}
  var tree, rootNode // virtual-dom states
  render.states = states // Export for debugging

  return render

  /*
   * Renders an element `el` (output of `element()`) with the given `context`
   */

  function render (el, context) {
    while (true) {
      var rerender = debounce(() => render(el, context), 20)
      var pass = buildPass(context, dispatch, states, commitState, rerender)
      update(pass, el) // Update DOM
      if (rerender.calls === 0) break // no setState => continue
      rerender.cancel() // loop again
    }
    return true
  }

  /*
   * Internal: Updates the DOM tree with the given element `el`.
   * Either builds the initial tree, or makes a patch on the existing tree.
   */

  function update (pass, el) {
    if (!tree) {
      // Build initial tree
      tree = pass.build(el)
      rootNode = createElement(tree)
      rootEl.appendChild(rootNode)
    } else {
      // Build diff
      var newTree = pass.build(el)
      var delta = diff(tree, newTree)
      rootNode = patch(rootNode, delta)
      tree = newTree
    }
  }

  /*
   * Internal: Save changes silently; will not trigger re-renders.
   * Available in a `pass` object.
   * Used by Widget for `initialState()`.
   */

  function commitState (path, changes) {
    states[path] = { ...(states[path] || {}), ...changes }
    return true
  }
}

module.exports = { createRenderer }
