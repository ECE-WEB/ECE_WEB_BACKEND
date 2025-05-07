var jwt = require('jsonwebtoken');

function generatetoken(userdata){
    try {
        let payload = userdata.toObject()
        return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'})
    } catch (error) {
        throw new Error(`Error While Generating Token:${error}`)
    }

}

module.exports={
    generatetoken
    
}