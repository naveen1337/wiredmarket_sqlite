const Query = require("../models/queryModel");
const validator = require("../validators/orderValidator");
const {
	orderProductObjWorker,
	orderObjWorker,
} = require("../workers/objectCreator");

exports.create = async (req, res) => {
	try {
		const input = validator.orderInputValidator(req.body);
		input.error ? failResponse(401, input.error.details[0].message) : null;
		const orderProductObj = await orderProductObjWorker(input.value.items);
		orderProductObj ? null : failResponse(404, "No Product Found");
		const orderObj = await orderObjWorker(orderProductObj, input.value);
		orderObj ? null : failResponse(302, "Invalid Order Obj");
		const orderConnection = new Query("Order", "orders");
		const dbquery = await orderConnection.create(orderObj);
		dbquery.response
			? successResponse(res, 200, dbquery.data)
			: failResponse(302, dbquery.message);
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
		const connect = new Query("Orders", "orders");
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
		const connect = new Query("Order", "orders");
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

exports.filter = async (req, res) => {
	try {
		let column = null
		if (req.query.order_id) {
			column = "order_id";
		}
		if (req.query.status) {
			column = "status";
		}
		if(req.query.date){
			column = "date";
		}
		if(req.query.contact){
			column = "contact";
		}
		if(req.query.order_type){
			column = "order_type";
		}
		column ? null : failResponse(404,'Invalid Filter')
		console.log(column)
		const connect = new Query("Order", "orders");
		const dbquery = await connect.filter({
			column: column,
			value: req.query[column] ? req.query[column] : null	
		});
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
exports.paginate = async (req, res) => {
	try {
		const connect = new Query("Order", "orders");
		const dbquery = await connect.paginate(req.query.limit,req.query.offset);
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
