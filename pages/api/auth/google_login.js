import connectDB from '../../../utils/connectDB'
import Users from '../../../model/user'
import bcrypt from 'bcrypt'
import {createAccessToken, createRefreshToken} from '../../../utils/generateToken'



connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await google_login(req, res)
            break;
    }
}

const {google} = require('googleapis')
const {OAuth2} = google.auth
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const google_login = async (req, res) =>{

    try {
        const {tokenId} = req.body

        const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })
        
        const {email, name, picture} = verify.payload

        const password = email + process.env.GOOGLE_SECRET

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await Users.findOne({email})

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.status(400).json({err: "Password is incorrect."})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})
            
            res.json({
                msg: " ",
                refresh_token,
                access_token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    root: user.root
                }
            })

        }
        
        else{
            const newUser = new Users({
                name, email, password: passwordHash, avatar: picture
            })

            await newUser.save()
            
            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: newUser._id})
            
            res.json({
                msg: " ",
                refresh_token,
                access_token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    root: user.root
                }
            })
        }


    } catch (err) {
        return res.status(500).json({err: err.message})
    }

}


