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
| __onUpdate()__ | Called after render(), except the first one..
| __onRemove()__ | Called after the component is removed. Use this for side effects like cleaning up `document` DOM bindings.
| __initialState()__ | Called before the first render(). The return value will be used as the first `state`.

<!-- {table:.no-head} -->

## Model

A model is an Object passed onto every function in a component. It has these properties:


| Property | Description
|---|---
| __props__ | An Object with the properties passed on the the component.
| __props.children__ | An array of children in a component.
| __state__ | The component's state.
| __setState__ | A function you can use to update state. Calling this will trigger a re-render. (Don't call this onCreate or onRender!)
| __context__ | The `context` object passed onto [render()](api.md#render)
| __dispatch__ | The `dispatch` object passed onto [dom.createRenderer()](api.md#dom.createrenderer).
| __path__ | A unique ID of the component instance.

<!-- {table:.no-head} -->

## Further references

See Deku's documentation:

- [Lifecycle hooks](https://dekujs.github.io/deku/docs/advanced/lifecycle.html)
