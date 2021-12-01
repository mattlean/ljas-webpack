import React from 'react'
import ReactDOM from 'react-dom'
import createDiv from './createDiv'
import concatStrs from './concatStrs'
import Foobar from './Foobar'
import './style.css'

document.body.appendChild(createDiv(concatStrs('foo', 'bar')))

const root = createDiv('', 'root')
document.body.appendChild(root)

ReactDOM.render(<Foobar />, root)
