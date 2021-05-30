const Joi = require("joi");

exports.categoryInputValidator = (payload) => {
	const schema = Joi.object({
		category_name: Joi.string().min(1).max(100).required(),
		image: Joi.string().required(),
	});
	return schema.validate(payload)
};