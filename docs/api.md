# API reference

```js
import { dom, element, string } from 'decca'
```

## <a id='module:decca/dom'></a>decca/dom



### <a id='module:decca/dom~createRenderer'></a>createRenderer()

<details>
<summary><code>createRenderer(<b title='DOMNode'>el</b>, <b title='function'>dispatch</b><sub title="Optional">?</sub>)</code> → <em>render</em></summary>

| Param | Type | Description |
| --- | --- | --- |
| `el` | DOMNode | The DOM element to mount to |
| `dispatch` | function, _optional_ | The dispatch function to the store |
</details>

Creates a renderer function that will update the given `rootEl` DOM Node if
called. Returns a renderer function; see [render](#render).

### <a id='module:decca/dom~render'></a>render

<details>
<summary><code>render(<b title='Element'>element</b>, <b title='*'>context</b><sub title="Optional">?</sub>)</code> → <em>void</em> (callback)</summary>

| Param | Type | Description |
| --- | --- | --- |
| `element` | Element | Virtual element to render; given by [element()](#element) |
| `context` | *, _optional_ | The context to be passed onto the components as `context` |
</details>

A renderer function returned by [createRenderer()](#createrenderer).

## <a id='module:decca/element'></a>decca/element



### <a id='module:decca/element~element'></a>element()

<details>
<summary><code>element(<b title='string'>tag</b>, <b title='object'>props</b>, ...<b title='Element | string'>children</b><sub title="Optional">?</sub>)</code> → <em><a href='element'>Element</a></em></summary>

| Param | Type | Description |
| --- | --- | --- |
| `tag` | string | Tag name (eg, `'div'`) |
| `props` | object | Properties |
| `children` | Element | string, _optional_ | Children |
</details>

Returns a vnode (*Element*) to be consumed by [render()](#render).
This is compatible with JSX. Returns An element.

### <a id='module:decca/element~Element'></a>Element

<details>
<summary><code>{ <b title='string'>tag</b>, <b title='object'>props</b>, <b title='(Element|string)[]'>children</b> }</code></summary>

| Param | Type | Description |
| --- | --- | --- |
| `tag` | string | Tag name (eg, `'div'`) |
| `props` | object | Properties |
| `children` | (Element|string)[] | Children |
</details>

A vnode (*Element*) to be consumed by [render()](#render).
This is generated via [element()](#element).

## <a id='module:decca/string'></a>decca/string



### <a id='module:decca/string~render'></a>render()

<details>
<summary><code>render(<b title='Element'>el</b>, <b title='*'>context</b><sub title="Optional">?</sub>)</code> → <em>string</em></summary>

| Param | Type | Description |
| --- | --- | --- |
| `el` | Element | The Element to render |
| `context` | *, _optional_ | The context to be passed onto components |
</details>

Renders an element into a string without using the DOM. Returns the rendered HTML string.
