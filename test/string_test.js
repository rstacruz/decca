import { element, string } from '../src'
import test from 'tape'

test('string: basic non-component', (t) => {
  const output = string.render(<div class='foo'>hello</div>)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: basic non-component via render()', (t) => {
  const output = string.render(<div>hello</div>)
  t.equal(output, '<div>hello</div>', 'renders')
  t.end()
})

test('string: basic component', (t) => {
  const App = {
    render: () => <div class='foo'>hello</div>
  }
  const output = string.render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: basic nested component', (t) => {
  const Button = {
    render: () => <div class='foo'>hello</div>
  }
  const App = {
    render: () => <Button />
  }
  const output = string.render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: contexts in nested components', (t) => {
  t.plan(3)
  const Button = {
    render: ({ context }) => {
      t.equal(context, 'my context', 'context in level 2')
      return <div class='foo'>hello</div>
    }
  }
  const App = {
    render: ({ context }) => {
      t.equal(context, 'my context', 'context in level 1')
      return <div><Button /></div>
    }
  }
  const output = string.render(<App />, 'my context')
  t.equal(output, '<div><div class="foo">hello</div></div>', 'renders')
  t.end()
})

test('string: paths in nested components', (t) => {
  t.plan(3)
  const Button = {
    render: ({ path }) => {
      t.ok(path, 'has path')
      return <div class='foo'>hello</div>
    }
  }
  const App = {
    render: ({ path }) => {
      t.ok(path, 'has path')
      return <Button />
    }
  }
  const output = string.render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: components with children', (t) => {
  const Button = {
    render: ({ props }) => <div>{props.children}</div>
  }
  const App = {
    render: () => <Button>hello</Button>
  }
  const output = string.render(<App />)
  t.equal(output, '<div>hello</div>', 'renders')
  t.end()
})

test('string: basic pure component', (t) => {
  const App = () => <div class='foo'>hello</div>
  const output = string.render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: basic nested pure component', (t) => {
  const Button = () => <div class='foo'>hello</div>
  const App = () => <Button />
  const output = string.render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: basic nested pure component inside standard', (t) => {
  const Button = () => <div class='foo'>hello</div>
  const App = {
    render: () => <Button />
  }
  const output = string.render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: basic nested standard component inside pure', (t) => {
  const Button = {
    render: () => <div class='foo'>hello</div>
  }
  const App = () => <Button />
  const output = string.render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: contexts in nested pure components', (t) => {
  t.plan(3)
  const Button = ({ context }) => {
    t.equal(context, 'my context', 'context in level 2')
    return <div class='foo'>hello</div>
  }
  const App = ({ context }) => {
    t.equal(context, 'my context', 'context in level 1')
    return <div><Button /></div>
  }
  const output = string.render(<App />, 'my context')
  t.equal(output, '<div><div class="foo">hello</div></div>', 'renders')
  t.end()
})

test('string: paths in nested pure components', (t) => {
  t.plan(3)
  const Button = ({ path }) => {
    t.ok(path, 'has path')
    return <div class='foo'>hello</div>
  }
  const App = ({ path }) => {
    t.ok(path, 'has path')
    return <Button />
  }
  const output = string.render(<App />)
  t.equal(output, '<div class="foo">hello</div>', 'renders')
  t.end()
})

test('string: pure components with children', (t) => {
  const Button = ({ props }) => <div>{props.children}</div>
  const App = () => <Button>hello</Button>
  const output = string.render(<App />)
  t.equal(output, '<div>hello</div>', 'renders')
  t.end()
})
