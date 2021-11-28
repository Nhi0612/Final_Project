import {useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import NavBar from "../components/NavBar"
import Head from 'next/head'
import {DataContext} from '../store/GlobalState'
import SignIn from './SignIn'
import Pagination from '../components/Pagination'

const ManageOrder = () => {
    const {state, dispatch} = useContext(DataContext)
    const { orders, auth , cart } = state

    if(!auth.user) return (
        <SignIn></SignIn>
    ); // logout don't have error.
    return (
        <div>
             
              <Head>
                    <title>Manage Order</title>
              </Head>
              
              <NavBar></NavBar>
             <div className = "small-container" style = {{ height: "35rem"}}>
                            <div className="table-responsive" style = {{ marginTop: "50px"}}>
                                <h2 className="text-uppercase"  style = {{marginBottom: '20px'}}>Manage Order</h2>
                                        <table className="  w-100  table-striped "
                                        style={{minWidth: '600px', cursor: 'pointer'}}>
                                            <thead  style = {{backgroundColor : "#2f3640", color: '#fff'}}>
                                                <tr>
                                                    <td  className= "p-2" scope="col">Date</td>
                                                    <td  className= "p-2" scope="col">Product</td>
                                                    <td  className= "p-2" scope="col">Total</td>
                                                    <td  className= "p-2" scope="col">Delivery</td>
                                                    <td className= "p-2 text-left" scope="col">Pay</td>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                
                                                {
                                                    orders.map(order => (
                                                        
                                                        <tr key={order._id}>
                                                        

                                                                <td scope="row" className= "p-2">
                                                                    <Link href={`/order/${order._id}`}>
                                                                        <a>{new Date(order.createdAt).toLocaleDateString()}</a>
                                                                    </Link>
                                                                </td>
                                                                <td scope="row" className= "p-2 ">{order.cart.length}</td>
                                                                <td scope="row" className= "p-2">${order.total}</td>
                                                                <td scope="row" className= "p-2 ">
                                                                    {
                                                                        order.delivered
                                                                        ? <p className="text-success mb-0" >{new Date(order.updatedAt).toLocaleDateString()}</p>
                                                                        : <p className="text-danger  mb-0" >Not delivery</p>
                                                                    }
                                                                </td>
                                                                <td scope="row" className= "p-2 text-left ">
                                                                    {
                                                                        order.paid
                                                                        ? <p className="text-success  mb-0" >Paid</p>
                                                                        :  <p className="text-danger  mb-0" >Unpaid</p>
                                                                    }
                                                                </td>
                        
                                                        </tr> 
                                                    ))
                                                }
                                            </tbody>

                                        </table>
                                    </div>

                                
            </div>
            
        </div>
        
    )
}

export default ManageOrder
