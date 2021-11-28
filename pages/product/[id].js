import { useState, useContext} from 'react'
import Head from 'next/head'
import { getData } from '../../utils/fetchData'
import { DataContext} from '../../store/GlobalState'
import {addToCart} from '../../store/Action'
import {decrease , increase} from '../../store/Action'
import Notify from "../../components/Notify" 
import Link from 'next/link'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'


const ProductDetail = (props) => {
  const [product] = useState(props.product)
  const [tab, setTab] = useState(0)

  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const adminLink = () => {
    return(
        <>
            <Link href={`/create/${product._id}`}>
                <a className="btn "
                style={{marginRight: '5px', width:'100px', backgroundColor : "#ff7f50", color: "#fff"}}>Edit</a>
            </Link>

            <button className="btn btn-danger"
            style={{marginLeft: '5px', width:'100px'}}
            data-toggle="modal" data-target="#exampleModal"
            onClick={() => dispatch({
              type: 'ADD_MODAL',
              payload: [{ 
                  data: '', id: product._id, 
                  name: product.name, type: 'DELETE_PRODUCT' 
              }]
          })} >
                Delete
            </button>
        </>
    )
  }


  const isActive = (index) => {
    if(tab === index) return " active";
    return ""
}// transfer images

  

    return (

      <div>
           <NavBar></NavBar> 

          <div className= "small-container de-product"  style = {{height:"50rem"}}>
              <Head>
                  <title>Product Detail</title>
            </Head>

              <div className="row d-flex justify-content-end mx-0 mt-4 " >
                    {!auth.user || auth.user.role !== "admin" 
                          ? ""
                          : adminLink()
                                      
                  }
              </div>

              <div className = "row-1">
                <div className="cole-2 ">
                    <img src={ product.images[tab].url }
                          style = {{ width:"100%"}}></img>

                    <div className=" small-img-row" style={{cursor: 'pointer'}} >
                        {product.images.map((img, index) => (
                            <img key={index} src={img.url} alt={img.url}
                            className={`small-img-col  float-left ${isActive(index)}`}
                              onClick={() => setTab(index)} 
                            />
                        ))}
                      
                    </div>
                </div>

              <div className=" cole-2">
                  <div >
                      <h2 className="text-uppercase">{product.name}</h2>
                        <h5>${product.price}</h5>
                        <div className="row mx-0 d-flex justify-content-between">
                          {
                              product.inStock > 0
                              ? <p>In Stock: {product.inStock}</p>
                              : <p className="text-danger ">Out Stock</p>
                          }

                      <p>Sold: {product.sold}</p>

                      </div>
                        
                            <button type="button" className="btn3 d-block  px-5"
                              onClick={() => dispatch(addToCart(product, cart))} >
                              Buy
                            </button>
                            

                            <h3>Product Details <i className="fa fa-indent"></i></h3>
                            <br></br>
                            <p className="my-2">{product.description}</p>
                      </div>

              </div>
              </div>

            
          </div>

          <Footer></Footer>

        </div>
         
       
    )
}


  export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`)

    // server side rendering
    return {
      props: {product: res.product},
    }
}

export default ProductDetail
