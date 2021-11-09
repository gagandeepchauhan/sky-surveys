const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema    = new Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        userRole:{
            type:Number,
            required: true,
            enum:[0,1]  // 0 for 'coordinator' & 1 for 'respondent'
        },
        name:{
            type:String,
            required: true
        },
        age:{
            type:Number,
            required: true
        },
        gender:{
            type:String,
            enum:['M','F'],
            required:true
        },
        company:{ // needs to be filled in case user is a coordinator
            type:String
        }
    },
    {
        timestamps: true
    } 
)

UserSchema.pre('save',function(next){ // must define this callback using function keyword, since then only we get access to this obj that refers to user obj
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err,salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password,salt,(err,hashedPassword)=>{
            if(err){
                return next(err)
            }
            user.password = hashedPassword
            next()
        })
    })
})
UserSchema.methods.comparePassword = function(password){
    const user = this
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password,(err,match)=>{
            if(err){
                return reject(err)
            }
            if(!match){
                return resolve(false)
            }
            resolve(true)
        })
    })
}

model("User",UserSchema)