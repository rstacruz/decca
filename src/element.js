/**
 * @module decca/element
 */

/**
 * Returns a vnode (*Element*) to be consumed by [render()](#render).
 * This is compatible with JSX.
 *
 * @param {string} tag Tag name (eg, `'div'`)
 * @param {object} props Properties
 * @param {...(Element | string)=} children Children
 * @return {Element} An element
 */

function element (tag, props, ...children) {
  return { tag, props, children }
}

module.exports = element

/**
 * A vnode (*Element*) to be consumed by [render()](#render).
 * This is generated via [element()](#element).
 *
 * @typedef Element
 * @property {string} tag Tag name (eg, `'div'`)
 * @property {object} props Properties
 * @property {Array<Element | string>} children Children
 */
