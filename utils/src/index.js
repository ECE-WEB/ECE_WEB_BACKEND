const express = require('express')
const {envconfig} = require('./controller/index')
const api = require('./routers/index')
const {connectDB} = require('./config/index')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',api)
const PORT = envconfig.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
            console.log(`listening on port ${PORT}`)
        }
    )
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err)
     
})

