# Components

Components are mere objects (not [classes!](https://facebook.github.io/react/docs/top-level-api.html#react.createclass)) that at least implement a `render()` function.

```js
/** @jsx element */
import { element } from 'decca'

function render ({ props }) {
    return <button>{ label }</button>
  }
}

module.exports = { render }
```

## Component API

Components can have the following functions:

```js
function render(model) => Element
function onCreate(model)
function onUpdate(model)
function onRemove(model)
function initialState(model)

// Where model is:
{ props, state, setState, context, dispatch, path }

// ...initialState, state, and setState are non-standard
// additions on top of the Deku v2 API.
```

## Lifecycle hooks

- __render__ - called every [render()](api.md#render) pass.
- __onCreate__ - called after the first render().
- __onUpdate__ - called after every render() when the DOM is constructed. Use this for side-effects like DOM bindings.
- __onRemove__ - called after the component is removed. Use this for side effects like cleaning up `document` DOM bindings.
- __initialState__ - called before the first render(). The return value will be used as the first `state`.

## Model

A model is an Object passed onto every function in a component. It has these properties:

- __props__ - an Object with the properties passed on the the component.
- __props.children__ - an array of children in a component.
- __state__ - the component's state.
- __setState__ - a function you can use to update state. Calling this will trigger a re-render. (Don't call this onCreate or onRender!)
- __context__ - the `context` object passed onto [render()](api.md#render)
- __dispatch__ - the `dispatch` object passed onto [dom.createRenderer()](api.md#dom.createrenderer).
- __path__ - a unique ID of the component instance.
