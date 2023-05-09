
const checkRole = (role)=> (req,res,next)=>{
    if(req.role !== role){
        return res.status(403).json({success:false, message: "Forbidden"})
    }
    next()
}

module.exports = checkRole