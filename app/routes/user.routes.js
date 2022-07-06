const express=require('express');
const userController=require('../controllers/user.controller')
const authController=require('../middleware/auth.middleware')

const router=express.Router();

router.post('/register',userController.createUser).post('/login',userController.login)
router.get('/getMe',authController.authenticateToken,userController.getMe);

module.exports=router;