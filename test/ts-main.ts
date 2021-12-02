import createDiv from './createDiv'
import concatStrs from './concatStrs'
import './style.css'

document.body.appendChild(createDiv(concatStrs('foo', 'bar')))
