/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

import { element } from '../src'
import test from 'tape'
import r from './support/r'

test('string styles', (t) => {
  const { div } = r(<div style='color: blue'>hello</div>)
  t.ok(/^<div style="color: blue;?">hello<\/div>$/.test(div.innerHTML), 'renders')
  t.end()
})
