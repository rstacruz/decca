/** @jsx element */
import { element, dom } from './lib'

const App = {
  render () {
    return <div class='lmao'>hi there {'you'}!</div>
  }
}

const render = dom.createRenderer(document.body)
render(<App />)
console.log(document.body.innerHTML)
