# Components

Components are mere objects (not [classes!](https://facebook.github.io/react/docs/top-level-api.html#react.createclass)) that at least implement a `render()` function.  Here is a minimal example of a component:

```js
/** @jsx element */
import { element } from 'decca'

function render ({ props }) {
    return <button>{ props.label }</button>
  }
}

module.exports = { render }
```

## Lifecycle hooks

A component can have these functions:

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

## Dumb components

If you don't need any of the lifecycle hooks (`onCreate`, `onUpdate`, `onRemove`), you can simply use a function as a component. It will act like a component's `render()` function.

```js
function Message ({props}) {
  return <div>Hello, {props.name}</div>
}

render = dom.createRenderer(document.body)
render(<Message name='John' />)
```

## Further references

See Deku's documentation:

- [Lifecycle hooks](https://dekujs.github.io/deku/docs/advanced/lifecycle.html)
