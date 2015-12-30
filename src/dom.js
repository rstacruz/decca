import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import buildPass from './pass'

/*
 * Creates a renderer function. Rteurns a function `render(vnode, [context])`
 * where `vnode` is the output of `element()`.
 */

function createRenderer (rootEl, dispatch) {
  var states = {}
  var tree, rootNode
  render.states = states // Export for debugging

  return render

  /*
   * Renders an element `el` (output of `element()`) with the given `context`
   */

  function render (el, context) {
    while (true) {
      var pass = buildPass(context, dispatch, states, commitState)

      // Update DOM
      update(el, pass)

      // Collect state changes; any further changes will be async
      var stateChanges = pass.flush()
      pass.onchange(setStateAsync.bind(this, el, context))

      // Save changes
      if (!commitState(stateChanges)) break
    }
  }

  /*
   * Internal: Updates the DOM tree with the given element `el`.
   */

  function update (el, pass) {
      if (!tree) {
        // Build initial tree
        tree = pass.convert(el)
        rootNode = createElement(tree)
        rootEl.appendChild(rootNode)
      } else {
        // Build diff
        var newTree = pass.convert(el)
        var delta = diff(tree, newTree)
        rootNode = patch(rootNode, delta)
        tree = newTree
      }
  }

  /*
   * Internal: Update state after the tree has been updated.
   */

  function setStateAsync (el, context, changes) {
    commitState(changes)
    render(el, context)
  }

  /*
   * Internal: Save changes silently; will not trigger re-renders.
   * Used by Widget for `initialState()`.
   */

  function commitState (changes) {
    if (!Object.keys(changes).length) return
    Object.keys(changes).forEach((path) => {
      if (!states[path]) states[path] = {}
      states[path] = { ...states[path], ...changes[path] }
    })
    return true
  }
}

module.exports = { createRenderer }
