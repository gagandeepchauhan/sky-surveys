const { Schema, model } = require('mongoose')

const TokenSchema    = new Schema(
    {
        email:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    } 
)

model("Token",TokenSchema)