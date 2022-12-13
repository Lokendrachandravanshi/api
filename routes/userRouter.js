const userRouter = require('express').Router();
const user = require('../controllers/user');
userRouter.post('/signup',user.signup)
userRouter.get('/login',user.login)
// userRouter.get('/emailSend',user.emailSend)


module.exports = userRouter;