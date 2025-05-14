const jwt = require('jsonwebtoken');
const {fail} = require("../utils/index")
function authMiddleware(req, res, next) {

  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    fail.message="Unauthorized"
    fail.error="Authorization token is missing."
    return res.status(401).json(fail);

  }

  
  if (!authHeader.startsWith('Bearer ')) {
    fail.message="Unauthorized"
    fail.error="Authorization header is malformed. Format should be: Bearer <token>"
    return res.status(401).json(fail);
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    fail.message="Unauthorized"
    fail.error="Authorization token is missing."
    return res.status(401).json(fail);
  }

  try {
    const secretkey = process.env.JWT_SECERT
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;
    console.log(decoded,'this is the decoded ones')
    next();
  } 
  catch (error) {
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
    authMiddleware
};
