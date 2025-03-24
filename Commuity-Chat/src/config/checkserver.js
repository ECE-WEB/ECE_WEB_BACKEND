const { success, fail } = require("../utils");

function checkserver(req,res){
    try {
        success.data='This To Check The Server'
        return res.status(200).json(success)
    } catch (error) {
        fail.error='Failed In The Intial Connection'
        return res.status(500).json(fail)
    
    }
}
module.exports={
    checkserver
}