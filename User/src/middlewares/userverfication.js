const jwt = require('jsonwebtoken');
const {fail} = require("../utils")
function verfiytoken(req, res, next) {
    try {
        
        const token = req.headers?.authorization?.split(' ')[1] || req.token;

        if (!token) {
            fail.message="Unauthorized"
            fail.error="Authorization token is missing."
            return res.status(401).json(fail);
        }

        
        const secret = process.env.JWT_SECRET
        const user = jwt.verify(token, secret);

        
        req.user = user;

        
        return next();
    } catch (error) {
        fail.message="Unauthorized"
        console.log(error.name)
        if(error.name==="JsonWebTokenError"){
            fail.error="Invalid token format."
            return res.status(401).json(fail);
        }
        fail.error=error.message || "Invalid token"
        return res.status(401).json(fail);
    }
}

module.exports = {
    verfiytoken
};