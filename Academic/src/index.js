const express  = require('express')
const {envconfig,connectDB} = require('./config/index')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const api = require('./routers/index')
app.use('/api',api)
const PORT=envconfig.PORT
connectDB()
app.listen(PORT,()=>{
    console.log(`Listening On Port:${PORT}`)
    
})