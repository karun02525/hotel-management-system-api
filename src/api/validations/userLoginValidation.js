import joi from 'joi';

const userSchema = joi.object({
    email:joi.string().min(5).max(25).email().required(),
    password:joi.string().min(4).max(16).required()
})

export default userSchema;