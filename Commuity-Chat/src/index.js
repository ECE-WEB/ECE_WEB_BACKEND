const express = require('express')
const {envconfig} = require('./config/index')
const app = express()

const api = require('./routers/index')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api',api)
const PORT = envconfig.PORT || 9001
app.listen(PORT,()=>{
    console.log(`listening to PORT ${PORT}`);
})