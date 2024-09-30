import Joi from "joi";

export const getAssetUploadJobDTO = Joi.object().keys({
  jobId: Joi.string().required(),
});

export const getAssetByIdDTO = Joi.object().keys({
  assetId: Joi.string().required(),
});

export const uploadAssetDTO = Joi.object().keys({
  file: Joi.object({
    originalname: Joi.string().required(),
    mimetype: Joi.string().required(),
    buffer: Joi.binary().required(),
  }).required(),
});

export const updateAssetDTO = Joi.object({
  assetId: Joi.string().required(),
  name: Joi.string().max(50).optional(),
  tags: Joi.array().items(Joi.string().max(50)).optional(),
});

export const deleteAssetDTO = Joi.object({
    assetId: Joi.string().required()
  });
