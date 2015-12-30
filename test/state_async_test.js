'use strict'
/** @jsx element */
import { element, dom } from '../src'
import test from 'tape'
import r from './support/r'

test('state persistence over async', (t) => {
  t.plan(4)

  const App = {
    onCreate ({ path, setState }) {
      setTimeout(() => {
        setState({ created: true })
      })
    },
    render ({ context, state }) {
      t.pass('render called')
      return <div>created: { state && state.created ? 'yes' : 'no' }</div>
    }
  }

  const { div, render } = r(<App />)
  t.equal(
    div.innerHTML,
    '<div>created: no</div>',
    'initial state is empty')

  setTimeout(() => {
    t.equal(
      div.innerHTML,
      '<div>created: yes</div>',
      'state was eventually changed')
    t.end()
  }, 50)
})
