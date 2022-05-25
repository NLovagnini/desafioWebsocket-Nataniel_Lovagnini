const express = require('express')
const {Server: ioserver} = require('socket.io')
const Contenedor = require('./class.js')
const app = express()
const http = require('http')
const routes = require('./routes.js')

const httpServer = http.createServer(app)
const io = new ioserver(httpServer)



app.set('views', './views')
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', routes)
app.use(express.static(__dirname+"/public"))


//startup sv
const PORT = 8080
httpServer.listen(PORT, ()=>{
    console.log(`PORT ${PORT} ONLINE`)
})





