'use strict'
/** @jsx element */
import { element, dom } from '../src'
import test from 'tape'
import r from './support/r'

test('children', (t) => {
  const App = {
    render ({ props }) {
      return <div class='app'>{ props.children }</div>
    }
  }
  const { div } = r(<App><b>hi</b></App>)
  t.equal(div.innerHTML, '<div class="app"><b>hi</b></div>')
  t.end()
})

