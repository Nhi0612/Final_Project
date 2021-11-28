import Link from 'next/link'
import Rating from './Rating'
import { useContext } from 'react'
import {DataContext} from '../store/GlobalState'


const ProductItem = ({product}) => {

    const {state, dispatch} = useContext(DataContext)
    const {auth} = state


    return (

        <div className="cole-4  card">

                    <Link href={`product/${product._id}`}>
                        <a >
                            <img src={product.images[0].url} alt={product.images[0].url} />
                        </a>
                    </Link>
                
                    <div className="name-pd card-body">
                        <Link href={`product/${product._id}`}>
                            <a>
                                <h6 className="card-title text-capitalize">
                                    {product.name}</h6>
                            </a>
                        </Link>
                       
                       <div className= "row justify-content-between mx-0">
                        <p >Price: ${product.price}</p>
                        <p > Sold: {product.sold}</p>

                       </div>
                       
                    </div>

        </div>             
                           
           
      
)
}
    

export default ProductItem
