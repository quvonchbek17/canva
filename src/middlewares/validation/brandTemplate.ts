import Joi from "joi"

export const getAllBrandTemplatesDTO = Joi.object({
    query: Joi.string().optional(), // Brend shablonlarini qidirish uchun query so'zi
    continuation: Joi.string().optional(), // Ko'proq ma'lumot olish uchun continuation tokeni
    ownership: Joi.string().valid("any", "owned", "shared").optional(), // Egasi bo'yicha filtr ("any", "owned", "shared")
    sort_by: Joi.string().valid("relevance", "modified_descending", "modified_ascending", "title_descending", "title_ascending").optional() // Saralash tartibi
});

export const getBrandTemplateByIdDTO = Joi.object({
    brandTemplateId: Joi.string().optional()
});

export const getBrandTemplateDatasetDTO = Joi.object({
    brandTemplateId: Joi.string().optional()
});