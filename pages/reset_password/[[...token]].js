import {useState, useContext, useEffect} from 'react'
import { useRouter, Router } from 'next/router'
import {DataContext} from '../../store/GlobalState'
import validate2 from '../../utils/valid'

import { patchData } from '../../utils/fetchData'
import Head from 'next/head'
import Notify from '../../components/Notify'
import NavBarLog from '../../components/NavBarLog'



const ResetPassword = () => {

    const initialState = {
        password: '',
        password2: ''
    }

    const router = useRouter()
    const  {token}  = router.query
    console.log(token)


    const [dataPass, setDataPass ]= useState(initialState)
    const {password, password2} = dataPass

    const {state, dispatch} = useContext(DataContext)
    const { auth } = state

    const handleChange = e => {
        const { name, value } = e.target
        setDataPass({...dataPass, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
        
    }

    const handleResetPassword = async() =>{

        const errMsg = validate2(password, password2)
        if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg}})

        const res = await patchData('user/resetPassword', {password}, token )

        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    
        return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })  

        

    }
   

    

    return (
        
        <div>
        <NavBarLog></NavBarLog>
        <div className = "small-container" style = {{ height: "30rem"}}>
               <Head>
                <title> Reset Password</title>
            </Head>
     
           <div className = "col-md-4 mx-auto my-4">
            <h2 className="text-center mt-2">Reset Password</h2>

                <div className="form-group">
                            <label htmlFor = "password"> Enter your Password</label>
                            <input className="form-control" 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Enter you password"
                                value =  {password} onChange = {handleChange}>
                            </input>
                </div>

                <div className="form-group">
                            <label htmlFor = "password2"> Enter your confirm password</label>
                            <input className="form-control" 
                                type="password" 
                                name="password2" 
                                id="password2" 
                                placeholder="Enter you confirm password"
                                value =  {password2} onChange = {handleChange}>
                            </input>
                </div>

                <button type="submit" className="btn btn-dark w-100 button_log"  onClick = {handleResetPassword}>Change Password</button>

                <Notify></Notify>
           </div>

           
        </div>
        </div>
    )
}

export default ResetPassword

/*
   
*/