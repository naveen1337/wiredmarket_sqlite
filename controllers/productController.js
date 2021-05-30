const Query = require("../models/queryModel");
const validator = require("../validators/productValidator");

exports.create = async (req, res) => {
	try {
		const input = validator.productInputValidator(req.body);
		input.error ? failResponse(401, input.error.details[0].message) : null;
		const categoryConnect = new Query("category", "categories");
		const categoryQuery = await categoryConnect.getById(
			input.value.category_id
		);
		categoryQuery.response ? null : failResponse(302, "Category not found");
		const product_obj = {
			...input.value,
			category_name: categoryQuery.data.category_name,
			status:1
		};
		const productConnect = new Query("Product", "products");
		const productQuery = await productConnect.create(product_obj)
		productQuery.response
			? successResponse(res, 201, productQuery.data)
			: failResponse(404, productQuery.message);
	} catch (err) {
		console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.getAll = async (req, res) => {
	try {
		const connect = new Query("products", "products");
		const dbquery = await connect.getAll();
		// console.log("Query:::",dbquery)
		dbquery.response
			? successResponse(res, 200, dbquery.data)
			: failResponse(404, dbquery.message);
	} catch (err) {
		// console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.getById = async (req, res) => {
	try {
		const connect = new Query("products", "products");
		const dbquery = await connect.getById(req.params.id);
		// console.log("Query:::",dbquery)
		dbquery.response
			? successResponse(res, 200, dbquery.data)
			: failResponse(404, dbquery.message);
	} catch (err) {
		// console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.deleteById = async (req, res) => {
	try {
		const connect = new Query("products", "products");
		const dbquery = await connect.delete(req.params.id);
		// console.log("Query:::",dbquery)
		dbquery.response
			? successResponse(res, 200, dbquery.data)
			: failResponse(404, dbquery.message);
	} catch (err) {
		// console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};

const successResponse = (res, statuscode, data) => {
	res.status(statuscode).json({
		status: "success",
		data: data,
	});
};
const failResponse = (statuscode, message) => {
	throw {
		statuscode: statuscode,
		message: message,
	};
};
