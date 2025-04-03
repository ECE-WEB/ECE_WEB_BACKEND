const express  = require('express')
const app = express()
const {envconfig} = require('./config/index')
const PORT=envconfig.PORT
app.listen(PORT,()=>{
    console.log(`Listening On Port:${PORT}`)
    
})