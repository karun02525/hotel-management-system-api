 import jwt from 'jsonwebtoken'
 import dotenv from 'dotenv';

dotenv.config();
const secret=process.env.JWT_SECRET;
const expiry=process.env.JWT_EXPIRY;

 class JwtService{
     static sign(payload){
       return jwt.sign(payload,secret,{expiresIn:expiry});
     }

     static verify(token){
      return jwt.verify(token,secret);
    }
 } 

 export default JwtService; 