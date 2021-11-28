import connectDB from '../../../utils/connectDB'
import Products from '../../../model/product'



connectDB()


export default async (req, res) => {
    switch(req.method){
        case "GET":
            await paginating(req, res)
            break;
    }
}

paginating = async (req, res) =>{

    try {

        let query = Products.find();  

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit;
        const total = await Products.countDocuments();
        const pages = Math.ceil(total /limit);
        
        query = query.skip(skip).limit(limit);

        if(page > pages){
            return res.status(400).json({err: 'No page found'})
        }
        const result = await query;
        res.json({
            status: 'success',
            count: result.length,
            page,
            pages,
            data : result
    })
        
    } 
    catch (err) {
        return res.status(500).json({err: err.message})
    }
  
   
}

