# Cheatsheet

Here's a basic "Hello World" example.

```js
/** @jsx element */
import { dom, element } from 'decca'

const Message = {
  render ({ props }) {
    return <div>Hello there, {props.name}</div>
  }
}

// Render the app tree
const render = dom.createRenderer(document.body)
render(<Message name='Rico S.' />)
```

## Redux

Pass `store.dispatch` to *createRenderer()*, and `store.getState()` to *render()*.

```js
import { createStore } from 'redux'

const store = createStore(/*...*/)
const render = dom.createRenderer(document.body, store.dispatch)

function update () {
  render(<Message name='Rico S.' />, store.getState())
}

stoer.subscribe(update)
update()
```

## Components

Components at least have a `render()` function.

```js
import { element } from 'decca'

exports.render = function ({props, children, context, dispatch, path}) {
  /* no-jsx */
  return element('div', {class: 'hello'}, 'hello there')

  /* jsx */
  return <div class='hello'>hello there</div>
}
```

The model has:

* `children` - children passed onto component
* `props` - properties passed onto component
* `path` - unique ID of component instance
* `context` - taken from *render()*
* `dispatch` - taken from *createRenderer()*

## Component lifecycle

The following hooks are supported:

```js
exports.onCreate = (model) => { ... } // on first create
exports.onUpdate = (model) => { ... } // on every render
exports.onRemove = (model) => { ... } // after removal
```
