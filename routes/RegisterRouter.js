const express = require('express');
const { register, login, getAuth } = require('../controllers/UserController');
const isAuth = require('../middlewares/auth');
const { registerRules, validator, loginRules } = require('../middlewares/RegisterValidator');
const router=express.Router();

router.post('/register',registerRules(),validator,register)
router.post('/login',loginRules(),validator,login)
router.get('/isAuth',isAuth,getAuth)
module.exports=router