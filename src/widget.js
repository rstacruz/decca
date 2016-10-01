'use strict'

import getId from './id'

const createElement = require('virtual-dom/create-element')
const diff = require('virtual-dom/diff')
const patch = require('virtual-dom/patch')
const assign = require('object-assign')

/*
 * A widget that represents a component.
 * We need to do this to hook lifecycle hooks properly.
 *
 * Consumed in virtual-dom like so:
 *
 *     h('div', {}, [ new Widget(el, model, build) ])
 *
 *     widget.init()
 *     widget.update()
 *     widget.remove()
 */

export default function Widget ({ component, props, children }, model, build) {
  if (!props) props = {}
  this.component = component
  this.build = build

  // The parameters to be passed onto the component's functions.
  this.model = assign({}, { props, children }, model)
}

Widget.prototype.type = 'Widget'

/*
 * On widget creation, do the virtual-dom createElement() dance
 */

Widget.prototype.init = function () {
  const id = setId(this, getId())

  // Create the virtual-dom tree
  const el = this.component.render(this.model)
  this.el = el
  this.tree = this.build(el) // virtual-dom vnode
  this.rootNode = createElement(this.tree) // DOM element
  this.rootNode._dekuId = id // so future update() and destroy() can see it

  // Trigger
  trigger(this, 'onCreate')

  // Export
  return this.rootNode
}

/*
 * On update, diff with the previous (also a Widget)
 */

Widget.prototype.update = function (previous, domNode) {
  setId(this, domNode._dekuId)

  // Re-render the component
  const el = this.component.render(this.model)

  // If it was memoized, don't patch.
  // Just make this widget a copy of the previous.
  if (previous.el === el) {
    this.tree = previous.tree
    this.rootNode = previous.rootNode
    this.el = el
    return
  }

  this.tree = this.build(el)

  // Patch the DOM node
  var delta = diff(previous.tree, this.tree)
  this.rootNode = patch(previous.rootNode, delta)
  this.el = el

  trigger(this, 'onUpdate')
}

/*
 * On destroy, trigger the onRemove hook.
 */

Widget.prototype.destroy = function (domNode) {
  setId(this, domNode._dekuId)
  trigger(this, 'onRemove')
}

/*
 * Updates the model with things that it can have when `id` is available.
 * This is because `id`'s aren't always available when Widget is initialized,
 * so these can't be in the ctor.
 */

function setId (widget, id) {
  widget.model.path = id
  return id
}

/*
 * Trigger a Component lifecycle event.
 */

function trigger (widget, hook, id) {
  if (!widget.component[hook]) return
  return widget.component[hook](widget.model)
}
