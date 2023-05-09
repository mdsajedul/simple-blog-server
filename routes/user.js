const { getAllUser, getUserById } = require('../controllers/userController');
const checkRole = require('../middlewares/checkRole');
const userAuthorizationCheck = require('../middlewares/userAuthorizationCheck');

const router = require('express').Router()

router.get('/users',userAuthorizationCheck,checkRole('admin'),getAllUser)
router.get('/users/:id',userAuthorizationCheck,checkRole('admin'),getUserById)

module.exports = router;