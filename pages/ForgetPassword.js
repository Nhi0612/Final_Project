import {useState, useContext, useEffect} from 'react'
import Head from 'next/head'
import NavBar from "../components/NavBar"
import validate from '../utils/validate'
import {postData} from '../utils/fetchData'
import {DataContext} from '../store/GlobalState'
import Notify from '../components/Notify'
import { useRouter } from 'next/router'

const ForgetPassword = () => {

    const initialState = {email: ''}
    const [data, setData] = useState(initialState)
    const {email} = data

    const {state, dispatch} = useContext(DataContext)
    const { auth } = state

    const router = useRouter()


    const handleChange = e =>{
        const {name, value} = e.target
        setData({...data, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleForgetPassword = async () =>{
        
        dispatch({ type: 'NOTIFY', payload: {loading: true} })

        const res = await postData('auth/forgetPassword', data)

        
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    
        return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
   
    }


    return (
        <div>
                 <NavBar></NavBar>
            <div className="container" style = {{ height: "30rem"}}>
                        <Head>
                            <title> Forget Password</title>
                        </Head>
                    
                    <div className = "col-md-4 mx-auto my-4">
                        <h2 className="text-center mt-2">Forget Password</h2>

                            <div className="form-group">
                                        <label htmlFor = "email"> Enter your email</label>
                                        <input className="form-control" 
                                            type="text" 
                                            name="email" 
                                            id="email" 
                                            placeholder="Enter you email"
                                            value =  {email} onChange = {handleChange}>
                                        </input>
                            </div>

                            <button type="submit" className="btn btn-dark w-100 button_log"  onClick = {handleForgetPassword}>Send Gmail</button>

                            <Notify></Notify>
                    </div>
                    </div>
        </div>
        
    )
}

export default ForgetPassword
