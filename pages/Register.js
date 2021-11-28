import {useState, useContext, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import NavBarLog from "../components/NavBarLog"
import validate from '../utils/validate'
import Notify from '../components/Notify'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'

const  Register  = () => {
    

   const initialState = { name: '', email: '', password: '', password2: '' }
    const [userData, setUserData] = useState(initialState)
    const { name, email, password, password2 } = userData

    const {state, dispatch} = useContext(DataContext)
    const { auth } = state

    const router = useRouter()
    
    const handleChange = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
      }
    
  
      const handleSubmit = async e => {
        e.preventDefault()
        const errMsg = validate(name, email, password, password2)
        if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
    
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
    
        const res = await postData('auth/register', userData)
        
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    
        return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
      }
    
    useEffect(() => {
        if(Object.keys(auth).length !== 0) router.push("/")
      }, [auth]) 

      return(

        <div>
            <Head>
                <title>Register Page</title>
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
                    <form className = "mx-auto" style={{maxWidth: "500px"}} onSubmit = {handleSubmit} >
                        <h2 className="copy">Register</h2>
                        <Notify></Notify>
                        <div className="form-group">
                            <input className="form-control" 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Enter UserName"
                            value={name} 
                            onChange={handleChange}
                            >
                            </input>
                        </div>

                        <div className="form-group">
                            <input  className="form-control" 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Enter email"
                            value={email} 
                            onChange={handleChange}
                            
                            ></input>
                        </div>

                        <div className="form-group"> 
                            <input className="form-control" 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Enter Password"
                            value={password} 
                            onChange={handleChange}
                           
                           ></input>
                         </div>

                        <div className="form-group">
                            <input className="form-control" 
                            type="password" 
                            name="password2" 
                            id="password2 "
                            placeholder="Enter confirm password"
                            value={password2} 
                            onChange={handleChange}
                           
                            ></input>
                        </div>
                    
                    <button type="submit" className="btn btn-dark w-100 button_log">Register</button>
                    <p className = "my-2">Already have an account ? <Link href = "/SignIn"><a style = {{color: '#3498db'}}>Sign In</a></Link></p>
                 </form>
                </div>
            </div>
            <Footer></Footer>
        </div> 

            
      ) 
}
export default Register