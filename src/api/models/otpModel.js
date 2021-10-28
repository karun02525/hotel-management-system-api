import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    email: { type: String, required: true},
    otp: { type: String, required: true },
    expireIn: { type: String,required:true },
    verify: { type: Boolean,default:false},
  },
  { timestamps: true }
);
export default mongoose.model("OTP", otpSchema);