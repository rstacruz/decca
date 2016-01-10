import { element as h, dom } from '../src'
import test from 'tape'

test('dispatch', (t) => {
  const Button = {
    render ({ props, dispatch }) {
      t.equal(dispatch, 'CTX')
      return h('button', {}, props.label)
    }
  }

  const App = {
    render ({ dispatch }) {
      t.equal(dispatch, 'CTX')
      return h('div', {}, 'hi. ', h(Button, { label: 'press' }))
    }
  }

  const div = document.createElement('div')
  const render = dom.createRenderer(div, 'CTX')
  render(h(App))
  t.equal(div.innerHTML, '<div>hi. <button>press</button></div>')
  t.end()
})
