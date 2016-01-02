# About Deku

Decca is an implementation of [Deku] in <200 lines using [virtual-dom]. The full Deku v2 API is implemented (plus a little more)—you can use Decca while Deku v2.0.0 is in development.

## Differences with Deku

### States

- decca implements `setState` and `state`, which gets passed onto `render()` and other component [lifecycle hooks]. This was a feature of deku v1 which was removed in v2.
- Conversely, Components can also have an `initialState` function.

### Other small changes

- `path` (see [Components](docs/components.md) in Deku is a dot-separated path of the component relative to its ancestors (eg, `aw398.0.0`). In Decca, `path` is simply a unique ID for the component instance (eg, `c83`). It fulfills the same function as a unique identifier.

[Deku]: https://dekujs.github.io/deku
[virtual-dom]: https://www.npmjs.com/package/virtual-dom
