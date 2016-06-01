import { element } from '../src'
import test from 'tape'
import r from './support/r'

test('children', (t) => {
  const App = {
    render ({ props, children }) {
      return <div class='app'>{children}</div>
    }
  }
  const { div } = r(<App><b>hi</b></App>)
  t.equal(div.innerHTML, '<div class="app"><b>hi</b></div>')
  t.end()
})

test('text with children', (t) => {
  const App = {
    render ({ props, children }) {
      return <div>hi {children}</div>
    }
  }
  const { div } = r(<App>John</App>)
  t.equal(div.innerHTML, '<div>hi John</div>')
  t.end()
})

