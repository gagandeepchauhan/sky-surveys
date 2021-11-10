// Requiring necessary files
const express   = require('express')
const app       = express()
const cors		= require('cors')
const mongoose  = require('mongoose')

// Configuring .env
process.env.NODE_ENV === 'development' && require('dotenv').config()
const PORT      = process.env.PORT || 3001
const DB_URL =  process.env.NODE_ENV === 'development' ?
                "mongodb://localhost:27017/sky-surveys" :
                process.env.DB_URL

// Database configuration
mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
.then(()=>console.log('DB CONNECTED'))
.catch(err=>console.log('ERROR : ',err.message))

// Requiring models
require('./models/User')
require('./models/Token')
require('./models/Survey')
require('./models/Submission')

// Requiring middleware
const authenticate  = require('./middlewares/authenticate')

// Using app feature
app.use(express.json())
app.use(cors({
	origin: process.env.CORS_URL
}))

// Requiring route files
const authRoute = require('./routes/authRoute')
const coordinatorRoute = require('./routes/coordinatorRoute')
const respondentRoute = require('./routes/respondentRoute')

// Routes
app.get("/",authenticate,(req,res)=>{
    const { user } = req
    res.status(200).json({
        success: true,
        email: user.email
    })
})
// Using routes
app.use("/auth",authRoute)
app.use("/app-survey",coordinatorRoute)
app.use("/app-submission",respondentRoute)

// App listener
app.listen(PORT,()=>console.log(`SKY-SURVEYS SERVER STARTED ON PORT ${PORT}`))