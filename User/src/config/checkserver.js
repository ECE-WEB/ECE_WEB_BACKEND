const { success, fail } = require("../utils");

function checkserver(req,res){
    try{
        success.data="Server is Working"
        return res.status(200).json(success)
    }
    catch(err){
        fail.error=err
        return res.status(500).json(fail)
    
    }
}
module.exports={
    checkserver
}