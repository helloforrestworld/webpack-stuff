export default function () {
  const div = document.createElement('div')
  div.id = 'counter'
  div.innerHTML = 0
  div.addEventListener('click', () => {
    div.innerHTML = parseInt(div.textContent, 10) + 1
  })
  document.body.append(div)
}
