# not-deku

> Render interfaces using pure functions and virtual DOM

An implementation of [deku] in <100 lines using [virtual-dom]. Implements most of the deku v2 API. See [deku]'s documentation on how to use this.

**NB:** made as a proof-of-concept. Don't use.

```js
/** @jsx element */
import { dom, element } from 'not-deku'

const App = {
  render () {
    return <div>
      Hello there, <button label={'Press me'}</button>
    </div>
  }
}

const Button = {
  render ({ props }) {
    return <button>{ label }</button>
  }
}

render = dom.createRenderer(document.body)
render(<App />)
```

## What's here

- `dom.createRenderer()` - DOM rendering
- `element()` - virtual element creation
- Redux integration (`context`, `dispatch`, etc)

### What's not

- `string.render()` - string rendering
- `onCreate` and `onRemove` lifecycle hooks (todo)
- `path` in model

### What differs

- Events are formatted as `onclick` and not `onClick`

[deku]: https://dekujs.github.io/deku
[virtual-dom]: https://www.npmjs.com/package/virtual-dom
