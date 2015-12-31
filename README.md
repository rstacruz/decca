# not-deku

> Render interfaces using pure functions and virtual DOM

not-deku allows you to compose DOM structures with reuseable Components in a functional way. It is a drop-in replacement for [Deku], which takes much inspiration from [React] and other functional-style view libraries.

This is an implementation of [Deku] in ~200 lines using [virtual-dom]. The full Deku v2 API is implemented, plus a little more.

[![Status](https://travis-ci.org/rstacruz/not-deku.svg?branch=master)](https://travis-ci.org/rstacruz/not-deku "See test builds")

## Components

Components are mere objects (not [classes!](https://facebook.github.io/react/docs/top-level-api.html#react.createclass)) that at least implement a `render()` function.

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

// Render the app tree
render = dom.createRenderer(document.body)
render(<App />)
```

Components can have the following functions:

```js
function render(model)
function onCreate(model)
function onUpdate(model)
function onRemove(model)
function initialState(model)

// Where model is:
{ props, state, setState, context, dispatch, path }

// ...initialState, state, and setState are non-standard
// additions on top of the Deku v2 API.
```

The following things are implemented:

```js
import { dom, element, string } from 'not-deku'

// dom:
dom.createRenderer(domElement: DOMNode, [dispatch]) => Function
render(element: Element, [context]) => void

// string:
string.render(element, [context]) => string

// element:
// (best used with JSX)
element(tag: string|Component, attrs: ?Object, ...children: Array<Element>) => Element
```

## Usage

See [Deku]'s documentation. `not-deku` takes the same API as deku (as of v2.0.0-rc6). You can use this while deku v2.0.0 is in development.

## Extra features

These features are not part of deku, but are implemented here to prototype API additions to deku:

- not-deku implements `setState` and `state`, which gets passed onto `render()` and other component [lifecycle hooks]. This was a feature of deku v1 which was removed in v2.
- Conversely, Components can also have an `initialState` function.

## Acknowledgements

Obviously taken blatant inspiration from [Deku] by the amazing [Anthony Short] and friends.

[Deku]: https://dekujs.github.io/deku
[virtual-dom]: https://www.npmjs.com/package/virtual-dom
[lifecycle hooks]: http://dekujs.github.io/deku/docs/advanced/lifecycle.html
[Anthony Short]: https://github.com/anthonyshort
[React]: https://facebook.github.io/react/

**NB:** _This package is made as a proof-of-concept. While it's fully functional, it's not likely to be supported in the future._

## Thanks

**not-deku** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/not-deku/contributors
