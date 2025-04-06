const { success, fail } = require("../utils");

async function checkserver(req,res){
    try {
        success.message="Server Is Running"
        return res.status(200).json(success)
    } catch (error) {
        fail.message="Server Is Not Running"
        return res.status(500).json(fail)

    }
}
module.exports={
    checkserver
}