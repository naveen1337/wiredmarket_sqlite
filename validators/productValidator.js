const Joi = require("joi");

exports.productInputValidator = (payload) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(100).required(),
		image: Joi.string().required(),
		price: Joi.number().required(),
		stock: Joi.number().required(),
		shortIntro: Joi.string().min(10).max(200).required(),
		description: Joi.string().min(10).max(1000).required(),
		category_id: Joi.number().required(),
		authid: Joi.number()
	});
	return schema.validate(payload)
};