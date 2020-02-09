import './index.css'
import styles from './index.module.css'
import './index.less'
import stylesLess from './index.module.less'

console.log({ styles, stylesLess })

var p = document.createElement('p')
p.innerHTML = '给你买个橘子1！'
document.body.append(p)