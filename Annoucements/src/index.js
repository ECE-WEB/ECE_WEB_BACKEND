const express = require('express')
const app = express()
const {evconfig, envconfig} = require('./config/index')    
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const api = require('./routers/index')
app.use('/api',api)
const PORT=envconfig.PORT || 9000   
app.listen(PORT,()=>{
    console.log(`listening to the port *${PORT}`)
})
