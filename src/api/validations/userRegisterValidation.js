import joi from 'joi';

const userSchema = joi.object({
    name:joi.string().min(7).max(25).required(),
    mobile:joi.string().min(10).max(10).required(),
    email:joi.string().min(5).max(25).email().required(),
    password:joi.string().min(4).max(16).required(),
    role:joi.string().valid('customer','admin').required(),
})

export default userSchema;