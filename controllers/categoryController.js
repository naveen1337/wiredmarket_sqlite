const Query = require("../models/queryModel");
const validator = require("../validators/categoryValidator");

exports.create = async (req, res) => {
	try {
		const input = validator.categoryInputValidator(req.body);
		input.error ? failResponse(401, input.error.details[0].message) : null;
		const query = new Query("Category", "categories");
		const dbquery = await query.create({
			...input.value,
			count: 0,
			available: 0,
		});
		dbquery.response
			? successResponse(res, 201, dbquery.data)
			: failResponse(301, dbquery.message);
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
		const query = new Query("Categories", "categories");
		const dbquery = await query.getAll();
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
		const query = new Query("Category", "categories");
		const dbquery = await query.getById(req.params.id);
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

exports.update = async (req, res) => {
	try {
		const query = new Query("Category", "categories");
		const dbquery = await query.update(req.params.id, req.body);
		dbquery.response
			? successResponse(res, 202, dbquery.data)
			: failResponse(302, dbquery.message);
	} catch (err) {
		// console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.deleteBy = async (req, res) => {
	try {
		const query = new Query("Category", "categories");
		const dbquery = await query.delete(req.params.id);
		dbquery.response
			? successResponse(res, 200, dbquery.data)
			: failResponse(302, dbquery.message);
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
