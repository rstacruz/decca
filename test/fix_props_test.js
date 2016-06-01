import test from 'tape'
import fixProps from '../src/fix_props'

test('fixProps', (t) => {
  t.deepEqual(fixProps({ for: 'foo' }), { htmlFor: 'foo' })
  t.deepEqual(
    fixProps({ style: 'width: 100px;', attributes: { value: 'one' } }),
    { attributes: { style: 'width: 100px;', value: 'one' }, style: 'width: 100px;' }
  )
  t.deepEqual(fixProps({ class: 'foo' }), { className: 'foo' })
  t.deepEqual(fixProps({ onClick: 'foo' }), { onclick: 'foo', onClick: undefined })
  t.end()
})
