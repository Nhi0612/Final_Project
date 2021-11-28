import React from 'react'
import Link from "next/link"
import NavBar from './NavBar'

const CartEmpty = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className = "small-container" style = {{ height: "30rem"  }}> 
                <div className="text-center "
                style = {{marginTop: '50px'}}>
                    <img src="/images/empty.png" className="rounded" alt="..."></img>
                    <p style = {{marginTop: "30px"}}>There are no products in your shopping cart.</p>
                    <button  type="button" className="btn btn-warning">
                        <Link href=" /Listproduct">
                                <a  className="navbar-brand "> Continue shopping</a>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartEmpty
