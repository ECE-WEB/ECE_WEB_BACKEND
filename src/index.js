const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const api = require("./routers/index")
app.use('/api',api)
const PORT=process.env.PORT || 9000
app.listen(PORT,()=>{
    console.log(`Server is listening to PORT:${PORT}`)
})