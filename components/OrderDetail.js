import Link from 'next/link'
import PaymentBtn from './PaymentBtn'
import { patchData } from '../utils/fetchData'
import {updateItem} from '../store/Action'
import {useContext} from 'react'
import {DataContext} from '../store/GlobalState'
import CartItem from "../components/CartItem"

const OrderDetail = ({ orderDetail}) => {
    const {state, dispatch} = useContext(DataContext)
    const {auth, orders} = state



    const handleDelivered= (order) =>{
        
        patchData(`order/delivery/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
          

           const { paid, dateOfPayment, method, delivered } = res.result

            dispatch(updateItem(orders, order._id, {
                ...order, paid, dateOfPayment, method, delivered
            }, 'ADD_ORDERS'))

            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    if(!auth.user) return null;
    return (
        <div style = {{margin: '20px auto'}}>
        {
            orderDetail.map(order =>(
                <div key = {order._id} className = "tp">
                    
                        
                    <div>
                        <h3>Order Items</h3>

                        <table className= "cart-table">
                            <tr>         
                                <th style = {{width: "597px"}}>Product</th>
                                <th  style = {{width: "203px"}}>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                            <tbody>

                        {
                            order.cart.map(item => (

                                <tr  key={item._id} style={{maxWidth: '550px'}}>
                                <td style={{width: '100px', overflow: 'hidden'}} className = "cart2"  >
                                    <div className="cart-info">
                                        <img src={item.images[0].url} alt={item.images[0].url}/>
                                
                                        <div style={{minWidth: '200px'}} className = "cart-info-pro" >
                                            <p className="text-capitalize" style = {{ marginBottom: "5px",}}> 
                                                <Link href={`/product/${item._id}`}>
                                                    <a>{item.name}</a>
                                                </Link>
                                            </p>

                                            <h6 className= "text-dark" style = {{ marginBottom: "3px", fontSize: "0.9rem"}} >${item.price}</h6>

                                        </div>
                                    </div>
                                </td>
                
                        <td className="align-middle" style={{minWidth: '150px'}}>
                            <span className="px-3">{item.quantity}</span>
                        </td>

                        <td>${item.quantity * item.price}</td>

                    </tr>

                            
                                
                            ))
                        }
                        </tbody>
                    </table>
                    <div className="total-price">

                        <table>
                            <tr >
                                <td style =  {{paddingTop: "10px", paddingBottom: "10px"}}>Subtotal</td>
                                <td style =  {{paddingTop: "10px", paddingBottom: "10px"}}><span className="text-danger">${order.total}</span></td>

                            </tr>
                            
                        </table>

                    </div>

                    
                    </div>

                    {
                            auth.user.role === "admin" &&
                            <div style = {{marginTop: "60px"}} >
                                 <h3>Information Order</h3>
                                <div className = "row">
                                    <div className="mt-2 col-6">
                                        <h4>Shipping</h4>
                                        <p>Name: {order.user.name}</p>
                                        <p>Email: {order.user.email}</p>
                                        <p>Address: {order.address}</p>
                                        <p>Mobile: {order.phone}</p>
                                    </div>

                                    <div className="mt-2 col-6">

                                        <div>
                                            <h4>Payment</h4>
                                                {
                                                    order.method && <h6>Method: <em>{order.method}</em></h6>
                                                }
                                                
                                                {
                                                    order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>
                                                }

                                                <div className= "justify-content-between align-items-center" role="alert">
                                                    {
                                                        order.paid ? `Paid on ${new Date(order.updatedAt).toLocaleDateString()}` : 'Not Paid'
                                                    }
                                                    
                                                </div>

                                                {
                                                    order.delivered ? `Delivered on ${new Date(order.updatedAt).toLocaleDateString()}` : ''

                                                    
                                                }
                                                
                                               
                                               {   
                                                    
                                                    auth.user.role === 'admin' && !order.delivered && 
                                                     <button className="btn mt-2" style = {{backgroundColor: "#ff523b", color: "#ffff"}} 
                                                        onClick={() => handleDelivered(order)}>
                                                        Delivery
                                                    </button>   
                                                     
                                                
                                                }



                                        </div>
                                        
                                  
                                    </div>
                                

                                </div>
                            </div>

                            
                    }

                    <div  className="total-price">
                        <table>
                           

                            <tr> 
                            {
                            
                            !order.paid && auth.user.role !== 'admin' &&

                            <div >
                                <h5 className="text-center font-weight-bolder"
                                style = {{marginTop: "10px"}}>
                                    Payment
                                </h5>
                                <PaymentBtn order={order}/>
                                
                                
                            </div>

                            

                            }
                            </tr>
                         </table>
                    </div>



                </div>

                
                                         
            ))
        }
    </div>
    )
}

export default OrderDetail

/*
order.updatedAt
   <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                            d-flex justify-content-between align-items-center`} role="alert">
*/