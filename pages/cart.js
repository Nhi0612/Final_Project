import Head from "next/head"
import {useContext, useState, useEffect } from 'react'
import NavBar from "../components/NavBar"
import CartItem from "../components/CartItem"
import {DataContext} from '../store/GlobalState'
import Link from 'next/link'
import { getData, postData } from '../utils/fetchData'
import Notify from "../components/Notify"
import { useRouter } from 'next/router'
import CartEmpty from "../components/CartEmpty"

const Cart = () => {
    const {state, dispatch} = useContext(DataContext)
    const { cart, auth , orders} = state
    const [total, setTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
   // const [payment, setPayment] = useState(false)
    const [callback, setCallback] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const getTotal = () => {
          const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.quantity) // total price
          },0)
    
          setTotal(res)
        }
    
        getTotal()
      },[cart])

     useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__lemon'))
        if(cartLocal && cartLocal.length > 0){
          let newArr = []
          const updateCart = async () => {
            for (const item of cartLocal){
              const res = await getData(`product/${item._id}`)
              const { _id, name, images, price, inStock, sold } = res.product
              if(inStock > 0){
                newArr.push({ 
                  _id, name, images, price, inStock, sold,
                  quantity: item.quantity > inStock ? 1 : item.quantity
                })
              }
            }
    
            dispatch({ type: 'ADD_CART', payload: newArr })
          }
    
          updateCart()
        } 
    
    },[callback])


    const handlePayment = async () =>{
        if(!address ||! phone)
        return dispatch({type: 'NOTIFY', payload: {error: "Please add your address and phone number."}})
        

        let newCart = [];
        for(const item of cart){
          const res = await getData(`product/${item._id}`)
          if(res.product.inStock - item.quantity >= 0){
            newCart.push(item)
          }
        }
    
      if(newCart.length < cart.length){
        setCallback(!callback)
        return dispatch({ type: 'NOTIFY', payload: {
          error: 'The product is out of stock or the quantity is insufficient.'
        }})
      }
      dispatch({ type: 'NOTIFY', payload: {loading: true} })

      postData('order', { address, phone, cart, total }, auth.token)
                
      .then(res => {
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
          dispatch({type: 'ADD_CART', payload: []})
         
          const  newOrder = {
            ...res.newOrder,
            user: auth.user
          }

          dispatch({type: 'ADD_ORDERS', payload: [...orders, newOrder]})
          dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
          return router.push(`/order/${res.newOrder._id}`)

    
  })

    }
    
    
    if( cart.length === 0 ) return (
      <CartEmpty></CartEmpty>
    )

    return(
      <div>

        <NavBar></NavBar>

        <div className = "small-container">
          <div className=" cart1">
              <div >
              <Head>
                <title>Cart Page</title>
              </Head>
              
              <div>
                <h2 className="text-uppercase">Shopping Cart</h2>
                <table className= "cart-table">
                    <tr>         
                      <th style = {{width: "597px"}}>Product</th>
                      <th  style = {{width: "203px"}}>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  <tbody>
                      {
                        cart.map(item => (
                          <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                        ))
                      }
                    </tbody>

                    </table>
                    
                    <div className="total-price">

                          <table>
                              <tr >
                                  <td style =  {{paddingTop: "10px", paddingBottom: "10px"}}>Subtotal</td>
                                  <td style =  {{paddingTop: "10px", paddingBottom: "10px"}}><span className="text-danger">${total}</span></td>

                              </tr>
                              
                              
                              
                          </table>

                      </div>

                      <div  className="total-price">
                        <table>
                          <tr>
                            <h5 className="text-center font-weight-bolder"
                            style = {{marginTop: "10px"}}>
                              Payment
                            </h5>
                          </tr>
                          <tr>
                                <div>

                                  <label htmlFor="address">Address</label>
                                  <input type="text" name="address" id="address"
                                  className="form-control mb-2" value= {address}
                                  onChange={e => setAddress(e.target.value)}
                                  />

                                  <label htmlFor="mobile">Phone number</label>
                                  <input type="text" name="mobile" id="mobile"
                                  className="form-control mb-2" value= {phone}
                                  onChange={e => setPhone(e.target.value)}
                                  />
                                </div>
                                
                            
                            </tr>

                            <tr> 
                                
                                <Link href={auth.user ? '#!' : '/SignIn'}>
                                    <a className="btn btn-dark my-2" onClick = {handlePayment}>Proceed with payment</a>
                                </Link>

                            </tr>

                    
                        </table>

                      </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
     
      
 
    )
}



export default Cart