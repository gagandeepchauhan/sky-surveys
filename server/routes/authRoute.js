const express   = require('express')
const router    = express.Router()
const { model } = require('mongoose')
const User      = model('User')
const Token     = model('Token')
const jwt       = require('jsonwebtoken')

router.post("/register", async (req,res)=>{
    const { email, password, confirmPassword, userRole, name, age, gender, company } = req.body

    if( !email || !password ){
        return res.status(400).json({
            error: "All fields are mandatory"
        })
    }
    if( password!==confirmPassword ){
        return res.status(422).json({
            error: "Passwords should match"
        })
    }
    try{
        const user= await User.create({ email, password, userRole, name, age, gender, company })
        const token= generateToken({ userId: user._id })
        res.status(200).json({
            token,
            userRole,
            name
        })
    }catch(err){
        return res.status(422).json({
            error: "User already exist"
        })
    }  
})

router.post("/login", async (req,res)=>{
    const { email, password } = req.body

    if( !email || !password ){
        return res.status(400).json({
            error: "You must provide email and password"
        })
    }
    try{
        const user= await User.findOne({ email })
        if(!user){
            return res.status(422).json({
                error: "Invalid email or password"
            })
        }
        const result = await user.comparePassword(password)
        if(!result){
            return res.status(422).json({
                error: "Invalid email or password"
            })
        }
        const token= generateToken({ userId: user._id })
        res.status(200).json({
            token,
            userRole:user.userRole,
            name:user.name
        })
    }catch(err){
        return res.status(422).json({
            error: "You can't signup"
        })
    } 
})

router.get('/reset-password',async (req,res)=>{ // getPasswordResetToken
    const {email} = req.query
    if(!email){
        return res.status(422).json({
            error: "You need to provide your email"
        })
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(422).json({
                error: "Invalid email"
            })
        }
        const token = await Token.create({email}) // here token = { _id, email } , we use '_id' as token
        return res.status(200).json({
            token: token._id
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            error : "Something went wrong"
        })
    }
})

router.get('/reset-password/:token',async (req,res)=>{ // verifyPasswordResetToken
    const {token} = req.params
    if(!token){
        return res.status(422).json({
            error: "You need to provide token"
        })
    }
    try{
        const tokenData = await Token.findById(token)
        if(!tokenData){
            return res.status(422).json({
                error: "Invalid token provided"
            })
        }
        return res.status(200)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            error : "Something went wrong"
        })
    }
})

router.post('/reset-password',async (req,res)=>{ // changePassword
    const {password, confirmPassword, token} = req.body
    if(!password || !confirmPassword || !token){
        return res.status(422).json({
            error: "Invalid request"
        })
    }
    if(password!==confirmPassword){
       return res.status(422).json({
            error: "Passwords should match"
        }) 
    }
    try{
        const tokenData = await Token.findById(token)
        if(!tokenData){
            return res.status(422).json({
                error: "Invalid token provided"
            })
        }
        await User.findOneAndUpdate({email:tokenData.email},{$set:{password}})
        return res.status(200)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            error : "Something went wrong"
        })
    }
})

function generateToken(data){
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '30m' })
}

module.exports  = router