const { success } = require("../utils");

function checkerserver(req,res){
    
    success.data='Just To Check Server';
    return res.status(200).json(success);
}
module.exports={checkerserver};