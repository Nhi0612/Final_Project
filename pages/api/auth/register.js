import connectDB from '../../../utils/connectDB'
import Users from '../../../model/user'
import validate from '../../../utils/validate'
import bcrypt from 'bcrypt'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { name, email, password, password2 } = req.body

        const errMsg = validate(name, email, password ,password2)
        if(errMsg) return res.status(400).json({err: errMsg})

        const user = await Users.findOne({ email })
        if(user) return res.status(400).json({err: 'This email already exists.'})

        const passwordHash = await bcrypt.hash(password, 14)

        const newUser = new Users({ 
            name, email, password: passwordHash,  password2
        })

        await newUser.save()
        res.json({msg: "Register Success!"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
