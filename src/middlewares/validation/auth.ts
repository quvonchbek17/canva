import Joi from "joi";

export const loginDto = Joi.object().keys({
    code: Joi.string().required()
});


export const refreshAccessTokenDto = Joi.object().keys({
    refresh_token: Joi.string().required()
});