const { success, fail } = require("../utils")

async function checkingserver(req,res){
    try {
        success.message='server is been checked'
        return res.json(success)
    } catch (error) {
        fail.messsage='server is not been checked'
        return res.json(fail)
    }
}
module.exports={
    checkingserver
}