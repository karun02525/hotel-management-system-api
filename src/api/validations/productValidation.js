import joi from 'joi';

const productSchema = joi.object({
    room_no:joi.string().min(1).max(5).required(),
    room_name:joi.string().min(1).max(15).required(),
    capacity:joi.string().min(1).max(10).required(),
    room_size:joi.string().min(1).max(100).required(),
    bed:joi.array().items(joi.string()).required(),
    features:joi.array().items(joi.string()).required(),
    gallery:joi.array().items(joi.string())
});



export default productSchema;