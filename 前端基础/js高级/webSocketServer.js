const WebSocket = require('ws');

const server = new WebSocket.Server({port: 8080});

server.on('connection', socket => {
    console.log('A new client connected.');
    socket.on('message', message => {
        console.log('Received message: ' + message);
        socket.send('hello websocket.');
    })
    socket.on('close', () => {
        console.log('A client disconnected.');
    })
})