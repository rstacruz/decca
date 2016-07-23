# Cheatsheet

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

```js
import { element } from 'decca'

exports.render = function ({props, children, context, dispatch, path}) {
  /* no-jsx */
  return element('div', {class: 'hello'}, 'hello there')

  /* jsx */
  return <div class='hello'>hello there</div>
}
```

### Lifecycle

```js
exports.onCreate = function (model) { ... }
exports.onUpdate = function (model) { ... }
exports.onRemove = function (model) { ... }
```
