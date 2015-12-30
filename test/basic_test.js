/** @jsx element */
import { element, dom } from '../src'
import test from 'tape'

test('basic non-component', (t) => {
  const { div } = r(<div>hello</div>)
  t.equal(div.innerHTML, '<div>hello</div>')
  t.end()
})

test('class name', (t) => {
  const { div } = r(<div className='foo'>hola</div>)
  t.equal(div.innerHTML, '<div class="foo">hola</div>')
  t.end()
})

test('interpolation', (t) => {
  const {div } = r(<div>hey {'John'}</div>)
  t.equal(div.innerHTML, '<div>hey John</div>')
  t.end()
})

test('basic component', (t) => {
  const App = {
    render () { return <div>hello</div> }
  }

  const { div } = r(<App />)
  t.equal(div.innerHTML, '<div>hello</div>')
  t.end()
})

test('props', (t) => {
  const Button = {
    render ({ props }) {
      return <button>{ props.label }</button>
    }
  }

  const App = {
    render () {
      return <div>hi. <Button label='press' /></div>
    }
  }

  const { div } = r(<App />)
  t.equal(div.innerHTML, '<div>hi. <button>press</button></div>')
  t.end()
})

test('context', (t) => {
  const Button = {
    render ({ props, context }) {
      t.equal(context, 'CTX')
      return <button>{ props.label }</button>
    }
  }

  const App = {
    render ({ context }) {
      t.equal(context, 'CTX')
      return <div>hi. <Button label='press' /></div>
    }
  }

  const { div } = r(<App />, 'CTX')
  t.equal(div.innerHTML, '<div>hi. <button>press</button></div>')
  t.end()
})

if (!process.env.JSDOM) {
  test('events', (t) => {
    t.plan(1)

    const App = {
      render ({ context }) {
        return <button id='sup' onClick={yo}>click me</button>
      }
    }

    function yo () {
      t.pass('clicked')
    }

    const { div } = r(<App />)
    document.body.appendChild(div)

    var event = document.createEvent('MouseEvent')
    event.initEvent('click', true, true)
    document.querySelector('#sup').dispatchEvent(event)
    t.end()
  })
}

test('onUpdate', (t) => {
  t.plan(1)
  const App = {
    onUpdate ({ context, path }) {
      t.equal(context, 'CTX', 'context is available onUpdate')
    },
    render ({ context }) {
      return <div></div>
    }
  }

  const { div, render } = r(<App />, 'CTX')
  render(<App />, 'CTX')
  t.end()
})

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


test('onRemove', (t) => {
  t.plan(3)
  const App = {
    onRemove ({ context }) {
      t.pass('onRemove was called')
      t.equal(context, 'CTX', 'context is available onRemove')
    },
    render ({ context }) { return <div></div> }
  }

  const { div, render } = r(<App />, 'CTX')
  render(<span></span>)
  t.equal(div.innerHTML, '<span></span>', 'renders correctly')
  t.end()
})

test('onRemove skipping', (t) => {
  t.plan(0)
  const App = {
    onRemove ({ context }) { t.fail('not supposed to call onRemove') },
    render ({ context }) { return <div></div> }
  }

  const { div } = r(<App />, 'CTX')
  t.end()
})

test('onCreate', (t) => {
  t.plan(2)
  const App = {
    onCreate ({ context }) {
      t.equal(context, 'CTX', 'context available onCreate')
    },
    render ({ context }) {
      return <div></div>
    }
  }

  const { div, render } = r(<App />, 'CTX')
  render(<App />, 'CTX')
  t.equal(div.innerHTML, '<div></div>', 'renders correctly')
  t.end()
})


/*
 * Helper
 */

function r (...args) {
  const div = document.createElement('div')
  const render = dom.createRenderer(div)
  render(...args)
  return { div, render }
}
