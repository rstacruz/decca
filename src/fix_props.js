/*
 * Fixes props for virtual-dom's consumption
 */

const assign = require('object-assign')

// Taken from: https://github.com/wayfair/tungstenjs/blob/42535b17e4894e866abf5711be2266458bc4d508/src/template/template_to_vdom.js#L118-L140

var transforms = {
  // transformed name
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv',
  // case specificity
  'accesskey': 'accessKey',
  'autocomplete': 'autoComplete',
  'autoplay': 'autoPlay',
  'colspan': 'colSpan',
  'contenteditable': 'contentEditable',
  'contextmenu': 'contextMenu',
  'enctype': 'encType',
  'formnovalidate': 'formNoValidate',
  'hreflang': 'hrefLang',
  'novalidate': 'noValidate',
  'readonly': 'readOnly',
  'rowspan': 'rowSpan',
  'spellcheck ': 'spellCheck',
  'srcdoc': 'srcDoc',
  'srcset': 'srcSet',
  'tabindex': 'tabIndex'
}

function transformProperties (props) {
  let attrs = {}

  for (let attr in props) {
    let transform = transforms[attr] || attr

    attrs[transform] = props[attr]
  }

  return attrs
}

export default function fixProps (props) {
  if (props) {
    props = transformProperties(props)

    // See https://github.com/Matt-Esch/virtual-dom/blob/master/docs/vnode.md#propertiesstyle-vs-propertiesattributesstyle
    if (typeof props.style === 'string') {
      props = assign({}, props, {
        attributes: assign({}, props.attributes || {}, { style: props.style })
      })
    }

    // onClick => onclick
    Object.keys(props).forEach((key) => {
      let m = key.match(/^on([A-Z][a-z]+)$/)
      if (m) {
        props = assign({}, props, {
          [key]: undefined,
          [key.toLowerCase()]: props[key]
        })
      }
    })
  }

  return props
}

