import React from 'react'
import ReactDOM from 'react-dom'
import createDiv from './createDiv'
import HelloWorld from './HelloWorld'
import './style.css'

const root = createDiv('', 'root')
document.body.appendChild(root)

ReactDOM.render(<HelloWorld />, root)
