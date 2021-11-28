import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import {DataContext} from '../../store/GlobalState'
import { useRouter } from 'next/router'
import OrderDetail from '../../components/OrderDetail'
import SignIn from '../SignIn'
import NavBar from '../../components/NavBar'


const DetailOrder = () => {
    const {state, dispatch} = useContext(DataContext)
    const {orders, auth} = state

    const router = useRouter()
    console.log(router)

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])
            
    if(!auth.user) return (
        <SignIn></SignIn>
    );
    return(
        <div>
            <NavBar></NavBar>
            <div className="small-container" style ={{marginTop: "30px"}}>
                <Head>
                    <title>Detail Orders</title>
                </Head>

                <div>
                    <button className="btn btn-light" onClick={() => router.back()}>
                        <i className="fas fa-long-arrow-alt-left"  aria-hidden="true"></i> Go Back
                    </button>
                </div>
                
                
                <OrderDetail orderDetail = {orderDetail} ></OrderDetail>
                
            
            </div>
        </div>
    )
}

export default DetailOrder