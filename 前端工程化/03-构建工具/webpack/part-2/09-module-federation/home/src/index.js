import HomeList from './HomeList'

import('nav/Header').then(Header => {
    const block = document.createElement('div')
    block.append(Header.default())
    document.body.appendChild(block)
    document.body.innerHTML += HomeList(5)
})
