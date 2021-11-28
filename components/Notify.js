import {useContext} from 'react'
import { DataContext } from '../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'

const Notify = () =>{
    const {state, dispatch} = useContext(DataContext)
    const { notify } = state
    
    
    return(
        <div>
            {notify.Loading && <Loading></Loading>}
            {notify.error && 
            <Toast
                msg = {{msg: notify.error, title: 'Error'}}
                bgColor = "text-danger"
            ></Toast>
            }
            {notify.success && 
            <Toast
                msg = {{msg: notify.success, title: 'Success'}}
                bgColor = "text-success"
            ></Toast>
            }
        </div>
    )
}

export default Notify 