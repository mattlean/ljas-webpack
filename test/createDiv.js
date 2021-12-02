export default function createDiv(textContent = 'Hello, World!') {
  const element = document.createElement('div')
  element.textContent = textContent
  return element
}
