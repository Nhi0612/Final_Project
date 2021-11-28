import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import {deleteItem} from '../store/Action'
import { deleteData } from '../utils/fetchData'
import {useRouter} from 'next/router'



const Modal = () => {

    const {state, dispatch} = useContext(DataContext)
    const { modal, auth } = state

    const router = useRouter()

   const deleteUser = (item) => {
    
    deleteData(`user/${item.id}`, auth.token)
    .then(res => {
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        dispatch(deleteItem(item.data, item.id, item.type))
        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    })
        
    }

    const deleteCate = (item) => { 
        deleteData(`categories/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
    
            dispatch(deleteItem(item.data, item.id, item.type))
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
            
    }

    const deleteProduct = (item) => {
        
        deleteData(`product/${item.id}`, auth.token)
    
        return router.push({
            pathname: '/ManageProduct',
            
        })

    }

    const deleteCartItem = (item) =>{
        dispatch(deleteItem(item.data, item.id, item.type))
    }
    

    const handleSubmit = () => {
        if(modal.length !==0){
            for(const item of modal) {
                
                if(item.type === 'ADD_CART') deleteCartItem(item)

                if(item.type === 'ADD_USERS') deleteUser(item)
        
                if(item.type === 'ADD_CATEGORIES') deleteCate(item)
        
                if(item.type === 'DELETE_PRODUCT') deleteProduct(item)
                
                dispatch({ type: 'ADD_MODAL', payload: [] })
            }
        }
    }


    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{modal.length !==0 && modal[0].name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Do you want to delete this product?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick = {handleSubmit}>Yes</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Modal
