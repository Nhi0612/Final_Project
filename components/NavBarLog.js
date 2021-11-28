import React, {useContext} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookies from 'js-cookie'


 function NavBarLog() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const {auth , cart} = state


     const isActive = (r) =>{
         if(r === router.pathname){
             return " active"
         }
         else{
            return ""
         }
     }
   const ModRouter = () =>{

        return(
            <div>   

                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Product</a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/ManageProduct">
                        <a className="dropdown-item">Manage Product</a>
                    </Link>
                    
                    <Link href="/create">
                        <a className="dropdown-item">Create Product</a>
                    </Link>
                    
                </div>
  
            </li>
        </div>
        )


     }
     const adminRouter = () =>{

        return(
            <div>
                <ul className="navbar-nav">
                 <li className="nav-item ">
                    <Link href="/ManageUser">
                        <a className= {"nav-link " + isActive('/ManageUser')} >User</a>
                    </Link>
                </li>

                <li className="nav-item ">
                    <Link href="/ManageCate">
                        <a className= {"nav-link " + isActive('/ManageCate')} >Manage Categories</a>
                    </Link>
                </li>

               </ul>
         
        </div>
        )

     }

     const handleLogout = () => {
        Cookies.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
    }
            

     const logRouter = () =>{
         return(
             <div>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src ={auth.user.avatar}
                        style={{
                            borderRadius: '50%', width: '25px', height: '25px',
                            transform: 'translateY(-3px)', marginRight: '3px'
                        }}></img>
                    {auth.user.name}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/Profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>

                    
                    <Link href="/ManageOrder">
                        <a className="dropdown-item">Manage Order</a>
                    </Link>
                    
               
                   <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
  
            </li>

                
            </div>
         )
     }/* when user login the Item will display 
        
        
     */
           

    return (
        <div  style = {{backgroundColor: "#f7f8fc"}}>
                <nav className="navbar navbar-expand-lg navbar-light "   >
            <Link href = "/">
                <a className="navbar-brand  nav-logo">Lemon</a>
            </Link>

                
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav p-1">

                    {
                        Object.keys(auth).length === 0 
                            
                           ?  <div className="navbar-nav">
                                <li className="nav-item ">
                                    <Link href = "/Listproduct">
                                        <a className= {"nav-link " + isActive('/Listproduct')} >Product </a>
                                    </Link>
                                </li>

                                </div>
                                : auth.user.role === 'admin' 
                                ?  ModRouter()
                                : 
                                <div className="navbar-nav">
                                    <li className="nav-item ">
                                        <Link href = "/Listproduct">
                                            <a className= {"nav-link " + isActive('/Listproduct')} >Product </a>
                                        </Link>
                                    </li>

                                 </div>
                    }
                    

                    {
                        Object.keys(auth).length === 0 
                        ?<div></div>
                        : auth.user.role === 'admin' && auth.user.root 
                            ? adminRouter()
                            : ""

                    } 
                    
                   

                    {
                        Object.keys(auth).length === 0 
                           ? <div className="navbar-nav">
                                <li className="nav-item ">
                                    <Link href = "/Register">
                                        <a className= {"nav-link " + isActive('/Register')} >Register</a>
                                    </Link>
                                </li>

                                <li className="nav-item ">
                                    <Link href = "/SignIn">
                                        <a className= {"nav-link " + isActive('/SignIn')} >Sign In </a>
                                    </Link>
                                </li>

                            </div>
                            : logRouter()
                            
                    }
               
                <li className="nav-item">
                    <Link href = "/cart">
                        <a className= {"nav-link " + isActive(' /cart')}>
                            <i className="fas fa-shopping-cart  position-relative" aria-hidden = "true">
                                <span className = "position-absolute cart" >{cart.length}</span>
                                
                            </i></a>
                    </Link>
                </li>
                
             
            </ul>
            </div>
        </nav>

        </div>
        
    
    )
}
export default NavBarLog