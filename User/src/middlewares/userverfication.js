var jwt = require('jsonwebtoken')
function verfiytoken(req,res,next){
    try {
        
        const token = req.headers?.authorization.split(' ')[1]
        const user = jwt.verify(token,process.env.JWT_SECRET)
        return res.status(200).json({user})
    } 
    catch (error) {
        return res.status(400).json({error})
    }
}
module.exports = verfiytoken