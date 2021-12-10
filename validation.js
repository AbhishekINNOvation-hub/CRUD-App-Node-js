const joi=require('joi');
const validation=data=>{
    const schema=joi.object({
        name:String().required(),
        email:String().required().email(),
        password:String().required()
    })
    return schema.validate(data);
}
module.exports.validation=validation;