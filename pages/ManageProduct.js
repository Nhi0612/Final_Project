import {getData} from '../utils/fetchData'
import { useState, useContext, useEffect} from 'react'
import Head from 'next/head'
import NavBar from "../components/NavBar"
import { DataContext } from '../store/GlobalState'
import {useRouter} from 'next/router'
import filterSearch from '../utils/filterSearch'
import ItemManaProduct from '../components/ItemManaProduct'
import Pagination from '../components/Pagination'
import { JsonWebTokenError } from 'jsonwebtoken'
import SideBar from '../components/SideBar'
import Search from '../components/Search'
import Filter from '../components/Filter'

const ManageProduct = (props) => {

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state
  const [products, setProducts] = useState(props.products)

  const [page, setPage] = useState(1)
  const router = useRouter()

  const [isCheck, setInCheck] = useState([false])

  useEffect(() => {
    setProducts(props.products)
  },[props.products])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1) 
  },[router.query])

  const handleCheck = (id) => {

    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setInCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if(product.checked){
          deleteArr.push({
            data: '', 
            id: product._id, 
            name: 'Delete all selected products?', 
            type: 'DELETE_PRODUCT'
          })
      }
    })

    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }

    return (
      <div>
          
          <Head>
                <title>Manage Product</title>
          </Head>
        
          <div className = "container-fluid">
            <div className="row">
            <SideBar></SideBar>
              <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
           
                  <div className = "small-container" >
                    <div className = " row  mx-0 " style={{marginTop: "50px"}}>
                        <div className = "col-sm-2">
                            {
                            auth.user && auth.user.role === 'admin' &&
                                <div className=" delete_all" >
                                <input type="checkbox" checked={isCheck} onChange={handleCheckALL} 
                                className = "input-delete"/>

                                <button className="btn ml-2 delete-button" 
                                data-toggle="modal" data-target="#exampleModal"
                                onClick={handleDeleteAll}
                                >   
                                    DELETE ALL
                                </button>
                                </div>
                        
                            
                            }
                        </div>
                        <div className = "col-sm-5">
                            <Search></Search>
                        </div>
                        
                        <div className = "col-sm-5" >
                        <Filter state={state} ></Filter>
                        </div>
                    </div>
                    <div className="table-responsive" style = {{ marginTop: "50px"}}>
                  
                    <table className="w-100  table">
                        <thead style = {{backgroundColor : "#2f3640", color: '#fff'}}>
                            <tr>
                                 <th scope="col">Check</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">InStock</th>
                                <th scope="col">Sold</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                    
                                {
                                products.length === 0
                                ?<h2>No Product</h2>

                                :products.map(product => (
                                    
                                    <ItemManaProduct key = {product._id} product = {product} category = {product.category} handleCheck = {handleCheck} ></ItemManaProduct>
                                    
                                ))
                            }
                                
                        </table>

                        {
                          props.result < page * 8 ? ""
                          : <button className="btn btn-outline-info d-block mx-auto mb-4"  onClick={handleLoadmore}>
                            load more
                          </button>
                      }

                    
                        </div>
                  </div>
              
              </div>

              </div>
          </div>
      </div>
       
    )
}

export async function getServerSideProps({query}) {
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'

   

    const res = await getData(`product?limit=${page * 8}&category=${category}&sort=${sort}&name=${search}`)
    
    return {
      props: {
        products: res.products,
        result: res.result
      }, 
    }
  }

export default ManageProduct




