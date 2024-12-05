fetch('/api/hello')
    .then(response => {
        // console.log(response)
        return response.text()
    })
    .then(result => {
        console.log(result)
    })

console.log('hello webpack')