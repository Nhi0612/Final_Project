import Head from 'next/head'
import { useContext } from 'react'
import {DataContext} from '../store/GlobalState'
import Link from 'next/link'
import SignIn from './SignIn'
import SideBar from '../components/SideBar'



const Users = () => {
    const {state, dispatch} = useContext(DataContext)
    const {users, auth} = state

    

    if(!auth.user || auth.user.role !== "admin" ) return (
        <SignIn></SignIn>
    ); // logout don't have error.

    
    return (
        <div>

            <Head>
                <title>Manage User</title>
             </Head>
        
            <div className = "container-fluid">
                <div className="row">
                    <SideBar></SideBar>
                    <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            <div className = "small-container" style = {{ height: "35rem", display: "block"}}>
                                <div className = "table-responsive"  style = {{ marginTop: "50px"}} >
                                    <h2 className="text-uppercase" style = {{marginBottom: '20px'}}>Manage User</h2>
                                    <table className=" w-100 table-striped"
                                        style={{minWidth: '600px', cursor: 'pointer'}}>
                                        <thead style = {{backgroundColor : "#2f3640", color: '#fff'}}>
                                            <tr>
                                                <th className= "p-2 font-weight-normal" scope="col">ID</th>
                                                <th className= "p-2 font-weight-normal" scope="col">Name</th>
                                                <th className= "p-2 font-weight-normal" scope="col">Email</th>
                                                <th className= "p-2 font-weight-normal" scope="col">Role</th>
                                                <th className= "p-2 font-weight-normal" scope="col">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                users.map((user)=>(
                                                    <tr key = {user._id} style={{cursor: 'pointer'}}>
                                                        <td scope="row" className= "p-2" >{user._id}</td>
                                                        <td scope="row" className= "p-2">{user.name}</td>
                                                        <td scope="row" className= "p-2">{user.email}</td>
                                                        <td scope="row" className= "p-2">
                                                            {
                                                                    user.role === 'admin'
                                                                    ? user.root ? <p className=" text-danger ">Admin</p>
                                                                                : <p className=" text-success "> Moderator</p>

                                                                    :<p >User</p>
                                                            }

                                                        </td>
                                                        <td scope="row" className= "p-2 text-left">
                                                            <Link href = {
                                                                auth.user.root && auth.user.email !== user.email
                                                                ? `/edit_user/${user._id}` : '#!'
                                                            }>
                                                                <a><i className="fas fa-user-edit text-info mr-2" title = "Edit"></i></a>
                                                            </Link>

                                                            {
                                                                    auth.user.root && auth.user.email !== user.email
                                                                    ? <i className="far fa-trash-alt text-danger ml-2" title="Remove"
                                                                    data-toggle="modal" data-target="#exampleModal" 
                                                                    onClick = {() => dispatch({
                                                                        type : 'ADD_MODAL',
                                                                        payload : [{data: users, id: user._id, name: user.name, type: 'ADD_USERS'}]
                                                                    })}></i>
                                                                    
                                                                    : <i className="far fa-trash-alt text-danger ml-2" title="Remove"></i>
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
                </div>
            </div>

        </div>

    )
}

export default Users
