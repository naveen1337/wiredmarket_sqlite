const Joi = require("joi");

exports.orderInputValidator = (payload) => {
	const schema = Joi.object({
		username: Joi.string().min(3).max(50).required(),
	});
	return schema.validate(payload)
};