import React from 'react'
import {decrease , increase} from '../store/Action'
import Link from 'next/link'

const CartItem = ({item, dispatch, cart}) => {
    return (

                <tr>
                        <td style={{width: '100px', overflow: 'hidden'}} className = "cart2">
                            <div className="cart-info">
                                <img src={item.images[0].url} />
                        
                                <div style={{minWidth: '200px'}} className = "cart-info-pro" >
                                    <p className="text-capitalize" style = {{ marginBottom: "5px",}}> 
                                        <Link href={`/product/${item._id}`}>
                                            <a>{item.name}</a>
                                        </Link>
                                    </p>

                                    <h6 className= "text-dark" style = {{ marginBottom: "3px", fontSize: "0.9rem"}} >${item.price}</h6>

                                    <small style={{color:"#ff523b"}} aria-hidden="true" 
                                        data-toggle="modal" data-target="#exampleModal" 
                                        onClick = {() => dispatch({
                                            type : 'ADD_MODAL',
                                            payload :[{ data: cart, id : item._id, name : item.name, type: 'ADD_CART'}]
                                        })}
                                    >Remove</small>
                                    </div>
                                </div>
                        </td>
                  
                        <td className="align-middle" style={{minWidth: '150px'}}>
                            <button className="btn-in-de btn" 
                            onClick = {() => dispatch(decrease(cart, item._id))}
                            disabled = {item.quantity ===1 ? true :false}> - </button>

                            <span className="px-3">{item.quantity}</span>

                            <button className="btn-in-de btn" 
                            onClick = {() => dispatch(increase(cart, item._id))}
                            disabled = {(item.quantity === 10 )|| (item.quantity === item.inStock) ? true :false} > + </button>
                        </td>

                        <td>${item.quantity * item.price}</td>

        </tr>
        
    )
}

export default CartItem

