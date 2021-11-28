import Link from 'next/link'
import { useContext } from 'react'
import {DataContext} from '../store/GlobalState'

const ItemManaProduct = ({product, handleCheck, category}) => {
    const {state, dispatch} = useContext(DataContext)
    const {categories, auth} = state

    


    return (

        <>
            <tbody>

            <tr>

                    <td  scope="row " > 

                            <input type="checkbox" checked={product.checked}
                            
                            style={{height: '20px', width: '20px'}}
                            onChange={() => handleCheck(product._id)} />
                    </td>
           

                    <td style={{width: '100px', overflow: 'hidden'}} className = "cart2"  scope="row">
                            <div className="cart-info">
                                <Link href={`product/${product._id}`}>
                                    <a >
                                        <img src={product.images[0].url} alt={product.images[0].url} />
                                    </a>
                                </Link>
                        
                                <div style={{minWidth: '200px'}} className = "cart-info-pro" >
                                    <p className="text-capitalize" style = {{ marginBottom: "5px",}}> 
                                    <Link href={`product/${product._id}`}>
                                        <a>{product.name}</a>
                                    </Link>
                                    </p>
                                </div>
                            </div>
                    </td>
                    
                    <td >
                        <p className= "pt-2 ">  ${product.price}</p>
                    </td>
                
                    <td >
                        <p className= "pt-2" > {product.inStock}</p>
                      
                    </td>
                       
                    <td >
                        <p className= "pt-2 ">  {product.sold}</p>
                    </td>

                   

                    <td className = "text-left">
                        <Link href = {`create/${product._id}`}>
                            <a><i className="fas fa-edit text-info mr-2" title = "Edit"></i></a>
                        </Link>

                        <i className="far fa-trash-alt text-danger ml-2" title="Remove"
                        data-toggle="modal" data-target="#exampleModal"
                        onClick={() => dispatch({
                            type: 'ADD_MODAL',
                            payload: [{ 
                                data: '', id: product._id, 
                                name: product.name, type: 'DELETE_PRODUCT' 
                            }]
                        })} >
                          
                        </i>

                    </td>


        </tr>   

        </tbody>   

        </>      
                           
           
      
)
}

export default ItemManaProduct

                    /*
                    
                           
                    */