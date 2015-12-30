# not-deku

> Render interfaces using pure functions and virtual DOM

An implementation of [deku] in <200 lines using [virtual-dom]. Implements the deku v2 API.

**NB:** _This package is made as a proof-of-concept. While it's fully functional, it's not likely to be supported in the future._

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

## Usage

See [deku]'s documentation. `not-deku` takes the same API as deku (as of v2.0.0-rc6, which isn't complete yet).

## Extra features

These features are not part of deku, but are implemented here to prototype API additions to deku:

- not-deku implements `setState`, which gets passed onto `render()` and other component [lifecycle hooks].
- Components can have an `initialState` function.

## Acknowledgements

Obviously taken blatant inspiration from [deku] by the amazing [Anthony Short].

[deku]: https://dekujs.github.io/deku
[virtual-dom]: https://www.npmjs.com/package/virtual-dom
[lifecycle hooks]: http://dekujs.github.io/deku/docs/advanced/lifecycle.html
[Anthony Short]: https://github.com/anthonyshort

## Thanks

**not-deku** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/not-deku/contributors
