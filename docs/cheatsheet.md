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
// (`dispatch` is optional)
const render = dom.createRenderer(document.body, dispatch)
render(<Message name='Rico S.' />)
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
