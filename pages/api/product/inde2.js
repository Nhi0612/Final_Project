import connectDB from '../../../utils/connectDB'
import Products from '../../../model/product'
import auth from '../../../middleware/auth'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;

        case "POST":
            await createProduct(req, res)
            break;

    }
}

/*
            const startIndex = (page - 1) * limit
        const endIndex = page * limit

*/ 
const getProducts = async (req, res) => {
    try {


        const products = await Products.find()
        
        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

        const { name, price, inStock, description, category, images} = req.body

        if(!name || !price || !inStock || !description || category === 'all' || images.length === 0)
        return res.status(400).json({err: 'Please add all the fields.'})



        const newProduct = new Products({
             name: name.toLowerCase(), price, inStock, description, category, images
        })

        await newProduct.save()

        res.json({msg: 'Success! Created a new product'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}


