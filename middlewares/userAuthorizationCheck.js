const jwt = require('jsonwebtoken')
const config = require('../config/config')

const userAuthorizationCheck = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader? authHeader.split(' ')[1] : null;

    if(!token){
        return res.status(401).json({
            error:'Unauthorized: no token provided'
        })
    }

    try {
        const decoded = jwt.verify(token,config.JWTSecret)
        const {_id, role} = decoded;
        
        req.userId = _id;
        req.role = role;
        next()

    } catch (error) {
        return res.status(401).json({error:'Unauthorized: invalid or expired token'});
    }
}

module.exports = userAuthorizationCheck