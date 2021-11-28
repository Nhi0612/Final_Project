import {useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import NavBar from "../components/NavBar"
import {DataContext} from '../store/GlobalState'
//import Home from '.'
import SignIn from './SignIn'
import validate from '../utils/validate'
import { patchData } from '../utils/fetchData'
import Notify from '../components/Notify'
import {imageUpload} from '../utils/imageUpload'
import Footer from '../components/Footer'



const Profile = () => {
    const initialSate = {
        avatar: '',
        name: '',
        password: '',
        password2: ''
    }

    const [data, setData] = useState(initialSate)
    const { avatar, name, password2, password } = data

    const {state, dispatch} = useContext(DataContext)
    const { auth , notify } = state

    useEffect (() => {
        if(auth.user) setData({...data, name: auth.user.name})
    }, [auth.user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleUpPro= e => {
        e.preventDefault()
        if(password){
            const errMsg = validate(name, auth.user.email, password, password2)
            if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
            updatePassword()
        }

        if(name !== auth.user.name || avatar) updateInfor()
    }

    const updatePassword = () => {

        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
            return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
        })
    }


    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if(!file)
            return dispatch({type: 'NOTIFY', payload: {error: 'File does not exist.'}})

        if(file.size > 1024 * 1024) //1mb
            return dispatch({type: 'NOTIFY', payload: {error: 'The largest image size is 1mb.'}})

        if(file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return dispatch({type: 'NOTIFY', payload: {error: 'Image format is incorrect.'}})
        
      
            setData({...data, avatar: file})
    }
    
   const updateInfor =  async () =>{

    let media;
    dispatch({type: 'NOTIFY', payload: {loading: true}})

    if(avatar) media = await imageUpload([avatar])

    patchData('user', {
        name, avatar: avatar ? media[0].url : auth.user.avatar
    }, auth.token).then(res => {
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        dispatch({type: 'AUTH', payload: {
            token: auth.token,
            user: res.user
        }})
        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        
   })

    }
   
    
    if(!auth.user) return (
            <SignIn></SignIn>
    ); // logout don't have error.

    return (
        <div>
             <NavBar></NavBar>

            <div className = "small-container" style = {{ height: "30rem", marginTop: "40px"}} >
                <Head>
                    <title>Manage Profile</title>
                </Head>

                <section className =" row text-secondary my-3">
                    < div className = "col-md-4">
                        <h4 className = "text-center text-uppercase text-dark">
                            {auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}
                        </h4>

                        
                            <div className="avatar">
                                <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                                alt="avatar" />
                            </div>
                            <div className = "button-upload">
                                <button className = "btn-upload__avatar btn btn-secondary position-absolute rounded-circle py-1 px-2 fs-5 ">
                                    <input type="file" name="file" id="file_up" 
                                        accept="image/*" onChange={changeAvatar}/>
                                        <i className="fa fa-camera text-white" aria-hidden="true"></i>
                                </button>
                            
                            </div>


                        </div>

                    <div className = "col-md-8">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Personal information</a>
                                <a className="nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Change the password</a>
                            </div>

                        </nav>

                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" style = {{marginTop : "2rem"}}>
                                <Notify></Notify>
                                

                                <div className="form-group">
                                        <label >User Name</label>
                                        <input type="text" className="form-control" 
                                        name = "name"
                                        value= {name}
                                        placeholder="Your name"
                                        onChange= {handleChange}
                                        ></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor = "email">Email</label>
                                        <input type="text" className="form-control" 
                                        name = "email"
                                        defaultValue = {auth.user.email}
                                        placeholder="Your email"
                                        disabled = {true}></input>
                                    </div>

                                
                                                
                                <button  className="btn btn-primary" disabled = {notify.loading}  onClick = {handleUpPro}>Upload</button>
                            </div>

                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" style = {{marginTop : "2rem"}}>
                                <Notify></Notify>
                            
                                <div className="form-group">
                                            <label htmlFor = "newPassword">New Password </label>
                                            <input type="password" className="form-control" 
                                            name = "password"
                                            value = {password}
                                            placeholder="your new Password"
                                            onChange = {handleChange}
                                            ></input>
                                </div>

                                <div className="form-group">
                                        <label htmlFor = "newPassword">Confirm New Password </label>
                                        <input type="password" className="form-control" 
                                        name = "password2"
                                        value = {password2}
                                        placeholder="Confirm your new Password"
                                        onChange = {handleChange}
                                        ></input>
                                </div>

                                <button  className="btn btn-primary" disabled = {notify.loading}  onClick = {handleUpPro}>Change Password</button>

                            </div>
                        
                        </div>
                    </div>

                    
                </section>
                
            </div>

            <Footer></Footer>
        </div>
       
    )
}


export default Profile

