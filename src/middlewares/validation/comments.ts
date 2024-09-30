import Joi from "joi";

export const getDesignCommentsDTO = Joi.object().keys({
  designId: Joi.string().required(),
});

export const getCommentByIdDTO = Joi.object().keys({
  designId: Joi.string().required(),
  commentId: Joi.string().required()
});

export const createCommentDTO = Joi.object({
  attached_to: Joi.object({
    type: Joi.string().valid("design").required(), // Dizayn turi (design bo'lishi kerak)
    design_id: Joi.string().required(), // Dizayn ID'si, izoh qaysi dizaynga qo'yilayotganini ko'rsatadi
  }).required(),
  message: Joi.string().required(), // Izoh matni
  assignee_id: Joi.string().optional(), // Ixtiyoriy tayinlangan foydalanuvchi ID'si
});

export const createReplyDTO = Joi.object({
  commentId: Joi.string().required(),
  attached_to: Joi.object({
    type: Joi.string().valid("design").required(), // Reply dizaynga bog'langan bo'lishi kerak
    design_id: Joi.string().required(), // Dizayn ID'si
  }).required(),
  message: Joi.string().required(), // Reply matni
});
