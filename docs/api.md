# API reference

```js
import { dom, element, string } from 'decca'
```

## dom.createRenderer

> `dom.createRenderer(domNode, [dispatch])`

Returns a [render()] function that will update the given DOM Node.

* `domNode` *(DOMNode)* — the DOM node to mount to.
* `dispatch` *(any)* — if given, it will be passed onto the [components]'s functions as `dispatch`.

## render

> `render(element, [context])`

Renders an virtual element `element`, performing virtual DOM updates to ensure minimal DOM access. This function is the result of [dom.createRenderer()].

* `element` *(Element)* — the return value of [element()] to be rendered.
* `context` *(any)* — if given, it will be passed onto all components in the tree as `context`.

See [components] for more information on components.

## element

> `element(tag, [attrs], [...children])`

Returns a virtual element representing either a DOM node or a Component.

* `tag` *(String | Component)* — either be a tag name (such as `'div'`) or a [component].
* `attrs` *(Object)* — attributes to pass onto the DOM node.
* `children` *(Array)* — an array of strings, numbers, more arrays, or virtual elements.

The attributes `attrs` is an Object. It's passed onto the DOM except in some exceptions:

- If the attribute `key` is given, it'll be used as a key to optimize the virtual DOM rendering process.
- If any of the attributes start with `on` (such as `onclick`), they will be treated as event handlers.

This is compatible with [JSX]. The result of this is typically consumed by [render()], or returned by a component's `render` function.

## string.render

> `string.render(element, [context])`

Renders the given virtual element `element` as a string. This works like [render()], only it outputs strings instead of performing operations in the DOM.

* `element` *(Element)* — the return value of [element()] to be rendered.
* `context` *(any)* — if given, it will be passed onto all components in the tree as `context`.

When components are rendered via `string.render`:

- `dispatch` will not be available in components.
- Lifecycle hooks in components, such as `onCreate` and `onUpdate` will not be called.

[render()]: #render
[element()]: #element
[dom.createRenderer()]: #dom.createrenderer
[component]: components.md
[components]: components.md
[JSX]: jsx.md
