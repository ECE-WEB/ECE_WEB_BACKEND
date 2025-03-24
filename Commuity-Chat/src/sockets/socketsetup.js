const {Server} = require('socket.io')
const { chatcontroller } = require('../controller')
function setupSocket(server){
    const io = new Server(server)
    io.on('connection',(socket)=>{
        console.log('Socket Connection Is Done')
        try {
            const allmessages = chatcontroller.getallmessagecontroller()
            socket.emit('previous messages', allmessages);
        } catch (error) {
            console.log('error while fecting the messages',error)
        }
        socket.on('new message',(data)=>{
            try {
                const newmessage = chatcontroller.createnewmessagecontroller(data)
                io.emit('new message',newmessage)
            } catch (error) {
                console.error('Error handling new message:', error);
                socket.emit('messageError', { error: error.message || 'Failed to save or send message' })
            }
        })
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        })
    })
    return io
}
module.exports = setupSocket
