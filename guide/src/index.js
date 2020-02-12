import counter from './counter'
import constDiv from './const'
import './index.css'

counter()
constDiv()

if (module.hot) {
  module.hot.accept('./const.js', () => {
    document.getElementById('const').remove()
    constDiv()
  })
}
