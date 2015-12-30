import h from 'virtual-dom/h'
import fixProps from './fix_props'
import debounce from 'debounce'
import Widget from './widget'

module.exports = buildPass

/*
 * A rendering pass.
 * This closure is responsible for:
 *
 * - keeping aware of `context` and `state` to be passed down to Components
 * - queue up `stateChanges` so that it can be picked up later (by `render()`)
 *
 *     pass = buildPass(...)
 *     pass.convert(el)             // render a component/node
 *     pass.flush()                 // returns batch changes, clears out the change queue
 *     pass.onchange(fn)            // from this point forward, call `fn` for any more state changes
 *     pass.commitState({...})      // silently make changes to the state
 *     pass.states                  // the component states mega-object
 */

function buildPass (context, dispatch, states, commitState) {
  let stateChanges = {}
  let working = true
  let onChange
  const pass = { convert, setState, states, flush, onchange }

  /*
   * Converts a vnode (`element()` output) to a virtual hyperscript element.
   * This is curried to keep the `context` and `dispatch` alive recursively.
   * https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md
   */

  function convert (el) {
    if (typeof el === 'string') return el
    if (typeof el === 'number') return '' + el
    if (typeof el === 'undefined' || el === null) return
    if (Array.isArray(el)) return el.map(convert)
    if (typeof el !== 'object') throw new Error('wot m8')

    const { tag, props, children } = el

    // Defer to Widget if it's a component
    if (typeof tag === 'object') {
      if (!tag.render) throw new Error('no render() in component')
      return new Widget(
        { component: tag, props, children },
        { context, dispatch },
        pass, commitState)
    }

    return h(tag, fixProps(props), children.map(convert))
  }

  /*
   * Stops collecting state changes, returns whatever in the state change queue
   */

  function flush () {
    const changes = stateChanges
    stateChanges = {}
    return changes
  }

  /*
   * Set change handler
   */

  function onchange (onChange_) {
    working = false
    onChange = onChange_
  }

  /*
   * Called by Components (via Widget). Queues up state changes, and updates it
   * when it can.
   */

  function setState (componentId, state = {}) {
    const id = componentId
    if (!stateChanges[id]) stateChanges[id] = { ...state }
    else stateChanges[id] = { ...stateChanges[id], ...state }
    if (!working) updateLater()
  }

  /*
   * Updates queued up changes
   */

  let updateLater = debounce(() => {
    if (onChange) onChange(flush())
  }, 20)

  return pass
}
