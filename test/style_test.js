import { element as h } from '../src'
import test from 'tape'
import r from './support/r'

test('string styles', (t) => {
  const { div } = r(h('div', { style: 'color: blue' }, 'hello'))
  t.ok(/^<div style="color: blue;?">hello<\/div>$/.test(div.innerHTML), 'renders')
  t.end()
})
