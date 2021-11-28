import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext,useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import {postData}  from '../utils/fetchData'
import Cookies from 'js-cookie'
import NavBarLog from "../components/NavBarLog"
import {useRouter} from 'next/router'
import Notify from '../components/Notify'
import { GoogleLogin } from 'react-google-login';
import Footer from '../components/Footer'

const SignIn  = () =>{
    const  initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password} = userData
    
    
    const {state, dispatch} = useContext(DataContext)
    const {auth} = state
      
    const router = useRouter()
    
    const handleChange = e =>{
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleSubmit = async e => {
        e.preventDefault()

        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        const res = await postData('auth/login', userData)
        
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
        dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
    
        dispatch({ type: 'AUTH', payload: {
          token: res.access_token,
          user: res.user
        }})
    
        Cookies.set('refreshtoken', res.refresh_token, {
          path: 'api/auth/accessToken',
          expires: 7
        })
    
        localStorage.setItem('firstLogin', true)
      }


      const responseGoogle = async (response) => {


        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        const res = await postData('auth/google_login', {tokenId: response.tokenId})
        
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
        dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
    
        dispatch({ type: 'AUTH', payload: {
            tokenId: res.access_token,
          user: res.user
        }})
    
        Cookies.set('refreshtoken', res.refresh_token, {
          path: 'api/auth/accessToken',
          expires: 7
        })
    
        localStorage.setItem('firstLogin', true)

        console.log(res)
    
    }

      useEffect(() => {
        if(Object.keys(auth).length !== 0) router.push("/")
      }, [auth])

    return(
        <div>
            <Head>
                <title>Sign In Page</title>
            </Head>

            <NavBarLog></NavBarLog>
            <div className="split-screen">
                <div className="left">
                    <section className="copy">
                        <h1>THE PERFUME</h1>
                        <p>Perfume is the clearest picture of memories.</p>
                    </section>
                </div>
                <div className="right">
                    <form className = "mx-auto" style={{maxWidth: "500px"}} onSubmit = {handleSubmit}>
                        <h2 className="copy">Sign in</h2>
                        <Notify></Notify>
                      

                        <div className="form-group">
                            <input className="form-control" 
                                type="text" 
                                name="email" 
                                id="email" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter you email"
                                value =  {email} onChange = {handleChange}>
                            </input>
                        </div>

                      

                        <div className="form-group">
                            <input type="password" 
                            className="form-control" 
                            name="password"
                            id="password" 
                            placeholder="Password"
                            value =  {password} 
                            onChange = {handleChange}></input>
                        </div>
                    
                        <button type="submit" className="btn btn-dark w-100 button_log">Login</button>
                        <div className = "my-2">
                            <Link href = "/ForgetPassword"><a style = {{color: '#3498db'}}>Forget Password </a></Link>
                        </div>
                      

                        <div className = "d-flex justify-content-between">
                            <hr  style = {{width: "30%"}}  />
                            <p className="hr">Or Login With</p>
                            <hr   style = {{width: "30%"}}  />
                        </div>
                        

                        <div type="submit" >
                            <GoogleLogin
                                className = "btn w-100 justify-content-center"
                                clientId="617368149809-0knr135709jemkt0nvhrkq6jntsdo92g.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <p className = "my-2">You do not have an account ? <Link href = "/Register"><a style = {{color: '#3498db'}}>Register</a></Link></p>
                    </form>
                </div>
            </div>
            <Footer></Footer>
                  
        </div>
    )
}
export default SignIn