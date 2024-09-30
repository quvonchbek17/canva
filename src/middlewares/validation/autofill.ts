import Joi from "joi";

export const getDesignAutofillDTO = Joi.object({
    jobId: Joi.string().required()
})

// Dizayn autofill yaratish uchun DTO
export const createAutofillDTO = Joi.object({
  brand_template_id: Joi.string().required(), // Shablon ID'si, majburiy
  title: Joi.string().optional().max(256), // Ixtiyoriy dizayn nomi (maksimal 256 belgi)
  data: Joi.object().pattern(
    Joi.string(),
    Joi.object({
      type: Joi.string().valid("text", "image", "chart").required(), // Ma'lumot turi: text, image yoki chart
      asset_id: Joi.string().when('type', { is: 'image', then: Joi.required() }), // Rasm uchun asset_id majburiy
      text: Joi.string().when('type', { is: 'text', then: Joi.required() }), // Matn uchun text majburiy
      chart_data: Joi.object({
        rows: Joi.array().items(
          Joi.object({
            cells: Joi.array().items(
              Joi.object({
                type: Joi.string().valid("string", "number", "boolean", "date").required(), // Cell turi
                value: Joi.any().required(), // Cell qiymati
              })
            ).required() // Har bir qator uchun hujayra mavjud bo'lishi kerak
          })
        ).max(100).required(), // Maksimal 100 qator
      }).when('type', { is: 'chart', then: Joi.required() }) // Diagramma uchun chart_data majburiy
    })
  ).required() // Ma'lumotlarni to'ldiruvchi maydonlar
});
