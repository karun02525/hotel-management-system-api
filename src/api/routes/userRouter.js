import express from 'express'

import { userController } from '../controllers';
import {auth,admin} from '../middlewares'

const userRouter = express.Router();



//for user
userRouter.get('/',auth,userController.findUser)
userRouter.post('/register',userController.regieterUser)
userRouter.post('/login',userController.loginUser)
userRouter.post('/forgot-password',userController.forgotPassword)
userRouter.post('/reset-password',userController.resetPassword)
userRouter.post('/otp-verify',userController.otpVerify)
userRouter.post('/otp-resend',userController.reSendOtp)
userRouter.put('/change-password',auth,userController.changePassword)



//for admin
userRouter.post('/product',[auth,admin],userController.findProduct)





export default userRouter;