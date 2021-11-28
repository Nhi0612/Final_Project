
import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../store/GlobalState'
import {imageUpload} from '../../utils/imageUpload'
import {postData, getData, putData} from '../../utils/fetchData'
import {useRouter} from 'next/router'
import Notify from '../../components/Notify'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'

const ManageProduct = () => {
    const initialState = {
        name: '',
        price: 0,
        inStock: 0,
        description: '',
        category: '',

    }

    const [product, setProduct] = useState(initialState)
    const { name, price, inStock, description, category,} = product

    const [images, setImages] = useState([])

    const {state, dispatch} = useContext(DataContext)

    const {categories, auth} = state

    const router = useRouter()

    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

   useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`product/${id}`).then(res => {
                setProduct(res.product)
                setImages(res.product.images)
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
        }
    },[id])


    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name] : value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e =>{
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files =  [...e.target.files]
        if(files.length === 0 ) return dispatch({type: 'NOTIFY', payload: { error: 'Files dose not exits'}})

        files.forEach(file =>{
            if(file.size > 1024 * 1024)
            return err = "The larges image size is 1mb"

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })

        if(err)dispatch({type: 'NOTIFY', payload: { error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 4 images.'}})
        setImages([...images, ...newImages])

    }

    const DeleteImage = index =>{
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin') 
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

        if(! name || !price || !inStock || !description || category === 'all' || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})

        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})

    }


    return (
        <div>
            <Head>
                <title> Create Product </title>
            </Head>
        
            <div className = "container-fluid">
                <div  className="row">
                    <SideBar></SideBar>
                    <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        
                      <div className = "small-container">
                        <div className = "create-product">
                            <h3 style = {{marginBottom: '20px'}}>Create Product</h3>
                            <form className = "row" onSubmit= {handleSubmit}>
                                <div className = "col-md-6">
                                    <label>Name Product</label>
                                    <input type = "text" name = "name" value = {name}
                                        placeholder = "Product Name" className = "d-block  w-100 p-2"
                                        onChange = {handleChangeInput}>
                                    </input>

                                    <div className = "row  my-4">
                                        <div className = " col-md-6">
                                        <label>Price</label>
                                            <input type = "number" name = "price" value = {price}
                                                placeholder = "Product price" className = "d-block  w-100 p-2"
                                                onChange = {handleChangeInput}>
                                            </input>
                                        </div>

                                        <div className = " col-md-6 ">
                                            <label>InStock</label>
                                            <input type = "number" name = "inStock" value = {inStock}
                                                placeholder = "Product inStock" className = "d-block  w-100 p-2"
                                                onChange = {handleChangeInput}>
                                            </input>
                                        </div>

                                    </div>
                                    <div className = "my-4">
                                        <label>Description</label>
                                        <textarea name="description" id="description" cols="30" rows="4"
                                        placeholder="Description" onChange={handleChangeInput}
                                        className="d-block w-100 p-2" value={description} />
                                    </div>
                                    
                                    <div className = "my-2">
                                        <label> Categories</label>
                                        <div className="input-group-prepend px-0 ">
                                            
                                            <select name="category" id="category" value={category}
                                            onChange={handleChangeInput} className="custom-select text-capitalize">
                                                <option value="all">All Products</option>
                                                {
                                                    categories.map(item => (
                                                        <option key = {item._id} value = {item._id} >
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            
                                            </select>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className = "col-md-6 add-img">
                                    <label> Add Image</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="inputGroupFile01" 
                                            onChange={handleUploadInput} multiple accept="image/*" />
                                            <label className="custom-file-label" >Choose file</label>
                                        </div>

                                    </div> 
                                    
                                    <div className="row img-up mx-0">
                                        
                                        {
                                            images.map((img, index) => (
                                                <div key={index} className="file_img">
                                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                                    alt="" className="img-thumbnail rounded" />

                                                    <span  onClick={() => DeleteImage(index)}>X</span>
                                                </div>
                                            ))
                                        }
                                    </div>

                            

                                </div>
                                        
                                <div className = "col-md-6 ">
                                    <button type = 'submit' className = "btn btn-info my-4 px-4 ">
                                        {onEdit ? 'Update' : 'Create'}
                                    </button>
                                </div>
                                
                            </form>
                            
                        </div>
                        <Notify></Notify>
                    </div>
                </div>
                </div>
            </div>                 
        </div>
    )
}

export default ManageProduct
