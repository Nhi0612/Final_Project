import connectDB from '../../../utils/connectDB'
import Users from '../../../model/user'
import bcrypt from 'bcrypt'
import {createAccessToken, createRefreshToken} from '../../../utils/generateToken'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try{
        const { email, password} = req.body

        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({err: 'The user do not exist'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({err: 'Invalid Password'})

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

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}