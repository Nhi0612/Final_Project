import Head from 'next/head'
import {useContext, useState} from 'react'

import {DataContext} from '../store/GlobalState'
import {updateItem} from '../store/Action'
import { postData, putData } from "../utils/fetchData"
import SignIn from './SignIn'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

const Categories = () => {
    const [name, setName] = useState('')

    const {state, dispatch} = useContext(DataContext)
    const {categories, auth} = state
    
   const [id, setId] = useState('')

    const createCategory = async () => {
        if(auth.user.role !== 'admin')
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

        if(!name) return dispatch({type: 'NOTIFY', payload: {error: 'Name can not be left blank.'}})

        dispatch({type: 'NOTIFY', payload: {loading: true}})

        let res;
        if(id){
            res = await putData(`categories/${id}`, {name}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'))

        }else{
            res = await postData('categories', {name}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: "ADD_CATEGORIES", payload: [...categories, res.newCategory]})
        }

          return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
       
       
    }
   
    const handleEditCategory= (category) => {
        setId(category._id)
        setName(category.name)
    }

    
 

    if(!auth.user || auth.user.role !== "admin") return (
        <SignIn></SignIn>
    );
    
    return(
        <div>
            <Head>
                <title>Categories</title>
            </Head>
            <div className = "container-fluid">
                <div className = "row">
                    <SideBar></SideBar>
                    <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        <div className="small-container" style = {{ marginTop: "50px"}}>
                            <div className="col-md-6 mx-auto my-3 ">
                                <h2 className="text-capitalize text-center my-3"  >manage categories</h2>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control"
                                    placeholder="Add a new category" value={name}
                                    onChange={e => setName(e.target.value)} />

                                    <button className="btn btn-secondary ml-1"
                                    onClick={createCategory}>
                                    {id ? "Update": "Create"}
                                    </button>
                                </div>

                                {
                                categories.map(category => (
                                            <div key={category._id} className="card my-2 text-capitalize">
                                                <div className="card-body d-flex justify-content-between">
                                                    {category.name}

                                                    <div style={{cursor: 'pointer'}}>
                                                        <i className="fas fa-edit mr-2 text-info"
                                                        onClick={() => handleEditCategory(category)}></i>

                                                        <i className="far fa-trash-alt text-danger"
                                                        data-toggle="modal" data-target="#exampleModal"
                                                        onClick={() => dispatch({
                                                        type: 'ADD_MODAL',
                                                        payload: [{ 
                                                            data: categories, id: category._id, 
                                                            name: category.name, type: 'ADD_CATEGORIES' 
                                                        }]
                                                    })} ></i>

                                                    </div>
                                                
                                        </div>
                                    </div>
                                    ))
                                }

                            
                    
                            </div>
                    
                        </div>

                    </div>
                </div>
            </div>
        </div>
       
        
    )
}

export default Categories