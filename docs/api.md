# API

```js
import { dom, element, string } from 'decca'
```

## dom.createRenderer

> `dom.createRenderer(domNode, [dispatch])`

Returns a [render()] function that will update the DOM Node given in `domNode`.  If `dispatch` is given, it will be passed onto all components in the tree as `dispatch`.

## render

> `render(element, [context])`

Renders an virtual element `element` (a return value of JSX `element()`).
A `render()` function is the result of [dom.createRenderer()].
If `context` is given, it will be passed onto all components in the tree as `context`.

See [components] for more information on components.

## element

> `element(tag, [attrs], [...children])`

Returns a virtual element. This is compatible with JSX, and is typically used with [babel-plugin-transform-react-jsx] The result of this is typically consumed by [render()], or returned by a component's `render` function.

The parameter `tag` can either be a tag name (such as `'div'`) or a [component].

The attributes `attrs` is an Object. It's passed onto the DOM except in some exceptions:

- If the attribute `key` is given, it'll be used as a key to optimize the virtual DOM rendering process.
- If any of the attributes start with `on` (such as `onclick`), they will be treated as event handlers.

## string.render

> `string.render(element, [context])`

Renders the given virtual element `element` as a string. This works like [render()], only it outputs strings instead of performing operations in the DOM.

When components are rendered via `string.render`:

- `dispatch` will not be available in components.
- Lifecycle hooks in components, such as `onCreate` and `onUpdate` will not be called.

[render()]: #render
[dom.createRenderer()]: #dom.createrenderer
[babel-plugin-transform-react-jsx]: https://babeljs.io/docs/plugins/transform-react-jsx/
[component]: components.md
[components]: components.md
