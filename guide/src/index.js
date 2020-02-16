import $ from 'jquery'
import './index.css'

const jpg = require('./demo.jpg')

const button = document.createElement('button')
button.textContent = '加载'
document.body.append(button)

document.body.append($('div').text('jquery')) // 这个jquery能和下面的异步import公用一个chunk

button.addEventListener('click', () => {
  import(/* webpackChunkName: 'jquery' */'jquery').then(({ default: _$ }) => {
    console.log(_$)
  })
  import(/* webpackChunkName: 'chunk1' */'./chunk1').then(chunk => {
    console.log(chunk)
  })
  import(/* webpackChunkName: 'chunk2' */'./chunk2').then(chunk => {
    console.log(chunk)
  })
  import(/* webpackChunkName: 'chunk3' */'./chunk3').then(chunk => {
    console.log(chunk)
  })
  import(/* webpackChunkName: 'chunk4' */'./chunk4').then(chunk => {
    console.log(chunk)
  })
  import(/* webpackChunkName: 'chunk5' */'./chunk5').then(chunk => {
    console.log(chunk)
  })
})

const img = document.createElement('img')
img.src = jpg
document.body.append(img)
