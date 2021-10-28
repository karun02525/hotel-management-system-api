import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    room_no: { type: String, required: true,unique: true},
    room_name: { type: String, required: true,unique: true },
    capacity: { type: String,required:true },
    room_size: { type: String,required:true },
    room_avatar: { type: String },
    bed: { type: String,required:true },
    features: { type: Array,default:[] },
    gallery: { type: Array,default:[]},
    
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
