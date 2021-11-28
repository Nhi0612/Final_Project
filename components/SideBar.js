import React, {useContext} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookies from 'js-cookie'
import Search  from './Search'
import AdminManage from '../pages/AdminManage'



function SideBar() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const {auth}  = state
    const isActive = (r) =>{
        if(r === router.pathname){
            return " active"
        }
        else{
           return ""
        }
    }

    const adminRouter = () =>{

        return(

            <div>
                <li className="nav-item">
                                                <Link href="/ManageUser">
                                                    <a  className= {"nav-link" + isActive('/ManageUser')}>
                                                        <i className="fas fa-users"> Manage User</i>   
                                                    </a>
                                                </Link>
                </li>

                    <li className="nav-item">
                                                <Link href="/ManageCate">
                                                    <a  className= {"nav-link" + isActive('/ManageCate')}>
                                                        <i className="fas fa-tags"> Manage Categories</i>  
                                                    </a>
                                                </Link>
                    </li>
            </div>

        )

            

    }
    return (
        <div>
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block  sidebar ">
                        <div className="sidebar-sticky ">
                            
                            {
                                Object.keys(auth).length === 0
                                ? ""
                                : auth.user.role === 'admin' && auth.user.root 
                                    ? <header>Admin</header>
                                    : <header>Moderator</header> 
                            }
                           
                            <ul className="nav flex-column">
                                <li className="nav-item ">
                                    <Link href="/ManageOrder">
                                        <a className= {"nav-link " + isActive('/ManageOrder')} >
                                        <i className="fas fa-shopping-cart"></i> Manage Order
                                        </a>
                                    </Link>
                                </li>

                                <li className="nav-item ">
                                    <Link href="/ManageProduct">
                                        <a className= {"nav-link " + isActive('/ManageProduct')} >
                                        <i className="fas fa-box-open"> Manage Product</i>
                                        </a>
                                    </Link>
                                </li>

                                <li className="nav-item ">
                                    <Link href="/create">
                                        <a className= {"nav-link " + isActive('/create')} >
                                        <i className="far fa-plus-square"> Create Product</i>
                                        </a>
                                    </Link>
                                </li>

                                {
                                   Object.keys(auth).length === 0
                                   ? ""
                                   : auth.user.role === 'admin' && auth.user.root 
                                       ? adminRouter()
                                       : ""
                        
                                }
                         
                                <li className="nav-item">
                                    <Link href="/">
                                        <a  className= {"nav-link" + isActive('/')}>
                                            <i className="fas fa-home"> Go Home</i> 
                                            
                                        </a>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </nav>
        </div>


    )
}

export default SideBar

/* <input type = "checkbox" id = "check"></input>
            <label>
                <i className = "fas fa-bars"></i>
            </label> */