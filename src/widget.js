'use strict'

import getId from './id'
import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

/*
 * A widget that represents a component.
 * We need to do this to hook lifecycle hooks properly.
 *
 * Consumed in virtual-dom like so:
 *
 *     h('div', {}, [ new Widget(el, model, pass) ])
 *
 *     widget.init()
 *     widget.update()
 *     widget.remove()
 */

function Widget ({ component, props, children }, model, pass, commitState) {
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

  // Silently propagate it, don't trigger a re-render
  this.pass.commitState(id, this.model.state)

  // Create the virtual-dom tree
  const el = this.component.render(this.model)
  this.tree = this.pass.build(el) // virtual-dom vnode
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
  this.tree = this.pass.build(el)

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

module.exports = Widget
