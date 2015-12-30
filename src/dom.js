import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import fixProps from './fix_props'
import getId from './id'

/*
 * Creates a renderer function. Rteurns a function `render(vnode, [context])`
 * where `vnode` is the output of `element()`.
 */

function createRenderer (rootEl, dispatch) {
  var states = {}
  var tree = h('noscript')
  var rootNode = createElement(tree)
  rootEl.appendChild(rootNode)

  return render

  function render (el, context) {
    while (true) {
      var pass = buildPass(context, dispatch, states)
      var newTree = pass.convert(el)
      var delta = diff(tree, newTree)
      rootNode = patch(rootNode, delta)
      tree = newTree

      if (!propagateState(pass.stateChanges)) break
    }
  }

  function propagateState (changes) {
    if (!Object.keys(changes).length) return
    Object.keys(changes).forEach((path) => {
      if (!states[path]) states[path] = {}
      states[path] = { ...states[path], ...changes[path] } 
    })
    return true
  }
}

/*
 * A rendering pass.
 * This closure is responsible for:
 *
 * - keeping aware of `context` and `state` to be passed down to Components
 * - queue up `stateChanges` so that it can be picked up later (by `render()`)
 */

function buildPass (context, dispatch, states) {
  const stateChanges = {}
  const pass = { convert, setState, stateChanges, states }
  return pass

  /*
   * Converts a vnode (`element()` output) to a virtual hyperscript element.
   * This is curried to keep the `context` and `dispatch` alive recursively.
   * https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md
   */

  function convert (el) {
    if (typeof el === 'string') return el
    if (typeof el === 'number') return '' + el
    if (typeof el === 'undefined' || el === null) return
    if (Array.isArray(el)) return el.map(convert)
    if (typeof el !== 'object') throw new Error('wot m8')

    const { tag, props, children } = el

    // Defer to Widget if it's a component
    if (typeof tag === 'object') {
      if (!tag.render) throw new Error('no render() in component')
      return new Widget(
        { component: tag, props, children },
        { context, dispatch },
        pass)
    }

    return h(tag, fixProps(props), children.map(convert))
  }

  /*
   * Called by widget
   */

  function setState (path, state = {}) {
    if (!stateChanges[path]) stateChanges[path] = {}
    stateChanges[path] = { ...stateChanges[path], ...state }
  }
}

/*
 * A widget that represents a component.
 * We need to do this to hook lifecycle hooks properly.
 */

function Widget ({ component, props, children }, model, pass) {
  if (!props) props = {}
  this.component = component
  this.pass = pass

  // The parameters to be passed onto the component's functions.
  this.model = { props: { ...props, children }, ...model }
}

Widget.prototype.type = 'Widget'

/*
 * On widget creation, do the virtual-dom createElement() dance
 */

Widget.prototype.init = function () {
  const id = this.setId(getId())
  this.model.state = this.trigger('initialState')

  // Create the virtual-dom tree
  const el = this.component.render(this.model)
  this.tree = this.pass.convert(el) // virtual-dom vnode
  this.rootNode = createElement(this.tree) // DOM element
  this.rootNode._dekuId = id // so future update() and destroy() can see it

  // Trigger
  this.trigger('onCreate')

  // Export
  return this.rootNode
}

/*
 * On update, diff with the previous (also a Widget)
 */

Widget.prototype.update = function (previous, domNode) {
  this.setId(domNode._dekuId)

  // Re-render the component
  const el = this.component.render(this.model)
  this.tree = this.pass.convert(el)

  // Patch the DOM node
  var delta = diff(previous.tree, this.tree)
  this.rootNode = patch(previous.rootNode, delta)

  this.trigger('onUpdate')
}

/*
 * On destroy, trigger the onRemove hook.
 */

Widget.prototype.destroy = function (domNode) {
  this.setId(domNode._dekuId)
  this.trigger('onRemove')
}

/*
 * Updates the model with things that it can have when `id` is available.
 * This is because `id`'s aren't always available when Widget is initialized,
 * so these can't be in the ctor.
 */

Widget.prototype.setId = function (id) {
  this.model.path = id
  this.model.setState = this.pass.setState.bind(this, id)
  this.model.state = this.pass.states[id]
  return id
}

/*
 * Trigger a Component lifecycle event.
 */

Widget.prototype.trigger = function (hook, id) {
  if (!this.component[hook]) return
  return this.component[hook](this.model)
}

module.exports = { createRenderer }
