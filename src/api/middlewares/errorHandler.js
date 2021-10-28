import CustomErrorHandler from "../services/CustomErrorHandler.js";
import {ValidationError} from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const errorHandler = (err,req,res,next)=>{

  
    let statusCode=500;
    let data ={
        message:'Internel server error',
        ...(process.env.DEBUG_MODE==='true' && {originalError:err.message})
    }


    if(err instanceof ValidationError){
           statusCode=422
           data={
              message:err.message
           }
    }


    if(err instanceof CustomErrorHandler){
        statusCode=err.status
        data={message:err.msg}
    }
   
    return res.status(statusCode).json(data);
 
}
export default errorHandler;