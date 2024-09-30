import Joi from "joi";

export const getDesignByIdDto = Joi.object().keys({
  designId: Joi.string().required(),
});

export const getDesignImportJobByIdDto = Joi.object().keys({
  jobId: Joi.string().required(),
});

export const getDesignExportJobByIdDto = Joi.object().keys({
  exportId: Joi.string().required(),
});


export const getAllDesignsDTO = Joi.object({
  query: Joi.string().optional(),
  continuation: Joi.string().optional(),
  ownership: Joi.string().valid("owned", "shared", "any").optional(),
  sort_by: Joi.string()
    .valid(
      "relevance",
      "modified_descending",
      "modified_ascending",
      "title_descending",
      "title_ascending"
    )
    .optional(), // Dizaynlarni saralash tartibi
});

export const createDesignDTO = Joi.object({
  design_type: Joi.object({
    type: Joi.string().valid("preset", "custom").required(),
    name: Joi.string().valid("doc", "whiteboard", "presentation").optional(),
    width: Joi.number().min(40).max(8000).optional(),
    height: Joi.number().min(40).max(8000).optional(),
  }).optional(),
  asset_id: Joi.string().optional(),
  title: Joi.string().max(256).optional(),
});

export const createDesignImportJobDTO = Joi.object({
  file: Joi.object({
    originalname: Joi.string()
      .pattern(
        /\.(ai|psd|key|numbers|pages|xls|xlsx|ppt|pptx|doc|docx|odg|odp|ods|odt|pdf)$/i
      )
      .required(), // Yuborilayotgan faylning nomi, faqat ko'rsatilgan formatlarga ruxsat etiladi
    mimetype: Joi.string()
      .valid(
        "application/illustrator",
        "image/vnd.adobe.photoshop",
        "application/vnd.apple.keynote",
        "application/vnd.apple.numbers",
        "application/vnd.apple.pages",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.oasis.opendocument.graphics",
        "application/vnd.oasis.opendocument.presentation",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/vnd.oasis.opendocument.text",
        "application/pdf"
      )
      .required(), // Mimetype validatsiyasi
  }).required(),
});

export const createDesignExportJobDTO = Joi.object({
  design_id: Joi.string().required(),  // Dizayn ID'si (majburiy)
  format: Joi.object({
    type: Joi.string().valid("pdf", "jpg", "png", "gif", "pptx", "mp4").required(),  // Eksport formati (majburiy)
    quality: Joi.when("type", {
      is: "jpg",
      then: Joi.number().integer().min(1).max(100).required(),  // JPG uchun siqilish sifati
      otherwise: Joi.when("type", {
        is: "mp4",
        then: Joi.string().valid("horizontal_480p", "horizontal_720p", "horizontal_1080p", "horizontal_4k", "vertical_480p", "vertical_720p", "vertical_1080p", "vertical_4k").required()  // MP4 uchun sifat
      })
    }),
    size: Joi.string().valid("a4", "a3", "letter", "legal").optional(),  // Faqat PDF uchun qog'oz o'lchami
    height: Joi.number().optional(),  // Fayl balandligi (optional)
    width: Joi.number().optional(),  // Fayl kengligi (optional)
    lossless: Joi.boolean().optional(),  // PNG uchun siqilmagan format (ixtiyoriy)
    as_single_image: Joi.boolean().optional(),  // Ko'p sahifali dizaynni bitta rasmga birlashtirish (optional)
    pages: Joi.array().items(Joi.number()).optional(),  // Ko'p sahifali dizaynlarda eksport qilinadigan sahifalar
    export_quality: Joi.string().valid("regular", "pro").optional()  // Eksport sifati
  }).required()
});
