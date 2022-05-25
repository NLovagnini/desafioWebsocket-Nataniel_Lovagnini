const express = require('express')
const {Server: ioServer} = require('socket.io')
const http = require ('http')
const app = express ()


const httpServer = http.createServer(app)
const io = new ioServer(httpServer)


app.use(express.static(__dirname+'/public'))

const messages = [
    {user: 'Jose', msg: 'Buen dia'},
    {user: 'Pedro', msg: 'Que tal?'},
    {user: 'Manuel', msg: 'Como estan todos?'},
]










// NEW SV
io.on('connection', (socket) =>{
    socket.emit('messages', messages)
    console.log('Websocket working', socket.id)
})

const PORT = 8080
httpServer.listen(PORT, () =>{
    console.log(`Server online. Port ${PORT}`)
})




