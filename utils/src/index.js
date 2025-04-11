const express = require('express')
const {envconfig} = require('./controller/index')
const api = require('./routers/index')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',api)
const PORT = envconfig.PORT
app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`)
    }
)