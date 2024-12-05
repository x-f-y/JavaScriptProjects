self.onmessage = (message) => {
    console.log('worker收到了问题：', message.data.question)
    self.postMessage({
        answer: 1111
    })
}