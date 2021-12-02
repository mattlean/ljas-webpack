export default function createDiv(textContent = 'Hello, World!', id) {
  const element = document.createElement('div')

  if (textContent) {
    element.textContent = textContent
  }

  if (id) {
    element.setAttribute('id', id)
  }

  return element
}
