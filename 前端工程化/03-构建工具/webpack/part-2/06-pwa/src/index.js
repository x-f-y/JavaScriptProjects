console.log('hello webpack')

if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker注册成功：', registration)
            })
            .catch(registraionError => {
                console.log('ServiceWorker注册失败：', registraionError)
            })
    })
}