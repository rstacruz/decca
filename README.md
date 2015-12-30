# not-deku

> Render interfaces using pure functions and virtual DOM

An implementation of [deku] in <100 lines using [virtual-dom]. Implements most of the deku v2 API. See [deku]'s documentation on how to use this.

**NB:** made as a proof-of-concept. Don't use.

[![Status](https://travis-ci.org/rstacruz/not-deku.svg?branch=master)](https://travis-ci.org/rstacruz/not-deku "See test builds")

```js
/** @jsx element */
import { dom, element } from 'not-deku'

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

render = dom.createRenderer(document.body)
render(<App />)
```

## What's here

- `dom.createRenderer()` - DOM rendering
- `element()` - virtual element creation
- DOM events
- Redux integration (`context`, `dispatch`, etc)
- everything else that's not in the list below

### What's not

- `string.render()` - string rendering
- `onCreate` and `onRemove` lifecycle hooks (todo)
- `path` in model

[deku]: https://dekujs.github.io/deku
[virtual-dom]: https://www.npmjs.com/package/virtual-dom

## Acknowledgements

Obviously taken blatant inspiration from [deku] by the amazing [Anthony Short].

[Anthony Short]: https://github.com/anthonyshort

## Thanks

**not-deku** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/not-deku/contributors
