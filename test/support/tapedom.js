if (typeof window === 'object' && !process.env.JSDOM) {
  var tapeDom = require('tape-dom')
  var style = document.createElement('style')
  style.innerHTML = `
    #tests {
      font-family: lato, helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #555;
      padding: 32px; }
    .test {
      margin-bottom: 16px; }
    .test p {
      margin: 0; }
    .test > .name {
      color: #111;
      font-weight: bold; }
    .test > .assert {
      padding-left: 16px; }
    .test > .assert > .ok {
      color: green;
      font-size: .72em;
      font-weight: bold;
      margin-right: 8px; }
    .test > .assert.fail {
      background: rgba(250, 200, 200, 0.3); }
    .test > .assert.fail > .ok {
      background: red;
      border-radius: 2px;
      padding: 1px 2px 0 2px;
      color: white; }
    .test > .assert > .actual,
    .test > .assert > .expected {
      font-family: menlo, consolas, monospace;
      font-size: .85em; }
    .test > .assert > .actual {
      display: block;
      color: #daa; }
    .test > .assert > .expected {
      display: block;
      color: #ada; }
    .diff {
      display: none; }
    .diff del {
      color: #ddd;
      font-family: menlo, consolas, monospace;
      font-size: .85em;
      color: red; }
  `

  document.body.appendChild(style)
  tapeDom.stream(require('tape'))
}
