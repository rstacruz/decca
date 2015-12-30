/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

import { element, dom } from '../src'
import test from 'tape'

test('dispatch', (t) => {
  const Button = {
    render ({ props, dispatch }) {
      t.equal(dispatch, 'CTX')
      return <button>{ props.label }</button>
    }
  }

  const App = {
    render ({ dispatch }) {
      t.equal(dispatch, 'CTX')
      return <div>hi. <Button label='press' /></div>
    }
  }

  const div = document.createElement('div')
  const render = dom.createRenderer(div, 'CTX')
  render(<App />)
  t.equal(div.innerHTML, '<div>hi. <button>press</button></div>')
  t.end()
})
