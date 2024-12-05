// import "./app.css"
import style from './app.css'
console.log(style) // {box: 'jiiwoQM4RBXA8T7kGVrB'}

const div = document.createElement('div')
div.textContent = 'hello postcss'
div.classList.add(style.box)
document.body.appendChild(div)