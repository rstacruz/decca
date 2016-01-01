/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

import { element } from '../src'
import test from 'tape'
import r from './support/r'

test('state change', (t) => {
  t.plan(3)

  const App = {
    onCreate ({ path, setState }) {
      setTimeout(() => { setState({ created: true }) })
    },
    render ({ context, state }) {
      t.pass('render called')
      return <div>created: { state && state.created ? 'yes' : 'no' }</div>
    }
  }

  const { div } = r(<App />)
  setTimeout(() => {
    t.equal(
      div.innerHTML,
      '<div>created: yes</div>',
      'propagated state')
    t.end()
  }, 100)
})

test('initialState', (t) => {
  t.plan(5)

  const App = {
    initialState (model) {
      t.ok(model.props, 'has model.props')
      t.ok(model.context, 'has model.context')
      return { created: true }
    },
    render ({ context, state }) {
      t.pass('render called')
      t.deepEqual(state, { created: true }, 'state available before render')
      return <div>created: { state && state.created ? 'yes' : 'no' }</div>
    }
  }

  const { div } = r(<App />, 'CTX')
  t.equal(
    div.innerHTML,
    '<div>created: yes</div>',
    'picked up initialState')
  t.end()
})

test('without initialState', (t) => {
  t.plan(2)

  const App = {
    render ({ state }) {
      t.equal(state, undefined, 'state is undefined without initialState')
      return <div />
    }
  }

  const { div } = r(<App />)
  t.equal(div.innerHTML, '<div></div>', 'rendered')
  t.end()
})

test('initialState over nested', (t) => {
  t.plan(5)

  const Button = {
    initialState (model) {
      t.ok(model.props, 'has model.props')
      t.ok(model.context, 'has model.context')
      return { created: true }
    },
    render ({ context, state }) {
      t.pass('render called')
      t.deepEqual(state, { created: true }, 'state available before render')
      return <div>created: { state && state.created ? 'yes' : 'no' }</div>
    }
  }

  const App = {
    render: () => <div><Button /></div>
  }

  const { div } = r(<App />, 'CTX')
  t.equal(
    div.innerHTML,
    '<div><div>created: yes</div></div>',
    'picked up initialState')
  t.end()
})

test('state persistence', (t) => {
  t.plan(5)

  const App = {
    onCreate ({ path, setState }) {
      t.pass('oncreate called')
      setTimeout(() => { setState({ created: true }) })
    },
    render ({ context, state }) {
      t.pass('render called')
      return <div>created: { state && state.created ? 'yes' : 'no' }</div>
    }
  }

  const { div, render } = r(<App />)

  setTimeout(() => {
    render(<App />)
    t.equal(
      div.innerHTML,
      '<div>created: yes</div>',
      'state persistence')
    t.end()
  }, 500)
})

test('state stacking', (t) => {
  t.plan(3)
  var renders = 1

  const App = {
    initialState: () => ({ initial: true }),
    onCreate: ({ setState }) => {
      setTimeout(() => { setState({ created: true }) })
    },
    render ({ state }) {
      if (renders === 1) {
        t.equal(state.initial, true, 'initialState available on render')
        renders++
      } else {
        t.equal(state.initial, true, 'initialState persists on next render')
        t.equal(state.created, true, 'state stacked')
        t.end()
      }
      return <div />
    }
  }

  const { div } = r(<App />)
})

