# About Deku

Decca is an implementation of [Deku] in <200 lines using [virtual-dom]. The full Deku v2 API is implemented (plus a little more)—you can use Decca while Deku v2.0.0 is in development.

## Differences with Deku

- `path` (see [Components](components.md)) in Deku is a dot-separated path of the component relative to its ancestors (eg, `aw398.0.0`). In Decca, `path` is simply a unique ID for the component instance (eg, `c83`). It fulfills the same function as a unique identifier.

[Deku]: https://dekujs.github.io/deku
[virtual-dom]: https://www.npmjs.com/package/virtual-dom
[lifecycle hooks]: components.md
