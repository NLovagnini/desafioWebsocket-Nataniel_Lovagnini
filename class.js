const fs = require('fs')

module.exports = class Contenedor {
    constructor (){}

    read(file){
        let productsArray = []
        try{
            productsArray = JSON.parse(fs.readFileSync(file, 'utf-8'));
        }catch(err){
            console.log(err)
        }
        return productsArray
    }

}