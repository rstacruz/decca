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

  var states = {}

  return function render (el, context) {
    var pass = buildPass(context, dispatch, states)
    var newTree = pass.convert(el)
    var delta = diff(tree, newTree)
    rootNode = patch(rootNode, delta)
    tree = newTree
  }
}

/*
 * A rendering pass.
 */

function buildPass (context, dispatch, states) {
  const stateChanges = {}
  const pass = { convert, setState }
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

    return h(tag, props, children.map(convert))
  }

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
  this.model = { props: { ...props, children }, ...model }
}

Widget.prototype.type = 'Widget'

/*
 * On widget creation, do the virtual-dom createElement() dance
 */

Widget.prototype.init = function () {
  const id = this.setId(getId())

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
 * On destroy, trigger the onRemove hook
 */

Widget.prototype.destroy = function (domNode) {
  this.model.path = domNode._dekuId
  this.trigger('onRemove')
}

Widget.prototype.setId = function (id) {
  this.model.path = id
  this.model.setState = this.pass.setState.bind(this, id)
  return id
}

/*
 * Trigger a Component lifecycle event
 */

Widget.prototype.trigger = function (hook, id) {
  if (!this.component[hook]) return
  return this.component[hook](this.model)
}

module.exports = { createRenderer }
