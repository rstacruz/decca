# Components

Components are mere objects (not [classes!](https://facebook.github.io/react/docs/top-level-api.html#react.createclass)) that at least implement a `render()` function.

```js
/** @jsx element */
import { dom, element } from 'decca'

const App = {
  render () {
    return <div>
      Hello there, <button label={'Press me'}></button>
    </div>
  }
}

const Button = {
  render ({ props }) {
    return <button>{ label }</button>
  }
}

// Render the app tree
render = dom.createRenderer(document.body)
render(<App />)
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
