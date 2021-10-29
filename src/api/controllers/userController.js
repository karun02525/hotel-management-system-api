import { User,OTP } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";
import {registerValidation,loginValidation} from '../validations';
import joi from 'joi'
import bcrypt from "bcrypt";
import EmailSender from "../services/EmailSender";

let otpValue=123411;
let expireIn=123423;


const userController = {

  async findProduct(req, res, next) {
    res.json({ mess: "success for admin products" });
  },
 
  async findUser(req, res, next) {
    res.json({ mess: "success" });
  },

  //Register User
  async regieterUser(req, res, next) {
    
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return next(error);
    }
  
    const email=req.body.email;
    const exist = await User.exists({email});
    if (exist) {
      return next(CustomErrorHandler.alreadyExist("this already taken."));
    }
    let user;
    let token;
    try {

      user = await User.create(req.body);
      token = user.generateJWT();
      await OTP.create({email,otp:otpValue,expireIn})
     // await EmailSender.sendMessage(email,otpValue);

    } catch (error) {
      return next(error);
    }
    res.status(200).json({ message: "success", user, token });
  },

  //Login User
  async loginUser(req, res, next) {
   
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return next(error);
    }
   
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = user.generateJWT();
      res.status(200).json({ message: "success", user, token });
    } else {
      return next(CustomErrorHandler.invalidInput("Invalid Email or Password"));
    }
  },

  //Resend Otp user
  async reSendOtp(req, res, next) {
    const {email} = req.body;
    const userSchema = joi.object({
      email:joi.string().min(5).max(25).email().required()
    })
    const { error } = userSchema.validate({email});
    if (error) {
      return next(error);
    }
    const exist = await OTP.exists({email});
    if (!exist) {
      return next(CustomErrorHandler.alreadyExist("the email id not exist."));
    }
    let data;
    try {
     await EmailSender.sendMessage(email,otpValue);
  
      data=await OTP.findOneAndUpdate({email},{otp:otpValue,expireIn});
    } catch (error) {
      return next(error);
    }
   res.json({message:'otp sent successfully registered email id',verify:data.verify,email:data.email})
  },

  
  //Change user password
  async changePassword(req, res, next) {
    const _id=req.user._id;//for middleware find user id through jwt token
    const {old_password,new_password} = req.body;
    const userSchema = joi.object({
      old_password:joi.string().min(4).max(16).required(),
      new_password:joi.string().min(4).max(16).required(),
    })

    const { error } = userSchema.validate({old_password,new_password});
    if (error) {
      return next(error);
    }

    let user = await User.findOne({_id}); 
    if(!user){
      return next(CustomErrorHandler.invalidInput("the user not exist"));
    }
     
    if(!(await user.matchPassword(old_password))) {
      return next(CustomErrorHandler.invalidInput("old password does not matched"));
    }

    try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPass = await bcrypt.hash(new_password,salt);
     await User.findOneAndUpdate({_id},{password:bcryptPass})
    } catch (error) {
      return next(error);
    }

    res.json({message:'Change password has been successfully!!'})    
  },
  
  //Forgot user password
  async forgotPassword(req, res, next) {
    const {email} = req.body;

    const userSchema = joi.object({
      email:joi.string().min(5).max(25).email().required()
    })

    const { error } = userSchema.validate({email});
    if (error) {
      return next(error);
    }

    const exist = await User.exists({email});
    if (!exist) {
      return next(CustomErrorHandler.alreadyExist("the email id not exist."));
    }
       let data;
    try {
      data=await OTP.create({email,otp:otpValue,expireIn})
    } catch (error) {
      return next(error);
    }
   res.json({message:'otp sent successfully registered email id',verify:data.verify,email:data.email})
  },
  
  //OTP verify user
  async otpVerify(req, res, next) {
    const {email,otp} = req.body;

    const otpSchema = joi.object({
      email:joi.string().min(5).max(25).email().required(),
      otp:joi.string().min(6).max(6).required(),
    })

    const { error } = otpSchema.validate({email,otp});
    if (error) {
      return next(error);
    }

    const existOtp = await OTP.findOne({email});
    if (!existOtp) {
      return next(CustomErrorHandler.alreadyExist("the email id not exist."));
    }

    if(existOtp.otp !==otp){
      return res.json({message:'Invalid OTP'})
    }

    let data;
    try {
      data= await OTP.findOneAndUpdate({email},{verify:true,otp:'xxxxxx'},{ new: true })
      data= await User.findOneAndUpdate({email},{verify:true})

    } catch (error) {
      return next(error);
    }
   res.json({message:'OTP Verified Successfully!!',verify:data.verify,email:data.email})
  },
  //Reset user password
  async resetPassword(req, res, next) {
    const {email,password} = req.body;

    const userSchema = joi.object({
      email:joi.string().min(5).max(25).email().required(),
      password:joi.string().min(4).max(16).required(),
    })

    const { error } = userSchema.validate({email,password});
    if (error) {
      return next(error);
    }

    const exist = await User.exists({email});
    if (!exist) {
      return next(CustomErrorHandler.alreadyExist("the email id not exist."));
    }
    let data;
    try {
       const salt = await bcrypt.genSalt(10);
       const bcryptPass = await bcrypt.hash(password,salt);
      data= await User.findOneAndUpdate({email},{password:bcryptPass},{ new: true })
    } catch (error) {
      return next(error);
    }
   res.json({message:'rest password successfully.',data})
  },
};

export default userController;
