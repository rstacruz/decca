'use strict'
/** @jsx element */
import { element, string } from '../src'
import test from 'tape'

test('string: basic non-component', (t) => {
  const render = string.createRenderer()
  const output = render(<div class='foo'>hello</div>)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: basic non-component via render()', (t) => {
  const output = string.render(<div>hello</div>)
  t.equal(output, '<div>hello</div>', 'renders')
  t.end()
})

test('string: basic component', (t) => {
  const render = string.createRenderer()
  const App = {
    render: () => <div class='foo'>hello</div>
  }
  const output = render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: basic nested component', (t) => {
  const render = string.createRenderer()
  const Button = {
    render: () => <div class='foo'>hello</div>
  }
  const App = {
    render: () => <Button />
  }
  const output = render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})
