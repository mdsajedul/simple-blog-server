const router = require('express').Router()


router.use('/api/v1',require('../routes/auth'))
router.use('/api/v1',require('../routes/profile'))
router.use('/api/v1',require('../routes/blog'))
router.use('/api/v1',require('../routes/user'))


router.get('/health',(_req,res)=>{
    try{
        res.status(200).json({
            message:'Success'
        })
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router