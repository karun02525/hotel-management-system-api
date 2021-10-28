import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String,required:true },
    address: { type: String,default:'' },
    avatar: { type: String,default:''},
    doc: { type: String,default:''},
    doc_avatar: { type: String,default:''},
    verify:{type:Boolean,default:false},
    role: { type: String, default: "customer" },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        delete ret['__v']
        return ret
    }
})


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
