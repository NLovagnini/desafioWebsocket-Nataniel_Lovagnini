const {Router} = require('express')
const Contenedor = require('./class.js')
const router = Router()
const multer = require('multer')

const {Server: ioserver} = require('socket.io')
const http = require('http')
const httpServer = http.createServer(router)
const io = new ioserver(httpServer)


//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+"/public/uploads")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname )
    }
})

router.use(multer({storage}).single("thumbnail"))


const getAllProds = () =>{
    const container = new Contenedor();
    const file = './productos.json';
    const allProductsArr = container.read(file);
    return allProductsArr
}

const getById = (id) =>{
    const container = new Contenedor();
    const file = './productos.json';
    const allProductsArr = container.read(file)
    return allProductsArr[id]
}

let products = getAllProds()

router.get('/:id', (req, res) =>{
    const {id} = req.params
    if (getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    res.send(getById(id-1)) 
})

router.get('/', (req, res) =>{
    res.render("index",{
        products
    })
})



router.post('/', (req, res) =>{
    const newObj = req.body
    const objImg = req.file
    newObj.id = products.length+1
    newObj.thumbnail = `/uploads/${objImg.filename}`
    products.push(newObj)
    res.render("index",{
        products
    })
})

router.put('/:id', (req, res) =>{
    const {id} = req.params
    const {title, price, thumbnail} = req.body
    if (getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    products.splice(id-1, 1, {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: id})
    res.json(products)
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params
    if (getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    products.splice(id-1, 1)
    res.send(products)
})


router.post('/uploadfile', (req, res) =>{
    res.json({message: 'Upload Successful'})
})


//sv
io.on('connection', (socket) =>{
    
    console.log('Websocket working', socket.id)
    socket.emit('products', products)
    socket.on('newProduct', product =>{
        
        messages.push(product)
        io.sockets.emit('products', product)
    })
})



module.exports = router