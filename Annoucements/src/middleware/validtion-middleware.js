const { validationResult } = require("express-validator");
const {fail} = require("../utils/index")
function annoucementsvalidmiddleware(req,res,next){
    const result = validationResult(req)
    if(result.isEmpty()){
        return next()

    }
    const errors = result.array().map((error) => {
            
        return error.msg 
    })
    fail.error = errors
    
    return res.status(400).json(fail)

    
}
module.exports={
    annoucementsvalidmiddleware
}