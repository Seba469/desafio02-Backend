import fs from 'fs'
import {v4 as uuidV4} from 'uuid'

const path = 'src/classes/json/productos.json'

class ProductManager{

    getProducts = async () => {
        try{
            const data = await fs.promises.readFile(path, "utf-8")
            const products = JSON.parse(data)
            
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            console.log ("productos", products)
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

            return products
        }
        catch (error){
            console.log(`Ocurrio un error ${error.message}`)
        }    
    }

    addProducts = async (title, description, price, thumbnail, code, stock) => {
        try{
            const products = await this.getProducts()

            if(!title, !description, !price, !thumbnail, !code, !stock){
                console.log("Debe completar todos los campos")
                return
            }
            
            const index = products.findIndex(p => p.code === code )
    
            if (index != -1){
                console.log("Codigo repetido")
                return
            }

            const newProduct = {
                id: uuidV4(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
    
            products.push(newProduct)
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            console.log("Producto agregado")
        }
        catch(error){
            console.log(`Ocurrio un error ${error.message}`)
        }  
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts()
        
            const productoFiltrado = products.filter(prod => prod.id === id)
            
            if (productoFiltrado.length === 0){
                console.log("Not found")
                return
            }else{
                console.log(productoFiltrado)
                return productoFiltrado
            }  
        } 
        catch (error) {
            console.log(`Ocurrio un error ${error.message}`)
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts()

            const productosFiltrados = products.filter(prod => prod.id != id)
    
            console.log("producto eliminado correctamente")
            await fs.promises.writeFile(path, JSON.stringify(productosFiltrados, null, '\t'))
        } 
        catch (error) {
            console.log(`Ocurrio un error ${error.message}`)
        }
    }   
    
    updateProduct = async (id, infoNueva) => {
        const product = await this.getProductById(id)
        const newProduct = {...product, ...infoNueva}

        const products = await this.getProducts()
        const index = products.findIndex(prod => prod.id === id)
        
        products[index] = newProduct

        console.log(product)
        console.log('--------------')
        console.log(newProduct)
        console.log('--------------')
        console.log(index)
        console.log('--------------')
        console.log(products)
        //await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
    }
}

const productManager = new ProductManager();

//console.log("getProducts", productManager.getProducts())
//productManager.getProducts()
//console.log("==================================================================")
//productManager.addProducts("pantalon", "pantalon negro", 120, "pantalonNegro.jpg", "cod2", 30)
//productManager.addProducts("remera", "remera roja", 120, "remeraRoja.jpg", "cod4", 30)
//console.log("==================================================================")
//console.log("getProducts", productManager.getProductsById("ff68a63e-ee7d-428c-94f7-382a1391c35c"))
/*console.log("==================================================================")
console.log("getProductsById", productManager.getProductsById(1))*/

productManager.updateProduct("d6fa6823-a8c7-450a-8d5b-92dbe73ea6de", "pantalon")