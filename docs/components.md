# Components

Components are functions that return JSX objects (not [classes!](https://facebook.github.io/react/docs/top-level-api.html#react.createclass)). Here's an example of a [pure component](#pure-component):

```js
/* @jsx element */
import { element } from 'decca'

function Button ({props}) {
  return <button class='btn'>{props.label}</button>
}

module.exports = Button
```

## Lifecycle hooks

Components can also be objects that implement a `render()` function. In this form, it can have additional lifecycle hooks.

```js
function render ({props}) {
  return <button>{props.label}</button>
}

function onCreate({props}) {
  ...
}

module.exports = { render, onCreate }
```

An object component can have these functions:

| Function | Description
|---|---
| __render()__ | Called every [render()](api.md#render) pass.
| __onCreate()__ | Called after first render() when the DOM is constructed. Use this for side-effects like DOM bindings.
| __onUpdate()__ | Called after every render() except the first one.
| __onRemove()__ | Called after the component is removed. Use this for side effects like cleaning up `document` DOM bindings.

<!-- {table:.no-head} -->

## Model

A model is an Object passed onto every function in a component. It has these properties:

| Property | Description
|---|---
| __props__ | An Object with the properties passed to the component.
| __children__ | An array of children in a component.
| __context__ | The `context` object passed onto [render()](api.md#render)
| __dispatch__ | The `dispatch` object passed onto [dom.createRenderer()](api.md#dom.createrenderer).
| __path__ | A unique ID of the component instance.

<!-- {table:.no-head} -->

## Nesting components

Well, yes, of course you can.

```js
/** @jsx element */
import { dom, element } from 'decca'

const App = {
  render () {
    return <div>
      <Button label='Press me'></Button>
    </div>
  }
}

const Button = {
  render ({props}) {
    return <button>{props.label}</button>
  }
}

// Render the app tree
render = dom.createRenderer(document.body)
render(<App />)
```

## Pure components

You may define a component as a function. This is useful if you don't need any of the lifecycle hooks (`onCreate`, `onUpdate`, `onRemove`). It will act like a component's `render()` function. *(Version v2.2+)*

```js
function Message ({props}) {
  return <div>Hello, {props.name}</div>
}

render = dom.createRenderer(document.body)
render(<Message name='John' />)
```

## JSX

Decca supports JSX syntax. See [JSX](jsx.md) for details on how to set it up.

## Further references

See Deku's documentation:

- [Lifecycle hooks](https://dekujs.github.io/deku/docs/advanced/lifecycle.html)
