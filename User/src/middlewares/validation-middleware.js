const { validationResult } = require("express-validator");
const {fail} = require("../utils")
function validateUser(req, res, next) {
    
    const response = validationResult(req)
    
    if(response.isEmpty()){
        return next()
    }
    const errors = response.array().map((error) => {
            
            return error.msg 
    })
    fail.error = errors
    return res.status(400).json(fail)
    
    
}
module.exports =  {
    validateUser
}