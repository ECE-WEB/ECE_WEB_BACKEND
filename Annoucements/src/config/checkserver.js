const { success } = require("../utils");

function checkserver(req,res){
    success.data = 'Message To Check Server'
    return res.status(200).json(success);
}
module.exports={checkserver};   
