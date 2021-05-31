const Joi = require("joi");

exports.orderInputValidator = (payload) => {
	const schema = Joi.object().strict().keys({
		items: Joi.array().items(itemSchema),
		customer_name: Joi.string().required(),
		contact: Joi.string().required(),
		address: Joi.string().required(),
		order_type: Joi.number().required(),
	});
	return schema.validate(payload);
};

const itemSchema = Joi.object().strict().keys({
	id:Joi.number().required(),
	quantity:Joi.number().min(1).max(25).required().messages({'number.base':"Invalid Quantity"}),
})
