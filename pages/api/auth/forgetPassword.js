import connectDB from '../../../utils/connectDB'
import sendMail from '../../../utils/SendMail'
import Users from '../../../model/user'
import {Router} from 'next/router'
import {createAccessToken, createRefreshToken} from '../../../utils/generateToken'




connectDB()

export default async (req, res) => {
  switch(req.method){
      case "POST":
          await forgetPassword(req, res)
          break;
  }
}




const forgetPassword = async (req, res) => {
  try {
    

    const {email} = req.body

    const user = await Users.findOne({  email })
    if(!user) return res.status(400).json({err: 'The user do not exist'})

    const access_token = createAccessToken({id: user._id})
    
    const url = `${process.env.BASE_URL}/reset_password/${access_token}`

    sendMail(email, url, "Reset your password")
    res.json({msg: "Re-send the password, please check your email"})


  } catch (err) {
    return res.status(500).json({err: err.message})
  }
}


/*
       
*/
  

