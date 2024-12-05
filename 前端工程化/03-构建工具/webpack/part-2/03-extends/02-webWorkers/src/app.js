const worker = new Worker(new URL('./worker.js', import.meta.url))

worker.postMessage({
    question: 'hi,那边的worker线程，请告诉我今天的幸运数字是多少？'
})

worker.onmessage = (message) => {
    // console.log(message)
    console.log('主线程收到了回复：', message.data.answer)
}