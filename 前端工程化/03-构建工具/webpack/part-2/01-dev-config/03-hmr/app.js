import './style.css'
import './input.js'

const button = document.createElement('button')
button.textContent = '添加'
button.addEventListener('click', () => {
    const div = document.createElement('div')
    div.classList.add('square')
    document.body.appendChild(div)
})
document.body.appendChild(button)

if(module.hot){
    module.hot.accept('./input.js', () => {

    })
}