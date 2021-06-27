
const Joi = require('@hapi/joi')

//register
const registerValidation = (xbody) =>{
    const schema = {
        adiSoyadi:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        sifre:Joi.string().min(6).required()
    }
    return Joi.validate(xbody,schema); 
    //if (error) return res.status(400).send(error.details[0].message) 
}

//login
const loginValidation = (xbody) =>{

    const schema = {
        email:Joi.string().min(6).required().email(),
        sifre:Joi.string().min(6).required()
    }
    return Joi.validate(xbody,schema); 
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;