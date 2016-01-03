# decca

<!-- {.massive-header.-with-tagline } -->

> Render UI via pure functions and virtual DOM

Decca allows you to compose DOM structures with reuseable Components in a functional way. **It is a drop-in replacement for [Deku],** which takes much inspiration from [React] and other functional-style view libraries.

[![Status](https://travis-ci.org/rstacruz/decca.svg?branch=master)](https://travis-ci.org/rstacruz/decca "See test builds")

**[Documentation →](http://ricostacruz.com/decca)**

<!--{p:style='display: none'}-->

## Components

Components are mere objects (not [classes!](https://facebook.github.io/react/docs/top-level-api.html#react.createclass)) that at least implement a `render()` function. See [components](docs/components.md) documentation for more information.

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

## Usage

See the [API reference](docs/api.md) and [Deku]'s documentation. Also see a [comparison with Deku](docs/about-deku.md).

## Acknowledgements

Decca takes blatant inspiration from [Deku] by the amazing [Anthony Short] and friends.

[Deku]: https://dekujs.github.io/deku
[virtual-dom]: https://www.npmjs.com/package/virtual-dom
[lifecycle hooks]: docs/components.md
[Anthony Short]: https://github.com/anthonyshort
[React]: https://facebook.github.io/react/

## Thanks

**decca** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/decca/contributors
