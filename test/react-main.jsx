import React from 'react'
import ReactDOM from 'react-dom'
import createDiv from './createDiv'
import './style.css'

const root = createDiv('', 'root')
document.body.appendChild(root)

ReactDOM.render(<h1>Hello, World!</h1>, root)
