import Joi from "joi";

export const getFolderByIdDTO = Joi.object({
  folderId: Joi.string().required(),
});

export const createFolderDTO = Joi.object({
  name: Joi.string().max(256).required(),
  parent_folder_id: Joi.string().default("root").required(),
});

export const updateFolderDTO = Joi.object({
  folderId: Joi.string().required(),
  name: Joi.string().max(256).required(),
});

export const deleteFolderDTO = Joi.object({
  folderId: Joi.string().required(),
});

export const getAllFolderItemsDTO = Joi.object({
  folderId: Joi.string().required(),
  continuation: Joi.string().optional(),
  item_types: Joi.array().items(
    Joi.string().valid("design", "folder", "image")
  ),
  sort_by: Joi.string()
    .valid(
      "created_ascending",
      "created_descending",
      "modified_ascending",
      "modified_descending",
      "title_ascending",
      "title_descending"
    )
    .optional(),
});

export const moveItemDTO = Joi.object({
  to_folder_id: Joi.string().required(),
  item_id: Joi.string().required(),
});
