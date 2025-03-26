const express = require('express')
const {envconfig, connectDB} = require('./config/index')
const {setupSocket} = require('./sockets/index')
const { createServer } = require('node:http');
const app = express()
const server = createServer(app);
const api = require('./routers/index')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api',api)


setupSocket(server)

const PORT = envconfig.PORT || 9001
connectDB()
server.listen(PORT,()=>{
    console.log(`listening to PORT ${PORT}`);
})