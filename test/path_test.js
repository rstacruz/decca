'use strict'
/** @jsx element */

import { element } from '../src'
import test from 'tape'
import r from './support/r'

test('path onUpdate', (t) => {
  t.plan(2)

  var lastPath
  const App = {
    onCreate ({ path }) { lastPath = path },
    onUpdate ({ path }) {
      t.equal(path, lastPath, 'path is the same onCreate and onUpdate')
      t.ok(path, 'has a path onUpdate')
    },
    render ({ context }) { return <div></div> }
  }

  const { div, render } = r(<App />)
  render(<App />)
  t.end()
})
