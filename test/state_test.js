'use strict'
/** @jsx element */
import { element, dom } from '../src'
import test from 'tape'
import r from './support/r'

test('state change', (t) => {
  t.plan(3)

  const App = {
    onCreate ({ path, setState }) {
      setState({ created: true })
    },
    render ({ context, state }) {
      t.pass('render called')
      return <div>created: { state && state.created ? 'yes' : 'no' }</div>
    }
  }

  const { div, render } = r(<App />)
  t.equal(
    div.innerHTML,
    '<div>created: yes</div>',
    'propagated state')
  t.end()
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

  const { div, render } = r(<App />, 'CTX')
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

  const { div, render } = r(<App />)
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

  const { div, render } = r(<App />, 'CTX')
  t.equal(
    div.innerHTML,
    '<div><div>created: yes</div></div>',
    'picked up initialState')
  t.end()
})

