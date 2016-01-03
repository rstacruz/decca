if (typeof(window) === 'object' && !process.env.JSDOM) {
    var tapeDom = require('tape-dom')
    tapeDom.installCSS()
    tapeDom.stream(require('tape'))
}

require('es5-shim')
require('./basic_test')
require('./children_test')
require('./dispatch_test')
require('./path_test')
require('./state_test')
require('./state_async_test')
require('./string_test')
require('./style_test')
require('./deku/create_dom_renderer_test')