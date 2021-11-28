import {getData} from '../utils/fetchData'
import { useState, useContext, useEffect} from 'react'
import Head from 'next/head'
import ProductItem from '../components/ProductItem'
import { DataContext } from '../store/GlobalState'
import {useRouter} from 'next/router'
import filterSearch from '../utils/filterSearch'
import Filter from '../components/Filter'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const ListProduct = (props) =>{

  
  
  const {state, dispatch} = useContext(DataContext)
  const { auth } = state
  const [products, setProducts] = useState(props.products)

  const [page, setPage] = useState(1)
  const router = useRouter()


 

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

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }

  //
 
    return(
      <div>

           <NavBar></NavBar>

          <div className = "small-container">
            <Head>
                <title>List Product</title>
            </Head>
          
            <div className = " row  mx-0 justify-content-end " style={{marginTop: "50px"}}>
              
                
                <div className = "" >
                  <Filter state={state} ></Filter>
                </div>
              

                </div>
              <div className="row-1">

  
                {
                  products.length === 0
                  ?<h2>No Product</h2>

                  :products.map(product => (
                    <ProductItem key = {product._id} product = {product} handleCheck = {handleCheck} ></ProductItem>
                  )
                    )
                }
                
              </div>

                {
                    props.result < page * 8 ? ""
                    : <button className="btn btn-outline-info d-block mx-auto mb-4"  onClick={handleLoadmore}>
                      load more
                    </button>
                }

        </div>
          <Footer></Footer>
      </div>
     
    )
  }
  // <Pagination></Pagination>
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
  export default ListProduct